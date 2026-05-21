# OpenRecovery Presentations — AI Handoff Docs

This folder is the shared memory for creating consistent Reveal.js HTML5 lesson decks for the OpenRecovery LMS.

## Read Order For Any New AI Session

1. `PROJECT_CONTEXT.md`
2. `PRESENTATION_CONSISTENCY_REQUIREMENTS.md`
3. `STYLE_GUIDE.md`
4. `OPENRECOVERY_IMAGE_CREATION_GUIDE.md`
5. `ELEVENLABS_VOICEOVER_WORKFLOW.md`
6. `SLIDE_TEMPLATES.md`
7. `CURRENT_TASK.md`
8. `DECISIONS.md`
9. `SESSION_LOG.md`
10. `QA_CHECKLIST.md`

## Files

- `.env.example` (repo root) — copy to `.env` for local ElevenLabs API key and default voice ids; `.env` is gitignored
- `shared-runtime/lesson-runtime.js` — shared narrated-lesson runtime for Reveal initialization, compact slide navigation, and narration playback UI
- `shared-styles/lesson-runtime.css` — shared narrated-lesson chrome styles used across decks
- `voiceover_pronunciations.json` — repo-level spoken-form replacements that the ElevenLabs generator applies automatically at render time
- `PROJECT_CONTEXT.md` — repo, LMS use case, current prototype
- `STYLE_GUIDE.md` — colors, fonts, layouts, transitions, arrows, Reveal settings
- `OPENRECOVERY_IMAGE_CREATION_GUIDE.md` — consistent image-generation rules for lesson decks, including the default image style, `3–5` image expectation, prompt format, and asset workflow
- `ELEVENLABS_VOICEOVER_WORKFLOW.md` — setup and generation workflow for pre-rendered lesson narration using ElevenLabs
- `reference-assets/modern-human-collage-reference.png` — canonical visual reference for the approved OpenRecovery image style
- `PRESENTATION_CONSISTENCY_REQUIREMENTS.md` — self-contained go/no-go requirements for matching the OpenRecovery lesson deck system
- `SLIDE_TEMPLATES.md` — reusable slide layout and composition patterns
- `AI_DECK_GENERATION_PROMPT.md` — copy/paste prompt for the next lesson deck
- `NEW_LESSON_DECK_PROMPT.md` — ready-to-paste prompt for creating a new deck from a local doc, Google Doc, or pasted source content
- `QA_CHECKLIST.md` — checklist before sharing a deck
- `CURRENT_TASK.md` — active work
- `DECISIONS.md` — durable choices
- `SESSION_LOG.md` — short chronological work log
- `STARTUP_PROMPT.md` — prompt for starting a new AI session
- `END_OF_SESSION_PROMPT.md` — prompt for wrapping up a session

## Minimum Update Rules

- Update `CURRENT_TASK.md` when the active course/lesson changes.
- Append to `SESSION_LOG.md` after meaningful work.
- Update `DECISIONS.md` when a durable design or implementation choice is made.
- Run `QA_CHECKLIST.md` before pushing or sharing a deck.
