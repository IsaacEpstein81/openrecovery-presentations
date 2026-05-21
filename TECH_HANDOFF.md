# OpenRecovery Tech Handoff

This repo is a working prototype and reference implementation for OpenRecovery LMS lesson presentations.

The main value of the repo is not the root Vercel preview shell. The main value is the lesson artifact contract, the shared deck design system, and the narration workflow.

## Recommended Handoff

- Move or mirror the repo into a company-controlled GitHub org.
- Give the tech team normal repo access, not access to a personal GitHub account.
- Share this file plus the primary docs listed below.
- Do one short walkthrough or screen recording covering repo structure, one lesson folder, and the narration flow.

## What This Repo Proves

- OpenRecovery lessons can be delivered as lightweight Reveal.js HTML5 decks.
- The lesson system can stay visually consistent through shared CSS and a shared lesson runtime.
- Lessons can ship with pre-rendered narration audio instead of browser speech synthesis.
- AI can generate lesson artifacts, but the artifact shape itself is not tied to Codex.

## What Is Production-Worthy

- Raw Reveal.js lesson deck format with `<section>` slides
- Shared deck design system in `shared-styles/master.css`
- Shared narrated-lesson runtime in `shared-styles/lesson-runtime.css` and `shared-runtime/lesson-runtime.js`
- Lesson folder artifact shape under `presentations/`
- `voiceover.json` manifest plus pre-rendered local MP3s
- ElevenLabs render script and shared pronunciation rules workflow

## What Is Prototype-Only

- Root `index.html` LMS preview shell
- Current Vercel deployment shape
- Sidebar/topbar/assistant-panel wrapper around the iframe
- AI session-management files such as `CURRENT_TASK.md`, `SESSION_LOG.md`, `STARTUP_PROMPT.md`, and `END_OF_SESSION_PROMPT.md`

The tech team can replace the root shell entirely without changing the core lesson system.

## Read These First

Primary engineering docs:

- `openrecovery_presentation_ai_docs/PROJECT_CONTEXT.md`
- `openrecovery_presentation_ai_docs/PRESENTATION_CONSISTENCY_REQUIREMENTS.md`
- `openrecovery_presentation_ai_docs/OPENRECOVERY_IMAGE_CREATION_GUIDE.md`
- `openrecovery_presentation_ai_docs/ELEVENLABS_VOICEOVER_WORKFLOW.md`
- `openrecovery_presentation_ai_docs/DECISIONS.md`

Useful but lower-priority AI workflow docs:

- `openrecovery_presentation_ai_docs/AI_DECK_GENERATION_PROMPT.md`
- `openrecovery_presentation_ai_docs/NEW_LESSON_DECK_PROMPT.md`
- `openrecovery_presentation_ai_docs/QA_CHECKLIST.md`
- `openrecovery_presentation_ai_docs/CURRENT_TASK.md`
- `openrecovery_presentation_ai_docs/SESSION_LOG.md`

## Current Repo Shape

```text
openrecovery-presentations/
├── index.html
├── core-assets/
│   └── dist/
├── shared-runtime/
│   └── lesson-runtime.js
├── shared-styles/
│   ├── lesson-runtime.css
│   └── master.css
├── scripts/
│   └── generate_elevenlabs_voiceover.py
├── presentations/
│   └── course-name/
│       └── lesson-name/
│           ├── index.html
│           ├── IMAGE_PROMPTS.md
│           ├── voiceover.json
│           ├── assets/
│           └── voiceover/
└── openrecovery_presentation_ai_docs/
```

## Lesson Artifact Contract

Each lesson is intended to be a mostly self-contained deployable unit:

- `index.html`: lesson content and slide structure
- `IMAGE_PROMPTS.md`: image-planning artifact for the lesson
- `voiceover.json`: narration manifest for the lesson
- `assets/`: lesson-specific images and media
- `voiceover/`: pre-rendered local narration audio files

