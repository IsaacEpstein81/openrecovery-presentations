# Presentation Consistency Requirements

This document is the standalone standard for keeping future OpenRecovery lesson decks visually and structurally consistent.

Once this document is maintained, future deck creation should not require reopening an older lesson HTML file just to recover the design rules.

## Purpose

Future decks should look like they belong to the exact same product line:

- same visual identity
- same motion language
- same layout patterns
- same content density
- same interaction model
- same level of polish

The goal is consistency, not novelty.

## Design Vs Narrative

The design system should stay consistent.
The lesson narrative should stay flexible.

Keep consistent:

- visual identity
- typography
- palette
- spacing
- motion style
- component styling
- tone

Allow to vary by lesson:

- subject emphasis
- slide order
- number of concept slides
- whether the lesson starts with a concept, scenario, comparison, or process
- whether the lesson needs objectives, a script, a reflection, a knowledge check, or documentation content
- whether a lesson is short and direct or more practice-oriented

## Scope

This document covers the lesson deck itself:

- lesson slide HTML
- shared deck CSS
- Reveal.js slide behavior
- slide structure
- visual language
- motion language
- media treatment

This document does not define the surrounding LMS or dashboard shell:

- Vercel preview behavior
- fullscreen / expand buttons
- iframe wrapper behavior
- dashboard navigation chrome
- sidebars
- lesson assistant panels
- platform-specific hosting details

Those host-shell behaviors may change later without changing the lesson deck consistency rules.

## Source Of Truth

When generating or reviewing a future deck, use these references in this priority order:

1. `PRESENTATION_CONSISTENCY_REQUIREMENTS.md`
2. `shared-styles/master.css`
3. `STYLE_GUIDE.md`
4. `OPENRECOVERY_IMAGE_CREATION_GUIDE.md`
5. `SLIDE_TEMPLATES.md`
6. `DECISIONS.md`
7. `QA_CHECKLIST.md`
8. `AI_DECK_GENERATION_PROMPT.md`

Canonical image style reference asset:

`openrecovery_presentation_ai_docs/reference-assets/modern-human-collage-reference.png`

If a new deck conflicts with this document or the shared CSS system, revise the deck unless there is a deliberate shared-system update.

## Non-Negotiable Technical Requirements

- Use raw HTML5 Reveal.js decks with `<section>` slides.
- Keep lesson files at `presentations/course-name/lesson-name/index.html`.
- Create the `presentations/course-name/lesson-name/` folder when needed before writing `index.html`.
- Link the shared stylesheet at `../../../shared-styles/master.css`.
- Link the shared lesson-runtime stylesheet at `../../../shared-styles/lesson-runtime.css` when using the standard OpenRecovery lesson chrome.
- Query-string cache busting such as `../../../shared-styles/master.css?v=...` is acceptable during active preview iteration.
- Use Reveal assets from `../../../core-assets/dist/...`.
- Do not link to `../../../core-assets/plugin/...`.
- Do not modify Reveal core files in `core-assets/dist/` unless the tech team explicitly asks.
- Reuse `../../../shared-runtime/lesson-runtime.js` for the standard narrated-lesson controls, slide navigator, and Reveal initialization unless the tech team explicitly asks for a new shared runtime pattern.
- Do not duplicate the shared narration / slide-navigation runtime inline when the standard shared system already fits the lesson.
- Reuse the standard Reveal initialization settings defined in this document.
- Keep deck size at `1440x810` with `margin: 0.04`.
- Keep `hash`, `controls`, `progress`, `overview`, `touch`, `keyboard`, and `slideNumber: "c/t"` enabled.
- Keep `transition: "slide"` and `backgroundTransition: "fade"` at the deck level.

Standard initialization:

```js
Reveal.initialize({
  hash: true,
  controls: true,
  progress: true,
  center: true,
  slideNumber: "c/t",
  width: 1440,
  height: 810,
  margin: 0.04,
  transition: "slide",
  backgroundTransition: "fade",
  overview: true,
  touch: true,
  keyboard: true
});
```

## Required Head / Asset Pattern

Future lesson decks should keep the same top-level asset structure:

```html
<link rel="stylesheet" href="../../../core-assets/dist/reveal.css">
<link rel="stylesheet" href="../../../core-assets/dist/theme/white.css">
<link rel="stylesheet" href="../../../core-assets/dist/plugin/highlight/monokai.css">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
<link rel="stylesheet" href="../../../shared-styles/master.css">
<link rel="stylesheet" href="../../../shared-styles/lesson-runtime.css">
```

During active local/Vercel preview iteration, query-string version tokens may be appended to the embedded lesson URL or shared stylesheet link to defeat stale iframe caching in the root preview shell.

Required scripts:

```html
<script src="../../../core-assets/dist/reveal.js"></script>
<script src="../../../core-assets/dist/plugin/notes.js"></script>
<script src="../../../core-assets/dist/plugin/search.js"></script>
<script src="../../../core-assets/dist/plugin/zoom.js"></script>
<script src="../../../shared-runtime/lesson-runtime.js"></script>
```

When a lesson uses the shared runtime, call:

