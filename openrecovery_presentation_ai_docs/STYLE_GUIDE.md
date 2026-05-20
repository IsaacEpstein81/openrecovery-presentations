# OpenRecovery Reveal.js Style Guide

Use this guide for every new OpenRecovery LMS slide deck.

## Overall Look

The style should feel:

- clean
- calm
- professional
- modern
- recovery-friendly
- minimal but polished
- suitable for addiction treatment and behavioral health training

Avoid:

- overly flashy effects
- loud colors
- cramped slides
- inconsistent layouts
- giant decorative graphics
- gimmicky animations
- orphaned words on important titles

## Color Palette

Use the OpenRecovery teal/navy family.

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

## Typography

Use Inter from Google Fonts.

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

Rules:

- Large titles should be bold, tight, and calm.
- Do not let titles overlap.
- Use manual line breaks for title slides when needed.
- Use `text-wrap: balance` where supported.
- Avoid orphaned words using `<br>` or `<span class="no-break">`.

## Icons

Use Google Material Symbols.

```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
```

Good icons:

```text
shield_person, groups, rule, psychology, warning, forum,
health_and_safety, social_distance, volunteer_activism,
favorite, signpost, gavel, assignment, edit_note, check_circle
```

## Images / Media Theme

Images should feel:

- bold
- calm
- human
- professional
- editorial
- recovery-supportive

Avoid:

- sensational substance-use imagery
- generic stock-photo realism
- watercolor or 3D style drift
- inconsistent borders/shadows from one deck to another
- random image crops with no frame treatment

Use the shared image treatment in `shared-styles/master.css`:

- `.media-panel`
- `.media-frame`
- `.media-frame.contain`
- `.media-grid`
- `.media-caption`

Guidance:

- Prefer the OpenRecovery default image style: `Modern Human Collage`.
- Treat `openrecovery_presentation_ai_docs/reference-assets/modern-human-collage-reference.png` as the canonical visual reference.
- Prefer wide, slide-friendly images with layered teal/navy shapes, subtle texture, and a clear focal point.
- Prefer soft clinical/recovery environments, real people, supportive interactions, and clean diagrams.
- Let the shared frame style create consistency instead of inventing a new image style per lesson.
- Use `contain` for diagrams, charts, screenshots, or policy graphics that should not be cropped.
- Use standard `media-frame` for generated 16:9 visuals that can safely fill the frame.
- Use `OPENRECOVERY_IMAGE_CREATION_GUIDE.md` for prompt-writing and cross-lesson image-style consistency.

## Deck Size

Use 16:9 widescreen.

```js
Reveal.initialize({
  hash: true,
  controls: true,
  progress: true,
  center: true,
  slideNumber: "c/t",
  width: 1280,
  height: 720,
  margin: 0.06,
  transition: "slide",
  backgroundTransition: "fade",
  overview: true,
  touch: true,
  keyboard: true
});
```

## Controls / Arrows

Use smaller Reveal controls than the default.

```css
.reveal .controls {
  color: var(--or-teal);
  transform: scale(0.62);
  transform-origin: bottom right;
  right: 18px;
  bottom: 18px;
}
```

## Slide Length

Recommended ranges:

- 10–16 slides for a 15-minute lesson
- 14–22 slides for an 18–22 minute lesson
- Add 4–8 slides for scenario exercises
- Use vertical slides for optional detail, examples, or policy reference

## Motion / Transitions

Use subtle transitions:

- `slide`
- `fade`

Preferred pattern:

- title: `fade`
- normal content: `slide`
- scenario/reflection/knowledge check/definition: `fade`
- final takeaways: `slide`

Avoid using `zoom` or `convex` as standard deck language.
They feel too aggressive for the OpenRecovery prototype unless a specific lesson truly needs stronger motion.

## Fragments

Use fragments to reveal bullet points and cards one at a time.

```html
<li class="fragment fade-up">Point one</li>
<div class="card fragment fade-up">...</div>
```

Use fragments for objectives, risk lists, scenarios, choices, and takeaways.

## Layout Rules

Use recurring layouts:

- centered title slide
- two-column slide
- three-card grid
- two-card comparison
- quote/callout box
- scenario card
- table slide
- reflection slide
- final takeaway slide

Avoid full paragraphs on slides unless it is a scenario or script.

## Title Wrapping Rule

For title slides:

```html
<h1 class="lesson-title">
  Understanding Professional<br>
  Boundaries
</h1>
```

For reflection slides:

```html
<h2 class="reflection-title">
  <span>Where do you personally feel pressure</span>
  <span>to over-help?</span>
</h2>
```

## Shared CSS Rule

Reusable styling belongs in:

```text
shared-styles/master.css
```

Lesson HTML should link to it:

```html
<link rel="stylesheet" href="../../../shared-styles/master.css">
```
