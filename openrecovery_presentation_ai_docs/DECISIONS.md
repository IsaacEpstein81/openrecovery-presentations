# Decisions

## 2026-05-18

### Use Reveal.js HTML5

Decision:
Use Reveal.js HTML5 slide decks for LMS lesson presentations.

Reason:
Reveal.js provides slide navigation, fragments, transitions, vertical slides, progress, slide numbers, and browser-native embedding.

### Use Shared CSS

Decision:
Put reusable visual styling in `shared-styles/master.css`.

Reason:
This keeps all decks visually consistent and prevents every lesson from becoming a separate design.

### Use Raw HTML For Lesson Decks

Decision:
Generate lesson decks as raw HTML5 with `<section>` tags.

Reason:
The tech team requested HTML5, and raw HTML is easy to preview, embed, copy, transform, or render inside the LMS.

### Do Not Modify Reveal Core Files

Decision:
Do not edit files inside `core-assets/dist/`.

Reason:
Those are Reveal.js engine/theme files. OpenRecovery styling should live in `shared-styles/master.css`.

### Keep Prototype Hosting Separate From Final Architecture

Decision:
Use GitHub + Vercel for prototype preview, but let the CTO/tech team decide the production storage and rendering architecture.

Reason:
The static prototype is useful for review, but production may use npm-installed Reveal.js inside the dashboard.

### Use Controlled Title Line Breaks

Decision:
Use manual `<br>` breaks and title-specific classes for major slide titles.

Reason:
This prevents overlapping words, overflow, and orphaned words when the deck is embedded in a smaller iframe.

### Keep Controls Smaller

Decision:
Scale Reveal.js controls down with CSS.

Reason:
The default arrows are too visually dominant in the embedded LMS preview.

## 2026-05-19

### Tone Down Transition Language

Decision:
Use `slide` and `fade` as the standard transition palette for OpenRecovery lesson decks.

Reason:
The prototype feels stronger when motion stays subtle. Depth-heavy transitions like `zoom` and `convex` are too visually aggressive for this LMS training style.

### Use Shared Media Framing

Decision:
Standardize lesson images, diagrams, and screenshots with shared media utility classes in `shared-styles/master.css`.

Reason:
Consistent framing is the easiest way to keep AI-generated visuals, diagrams, and screenshots feeling like the same OpenRecovery system instead of separate one-off designs.

### Use A Structured Deck Prompt

Decision:
Generate future decks with a structured prompt that includes fixed input fields, motion rules, media rules, and output requirements.

Reason:
This reduces drift between AI sessions and makes it easier to get consistent HTML/CSS output when source lesson content is dropped into the model.

### Make The Consistency Spec Self-Contained

Decision:
Keep `PRESENTATION_CONSISTENCY_REQUIREMENTS.md` self-contained so future lesson generation does not depend on reopening a prior lesson HTML file as the main reference.

Reason:
The consistency spec should function as the reusable design standard. Older lesson files can drift or become less relevant as the dashboard shell evolves.

### Separate Deck Rules From Dashboard Shell Rules

Decision:
Define lesson deck consistency independently from host-shell concerns such as preview wrappers, fullscreen buttons, sidebars, or platform hosting details.

Reason:
The lesson deck visual system should remain stable even if the embedding dashboard, navigation shell, or hosting platform changes later.

### Make The Generation Prompt Read The Core Docs First

Decision:
Require `AI_DECK_GENERATION_PROMPT.md` to explicitly point future AI sessions to the core project docs before generating a new lesson deck.

Reason:
This gives a repeatable copy/paste workflow and reduces the chance that a new session generates HTML without reading the current consistency, style, and process rules.

### Prefer Source Documents Over Manual Metadata Forms

Decision:
Let future AI sessions accept a source lesson document directly, such as a local `.docx` path, Google Doc link, or pasted content, and infer lesson metadata from that source unless the user overrides it.

Reason:
This matches the real workflow more closely and removes unnecessary manual input formatting when the lesson details are already obvious from the source material.

### Create Lesson Folders As Part Of Deck Generation

Decision:
Future deck-generation workflows should create the target `presentations/course-name/lesson-name/` folder when needed, then write the lesson `index.html` into it.

Reason:
This keeps the generation workflow end-to-end and avoids requiring a separate manual repo step before a new lesson can be created.

### Keep The Design System Fixed But The Lesson Flow Flexible

