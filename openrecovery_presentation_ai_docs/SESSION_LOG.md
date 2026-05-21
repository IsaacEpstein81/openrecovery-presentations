# Session Log

Use short entries. This is not a diary.

Suggested format:

```text
## YYYY-MM-DD HH:MM
- worked on:
- changed:
- next:
- blockers:
```

## 2026-05-18

- worked on: OpenRecovery Reveal.js prototype and future AI documentation
- changed: created first lesson deck for Understanding Professional Boundaries; established shared CSS pattern; built LMS-style preview page; added fullscreen prototype behavior; created AI handoff docs
- next: generate lesson 1.2 using `AI_DECK_GENERATION_PROMPT.md` and compare against lesson 1.1 for consistency
- blockers: production embedding approach depends on CTO/tech team preference

## 2026-05-19 09:38

- worked on: reusable deck system consistency for future lesson generation
- changed: added shared media/image utility styles in `shared-styles/master.css`; revised prompt docs with a stricter generation template; toned prototype and style-guide transitions down to `slide` + `fade`; expanded active worklist with image, audio, and video follow-ups
- next: feed actual lesson 1.2 source content into the revised prompt and generate the next lesson deck using the updated shared system
- blockers: lesson 1.2 source content is not in the repo yet, so the next real deck cannot be authored faithfully without it

## 2026-05-19 09:55

- worked on: documentation for preserving prototype-level presentation consistency across future lessons
- changed: created `PRESENTATION_CONSISTENCY_REQUIREMENTS.md` to define the visual, structural, motion, media, and authoring requirements for matching lesson 1.1; added the new document to the docs index
- next: use the new consistency doc together with the structured generation prompt when building the next three lesson decks
- blockers: none

## 2026-05-19 10:04

- worked on: refining the consistency spec into a self-contained standard
- changed: removed dependence on the prior lesson HTML as an ongoing reference; clarified that the consistency document itself is the source of truth; separated lesson deck requirements from dashboard-shell concerns like fullscreen controls, wrappers, and hosting details
- next: use the revised consistency spec as the direct standard when generating the next three lesson decks
- blockers: none

## 2026-05-19 10:19

- worked on: making the new-deck workflow easier to reuse in future AI sessions
- changed: updated `AI_DECK_GENERATION_PROMPT.md` with a required doc read order and a copy/paste fresh-session prompt; updated `STARTUP_PROMPT.md` and `README.md` to include `PRESENTATION_CONSISTENCY_REQUIREMENTS.md`; recorded the prompt workflow decision
- next: use the revised AI deck generation prompt as the default starting point when creating each new lesson HTML file
- blockers: none

## 2026-05-19 10:25

- worked on: aligning the prompt workflow with the actual source-document handoff process
- changed: updated `AI_DECK_GENERATION_PROMPT.md` and `STARTUP_PROMPT.md` so future sessions can take a local `.docx` path, Google Doc link, or pasted content and infer lesson metadata from the source instead of requiring a manual lesson-input form; recorded the decision in `DECISIONS.md`
- next: generate the next lesson decks from provided source documents or links with minimal manual metadata entry
- blockers: none

## 2026-05-19 10:33

- worked on: creating a dedicated reusable prompt file for new lesson creation
- changed: added `NEW_LESSON_DECK_PROMPT.md` with a copy/paste prompt for source-document-based deck generation; linked it from `README.md` and `AI_DECK_GENERATION_PROMPT.md`
- next: use `NEW_LESSON_DECK_PROMPT.md` as the quickest starting point for each new lesson deck
- blockers: none

## 2026-05-19 10:36

- worked on: making the new-lesson workflow explicit about repo folder creation
- changed: updated the prompt docs and consistency spec so future sessions create the needed `presentations/course-name/lesson-name/` folder before writing the new deck `index.html`; recorded the workflow decision in `DECISIONS.md`
- next: use the prompt workflow to create complete lesson directories and deck files from source documents
- blockers: none

## 2026-05-19 11:02