```html
<script>
  window.OpenRecoveryLessonRuntime.init();
</script>
```

If a lesson includes pre-generated narration:

- create `voiceover.json` in the lesson folder
- save local narration files in the lesson `voiceover/` folder
- define male and female voice profiles by default unless the user explicitly asks for a single voice
- play those local audio files from the lesson deck instead of browser speech synthesis
- expose an in-browser voice selector when more than one profile exists
- add stable `<section id="...">` values so narration cues can target the right slide
- reuse the shared lesson runtime controls by default instead of building one-off lesson-specific narration or slide-navigation UI

## Visual Identity Requirements

### Overall Mood

Every deck should feel:

- calm
- clean
- professional
- modern
- recovery-friendly
- human
- minimal but polished

Avoid:

- flashy design moves
- loud accent colors
- dramatic 3D motion
- cluttered grids
- decorative elements that compete with the content

### Color System

Use the OpenRecovery teal/navy palette from `master.css`.

Required variables:

```css
--or-navy: #073f46;
--or-deep: #07515a;
--or-teal: #0b6f78;
--or-aqua: #37c7bd;
--or-mint: #7ce3d4;
--or-soft: #e9fbf8;
--or-cream: #f8fbfa;
--or-charcoal: #102326;
--or-muted: #5e7377;
--or-warning: #f2a93b;
--or-danger: #c94b4b;
--or-good: #24a889;
```

Requirements:

- Use teal/navy as the dominant brand language.
- Use aqua/mint for supportive highlights, not as the main text color.
- Use warning/danger/good colors only when meaningfully signaling risk level or status.
- Keep light slides bright, airy, and soft rather than stark white.
- Keep dark takeaway slides within the existing teal/navy gradient family.

### Typography

- Use `Inter` as the deck font.
- Keep titles bold, tight, and calm.
- Keep title line-height compact.
- Avoid title overflow and orphaned words.
- Use manual `<br>` line breaks or `.no-break` spans when needed.
- Keep body copy concise and presentation-sized.
- Do not introduce alternate display fonts for individual lessons.

### Background Treatment

- Light slides should use the shared soft gradient/radial background already defined on `.reveal`.
- Do not invent one-off backgrounds per lesson unless the whole system is being updated.
- Dark slides should be reserved for emphasis moments such as final takeaways.

### Icons

- Use Google Material Symbols.
- Use outline-style Material Symbols with teal/aqua treatment and generous spacing.
- Prefer icons that reinforce meaning rather than decorate empty space.

## Motion Requirements

- Use `slide` and `fade` as the standard transition palette.
- Use `fade` for title, definition, scenario, reflection, and knowledge-check moments.
- Use `slide` for most standard content slides.
- Avoid `zoom` and `convex` as normal deck behavior.
- Use fragments intentionally for staged reveals.
- Do not over-animate or reveal every sentence.

The motion should feel quiet and supportive, not cinematic.

## Layout Requirements

Future decks should be built primarily from the established shared layout classes.

Preferred shared classes:

- `.slide-shell`
- `.center`
- `.left`
- `.title-slide`
- `.title-content`
- `.lesson-title`
- `.title-subtitle`
- `.pill-row`
- `.pill`
- `.brand-kicker`
- `.brand-dot`
- `.subtitle`
- `.card-grid`
- `.card-grid.two`
- `.card`
- `.two-column`
- `.quote-box`
- `.boundary-spectrum`
- `.spectrum-card`
- `.scenario`
- `.scenario-label`
- `.script-box`
- `.reflection-slide`
- `.reflection-content`
- `.reflection-title`
- `.footer-note`
- `.dark-slide`
- `.takeaway-list`
- `.muted`

Requirements:

- Prefer these classes over inventing new per-lesson layouts.
- If a new pattern is truly needed, add it to `shared-styles/master.css` as a reusable system pattern.
- Keep cards rounded, softly shadowed, and lightly bordered.
- Keep generous whitespace around major sections.
- Avoid cramped multi-column slides.
- Make two-column layouts shrink cleanly in embedded view; shared grids should use shrink-safe tracks and allow child elements to shrink.
- If a slide needs custom width overrides, size it against the slide/container with `%` and `max-width` rather than browser viewport units such as `vw`.

## Media / Image Requirements

If a deck uses images, diagrams, screenshots, or video stills, they should follow the shared media system:

- `.media-panel`
- `.media-frame`
- `.media-frame.contain`
- `.media-grid`
- `.media-grid.three`
- `.media-caption`
- `.media-credit`

Requirements:

- Images should feel calm, dignified, human, and recovery-supportive.
- Use `OPENRECOVERY_IMAGE_CREATION_GUIDE.md` as the source of truth for image-generation style and prompt consistency.
- Use `openrecovery_presentation_ai_docs/reference-assets/modern-human-collage-reference.png` as the canonical visual anchor for lesson images.
- A standard lesson deck should include `3–5` original images unless the user explicitly requests fewer or none.
- Use images selectively on the slides where they add value; do not place images on every slide.
- Avoid sensational, chaotic, or cliché stock imagery.
- Use `.media-frame` for visuals that can safely fill a 16:9 crop.
- Use `.media-frame.contain` for diagrams, charts, screenshots, or UI visuals that must not be cropped.
- Use one consistent image treatment across the lesson; do not mix random border/shadow styles.
- Keep captions brief and instructional.

