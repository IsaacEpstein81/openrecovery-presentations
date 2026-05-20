# OpenRecovery Image Creation Guide

Use this document whenever an OpenRecovery lesson deck needs original images.

This guide defines the **shared image system** for the LMS library and should work together with:

- `NEW_LESSON_DECK_PROMPT.md`
- `AI_DECK_GENERATION_PROMPT.md`
- `PRESENTATION_CONSISTENCY_REQUIREMENTS.md`
- `STYLE_GUIDE.md`
- `shared-styles/master.css`

The goal is:

- different lessons can show different subjects
- all lesson images should still feel like the same OpenRecovery visual family
- the normal lesson workflow should actually produce image prompts, image assets, and images inside the slide deck

## Canonical Style Reference

The approved visual reference for the current OpenRecovery image system is:

`openrecovery_presentation_ai_docs/reference-assets/modern-human-collage-reference.png`

This reference image is the strongest style anchor in the project.

When a session can inspect images, it should inspect this reference image before generating lesson images.
When a session cannot inspect images directly, it should still follow the text rules in this document, which are derived from that reference.

## Why This Matters

The earlier image prompts drifted toward:

- flat vector onboarding graphics
- generic SaaS illustration style
- over-simplified people silhouettes
- clean but bland healthcare-tech visuals
- too little texture, depth, and editorial character

That is not the target.

The target is the richer, more branded, more distinctive look shown in the canonical reference image.

## Core Principle

The lesson content determines **what the image is about**.
This guide determines **how the image should look**.

Do not invent a new visual style for each lesson.
Do not switch between watercolor, stock photography, flat corporate vector, isometric 3D, abstract art, or random AI aesthetics.

## Reference-Locked Workflow

To reliably get images that look like the approved texture board, the workflow must use a
**reference-locked process**, not a fresh style description for each image.

That means:

- use the canonical reference image as the visual anchor every time
- create one lesson-level style lock paragraph and reuse it verbatim across all image prompts
- create one lesson-level negative prompt block and reuse it verbatim across all image prompts
- generate one calibration image first before generating the rest of the lesson images
- compare that calibration image against the reference board and adjust before continuing

If the AI writes a brand-new style description for each image, consistency will drift.
The lesson-specific part of the prompt should change.
The style lock should not.

## Default Image Requirement

For a normal lesson deck, include `3–5` original images unless the user explicitly asks for fewer or none.

These images should appear only on the slides where they actually help.
Do not put images on every slide.

Default rule:

- `3–5` images per lesson deck
- usually `1` opener/context image
- usually `1–2` concept/process/support images
- usually `1–2` scenario/comparison/application images

Use images when they:

- clarify a concept
- open a section with strong context
- support a scenario
- make an abstract idea easier to grasp
- reinforce a memorable distinction
- show a process, environment, or decision point visually

Avoid using images on slides that are already clear through:

- a short definition
- a compact framework
- a simple comparison
- a table
- a knowledge check

## What The Reference Actually Looks Like

The approved reference board is not minimal flat vector art.

It consistently shows:

- semi-realistic illustrated people, not icon silhouettes
- layered painted and cut-paper collage shapes
- rich teal and navy brush swashes
- off-white and cream paper-like backgrounds
- halftone dots and fingerprint-like line textures
- selective UI/document cards integrated into the art
- strong editorial composition with visible depth
- calm but high-design visual energy

If a generated image looks too smooth, too empty, too geometric, or too much like a generic app onboarding screen, it is drifting away from the target.

## Approved OpenRecovery Image Style

### Style Name

**Modern Human Collage**

### Style Lock

Every lesson image must match the visual language of the canonical reference image:

`openrecovery_presentation_ai_docs/reference-assets/modern-human-collage-reference.png`

This is not just a loose inspiration.
It is the style anchor the prompts should push toward.

### Visual Fingerprint From The Reference

The approved style should feel like a polished editorial training collage with:

- layered teal/navy brush textures
- cream / soft light base backgrounds
- subtle paper grain
- halftone dot clusters
- fingerprint-like line textures
- soft geometric blocks and cut-paper shapes
- semi-realistic human figures or objects
- clean document or UI cards when useful
- a mix of illustration, collage texture, and light interface framing
- enough texture and shape contrast to feel branded, not generic

### Short Description

Use a bold, modern, human-centered editorial collage style that blends:

- semi-realistic illustrated people
- clean UI or document cards when helpful
- textured brush strokes
- abstract paper-like shapes
- subtle halftone dots
- fingerprint or line-pattern textures
- soft geometric panels
- lightly photographic or cut-paper depth
- OpenRecovery teal/navy/cream brand colors

The style should feel modern, professional, warm, and visually distinctive.
It should not feel like generic corporate clip art, stock photography, watercolor, 3D rendering, or purely abstract art.

## Non-Negotiable Style Traits