- worked on: reducing formulaic slide sequencing in future deck generation
- changed: revised the consistency, template, and prompt docs so the OpenRecovery design system stays fixed while slide order and lesson shape are driven by the source content; added lesson archetypes and example flow options instead of a single standard lesson flow
- next: test the updated workflow on a different subject area and confirm the resulting deck varies its structure while preserving the same visual language
- blockers: none

## 2026-05-19 12:18

- worked on: refocusing `SLIDE_TEMPLATES.md` on structure instead of subject matter
- changed: rewrote `SLIDE_TEMPLATES.md` as a slide layout/composition library; removed subject-prescriptive lesson-flow content from that file; updated supporting docs so templates are treated as structural arrangements chosen after the lesson content and order are known
- next: test whether a new deck now varies its narrative flow while still reusing the OpenRecovery layout system
- blockers: none

## 2026-05-19 12:18

- worked on: integrating a consistent image-generation workflow into the deck system
- changed: created `OPENRECOVERY_IMAGE_CREATION_GUIDE.md` in the project docs; set a default OpenRecovery image style, sparse image-count expectations, and `IMAGE_PROMPTS.md` workflow; updated the main prompts and consistency docs so `NEW_LESSON_DECK_PROMPT.md` now covers image planning as part of normal lesson creation
- next: test a lesson build that includes a small number of image prompts and verify they stay visually consistent across a deck
- blockers: none

## 2026-05-19 15:34

- worked on: making image inclusion mandatory enough for the default deck workflow
- changed: replaced the old default illustration style with `Modern Human Collage`; changed the default expectation from optional `0–4` images to required `3–5` images unless the user overrides it; updated the prompt chain so normal lesson generation now creates `IMAGE_PROMPTS.md`, expects image asset generation in `assets/`, and includes those images in the deck HTML
- next: test the revised workflow on a lesson and confirm the resulting deck contains `3–5` stylistically consistent images in the slide deck itself
- blockers: none

## 2026-05-19 15:34

- worked on: reducing image-style drift by anchoring the workflow to a real visual reference
- changed: copied the approved texture board into `openrecovery_presentation_ai_docs/reference-assets/modern-human-collage-reference.png`; rewrote the image guide so the reference asset is the canonical style lock; updated the prompts and consistency docs so future sessions inspect that reference and reject flat-vector/generic-SaaS drift before finalizing lesson images
- next: test the workflow on a real lesson and verify the generated images move materially closer to the reference board
- blockers: none

## 2026-05-19 16:05

- worked on: making the image workflow behave more like a locked art-direction system instead of a loose style suggestion
- changed: updated `OPENRECOVERY_IMAGE_CREATION_GUIDE.md`, `AI_DECK_GENERATION_PROMPT.md`, and `NEW_LESSON_DECK_PROMPT.md` so future sessions must create one shared style lock prompt, one shared negative prompt, and one calibration image before generating the rest of a lesson’s `3–5` image set; recorded the new process decisions
- next: test the revised calibration workflow on the next lesson and confirm the generated images land materially closer to the approved texture board than the earlier flat/generic outputs
- blockers: none

## 2026-05-19 12:41

- worked on: generating a new source-driven compliance lesson deck from the sexual-harassment `.docx`
- changed: created `presentations/sexual-harassment-in-treatment-settings/lesson-01-what-employees-need-to-know/index.html`; built a 19-slide Reveal.js lesson with 4 activities, a short post-test, a resources page, and shared OpenRecovery styling; updated `CURRENT_TASK.md` to reflect the new active lesson build
- next: run the deck through visual QA in preview and trim any slides that feel too dense at embedded size
- blockers: none

## 2026-05-19 14:03

- worked on: generating a new source-driven compliance lesson deck from the disaster-preparedness `.docx`
- changed: created `presentations/disaster-preparedness-essentials/lesson-01-disaster-preparedness-essentials/index.html`; built a 19-slide Reveal.js lesson with 4 activities, a short post-test, a resources page, and shared OpenRecovery styling; updated `CURRENT_TASK.md` to reflect the new active lesson build
- next: run the deck through visual QA in preview and trim any slides that feel dense at embedded size, especially the four-card process slides
- blockers: local visual preview was not fully verified in-tool, so final density checks still need an interactive browser pass

