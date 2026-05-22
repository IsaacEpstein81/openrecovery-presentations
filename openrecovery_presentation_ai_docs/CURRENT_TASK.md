# Current Task

Last updated: 2026-05-21

## Active Focus

The repo is now packaged for tech-team review, and the active lesson build has shifted to Disaster Preparedness Essentials. The new narrated disaster-preparedness deck, lesson image set, and dual-voice audio pack are now in place; the immediate next step is direct browser QA on that lesson while the broader tech-team architecture review of `TECH_HANDOFF.md` continues in parallel.

## Current Lesson Build

- Course: Disaster Preparedness Essentials
- Lesson: 1 Disaster Preparedness Essentials
- Format: Reveal.js HTML5
- Source: `Content/course_content_disaster_preparedness_essentials.docx`
- Target file: `presentations/disaster-preparedness-essentials/lesson-01-disaster-preparedness-essentials/index.html`
- Related lesson assets: `IMAGE_PROMPTS.md`, `voiceover.json`, `assets/`, `voiceover/female/`, `voiceover/male/`
- Root preview shell still points to: `presentations/sexual-harassment-in-treatment-settings/lesson-01-what-employees-need-to-know/index.html`
- Audience: Licensed clinical providers at treatment centers
- Preview: https://openrecovery-presentations.vercel.app/
- Repo: https://github.com/IsaacEpstein81/openrecovery-presentations

## What Is Done

- Created `presentations/disaster-preparedness-essentials/lesson-01-disaster-preparedness-essentials/index.html`
- Built a 19-slide disaster-preparedness lesson with a process-first emergency-readiness flow, 4 practical activities, a short post-test, and an official-resources slide
- Refreshed the disaster-preparedness resources slide to use current official source URLs instead of relying on older source-document links that had moved
- Created `IMAGE_PROMPTS.md` with one shared style lock, one shared negative prompt, and a calibration-first image workflow tied to the canonical Modern Human Collage reference board
- Generated 5 lesson images and saved them into the disaster-preparedness lesson `assets/` folder as both `.png` source copies and `.webp` deck assets
- Created `voiceover.json` with stable slide ids and one slide-enter narration segment per slide
- Rendered both `female` and `male` ElevenLabs audio packs into the disaster-preparedness lesson `voiceover/` folder
- Confirmed the disaster-preparedness deck has 19 narrated slides and that all 19 slide ids match the 19 narration manifest entries
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

- In progress: run the QA checklist against the disaster-preparedness lesson in direct browser view, with special attention to narrated playback, voice switching, narration-to-slide alignment, image placement, and framed-view readability
- Queued: confirm the refreshed official resource links behave cleanly in direct browser view and inside the framed LMS preview
- Queued: decide whether the disaster-preparedness lesson should stay as a secondary lesson or be promoted into the root preview flow after QA
- In progress: have the tech team review `TECH_HANDOFF.md` and decide whether the generation pipeline should stay local, move to a backend worker, or use a hybrid handoff path
- In progress: define how real OpenAI/ElevenLabs secrets will be handed off securely using `.env.example` as the template and an out-of-band channel for the actual values
- Queued: run the QA checklist against the HIPAA lesson in direct browser view, with special attention to narrated playback, voice switching, narration-to-fragment alignment, image placement, and framed-view readability
- Queued: confirm whether the HIPAA lesson behaves cleanly when opened directly via `file://` or whether local QA should default to a lightweight HTTP server for narrated decks
- Queued: decide whether the root `index.html` preview shell should stay on the sexual-harassment lesson or be repointed to the HIPAA lesson after QA
- Queued: decide whether to turn the current source-document pattern into a reusable SME lesson-content template for future course authors
- Queued: resume the deferred interactive QA on the sexual-harassment preview lesson and confirm the shared lesson runtime behaves the same there as it does in HIPAA
- Queued: research video ingestion and an AI video workflow; lowest current priority

## Next Best Step

Open the disaster-preparedness lesson directly in a browser, confirm the generated images feel correct in-slide, the dual-voice narration tracks the slide flow cleanly, the runtime controls behave well in framed view, and the refreshed official resource links open correctly both directly and from the framed preview, then decide whether to add the lesson to the root preview flow while the separate tech-team architecture review of `TECH_HANDOFF.md` continues.