## Slide Structure Requirements

There is no single required slide sequence for every lesson.
The course and lesson content should dictate the sequence.

Use `SLIDE_TEMPLATES.md` as a menu of layout and composition patterns, not a narrative formula.

Choose the lesson flow that best matches the source material.
For example, a lesson may be:

- concept-first
- scenario-first
- process-first
- comparison-first
- skills-practice-first
- reference/resource-first

Requirements:

- A 15-minute lesson should usually land in the 10-16 slide range.
- Use vertical slides only for optional depth, examples, policy details, or secondary context.
- Include practical application when it meaningfully helps the lesson.
- Include a scenario, response script, reflection, documentation segment, or knowledge check only when the content benefits from it.
- End with a concise takeaway slide using the established dark-slide treatment.
- Do not force the same narrative rhythm across every lesson.
- Let the subject matter determine which teaching moves come first.

## Content Density Requirements

- Keep slides concise and teachable.
- Avoid large paragraphs except in scenario setup or script language.
- Break dense content into cards, columns, or staged fragments.
- Use three-card and two-card layouts frequently because they match the prototype well.
- Use tables sparingly.
- Keep every slide focused on one clear teaching move.

## Writing Style Requirements

The content voice should feel:

- warm
- practical
- clear
- staff-facing
- grounded in real recovery work

Requirements:

- Write for addiction recovery counselors, peer support staff, and behavioral health teams.
- Use action verbs in learning objectives.
- Make scripts sound like something a real staff member could actually say.
- Keep examples emotionally realistic but not melodramatic.
- Do not invent unsupported legal, policy, or clinical claims.
- When policy specifics are uncertain, use language such as consult policy, consult supervisor, or follow organizational guidance.

## Standard Signature Slide Features

Future decks should preserve these recognizable OpenRecovery moves when they are used:

- title slide with brand kicker, large balanced title, subtitle, topic pills, and footer note
- strong opening context, which may be “why this matters,” a scenario, a distinction, or a process overview
- clean card-based concept slides
- quote-box definition or emphasis treatment
- optional vertical stack for deeper examples
- scenario card with a client quote or real-world setup when scenario teaching is appropriate
- warm + clear + redirected response script structure when script-based teaching is appropriate
- reflection slide with large centered prompt when reflection adds value
- final dark gradient takeaway slide with light takeaway cards

## HTML Authoring Requirements

- Give each slide a clear `data-title`.
- Give each narrated slide a stable `id`.
- Keep class names aligned with the shared CSS system.
- Use speaker notes when they help instruction or narration.
- Keep inline styling minimal and only for small one-off adjustments.
- Do not redefine shared component styles inside each lesson unless absolutely necessary.

## Process Requirements For Future Deck Creation

Before generating a new lesson:

1. Read `PROJECT_CONTEXT.md`, `STYLE_GUIDE.md`, `SLIDE_TEMPLATES.md`, `CURRENT_TASK.md`, `DECISIONS.md`, `SESSION_LOG.md`, `QA_CHECKLIST.md`, and this document.
2. Use `AI_DECK_GENERATION_PROMPT.md` as the starting prompt.
3. Check the planned outline against this document before writing final HTML.
4. Confirm that the chosen slide flow is driven by the source content rather than by habit.
5. Use `SLIDE_TEMPLATES.md` to choose layouts for those slides rather than to determine their subject matter.
6. Use `OPENRECOVERY_IMAGE_CREATION_GUIDE.md` and the canonical reference asset to keep prompts, style, image count, and asset placement consistent.
7. If the lesson should ship with narration, use `ELEVENLABS_VOICEOVER_WORKFLOW.md` and create `voiceover.json` plus local audio files as part of the normal lesson output, including the default male/female browser-selectable voice profiles unless the user asks otherwise.

After generating a lesson:

1. Compare it visually and structurally against this document.
2. Verify it uses the shared CSS rather than a one-off design.
3. Run the checks in `QA_CHECKLIST.md`.
4. Update session docs if a durable new shared pattern was introduced.

## Quick Acceptance Checklist

A future deck is consistent enough if all of the following are true:

- It looks like the same OpenRecovery lesson product family as the current shared system.
- It uses the same palette, typography, spacing feel, and card language.
- Its transitions are subtle and mostly `slide` + `fade`.
- Its titles fit cleanly without awkward wrapping.
- Its layouts are built from the shared component system.
- Its images, if any, use the shared media treatment.
- Its content is concise, practical, and scenario-oriented.
- Its narrative structure feels appropriate to the topic instead of mechanically reused from another lesson.
- Its final takeaway slide uses the established dark-slide ending treatment.
- Nothing in the deck looks like it came from a different design system.

## Practical Rule

If a reviewer can open a new lesson deck and it immediately reads as unmistakably OpenRecovery without needing supporting examples, the deck is on target.