Every accepted image should preserve these traits:

- bold editorial composition
- visible but controlled texture
- recognizable layered collage depth
- branded teal/navy/cream palette
- human-centered but professional tone
- clean slide readability
- visual interest beyond flat fills

## Drift To Reject

Reject and regenerate if the image drifts toward:

- flat vector onboarding illustration
- soft generic app-landing-page graphics
- large empty rounded cards with minimal texture
- icon-like people silhouettes only
- too much white space with not enough editorial structure
- stock-photo realism
- watercolor softness
- 3D illustration
- sci-fi AI gloss
- chaotic mixed-media mess

If the image looks like a generic healthcare SaaS illustration instead of the reference board, it is not correct.

## What Stays Consistent Across All Courses

Every OpenRecovery image should stay consistent in:

- style: Modern Human Collage
- palette: OpenRecovery colors only
- texture: subtle brush, paper, halftone, or line-pattern texture
- composition: clean, editorial, slide-friendly
- detail level: low to moderate, never cluttered
- emotional tone: calm, respectful, professional
- people treatment: diverse, realistic, non-stereotyped
- brand fit: behavioral health / recovery workforce training

Even when the lesson topic changes, the visual system should not.

## What Can Change By Lesson

The following should be determined by the lesson content:

- subject matter
- setting
- people shown
- objects or props
- symbolic elements
- process or scenario being illustrated
- level of abstraction
- whether the image includes people at all

Do not force repeated props or motifs across unrelated lessons.
Consistency should come from the **visual style**, not from recycling the same objects.

## Color Rules

Use only the OpenRecovery palette unless the team explicitly changes the system.

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

Use color like this:

- cream / soft as the main background family
- navy / deep teal / teal for structure and dominant shapes
- aqua / mint for highlights and lift
- charcoal / muted for depth and support
- warning / danger / good only as small semantic accents

Do not introduce unrelated bright colors, neon colors, purple gradients, rainbow palettes, or generic startup color systems.

## Texture And Shape Language

Use a layered collage system with controlled texture.

Preferred texture elements:

- broad teal/navy brush swashes
- soft paper grain
- lightly distressed edges
- halftone dot patterns
- circular fingerprint-like line patterns
- subtle abstract blocks behind subjects
- soft transparent overlays
- simple geometric shapes used as background structure
- cut-paper layering or poster-like depth

Avoid:

- heavy grunge
- messy scrapbook overload
- watercolor as the main look
- 3D clay or isometric miniature worlds
- glossy futuristic effects
- generic corporate vector illustration
- stock-photo realism

## People And Representation

When people appear:

- show diverse, respectful representation
- include Black, brown, Asian, and other people across the library
- keep people realistic, warm, and professional
- use semi-realistic illustration / collage treatment, not cartoon characters
- avoid stereotypes
- avoid exaggerated emotional expressions
- avoid stigmatizing depictions of recovery, mental health, ethics issues, or workplace conflict

People should feel like real professionals, learners, clients, supervisors, peers, or team members depending on the lesson context.

## Composition Rules

Lesson images should be slide-friendly.

Prefer:

- wide landscape compositions
- one clear focal point
- clean visual hierarchy
- moderate negative space
- subject placed slightly off-center when useful
- layered abstract background shapes that support the subject
- `1–2` main people or one clear symbolic subject
- readable composition at slide size

Avoid:

- crowded multi-subject scenes
- too many UI panels
- tiny detailed text
- busy backgrounds
- dramatic lighting
- complex scenes that compete with slide content
- built-in paragraphs of text inside images

## Text Inside Images

Avoid readable text inside generated images whenever possible.

Allowed:

- simple generic interface shapes
- short labels only if truly necessary
- checkmarks, icons, progress indicators, or abstract lines
- placeholder UI cards without readable text

Avoid:

- long labels
- paragraphs
- exact policy names
- detailed forms
- exact legal/compliance language
- small text that must be read accurately

Put accurate text in the HTML slide, not inside the generated image.

## Tone And Emotional Rules

Images should feel:

- bold
- modern
- clear
- trustworthy
- respectful
- human-centered
- supportive
- professional
- warm without being sentimental
- appropriate for behavioral health and recovery workforce training

Avoid:

- drama for drama’s sake
- sensational crisis imagery
- addiction clichés
- shame-based visuals
- sci-fi AI clichés
- harsh contrast
- cluttered scenes
- over-animated character emotion
- anything that could stigmatize clients, staff, or people in recovery

## Lesson-Level Image Planning

Before generating lesson images, define a short image plan:

