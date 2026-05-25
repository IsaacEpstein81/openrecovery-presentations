# Current Task

Last updated: 2026-05-24

## Active Focus

The active lesson build has shifted to the second Mental Health First Aid lesson, `Mental Health First Aid for Crisis Situations`. The new narrated crisis-response deck, image set, and dual-voice audio pack are now in place; the immediate next step is direct browser QA on that lesson, especially narration timing, voice switching, and slide readability with the new five-image set.

## Current Lesson Build

- Course: Mental Health First Aid
- Lesson: 02 Mental Health First Aid for Crisis Situations
- Format: Reveal.js HTML5
- Source: `Content/National Council Demo Training Content (Deck 2).docx`
- Target file: `presentations/mental-health-first-aid/lesson-02-mental-health-first-aid-for-crisis-situations/index.html`
- Related lesson assets: `IMAGE_PROMPTS.md`, `voiceover.json`, `assets/`, `voiceover/female/`, `voiceover/male/`
- Root preview shell still points to: `presentations/sexual-harassment-in-treatment-settings/lesson-01-what-employees-need-to-know/index.html`
- Audience: Adult learners continuing Mental Health First Aid training in workplace, community, or care-adjacent settings
- Preview: https://openrecovery-presentations.vercel.app/
- Repo: https://github.com/IsaacEpstein81/openrecovery-presentations

## What Is Done

- Created `presentations/mental-health-first-aid/lesson-02-mental-health-first-aid-for-crisis-situations/index.html`
- Built a 17-slide crisis-response lesson with a workflow-first structure covering crisis recognition, de-escalation, suicide-safety response, ALGEE application, emergency resources, and practice reflection
- Created `IMAGE_PROMPTS.md` with one shared style lock, one shared negative prompt, and a calibration-first image workflow tied to the canonical Modern Human Collage reference board
- Generated 5 lesson images and saved them into the new lesson `assets/` folder as `.png` files used directly by the deck
- Created `voiceover.json` with stable slide ids and one slide-enter narration segment per slide
- Rendered both `female` and `male` ElevenLabs audio packs into the lesson `voiceover/` folder
- Confirmed the crisis-situations deck has 17 narrated slides and that all 17 slide ids match the 17 narration manifest entries
- Updated the crisis resources slide to use current official links for the 988 Lifeline, Crisis Text Line, and the Mental Health First Aid adults page
- Updated the shared narrated-lesson runtime to support an inline voiceover-manifest fallback so direct `file://` preview does not leave the narration launcher disabled when `fetch("voiceover.json")` is blocked
- Added that inline manifest fallback to the new Mental Health First Aid crisis-situations lesson so the audio launcher can work in direct local preview as well as standard served preview
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
- Created root-level `TECH_HANDOFF.md` and pointed `README.md` to it so the tech team has one engineer-facing entry point into the repo
- Confirmed the repo is pushed and clean so the shared GitHub link is ready to send to the tech team for their architecture discussion

## Added Worklist

- In progress: run the QA checklist against the Mental Health First Aid crisis-situations lesson in direct browser view, with special attention to narrated playback, voice switching, narration-to-slide alignment, image placement, and framed-view readability
- Queued: decide whether to roll the new inline voiceover-manifest fallback into the older narrated lessons so all current direct-file previews behave the same way
- Queued: compare the new crisis-situations lesson against lesson 1 of the same course and trim any slide that still feels denser or more repetitive than it needs to be
- Queued: confirm the updated official resource links behave cleanly in direct browser view and inside the framed LMS preview
- Queued: decide whether the new Mental Health First Aid lesson should stay as a secondary lesson or be promoted into the root preview flow after QA
- In progress: have the tech team review `TECH_HANDOFF.md` and decide whether the generation pipeline should stay local, move to a backend worker, or use a hybrid handoff path
- In progress: define how real OpenAI/ElevenLabs secrets will be handed off securely using `.env.example` as the template and an out-of-band channel for the actual values
- Queued: run the QA checklist against the HIPAA lesson in direct browser view, with special attention to narrated playback, voice switching, narration-to-fragment alignment, image placement, and framed-view readability
- Queued: confirm whether narrated lessons should be QA'd directly via `file://` or whether local QA should default to a lightweight HTTP server for more reliable audio behavior
- Queued: decide whether the root `index.html` preview shell should stay on the sexual-harassment lesson or be repointed to one of the newer narrated lessons after QA
- Queued: decide whether to turn the current source-document pattern into a reusable SME lesson-content template for future course authors
- Queued: resume the deferred interactive QA on the sexual-harassment preview lesson and confirm the shared lesson runtime behaves the same there as it does in HIPAA
- Queued: research video ingestion and an AI video workflow; lowest current priority

## Next Best Step

Open the Mental Health First Aid crisis-situations lesson directly in a browser, confirm the generated images feel correct in-slide, the dual-voice narration tracks the slide flow cleanly, the runtime controls behave well in framed view, and the updated official resource links open correctly both directly and from the framed preview, then decide whether to add the lesson to the root preview flow while the separate tech-team architecture review of `TECH_HANDOFF.md` continues.