## 2026-05-20 08:00

- worked on: stabilizing the sexual-harassment lesson as the root LMS preview lesson and fixing embedded-versus-fullscreen mismatches
- changed: repointed root `index.html` to `presentations/sexual-harassment-in-treatment-settings/lesson-01-what-employees-need-to-know/index.html`; updated deck sizing to `1440x810` with `margin: 0.04`; tightened shared text/card spacing; fixed slide 7 two-column overlap and final-takeaway width drift in iframe view; opened resources links in new tabs; added click-to-advance and a compact slide navigator; used versioned iframe and stylesheet URLs to break stale embedded caches during iteration
- next: run side-by-side QA on the direct lesson and root preview shell, then decide whether the slide navigator should move into the shared reusable system
- blockers: embedded preview can lag behind direct lesson changes unless the lesson URL and shared stylesheet are cache-busted during active iteration

## 2026-05-20 11:15

- worked on: production voiceover support for narrated Reveal.js lessons
- changed: added an ElevenLabs voiceover generator script; added `voiceover.json` plus audio-output scaffolding for the sexual-harassment lesson; wired the lesson deck to local pre-generated narration files; updated the docs and prompts so future lesson-generation runs can create and render narration assets automatically
- next: configure ElevenLabs credentials locally, render the sexual-harassment narration files, and QA playback in both the direct lesson and the LMS preview shell
- blockers: actual audio generation still depends on a local ElevenLabs API key and voice id

## 2026-05-20 12:10

- worked on: expanding the ElevenLabs narration system from one fixed voice to two browser-selectable voice profiles
- changed: updated the lesson manifest to render separate `female` and `male` voice packs; upgraded the deck UI to let learners switch voices in-browser; fixed the generator's multi-profile manifest validation; updated the workflow and generation prompts so future lessons render both voice sets by default
- next: configure the two ElevenLabs voice ids locally, render both audio packs, and QA profile switching in the direct lesson and the LMS preview shell
- blockers: actual audio generation still depends on a local ElevenLabs API key plus both selected voice ids

## 2026-05-20 13:10

- worked on: final interaction polish for the narrated sexual-harassment lesson
- changed: rendered the female and male ElevenLabs MP3 packs for the lesson; refined narration controls into a compact launcher plus explicit start/stop action; added auto-collapse behavior that does not interrupt playback; added a persistent custom scroll rail to the slide navigator so macOS overlay-scrollbar behavior does not hide the list affordance
- next: run a final direct-vs-embedded QA pass, then commit and push the updated lesson, audio assets, and docs
- blockers: no technical blockers at the moment; still need one final human QA pass after the latest interaction tweaks

## 2026-05-20 15:35

- worked on: making the narrated lesson behave more like a guided video in framed view
- changed: moved the horn launcher beside the hamburger navigator, added bottom-safe slide spacing so content clears the compact dock, made slide-enter narration reveal fragments gradually and auto-advance to the next slide, and cancel that auto-advance when the learner manually takes over navigation
- next: manually QA the guided narration sequence in the direct lesson and the LMS preview shell, especially the handoff between automatic playback and manual arrow/navigation control
- blockers: interactive browser QA was intentionally deferred so the user can review the updated behavior directly

## 2026-05-20 16:05

- worked on: quick playback controls for the narrated sexual-harassment lesson
- changed: added a bottom-dock pause/resume button that appears only during an active narration session and resumes the current MP3 from its paused position instead of restarting the slide
- next: manually QA pause/resume together with guided fragments and end-of-slide auto-advance in both direct and embedded preview modes
- blockers: still need a browser pass to confirm the resumed fragment timing feels natural during real playback

## 2026-05-20 16:45

- worked on: simplifying the ElevenLabs setup for future one-prompt deck generation
- changed: added auto-loading of a repo-root `.env` file in the ElevenLabs generator, added `.env.example`, expanded `.gitignore` for local env files, and updated the prompt/workflow docs to treat `.env` as the preferred local setup path
- next: fill in `.env` once with the ElevenLabs API key and preferred female/male voice ids, then test a fresh-session new-deck run using only `NEW_LESSON_DECK_PROMPT.md`
- blockers: none