```text
Image Count Target: [3-5]
Reference Style Asset: openrecovery_presentation_ai_docs/reference-assets/modern-human-collage-reference.png
Style: Modern Human Collage
Palette: OpenRecovery default palette
Detail Level: low or moderate
Texture Level: subtle to moderate collage texture
People Treatment: diverse, realistic, respectful, non-stereotyped
Background Treatment: cream/soft base with layered teal/navy abstract shapes and subtle texture
Primary Purpose: opener / concept support / scenario support / comparison / process support
Drift To Avoid: flat vector, stock realism, watercolor, 3D, generic SaaS illustration
```

All images in that lesson should follow the same plan.

## Shared Style Lock Requirement

Every lesson that uses images should define a single shared style lock block at the top of
`IMAGE_PROMPTS.md`.

That block should contain:

- the canonical reference asset path
- one fixed art-direction paragraph
- one fixed negative prompt paragraph
- palette rules
- texture rules
- people rules
- composition rules

That shared style lock should then be reused across every image prompt in the lesson.
Do not rewrite it from scratch image by image.

## Shared Negative Prompt Requirement

Every lesson that uses images should also define one shared negative prompt block and keep it consistent across the full image set.

That shared negative prompt should explicitly reject:

- flat vector onboarding graphics
- generic SaaS illustration
- stock-photo realism
- watercolor softness
- 3D or isometric rendering
- cartoon characters
- bright unrelated colors
- stigma, crisis spectacle, or addiction clichés
- cluttered scenes
- excessive readable text

## What Determines Image Subject Matter

Image subject matter should come from:

- the source lesson document
- the lesson title
- the slide’s teaching point
- the scenario being discussed
- the skill being practiced
- the distinction or process being explained
- any user-provided desired visuals

Do not reuse the same props, metaphors, or scenes across unrelated lessons unless the content genuinely calls for them.

The consistency should come from the Modern Human Collage style, not from forcing every course to show the same objects.

## Output Workflow For New Lessons

When generating a new lesson deck from `NEW_LESSON_DECK_PROMPT.md`:

1. Inspect `openrecovery_presentation_ai_docs/reference-assets/modern-human-collage-reference.png` when image inspection is available.
2. Identify the strongest `3–5` image moments in the lesson.
3. Create `IMAGE_PROMPTS.md` inside the lesson folder.
4. Put a lesson-level style lock at the top of `IMAGE_PROMPTS.md`.
5. Put a shared negative prompt block at the top of `IMAGE_PROMPTS.md`.
6. Create one calibration prompt first using the same shared style lock.
7. Generate one calibration image before generating the rest of the lesson images.
8. Compare that calibration image against the reference board.
9. If the calibration image drifts toward flat vector or generic SaaS illustration, revise the shared style lock or negative prompt and regenerate the calibration image before continuing.
10. After the calibration image is approved, generate the remaining image assets using the same shared style lock.
11. Save generated image assets in a lesson-level `assets/` folder.
12. Place the images into the lesson `index.html` using the shared media classes from `shared-styles/master.css`.

Recommended lesson structure when images are used:

```text
presentations/course-name/lesson-name/
├── index.html
├── IMAGE_PROMPTS.md
└── assets/
```

## How Images Should Be Added To Slides

When a generated image is used in HTML:

- wrap it in `.media-panel` when it is a featured visual
- place the image inside `.media-frame`
- use `.media-frame.contain` for diagrams, screenshots, or visuals that should not be cropped
- use `.media-caption` for short explanatory captions

The HTML should still follow the shared deck system.

## IMAGE_PROMPTS.md Format

If a lesson uses images, create an `IMAGE_PROMPTS.md` file in the lesson folder.

Start with a lesson-level style lock:

```md
# Lesson Image Style Lock

**Reference Asset:** `openrecovery_presentation_ai_docs/reference-assets/modern-human-collage-reference.png`
**Required Style:** Modern Human Collage
**Palette:** OpenRecovery default palette
**Image Count Target:** 3-5
**Drift To Avoid:** flat vector, stock realism, watercolor, 3D, generic SaaS illustration

## Shared Style Lock Prompt

Match the visual language of the approved OpenRecovery reference image at `openrecovery_presentation_ai_docs/reference-assets/modern-human-collage-reference.png`.

Use the approved OpenRecovery image style: Modern Human Collage. Create a bold, modern, human-centered editorial collage image with semi-realistic illustrated people or objects, rich teal and navy brush textures, cream paper-like background areas, subtle halftone dots, fingerprint-like line textures, layered cut-paper depth, and selective UI/document cards only when they support the lesson. The result should feel polished, branded, calm, professional, and visually distinctive rather than minimal, generic, or flat.

## Shared Negative Prompt

Do not use flat vector onboarding graphics, generic SaaS illustration, icon-only people, stock-photo realism, watercolor softness, 3D or isometric rendering, cartoon characters, unrelated bright colors, stigma, crisis spectacle, cluttered composition, or excessive readable text.
```

Use the shared style lock prompt and shared negative prompt verbatim for every image in the same lesson unless a real problem is discovered during calibration.

