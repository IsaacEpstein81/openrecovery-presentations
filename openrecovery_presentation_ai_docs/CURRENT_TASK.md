# Current Task

Last updated: 2026-05-20

## Active Focus

Finalize the sexual-harassment lesson as the primary OpenRecovery preview lesson, including the production ElevenLabs narration workflow and the last-round interaction polish in the direct lesson and LMS-style root shell.

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
- Added an ElevenLabs-based pre-generated voiceover pipeline with `voiceover.json`, two rendered voice profiles, and browser playback wired to local lesson audio files
- Polished the narration controls into a compact launcher plus action-button pattern with auto-collapse after playback starts
- Docked the narration horn beside the slide navigator launcher and added bottom-safe slide spacing so framed-view content clears the compact control row
- Upgraded narration into guided playback that reveals fragments gradually and advances to the next slide when each slide-enter MP3 finishes unless the learner takes over manually
- Added a dock-level pause/resume control that appears only during an active narration session so learners can pause and continue the current slide audio without restarting it
- Added an always-visible custom scroll rail to the slide navigator so the list still advertises itself on macOS systems that hide overlay scrollbars until gesture

## Added Worklist

- In progress: run the QA checklist against the sexual-harassment lesson in both direct and embedded preview modes, including guided narration playback, pause/resume behavior, manual takeover behavior, and navigator interactions
- In progress: verify the rendered ElevenLabs MP3 assets behave correctly after commit/push in both local preview and deployed preview
- Queued: decide whether the slide navigator should become a shared reusable pattern in `shared-styles/master.css` instead of lesson-specific inline CSS
- Queued: decide whether the narration launcher/action pattern should become a reusable shared lesson pattern instead of staying lesson-specific
- Queued: audit the disaster-preparedness and future decks against the new embedded-preview sizing standard
- Queued: test the new reference-locked image workflow on the next lesson and confirm the calibration pass produces images closer to the approved texture board
- Queued: research video ingestion and an AI video workflow; lowest current priority

## Next Best Step

Open the sexual-harassment lesson directly and through the root preview shell side by side, confirm the guided narration flow, dock-level pause/resume behavior, manual-arrow takeover behavior, docked horn-plus-hamburger layout, voice-profile switching, and custom slide-navigator scroll rail in both views, then decide which of those interaction patterns should move into the shared system before pushing the next deck build.
