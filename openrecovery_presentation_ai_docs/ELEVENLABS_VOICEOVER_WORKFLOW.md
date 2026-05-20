# ElevenLabs Voiceover Workflow

Use this workflow when a lesson deck should ship with pre-generated narration audio rendered by ElevenLabs.

## Goal

Keep narration production deterministic and production-ready:

- AI writes the hidden narration script
- ElevenLabs renders audio ahead of time
- Reveal.js plays those local files during the lesson

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
- Use `profiles` for the production voice choices that should be available in the browser.
- Keep `file_template` relative to the lesson folder so the browser can play it directly after replacing `{profile_id}`.
- Use `mp3_44100_128` as the default output format unless the tech team prefers another format.
- Keep `enable_logging` set to `false` by default for lower-retention render requests.
- Set `default_profile_id` to the voice that should be preselected when the lesson opens.

## Manual Setup

1. Create an ElevenLabs API key.
2. Choose one female-presenting voice and one male-presenting voice.
3. Find both `voice_id` values.
4. Export these environment variables in your shell:

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
4. Write one narration segment per slide by default.
5. Add fragment-level narration only when step-by-step coaching is genuinely helpful.
6. Define two browser-selectable voice profiles by default unless the user asks for only one voice.
7. Render local audio files with `scripts/generate_elevenlabs_voiceover.py` when the user has configured `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID_FEMALE`, and `ELEVENLABS_VOICE_ID_MALE`.
8. Save the rendered audio files in the lesson `voiceover/` folder.
9. Wire the deck's playback controls to those local audio files and expose the profile selector in the lesson UI.

## Current Lesson Command

Current lesson manifest:

`presentations/sexual-harassment-in-treatment-settings/lesson-01-what-employees-need-to-know/voiceover.json`

Current render command:

```bash
python3 scripts/generate_elevenlabs_voiceover.py \
  presentations/sexual-harassment-in-treatment-settings/lesson-01-what-employees-need-to-know/voiceover.json
```
