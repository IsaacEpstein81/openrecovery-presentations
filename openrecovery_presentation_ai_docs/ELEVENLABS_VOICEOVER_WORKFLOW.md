# ElevenLabs Voiceover Workflow

Use this workflow when a lesson deck should ship with pre-generated narration audio rendered by ElevenLabs.

## Goal

Keep narration production deterministic and production-ready:

- AI writes the hidden narration script
- ElevenLabs renders audio ahead of time
- Reveal.js plays those local files during the lesson
- the hidden narration follows the visible slide content and reveal order closely enough that guided playback feels intentional

This keeps learner playback fast and consistent while avoiding browser-side API calls.

## Lesson Artifact Pattern

Each lesson that uses narration should include:

```text
presentations/course-name/lesson-name/
├── index.html
├── IMAGE_PROMPTS.md
├── voiceover.json
├── voiceover/
│   ├── female/
│   │   ├── 01-lesson-title.mp3
│   │   ├── 02-learning-goals.mp3
│   │   └── ...
│   ├── male/
│   │   ├── 01-lesson-title.mp3
│   │   ├── 02-learning-goals.mp3
│   │   └── ...
│   └── ...
└── assets/
```

`voiceover.json` is the source of truth for the narration script.

When a lesson uses the standard narrated OpenRecovery deck chrome, the lesson HTML should usually load `../../../shared-runtime/lesson-runtime.js`, which reads `voiceover.json` and renders the shared narration controls / profile selector.

## Shared Pronunciation Rules

Use the repo-level file `openrecovery_presentation_ai_docs/voiceover_pronunciations.json` for recurring spoken-form fixes that should apply across lessons.

- Keep visible slide copy normal.
- Keep `voiceover.json` readable unless a lesson truly needs a one-off spoken rewrite.
- Put repeated acronym, program-name, and pronunciation fixes in the shared rules file so they only need to be maintained once.

Current rule shape:

```json
{
  "version": 1,
  "rules": [
    {
      "match": "HIPAA",
      "replace": "HIP-uh",
      "whole_word": true,
      "case_sensitive": true
    }
  ]
}
```

Notes:

- `match` is the original text to find in narration.
- `replace` is the spoken-form text that should be sent to ElevenLabs.
- `whole_word` should usually stay `true` for acronyms and short terms.
- `case_sensitive` should usually stay `true` unless you truly want every casing variant replaced.

Use the shared file for durable repo-wide fixes. Use a direct narration rewrite inside a lesson manifest only when the change is lesson-specific or intentionally different from the default spoken form.

## Manifest Shape

Use this structure:

```json
{
  "version": 1,
  "provider": "elevenlabs",
  "default_profile_id": "female",
  "voice": {
    "model_id": "eleven_multilingual_v2",
    "output_format": "mp3_44100_128",
    "seed": 42,
    "enable_logging": false
  },
  "profiles": [
    {
      "id": "female",
      "label": "Female Voice",
      "voice_id_env": "ELEVENLABS_VOICE_ID_FEMALE"
    },
    {
      "id": "male",
      "label": "Male Voice",
      "voice_id_env": "ELEVENLABS_VOICE_ID_MALE"
    }
  ],
  "segments": [
    {
      "slide_id": "learning-goals",
      "trigger": "slide-enter",
      "file_template": "voiceover/{profile_id}/02-learning-goals.mp3",
      "text": "By the end of this lesson..."
    }
  ]
}
```

Rules:

- `slide_id` should match the `<section id="...">` in the deck HTML.
- `trigger` should usually be `slide-enter`.
- Use `fragment-0`, `fragment-1`, and so on only when a fragment needs its own narration cue.
- Write narration from the actual slide content, not as a separate essay about the topic.
- If a slide uses fragments and keeps a single `slide-enter` cue, write that cue so it follows the same concept order the fragments reveal on screen.
- Use fragment-level cues only when the timing needs to be tighter than one guided `slide-enter` track can support.
- Use `profiles` for the production voice choices that should be available in the browser.
- Keep `file_template` relative to the lesson folder so the browser can play it directly after replacing `{profile_id}`.
- Use `mp3_44100_128` as the default output format unless the tech team prefers another format.
- Keep `enable_logging` set to `false` by default for lower-retention render requests.
- Set `default_profile_id` to the voice that should be preselected when the lesson opens.