The lesson-specific content lives in the lesson folder.
The reusable behavior lives in the shared files.

## Shared Files vs Lesson-Specific Files

Shared across lessons:

- `shared-styles/master.css`
- `shared-styles/lesson-runtime.css`
- `shared-runtime/lesson-runtime.js`
- `scripts/generate_elevenlabs_voiceover.py`
- `openrecovery_presentation_ai_docs/voiceover_pronunciations.json`

Lesson-specific:

- `presentations/.../index.html`
- `presentations/.../IMAGE_PROMPTS.md`
- `presentations/.../voiceover.json`
- `presentations/.../assets/*`
- `presentations/.../voiceover/*`

## How A Lesson Works

At runtime, a lesson HTML file:

1. Loads Reveal.js from `core-assets/dist/`
2. Loads shared deck styling from `shared-styles/master.css`
3. Loads shared narrated-lesson chrome from `shared-styles/lesson-runtime.css`
4. Loads `shared-runtime/lesson-runtime.js`
5. Calls `window.OpenRecoveryLessonRuntime.init()`
6. Lets the shared runtime read `voiceover.json` and wire up the compact slide navigator and narration controls

The lesson HTML should focus on slide content, layout, and lesson-specific media, not on duplicating common app logic.

## Narration System

- Narration source of truth is `voiceover.json`
- Audio output goes to `voiceover/{profile_id}/*.mp3`
- The shared runtime swaps `{profile_id}` in each `file_template`
- The render script reads:
  - repo-root `.env`
  - `openrecovery_presentation_ai_docs/voiceover_pronunciations.json`

Required env vars are documented in `.env.example`:

- `ELEVENLABS_API_KEY` (This is Isaac's personal Elevenlabs key.  Maybe we need an OpenRecovery one)
- `ELEVENLABS_VOICE_ID_FEMALE`
- `ELEVENLABS_VOICE_ID_MALE`

## Local Preview Notes

- The root `index.html` is only a prototype shell.
- For real lesson QA, opening the lesson directly is more representative than using the shell.
- Narrated lessons should usually be served over HTTP during QA because the shared runtime fetches `voiceover.json`; `file://` may fail depending on browser restrictions.

## What The Tech Team Can Safely Change

- Replace the root preview shell
- Replace Vercel hosting
- Move Reveal.js delivery to npm/build tooling instead of vendored assets
- Move lessons and assets to object storage or backend-managed paths
- Replace AI generation workflow and prompts

## What The Tech Team Should Preserve Unless They Intend To Redesign The System

- The lesson artifact contract
- Shared design system and OpenRecovery visual language
- Stable slide `id` values for narrated slides
- Pre-rendered narration approach
- Shared narration/runtime behavior, unless replaced with a deliberate equivalent

## Recommended First Engineering Decisions

1. Decide whether lesson folders remain deployable static artifacts or become intermediate build outputs.
2. Decide where lesson assets and narration files will live in production.
3. Decide whether to keep vendored Reveal assets or move them into a package-managed build.
4. Decide whether backend generation should output final lesson folders directly or output structured lesson JSON first.
5. Decide whether the current narrated runtime should stay as shared static files or be reimplemented inside the LMS frontend.

## Suggested Walkthrough Agenda

1. Open one lesson folder and show what is lesson-specific.
2. Open `shared-styles/master.css`, `shared-styles/lesson-runtime.css`, and `shared-runtime/lesson-runtime.js`.
3. Open `voiceover.json` and `scripts/generate_elevenlabs_voiceover.py`.
4. Explain which docs are durable standards versus AI workflow memory.
5. Explain that the root shell is disposable.

## Current Reference Lessons

- `presentations/sexual-harassment-in-treatment-settings/lesson-01-what-employees-need-to-know/`
- `presentations/hipaa-basics-for-clinical-practice/lesson-01-hipaa-basics-for-clinical-practice/`

These are the best examples of the current lesson contract in practice.
