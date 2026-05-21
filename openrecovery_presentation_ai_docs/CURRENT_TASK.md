# Current Task

Last updated: 2026-05-21

## Active Focus

The HIPAA lesson build, refreshed dual-voice audio pack, and shared pronunciation workflow are in place. The next step is manual browser QA to confirm narrated playback, voice switching, image placement, and framed-view readability before deciding whether to promote HIPAA into the root preview flow or keep the sexual-harassment lesson as the default preview lesson.

## Current Lesson Build

- Course: HIPAA Basics for Clinical Practice
- Lesson: 1 HIPAA Basics for Clinical Practice
- Format: Reveal.js HTML5
- Source: `Content/course_content_HIPAA_basics_for_clinical_practice.docx`
- Target file: `presentations/hipaa-basics-for-clinical-practice/lesson-01-hipaa-basics-for-clinical-practice/index.html`
- Related lesson assets: `IMAGE_PROMPTS.md`, `voiceover.json`, `assets/`, `voiceover/female/`, `voiceover/male/`
- Root preview shell still points to: `presentations/sexual-harassment-in-treatment-settings/lesson-01-what-employees-need-to-know/index.html`
- Audience: Licensed clinical providers at treatment centers
- Preview: https://openrecovery-presentations.vercel.app/
- Repo: https://github.com/IsaacEpstein81/openrecovery-presentations

## What Is Done

- Created `presentations/hipaa-basics-for-clinical-practice/lesson-01-hipaa-basics-for-clinical-practice/index.html`
- Built an 18-slide HIPAA lesson with a process-first compliance flow, 4 practical activities, a short post-test, and an official-resources slide
- Created `IMAGE_PROMPTS.md` with one shared style lock, one shared negative prompt, and a calibration-first image workflow tied to the canonical Modern Human Collage reference board
- Generated 5 lesson images and saved them into the HIPAA lesson `assets/` folder as both `.png` source copies and `.webp` deck assets
- Created `voiceover.json` with stable slide ids and one slide-enter narration segment per slide
- Revised the HIPAA narration script so each slide-enter cue follows the visible slide concepts and fragment order more closely
- Rendered both `female` and `male` ElevenLabs audio packs into the HIPAA lesson `voiceover/` folder
- Re-rendered both HIPAA voice packs after the narration rewrite so the local MP3s now match the slide-aligned script
- Added shared repo-level pronunciation-rule support so recurring spoken-form fixes like `HIPAA` can be maintained once and applied automatically during ElevenLabs renders
- Verified with a forced dry run that the shared pronunciation rules load correctly and would apply across the expected HIPAA narration files
- Confirmed the HIPAA deck has 18 narrated slides and that all 18 slide ids match the 18 narration manifest entries
- Kept the root preview shell pointed at the sexual-harassment lesson until the HIPAA deck gets an interactive browser QA pass
- Extracted the reusable lesson chrome into `shared-styles/lesson-runtime.css` and `shared-runtime/lesson-runtime.js`, then repointed both current narrated lessons to those shared files so runtime/UI changes now land once

## Added Worklist

- In progress: run the QA checklist against the HIPAA lesson in direct browser view, with special attention to narrated playback, voice switching, narration-to-fragment alignment, image placement, and framed-view readability
- In progress: confirm whether the HIPAA lesson behaves cleanly when opened directly via `file://` or whether local QA should default to a lightweight HTTP server for narrated decks
- Queued: decide whether the root `index.html` preview shell should stay on the sexual-harassment lesson or be repointed to the HIPAA lesson after QA
- Queued: decide whether to turn the current source-document pattern into a reusable SME lesson-content template for future course authors
- Queued: resume the deferred interactive QA on the sexual-harassment preview lesson and confirm the shared lesson runtime behaves the same there as it does in HIPAA
- Queued: research video ingestion and an AI video workflow; lowest current priority

## Next Best Step

Open the HIPAA lesson directly in a browser and, if needed for narrated playback, through a lightweight local HTTP server; confirm the generated images feel correct in-slide, the refreshed dual-voice narration now tracks the slide reveals cleanly, obvious acronym pronunciations sound right, and the slide dock does not block framed-view content, then decide whether to promote the HIPAA lesson into the root preview shell or keep it as a secondary lesson.