Then use this format for each image:

```md
## Image 1 — [Short Title]

**Suggested Filename:** [short-file-name.png]
**Slide:** [slide title or purpose]
**Purpose:** [why this image exists]
**Use In HTML:** [media feature / split explainer / scenario frame / comparison / opener]
**Orientation:** [wide landscape / landscape / square if truly needed]
**Style:** Modern Human Collage

**Use Shared Style Lock:** yes
**Use Shared Negative Prompt:** yes

**Prompt:**
[full image-generation prompt]

**Avoid:**
[negative prompt / exclusions]
```

## Required Elements In Every Image Prompt

Every image prompt should include:

1. the shared style lock prompt reused verbatim
2. the shared negative prompt reused verbatim
3. the Modern Human Collage style name
4. explicit mention of the canonical reference image
5. the OpenRecovery palette
6. the intended emotional tone
7. the actual lesson-specific subject matter
8. whether people are included
9. diversity requirements when people are included
10. the collage texture and shape language
11. clear slide-friendly composition guidance
12. instruction to avoid clutter
13. instruction to avoid unrelated colors
14. instruction to avoid stigma or sensationalism
15. instruction to avoid flat vector / stock-photo / watercolor / 3D drift

## Calibration Pass

Before generating the full set, generate one calibration image.

This should usually be:

- the opener image
- the strongest people-centered image
- or the image most likely to expose drift quickly

Only continue to the rest of the lesson images if the calibration image clearly shows:

- semi-realistic people or objects
- layered teal/navy collage structure
- visible texture and editorial depth
- cream paper-like negative space
- a closer match to the reference board than to generic SaaS artwork

If it misses those traits, adjust the shared style lock and regenerate the calibration image first.

## Master Prompt Template

```text
Create an image for an OpenRecovery LMS lesson.

Match the visual language of the approved OpenRecovery reference image at `openrecovery_presentation_ai_docs/reference-assets/modern-human-collage-reference.png`.

Use the approved OpenRecovery image style: Modern Human Collage. This is a bold, modern, human-centered editorial collage style that blends semi-realistic illustrated people or objects, clean layered composition, abstract teal/navy brush shapes, subtle paper grain, halftone dots, fingerprint-like line textures, and occasional clean UI/document cards when helpful. It should feel polished, professional, warm, and distinctive.

Subject:
Show [SPECIFIC SUBJECT MATTER FROM THIS SLIDE OR LESSON]. The image should support this teaching point: [TEACHING POINT]. Let the lesson content determine the scene, people, objects, and symbolism.

Composition:
Make it slide-friendly in a wide landscape composition with one clear focal point, simple hierarchy, moderate negative space, and minimal clutter. Use a cream or soft light background with layered teal/navy abstract shapes and subtle collage textures behind the main subject. Keep details readable at presentation size.

People:
[If people are included: show diverse, respectful, realistic professional people, including Black, brown, Asian, and other people across the course/library. Use a semi-realistic illustration or collage treatment. Avoid stereotypes, exaggerated expressions, generic stock-model appearance, and stigmatizing depictions.]
[If people are not included: do not include people; use symbolic, environmental, object-based, or abstract collage elements only.]

Color:
Use only the OpenRecovery palette: #073f46, #07515a, #0b6f78, #37c7bd, #7ce3d4, #e9fbf8, #f8fbfa, #102326, #5e7377, #f2a93b, #c94b4b, #24a889. Keep teal/navy dominant, cream/soft as the background family, and use warning/danger/good only as small semantic accents.

Tone:
The image should feel bold, calm, trustworthy, supportive, clear, modern, and appropriate for behavioral health / recovery workforce training.

Text:
Avoid readable text inside the image unless explicitly required. Use simple placeholder UI cards, icons, checkmarks, and abstract lines instead of detailed written content.

Avoid:
Do not use flat vector onboarding graphics, stock-photo realism, watercolor, isometric 3D, flat corporate vector art, futuristic sci-fi AI aesthetics, random bright colors, addiction clichés, dramatic crisis imagery, stigma, cluttered backgrounds, excessive text, or sensationalized emotion.
```

## Quality Check

Before accepting an image or image prompt, check:

- does it clearly match the canonical reference image’s visual language?
- does it look closer to the approved texture board than to a generic onboarding illustration?
- does it clearly use the Modern Human Collage style?
- does it avoid drifting into flat vector, stock realism, watercolor, 3D, or unrelated abstraction?
- does it stay inside the OpenRecovery palette?
- does it feel like the same visual family as other OpenRecovery lesson images?
- is it appropriate for the lesson topic?
- is it readable at slide size?
- is it bold but still calm and professional?
- if people appear, is representation diverse and respectful?
- is it free of clichés, stigma, and unnecessary visual drama?
- does it support the lesson instead of distracting from it?

If not, revise the prompt before using it.