## Manual Setup

Preferred one-time setup:

1. Create an ElevenLabs API key.
2. Choose one female-presenting voice and one male-presenting voice.
3. Find both `voice_id` values.
4. Copy `.env.example` to `.env` in the repo root.
5. Fill in these values in `.env`:

```dotenv
ELEVENLABS_API_KEY="your_api_key_here"
ELEVENLABS_VOICE_ID_FEMALE="your_female_voice_id_here"
ELEVENLABS_VOICE_ID_MALE="your_male_voice_id_here"
```

The generator automatically loads the repo-root `.env`, so you do not need to re-export those values in every shell session.

If you prefer temporary shell exports instead of `.env`, this also works:

```bash
export ELEVENLABS_API_KEY="your_api_key_here"
export ELEVENLABS_VOICE_ID_FEMALE="your_female_voice_id_here"
export ELEVENLABS_VOICE_ID_MALE="your_male_voice_id_here"
```

If you want to inspect available voices through the API after setting the key:

```bash
python3 scripts/generate_elevenlabs_voiceover.py --list-voices
```

## Generate Audio Files

From the repo root:

```bash
python3 scripts/generate_elevenlabs_voiceover.py \
  presentations/sexual-harassment-in-treatment-settings/lesson-01-what-employees-need-to-know/voiceover.json
```

That command renders every declared profile, so the current lesson will create both:

- `voiceover/female/*.mp3`
- `voiceover/male/*.mp3`

The generator also auto-loads:

- the repo-root `.env`
- `openrecovery_presentation_ai_docs/voiceover_pronunciations.json`

That means recurring fixes like `HIPAA -> HIP-uh` do not need to be rewritten separately in every lesson before rendering.

To render only one profile:

```bash
python3 scripts/generate_elevenlabs_voiceover.py \
  presentations/sexual-harassment-in-treatment-settings/lesson-01-what-employees-need-to-know/voiceover.json \
  --profile female
```

To overwrite existing audio after script edits:

```bash
python3 scripts/generate_elevenlabs_voiceover.py \
  presentations/sexual-harassment-in-treatment-settings/lesson-01-what-employees-need-to-know/voiceover.json \
  --force
```

## Future AI Workflow

When building a new lesson deck, the AI should:

1. Create the lesson `index.html`.
2. Add stable `id` values to each `<section>` that needs narration.
3. Create `voiceover.json` in the lesson folder.
4. Write one narration segment per slide by default, using the visible slide content as the source material.
5. When a slide reveals fragments, write the `slide-enter` narration so it follows the fragment order unless the slide truly needs separate fragment cues.
6. Add repeated pronunciation fixes to `openrecovery_presentation_ai_docs/voiceover_pronunciations.json` instead of scattering phonetic respellings across multiple lesson manifests.
7. Add fragment-level narration only when step-by-step coaching or tighter timing is genuinely helpful.
8. Define two browser-selectable voice profiles by default unless the user asks for only one voice.
9. Render local audio files with `scripts/generate_elevenlabs_voiceover.py` when the user has configured `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID_FEMALE`, and `ELEVENLABS_VOICE_ID_MALE`, preferably in the repo-root `.env`.
10. Save the rendered audio files in the lesson `voiceover/` folder.
11. Wire the deck's playback controls to those local audio files through the shared lesson runtime when the standard deck chrome fits, and expose the profile selector in the lesson UI.

## Current Lesson Command

Current lesson manifest:

`presentations/sexual-harassment-in-treatment-settings/lesson-01-what-employees-need-to-know/voiceover.json`

Current render command:

```bash
python3 scripts/generate_elevenlabs_voiceover.py \
  presentations/sexual-harassment-in-treatment-settings/lesson-01-what-employees-need-to-know/voiceover.json
```
