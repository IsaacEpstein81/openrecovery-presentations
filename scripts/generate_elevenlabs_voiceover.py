#!/usr/bin/env python3
"""Generate ElevenLabs voiceover audio files from a lesson manifest.

Usage:
    python3 scripts/generate_elevenlabs_voiceover.py \
      presentations/course-name/lesson-name/voiceover.json

    python3 scripts/generate_elevenlabs_voiceover.py --list-voices
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any


API_BASE = "https://api.elevenlabs.io"
REPO_ROOT = Path(__file__).resolve().parent.parent
DOTENV_PATH = REPO_ROOT / ".env"
PRONUNCIATIONS_PATH = (
    REPO_ROOT / "openrecovery_presentation_ai_docs" / "voiceover_pronunciations.json"
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate ElevenLabs voiceover files from a lesson manifest."
    )
    parser.add_argument(
        "manifest",
        nargs="?",
        type=Path,
        help="Path to a lesson voiceover manifest JSON file.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite existing files instead of skipping them.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Validate the manifest and print the files that would be generated.",
    )
    parser.add_argument(
        "--list-voices",
        action="store_true",
        help="List available voices for the current ElevenLabs account.",
    )
    parser.add_argument(
        "--search",
        help="Optional search term when using --list-voices.",
    )
    parser.add_argument(
        "--voice-id",
        help="Override the manifest voice ID for every segment.",
    )
    parser.add_argument(
        "--profile",
        action="append",
        help="Render only the named profile id. Can be passed more than once.",
    )
    parser.add_argument(
        "--model-id",
        help="Override the manifest model ID for every segment.",
    )
    return parser.parse_args()


def require_api_key() -> str:
    api_key = os.environ.get("ELEVENLABS_API_KEY", "").strip()
    if not api_key:
        raise SystemExit(
            "ELEVENLABS_API_KEY is not set. Add it to the repo-root .env file or export it in your shell and run again."
        )
    return api_key


def load_dotenv(path: Path) -> None:
    if not path.exists():
        return

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue

        if line.startswith("export "):
            line = line[7:].strip()

        if "=" not in line:
            continue

        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip()

        if not key or key in os.environ:
            continue

        if len(value) >= 2 and value[0] == value[-1] and value[0] in {"'", '"'}:
            value = value[1:-1]

        os.environ[key] = value


def load_json_file(path: Path) -> dict[str, Any]:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        raise ValueError(f"Invalid JSON at {path}: {error}") from error


def load_pronunciation_rules(path: Path) -> list[dict[str, Any]]:
    if not path.exists():
        return []

    payload = load_json_file(path)
    if payload.get("version") != 1:
        raise ValueError(
            f"Pronunciation rules file must use version 1: {path}"
        )

    rules = payload.get("rules")
    if not isinstance(rules, list):
        raise ValueError(
            f"Pronunciation rules file must include a `rules` list: {path}"
        )

    normalized_rules: list[dict[str, Any]] = []
    for index, rule in enumerate(rules, start=1):
        if not isinstance(rule, dict):
            raise ValueError(
                f"Pronunciation rule {index} must be an object: {path}"
            )

        match = str(rule.get("match", "")).strip()
        replace = str(rule.get("replace", "")).strip()
        if not match:
            raise ValueError(
                f"Pronunciation rule {index} is missing `match`: {path}"
            )
        if not replace:
            raise ValueError(
                f"Pronunciation rule {index} is missing `replace`: {path}"
            )

        normalized_rules.append(
            {
                "match": match,
                "replace": replace,
                "whole_word": bool(rule.get("whole_word", True)),
                "case_sensitive": bool(rule.get("case_sensitive", True)),
            }
        )

    return normalized_rules


def apply_pronunciation_rules(
    text: str,
    rules: list[dict[str, Any]],
) -> tuple[str, int]:
    updated = text
    total_replacements = 0

    for rule in rules:
        pattern = re.escape(rule["match"])
        if rule["whole_word"]:
            pattern = rf"(?<!\w){pattern}(?!\w)"

        flags = 0 if rule["case_sensitive"] else re.IGNORECASE
        updated, count = re.subn(pattern, rule["replace"], updated, flags=flags)
        total_replacements += count

    return updated, total_replacements


def build_request(
    url: str,
    api_key: str,
    *,
    payload: dict[str, Any] | None = None,
    method: str = "GET",
) -> urllib.request.Request:
    data = None
    headers = {
        "xi-api-key": api_key,
    }
    if payload is not None:
        data = json.dumps(payload).encode("utf-8")
        headers["Content-Type"] = "application/json"
    return urllib.request.Request(url, data=data, headers=headers, method=method)


def fetch_json(
    url: str,
    api_key: str,
    *,
    payload: dict[str, Any] | None = None,
    method: str = "GET",
) -> dict[str, Any]:
    request = build_request(url, api_key, payload=payload, method=method)
    try:
        with urllib.request.urlopen(request) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        body = error.read().decode("utf-8", errors="replace")
        raise SystemExit(f"ElevenLabs API error ({error.code}): {body}") from error


def fetch_audio(
    url: str,
    api_key: str,
    payload: dict[str, Any],
) -> tuple[bytes, dict[str, str]]:
    request = build_request(url, api_key, payload=payload, method="POST")
    try:
        with urllib.request.urlopen(request) as response:
            return response.read(), dict(response.headers.items())
    except urllib.error.HTTPError as error:
        body = error.read().decode("utf-8", errors="replace")
        raise SystemExit(f"ElevenLabs API error ({error.code}): {body}") from error


def is_relative_to(path: Path, parent: Path) -> bool:
    try:
        path.relative_to(parent)
        return True
    except ValueError:
        return False


def load_manifest(path: Path) -> dict[str, Any]:
    if not path.exists():
        raise FileNotFoundError(f"Manifest not found: {path}")

    manifest = json.loads(path.read_text(encoding="utf-8"))
    if manifest.get("version") != 1:
        raise ValueError("Only manifest version 1 is supported.")

    provider = manifest.get("provider")
    if provider not in (None, "elevenlabs"):
        raise ValueError("This generator only supports manifests with provider `elevenlabs`.")

    if not isinstance(manifest.get("segments"), list) or not manifest["segments"]:
        raise ValueError("Manifest must include a non-empty `segments` array.")

    voice_defaults = manifest.get("voice") or {}
    profiles = get_profiles(manifest)

    if not voice_defaults.get("model_id") and not any(
        profile.get("model_id") for profile in profiles
    ):
        raise ValueError("Manifest must provide `model_id` in `voice` or in each profile.")

    lesson_root = path.parent.resolve()
    seen_keys: set[str] = set()
    multiple_profiles = len(profiles) > 1
    default_profile_id = manifest.get("default_profile_id")

    if default_profile_id and not any(profile["id"] == default_profile_id for profile in profiles):
        raise ValueError(
            "Manifest `default_profile_id` must match one of the declared profiles."
        )

    for index, segment in enumerate(manifest["segments"], start=1):
        if not segment.get("slide_id"):
            raise ValueError(f"Segment {index} is missing `slide_id`.")
        if not segment.get("trigger"):
            raise ValueError(f"Segment {index} is missing `trigger`.")
        if not segment.get("text") or not segment["text"].strip():
            raise ValueError(f"Segment {index} is missing narration text.")

        segment_key = f"{segment['slide_id']}::{segment['trigger']}"
        if segment_key in seen_keys:
            raise ValueError(f"Duplicate segment key found: {segment_key}")
        seen_keys.add(segment_key)

        if not segment.get("file") and not segment.get("file_template"):
            raise ValueError(
                f"Segment {index} must include `file` or `file_template`."
            )

        if multiple_profiles and not segment.get("file_template"):
            raise ValueError(
                f"Segment {index} must use `file_template` when multiple profiles exist."
            )

        for profile in profiles:
            relative_file = resolve_segment_file(segment, profile["id"])
            output_path = (lesson_root / relative_file).resolve()
            if not is_relative_to(output_path, lesson_root):
                raise ValueError(
                    f"Segment output path escapes the lesson directory: {relative_file}"
                )

            if output_path.suffix.lower() not in {".mp3", ".wav", ".pcm"}:
                raise ValueError(
                    "Segment output must use a browser-friendly audio extension such as "
                    f".mp3, .wav, or .pcm: {relative_file}"
                )

    return manifest


def get_profiles(manifest: dict[str, Any]) -> list[dict[str, Any]]:
    profiles = manifest.get("profiles")
    if not profiles:
        return [
            {
                "id": manifest.get("default_profile_id", "default"),
                "label": "Narration",
            }
        ]

    if not isinstance(profiles, list):
        raise ValueError("Manifest `profiles` must be a list when present.")

    seen_ids: set[str] = set()
    normalized: list[dict[str, Any]] = []
    for index, profile in enumerate(profiles, start=1):
        profile_id = str(profile.get("id", "")).strip()
        if not profile_id:
            raise ValueError(f"Profile {index} is missing `id`.")
        if profile_id in seen_ids:
            raise ValueError(f"Duplicate profile id found: {profile_id}")
        seen_ids.add(profile_id)

        normalized.append(
            {
                "id": profile_id,
                "label": profile.get("label") or profile_id.title(),
                **profile,
            }
        )

    return normalized


def resolve_voice_id(
    voice_defaults: dict[str, Any],
    profile: dict[str, Any],
    cli_voice_id: str | None,
) -> str:
    if cli_voice_id:
        return cli_voice_id
    if profile.get("voice_id"):
        return str(profile["voice_id"])
    if voice_defaults.get("voice_id"):
        return str(voice_defaults["voice_id"])

    env_name = profile.get("voice_id_env") or voice_defaults.get(
        "voice_id_env", "ELEVENLABS_VOICE_ID"
    )
    voice_id = os.environ.get(env_name, "").strip()
    if not voice_id:
        raise SystemExit(
            f"{env_name} is not set and no voice_id was provided in the manifest."
        )
    return voice_id


def resolve_segment_file(segment: dict[str, Any], profile_id: str) -> str:
    if segment.get("file_template"):
        return str(segment["file_template"]).replace("{profile_id}", profile_id)
    return str(segment["file"])


def list_voices(api_key: str, search: str | None) -> int:
    query = {
        "page_size": "100",
        "include_total_count": "true",
    }
    if search:
        query["search"] = search
    url = f"{API_BASE}/v2/voices?{urllib.parse.urlencode(query)}"
    payload = fetch_json(url, api_key)
    voices = payload.get("voices", [])
    if not voices:
        print("No voices found.")
        return 0

    for voice in voices:
        voice_id = voice.get("voice_id", "")
        name = voice.get("name", "")
        category = voice.get("category", "")
        labels = voice.get("labels") or {}
        accent = labels.get("accent") or labels.get("language") or ""
        suffix = f" [{accent}]" if accent else ""
        print(f"{voice_id}\t{name}\t{category}{suffix}")
    return 0


def main() -> int:
    load_dotenv(DOTENV_PATH)
    args = parse_args()
    if args.list_voices:
        api_key = require_api_key()
        return list_voices(api_key, args.search)

    if not args.manifest:
        raise SystemExit("A manifest path is required unless --list-voices is used.")

    manifest_path = args.manifest.resolve()
    manifest = load_manifest(manifest_path)
    lesson_root = manifest_path.parent.resolve()
    voice_defaults = manifest.get("voice") or {}
    profiles = get_profiles(manifest)
    segments = manifest["segments"]
    pronunciation_rules = load_pronunciation_rules(PRONUNCIATIONS_PATH)
    api_key = None if args.dry_run else require_api_key()

    if pronunciation_rules:
        print(
            "pronunciation rules "
            f"loaded={len(pronunciation_rules)} source={PRONUNCIATIONS_PATH.relative_to(REPO_ROOT)}"
        )

    if args.profile:
        requested_profiles = set(args.profile)
        profiles = [profile for profile in profiles if profile["id"] in requested_profiles]
        if not profiles:
            raise SystemExit(
                f"No matching profiles found for: {', '.join(sorted(requested_profiles))}"
            )

    generated = 0
    skipped = 0
    total_chars = 0
    resolved_segment_texts: list[str] = []
    segment_replacement_counts: list[int] = []

    for segment in segments:
        resolved_text, replacement_count = apply_pronunciation_rules(
            segment["text"].strip(), pronunciation_rules
        )
        resolved_segment_texts.append(resolved_text)
        segment_replacement_counts.append(replacement_count)

    for profile in profiles:
        for index, segment in enumerate(segments):
            relative_file = resolve_segment_file(segment, profile["id"])
            output_path = (lesson_root / relative_file).resolve()
            if output_path.exists() and not args.force:
                print(f"skip  {output_path.relative_to(lesson_root)}")
                skipped += 1
                continue

            voice_id = resolve_voice_id(voice_defaults, profile, args.voice_id)
            model_id = (
                args.model_id
                or segment.get("model_id")
                or profile.get("model_id")
                or voice_defaults["model_id"]
            )
            output_format = (
                segment.get("output_format")
                or profile.get("output_format")
                or voice_defaults.get("output_format", "mp3_44100_128")
            )
            seed = segment.get("seed")
            if seed is None:
                seed = profile.get("seed", voice_defaults.get("seed"))
            language_code = (
                segment.get("language_code")
                or profile.get("language_code")
                or voice_defaults.get("language_code")
            )
            enable_logging = segment.get("enable_logging")
            if enable_logging is None:
                enable_logging = profile.get(
                    "enable_logging", voice_defaults.get("enable_logging", False)
                )
            voice_settings = (
                segment.get("voice_settings")
                or profile.get("voice_settings")
                or voice_defaults.get("voice_settings")
            )
            include_context = segment.get("include_context_text")
            if include_context is None:
                include_context = profile.get(
                    "include_context_text",
                    voice_defaults.get("include_context_text", True),
                )

            payload: dict[str, Any] = {
                "text": resolved_segment_texts[index],
                "model_id": model_id,
                "output_format": output_format,
            }
            if seed is not None:
                payload["seed"] = int(seed)
            if language_code:
                payload["language_code"] = language_code
            if voice_settings:
                payload["voice_settings"] = voice_settings

            if include_context:
                previous_text = resolved_segment_texts[index - 1] if index > 0 else None
                next_text = (
                    resolved_segment_texts[index + 1]
                    if index + 1 < len(segments)
                    else None
                )
                if previous_text:
                    payload["previous_text"] = previous_text
                if next_text:
                    payload["next_text"] = next_text

            query = urllib.parse.urlencode(
                {"enable_logging": str(bool(enable_logging)).lower()}
            )
            url = f"{API_BASE}/v1/text-to-speech/{voice_id}?{query}"

            build_line = f"build {output_path.relative_to(lesson_root)}"
            if segment_replacement_counts[index] > 0:
                build_line += f" [pronunciation rules: {segment_replacement_counts[index]}]"
            print(build_line)
            if args.dry_run:
                generated += 1
                total_chars += len(payload["text"])
                continue

            audio_bytes, headers = fetch_audio(url, api_key, payload)
            output_path.parent.mkdir(parents=True, exist_ok=True)
            output_path.write_bytes(audio_bytes)

            generated += 1
            header_char_count = headers.get("x-character-count")
            total_chars += int(header_char_count or len(payload["text"]))

    print(
        f"done  generated={generated} skipped={skipped} chars={total_chars} "
        f"manifest={manifest_path.relative_to(Path.cwd()) if is_relative_to(manifest_path, Path.cwd()) else manifest_path}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