## 2026-05-20 17:20

- worked on: creating a new HIPAA lesson deck from the source `.docx`
- changed: created `presentations/hipaa-basics-for-clinical-practice/lesson-01-hipaa-basics-for-clinical-practice/` with `index.html`, `IMAGE_PROMPTS.md`, 5 generated lesson images, `voiceover.json`, and 36 rendered ElevenLabs MP3s across female/male voice packs
- next: run an interactive browser QA pass on the HIPAA lesson, then decide whether to repoint the root preview shell or leave the sexual-harassment lesson as the default preview
- blockers: in-tool interactive browser QA was not completed in this session, so final direct-browser narration verification still needs a manual pass

## 2026-05-21 09:44

- worked on: tightening HIPAA narration alignment with on-screen slide content and fragment order
- changed: rewrote the HIPAA `voiceover.json` script to follow each slide's visible concepts more closely; updated the reusable voiceover workflow, generation prompts, QA checklist, and project decisions so future decks treat slide content as the default narration source; added `.env.example` so the documented ElevenLabs setup path exists in-repo
- next: run browser QA focused on narration-to-fragment alignment, voice switching, and framed-view readability
- blockers: none

## 2026-05-21 10:31

- worked on: making ElevenLabs pronunciation fixes reusable across lessons
- changed: added repo-level pronunciation support to `scripts/generate_elevenlabs_voiceover.py`; created `openrecovery_presentation_ai_docs/voiceover_pronunciations.json` for shared spoken-form replacements; updated the voiceover workflow, deck-generation prompts, and current-task notes so repeated terms like `HIPAA` can be fixed once and applied automatically during renders; verified with a forced dry run that the HIPAA manifest picks up the shared rules across the expected narration files
- next: use the shared rules file as the default path for future pronunciation fixes before changing lesson-specific narration text, then continue the normal HIPAA QA flow
- blockers: none

## 2026-05-21 10:39

- worked on: wrapping the pronunciation workflow handoff for the next session
- changed: updated `CURRENT_TASK.md` to reflect that the audio/pronunciation work is done and that manual HIPAA QA is the next step; added a recurring pronunciation spot-check item to `QA_CHECKLIST.md`
- next: manually review the HIPAA lesson in-browser, then decide whether it should replace the current root preview lesson
- blockers: none

## 2026-05-21 11:20

- worked on: separating reusable narrated-lesson runtime code from lesson-specific presentation content
- changed: moved the duplicated lesson chrome into `shared-styles/lesson-runtime.css` and `shared-runtime/lesson-runtime.js`; updated the sexual-harassment and HIPAA lesson HTML files to consume those shared assets; revised the consistency spec, deck-generation prompts, and voiceover workflow so future decks reuse the shared runtime instead of copying that code inline
- next: run manual browser QA on both lessons to confirm the shared runtime behaves the same in direct lesson view and framed preview
- blockers: none

## 2026-05-21 12:18

- worked on: packaging the repo for tech-team handoff and clarifying the likely backend path
- changed: created `TECH_HANDOFF.md`, pointed the root `README.md` to it, clarified that prompt/templates would normally live in the backend codebase if generation moves server-side, and confirmed the repo is pushed and clean for sharing
- next: have the tech team review the handoff doc, choose between local generation, backend generation, or a hybrid setup, then resume the pending HIPAA/shared-runtime browser QA
- blockers: waiting on the tech team's architecture preference and secure secret-sharing path for real `.env` values

## 2026-05-21 12:56

- worked on: creating a new disaster-preparedness lesson deck from the source `.docx`
- changed: created `presentations/disaster-preparedness-essentials/lesson-01-disaster-preparedness-essentials/` with `index.html`, `IMAGE_PROMPTS.md`, 5 generated lesson images saved as `.png` and `.webp`, `voiceover.json`, and 38 rendered ElevenLabs MP3s across female and male voice packs
- next: run a direct browser QA pass on the disaster-preparedness lesson, then decide whether it should stay as a secondary lesson or move into the root preview flow
- blockers: interactive direct-browser QA was not completed in-tool, so final layout and playback checks still need a browser pass