Decision:
Keep the OpenRecovery visual system consistent, but let the source content determine slide order, teaching emphasis, and which slide types are actually used.

Reason:
Consistency should come from the design language, not from forcing every lesson into the same instructional sequence.

### Define Slide Templates As Structure, Not Subject

Decision:
Use `SLIDE_TEMPLATES.md` to describe slide layout, arrangement, composition, and transition guidance rather than prescribing what each slide should be about.

Reason:
Slide templates should help the AI choose how to present content after the lesson flow is known, not accidentally force the same subjects or sequence into every presentation.

### Use One Default Image Style Across Lessons

Decision:
Use one default OpenRecovery image style across the LMS library and let lesson subject matter vary inside that shared style, rather than inventing a new visual treatment for each lesson.

Reason:
Cross-lesson consistency in image style, palette, detail level, and tone is what makes image use feel intentional and brand-aligned instead of random.

### Use Modern Human Collage As The Default Image Style

Decision:
Use `Modern Human Collage` as the default OpenRecovery lesson image style.

Reason:
It is visually distinctive, brandable, professional, and flexible enough to support many lesson subjects while still staying recognizably OpenRecovery.

### Use A Canonical Reference Image To Lock Style

Decision:
Use `openrecovery_presentation_ai_docs/reference-assets/modern-human-collage-reference.png` as the canonical visual anchor for the OpenRecovery image system.

Reason:
Text-only style descriptions were too loose and allowed drift toward generic flat illustrations. A shared reference image gives the workflow a concrete visual target.

### Require 3–5 Images By Default

Decision:
Default to `3–5` original images per lesson deck unless the user explicitly requests fewer or none.

Reason:
This ensures the generated slide decks actually include visuals while still keeping image use selective rather than overwhelming.

### Keep Image Usage Intentional

Decision:
Even with a `3–5` image expectation, use images only on the slides where they add clarity, tone, memory, or scenario support.

Reason:
The deck should remain training-first rather than becoming decorative or visually noisy.

### Generate Image Assets As Part Of The Normal Workflow

Decision:
When image generation is available, the standard new-lesson workflow should create `IMAGE_PROMPTS.md`, generate the lesson images, save them in the lesson `assets/` folder, and wire them into `index.html`.

Reason:
The workflow should produce a lesson deck that actually contains images, not just a separate planning file.

### Make The New-Lesson Workflow Handle Image Planning And Generation

Decision:
The standard new-deck workflow should read `OPENRECOVERY_IMAGE_CREATION_GUIDE.md`, inspect the canonical reference image, create `IMAGE_PROMPTS.md`, generate image assets when possible, and place those images into the lesson deck by default.

Reason:
This keeps image planning and image execution inside the same end-to-end workflow as deck generation so the user can keep using `NEW_LESSON_DECK_PROMPT.md` without extra setup.

### Reuse One Shared Style Lock Across Each Lesson Image Set

Decision:
Each lesson that uses images should define one shared style lock prompt and one shared negative prompt at the top of `IMAGE_PROMPTS.md`, then reuse those blocks across the full lesson image set instead of rewriting the art direction from scratch for each image.

Reason:
Even strong text descriptions drift when restated image by image. Reusing one locked art-direction block makes the images feel like a coordinated set instead of adjacent but inconsistent outputs.

### Require A Calibration Image Before Full Image Generation

Decision:
Before generating the full `3–5` lesson image set, the workflow should generate one calibration image and compare it against the canonical reference board. If it drifts, revise the shared style lock first, then continue.

Reason:
The fastest way to catch generic flat-vector drift is before the whole image batch is created. A calibration pass makes the workflow more reliable and reduces cleanup later.

## 2026-05-20

### Use A Larger Default Deck Canvas

Decision:
Standardize lessons on `1440x810` with `margin: 0.04`.

Reason:
The slightly larger base canvas scales down more cleanly inside the LMS iframe while still reading well fullscreen, and it reduced repeated bottom clipping on dense slides.

### Cache-Bust Embedded Preview URLs During Iteration

Decision:
When the root preview shell embeds an actively edited lesson, version the lesson URL and, when needed, the lesson's shared stylesheet link with a `?v=...` token.

Reason:
Local/browser/Vercel iframe caching can otherwise show stale lesson HTML or stale `master.css`, which made embedded preview disagree with direct lesson preview.

### Open External Resource Links Outside The Iframe

Decision:
External resource links inside embedded decks should open in a new tab/window.

