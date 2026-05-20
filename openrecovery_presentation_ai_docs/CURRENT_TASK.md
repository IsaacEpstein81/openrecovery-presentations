# Current Task

Last updated: 2026-05-20

## Active Focus

Stabilize the sexual-harassment lesson as the primary OpenRecovery preview lesson and harden embedded-versus-fullscreen behavior in the LMS-style root shell.

## Current Lesson Build

- Course: Sexual Harassment in Treatment Settings
- Lesson: 1 What Employees Need to Know
- Format: Reveal.js HTML5
- Source: `Content/course_content_sexual_harassment_what_employees_need_to_know.docx`
- Target file: `presentations/sexual-harassment-in-treatment-settings/lesson-01-what-employees-need-to-know/index.html`
- Root preview shell: `index.html`
- Audience: Licensed clinical providers at treatment centers
- Preview: https://openrecovery-presentations.vercel.app/
- Repo: https://github.com/IsaacEpstein81/openrecovery-presentations

## What Is Done

- Repointed the root `index.html` LMS preview shell to the sexual-harassment lesson
- Tightened the lesson and shared CSS so the deck reads better at embedded iframe size and fullscreen
- Updated Reveal sizing to `1440x810` with `margin: 0.04` for better embedded readability
- Fixed embedded preview problems on the sexual-harassment lesson: stale iframe/CSS cache drift, final takeaway width drift, slide 7 two-column overlap, and external resource links breaking inside the iframe
- Added click-to-advance and a compact `Jump to slide` / `Slide Navigator` control for faster lesson review

## Added Worklist

- In progress: run the QA checklist against the sexual-harassment lesson in both direct and embedded preview modes
- In progress: add an ElevenLabs-based pre-generated voiceover pipeline with browser-selectable male/female voices and test it on the sexual-harassment lesson
- Queued: decide whether the slide navigator should become a shared reusable pattern in `shared-styles/master.css` instead of lesson-specific inline CSS
- Queued: audit the disaster-preparedness and future decks against the new embedded-preview sizing standard
- Queued: test the new reference-locked image workflow on the next lesson and confirm the calibration pass produces images closer to the approved texture board
- Queued: research video ingestion and an AI video workflow; lowest current priority

## Next Best Step

Open the sexual-harassment lesson directly and through the root preview shell side by side, confirm slide 7, the resources slide, the takeaway slide, and the compact slide navigator in both views, then decide whether to promote the navigator into the shared system or keep it lesson-specific.