Reason:
Many external sites block iframe rendering and otherwise replace the embedded lesson with a broken or blank view.

### Prefer Container-Relative Width Overrides In Embedded Decks

Decision:
When a slide needs custom width overrides, size it relative to the slide/container with percentages and `max-width` rather than browser viewport units such as `vw`.

Reason:
Viewport units behaved differently in fullscreen versus iframe mode and caused the takeaway title and cards to appear much narrower in the root preview shell.

### Make Shared Two-Column Layouts Shrink-Safe

Decision:
Shared two-column grids should use shrinkable tracks and allow child elements to shrink, using `minmax(0, 1fr)` with child `min-width: 0`.

Reason:
Embedded iframe widths exposed text/image overlap on dense two-column slides, especially scenario layouts like slide 7 in the sexual-harassment lesson.

### Keep Optional In-Deck Navigation Compact

Decision:
If a lesson adds a custom in-deck slide navigator, keep the launcher compact in framed view and let it expand on hover/open rather than occupying a full labeled button all the time.

Reason:
The root LMS preview has less visible space than fullscreen, so persistent labeled controls can block slide content even when they look fine fullscreen.

### Use ElevenLabs With Pre-Generated Lesson Audio

Decision:
Use ElevenLabs to pre-render lesson narration into local audio files from a hidden script manifest instead of using browser speech synthesis in production.

Reason:
Pre-generated local audio keeps playback consistent, avoids API-key exposure, removes runtime latency, and still fits the fully automated lesson-generation pipeline.

### Store Narration In `voiceover.json`

Decision:
Keep each lesson's narration script in `voiceover.json` and render output audio into the lesson `voiceover/` folder.

Reason:
This gives the AI workflow one durable narration artifact to generate, review, version, and re-render without mixing hidden narration text into visible slide copy.

### Default To Two Browser-Selectable Narration Voices

Decision:
When narration is included, define one female voice profile and one male voice profile by default, render both sets of audio files ahead of time, and let the learner switch voices in the browser without making a live API call.

Reason:
This preserves consistent playback quality, keeps the pipeline fully automatable, and gives learners a simple voice preference control without introducing runtime synthesis latency or API-key exposure.

### Separate The Narration Launcher From The Playback Action

Decision:
Use a dedicated compact horn launcher to expand or collapse the narration controls, and keep start/stop playback on a separate action button inside the expanded controls.

Reason:
Users may want to reopen or dismiss the narration UI while audio keeps playing. Separating visibility control from playback control avoids accidental stops and makes the compact state less risky to click.

### Auto-Collapse Narration Controls After Playback Starts

Decision:
When narration starts, briefly show the expanded controls and then auto-collapse them while leaving playback running.

Reason:
The lesson needs narration controls to stay discoverable, but persistent expanded pills take up too much visual space on framed slides. Auto-collapse preserves both clarity and unobtrusiveness.

### Give Custom Slide Navigators A Persistent Scroll Affordance

Decision:
If a custom in-deck slide navigator contains a scrollable list, provide a visible in-panel scroll affordance instead of relying only on the operating system's overlay scrollbar behavior.

Reason:
On macOS, overlay scrollbars can remain hidden until the user gestures on a trackpad, which makes a long navigator look static or truncated and leaves mouse users with poor discoverability.

### Dock Compact Launchers On One Bottom Row

Decision:
If a lesson uses both a slide navigator launcher and a narration launcher, keep them as compact icon buttons on one bottom row and let any expanded narration controls open upward from that dock.

Reason:
One shared dock reads more cleanly in framed view and prevents the stacked bottom-left overlap that can happen when each launcher claims its own vertical lane.

### Treat Narration As Guided Playback

Decision:
When narration is enabled and a slide only has `slide-enter` audio, use that MP3 to reveal remaining fragments gradually and advance to the next slide after the audio ends. If the learner manually navigates during that cue, let the audio continue but cancel the automatic advance for that slide.

Reason:
This makes the deck feel like a lightweight narrated video while still respecting manual control instead of fighting the learner's navigation choices.

### Surface Pause And Resume In The Bottom Dock

Decision:
When a narrated lesson is actively playing, show a compact pause/resume button in the same bottom dock as the horn launcher, and hide that quick control when narration is inactive.

Reason:
Learners should be able to pause and continue the current slide audio without reopening the expanded narration controls or restarting the slide from the beginning.
