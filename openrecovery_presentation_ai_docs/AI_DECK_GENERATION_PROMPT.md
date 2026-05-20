# AI Deck Generation Prompt

Use this document when generating a new Reveal.js lesson deck.

## Required Read Order

Before generating a new lesson deck, the AI should read these docs in this order:

1. `README.md`
2. `PROJECT_CONTEXT.md`
3. `PRESENTATION_CONSISTENCY_REQUIREMENTS.md`
4. `STYLE_GUIDE.md`
5. `OPENRECOVERY_IMAGE_CREATION_GUIDE.md`
6. `ELEVENLABS_VOICEOVER_WORKFLOW.md`
7. `SLIDE_TEMPLATES.md`
8. `CURRENT_TASK.md`
9. `DECISIONS.md`
10. `SESSION_LOG.md`
11. `QA_CHECKLIST.md`

## What To Say In A Fresh AI Session

If you want a single reusable copy/paste prompt file, use `NEW_LESSON_DECK_PROMPT.md`.

Copy and paste this into a fresh AI session when you want a new lesson HTML created:

```text
Please create a new OpenRecovery Reveal.js HTML5 lesson deck.

First read these docs:
- README.md
- PROJECT_CONTEXT.md
- PRESENTATION_CONSISTENCY_REQUIREMENTS.md
- STYLE_GUIDE.md
- OPENRECOVERY_IMAGE_CREATION_GUIDE.md
- ELEVENLABS_VOICEOVER_WORKFLOW.md
- SLIDE_TEMPLATES.md
- CURRENT_TASK.md
- DECISIONS.md
- SESSION_LOG.md
- QA_CHECKLIST.md

Then:
1. summarize the lesson request
2. identify the best lesson shape based on the source content
3. propose a slide outline that fits that content
4. create the needed `presentations/course-name/lesson-name/` folder if it does not already exist
5. create the full lesson `index.html` inside that folder
6. identify the strongest `3–5` image moments in the lesson
7. create `IMAGE_PROMPTS.md` in the lesson folder using `OPENRECOVERY_IMAGE_CREATION_GUIDE.md`
8. inspect `openrecovery_presentation_ai_docs/reference-assets/modern-human-collage-reference.png` and use it to lock the image style
9. create one shared style lock prompt and one shared negative prompt for the full lesson image set, then reuse them across all lesson image prompts
10. generate one calibration image first and compare it against the reference board before generating the rest of the lesson images
11. generate the image assets when image generation is available and save them in the lesson `assets/` folder
12. create `voiceover.json` in the lesson folder using `openrecovery_presentation_ai_docs/ELEVENLABS_VOICEOVER_WORKFLOW.md`
13. define one female voice profile and one male voice profile by default unless I explicitly ask for a single voice
14. add stable `<section id="...">` values for each narrated slide and wire the deck to local pre-generated audio files instead of browser speech synthesis
15. when ElevenLabs credentials are configured locally, run `scripts/generate_elevenlabs_voiceover.py` against that `voiceover.json` file and save the audio files in the lesson `voiceover/` folder
16. expose the browser voice selector so the learner can switch between the rendered voice profiles
17. include those images in the deck using the shared media classes and keep the deck consistent with `PRESENTATION_CONSISTENCY_REQUIREMENTS.md`, `OPENRECOVERY_IMAGE_CREATION_GUIDE.md`, and `shared-styles/master.css`
18. if the generated images drift toward flat vector or generic SaaS illustration, revise the shared style lock and regenerate them before finalizing the deck
19. do not redesign the deck system unless truly necessary
20. update CURRENT_TASK.md, SESSION_LOG.md, and DECISIONS.md if any durable shared-system change is made

Use `openrecovery_presentation_ai_docs/AI_DECK_GENERATION_PROMPT.md` for the deck-generation rules.

I will provide the lesson source in one of these forms:
- a local file path, such as `/Users/.../lesson.docx`
- a Google Doc link
- pasted lesson content

Use the source document to infer the course name, lesson number, lesson title, estimated time, audience, and key concepts unless I explicitly override them.

Optional notes I may include:
- target lesson if the source document contains multiple lessons
- must-cover concepts
- desired scenario or roleplay
- desired script language
- desired visuals
- narration preference override
- compliance or policy cautions
```

## Deck Generation Rules

```text
You are creating a Reveal.js HTML5 lesson deck for the OpenRecovery LMS.

Your goal:
- produce a deck that matches the OpenRecovery lesson system defined in PRESENTATION_CONSISTENCY_REQUIREMENTS.md
- keep the deck practical, calm, polished, and easy to reuse across courses
- keep styling consistent by reusing shared CSS instead of inventing per-lesson visual systems

Before writing the deck, read:
- PROJECT_CONTEXT.md
- PRESENTATION_CONSISTENCY_REQUIREMENTS.md
- STYLE_GUIDE.md
- OPENRECOVERY_IMAGE_CREATION_GUIDE.md
- ELEVENLABS_VOICEOVER_WORKFLOW.md
- SLIDE_TEMPLATES.md
- DECISIONS.md
- QA_CHECKLIST.md

Core rules:
1. Use raw HTML5 Reveal.js with <section> slides.
2. Do not use React.
3. Do not use Markdown as the final output format.
4. Use the shared CSS file at ../../../shared-styles/master.css.
5. Do not redefine the whole visual system inline.
6. Do not modify Reveal.js core files.
7. Keep the style minimal, professional, teal/navy, Inter font, Material Symbols icons, polished cards, subtle gradients.
8. Use 16:9 widescreen.
9. Use fragments intentionally, but do not overuse them.
10. Avoid orphaned words in major titles. Use manual <br> line breaks when needed.
11. Use vertical slides only for optional examples, policy details, or deeper context.
12. Keep the lesson practical, concise, and suitable for addiction recovery, peer support, or behavioral health training.
13. Create the target lesson folder inside `presentations/` if it does not already exist, then save the deck as `index.html` in that folder.
14. By default, include `3–5` original images in a normal lesson deck unless the user explicitly requests fewer or none.
15. Generate those images in one consistent lesson-level style defined by `OPENRECOVERY_IMAGE_CREATION_GUIDE.md`.
16. Inspect the canonical style reference image and treat it as the visual anchor for all lesson images.
17. When narration is desired, create `voiceover.json`, define browser-selectable male and female voice profiles by default, generate local audio files with ElevenLabs when credentials are available, and play those files from the deck instead of using browser speech synthesis.

Motion rules:
- Default transition language is subtle.
- Use slide for most content slides.
- Use fade for title, definition, scenario, reflection, and knowledge-check slides.
- Avoid zoom and convex unless explicitly requested.

Image / media rules:
- If the lesson uses images, diagrams, screenshots, or video stills, use the shared classes:
  - .media-panel
  - .media-frame
  - .media-frame.contain
  - .media-grid
  - .media-caption
- Image direction should feel calm, dignified, human, recovery-supportive, and editorial.
- Avoid loud stock-photo energy, harsh filters, and inconsistent framing.
- Use .media-frame.contain for diagrams, charts, UI screenshots, and policy visuals that should not be cropped.

Repo structure:

openrecovery-presentations/
├── core-assets/
│   └── dist/
├── shared-styles/
│   └── master.css
└── presentations/
    └── course-name/
        └── lesson-name/
            └── index.html

Required top links:

<link rel="stylesheet" href="../../../core-assets/dist/reveal.css">
<link rel="stylesheet" href="../../../core-assets/dist/theme/white.css">
<link rel="stylesheet" href="../../../core-assets/dist/plugin/highlight/monokai.css">
<link rel="stylesheet" href="../../../shared-styles/master.css">

Required scripts:

<script src="../../../core-assets/dist/reveal.js"></script>
<script src="../../../core-assets/dist/plugin/notes.js"></script>
<script src="../../../core-assets/dist/plugin/search.js"></script>
<script src="../../../core-assets/dist/plugin/zoom.js"></script>

Use the standard Reveal.initialize settings defined in PRESENTATION_CONSISTENCY_REQUIREMENTS.md.

Treat PRESENTATION_CONSISTENCY_REQUIREMENTS.md as the main design standard.
Do not rely on an older lesson HTML file as the primary design reference unless specifically asked to compare against it.

Source input rules:

- Accept the lesson source as a local file path, Google Doc link, or pasted content.
- Infer course name, lesson number, lesson title, estimated time, audience, and major concepts from the source when possible.
- If the source document contains multiple lessons, use the user’s specified target lesson.
- If a key metadata field is genuinely ambiguous, make a reasonable assumption and state it, or ask one concise clarifying question only if necessary.
- Treat explicit user overrides as higher priority than inferred metadata.

Output:
1. First provide a recommended slide outline.
2. Identify the strongest `3–5` image moments in the lesson.
3. Create `IMAGE_PROMPTS.md`.
4. Inspect `openrecovery_presentation_ai_docs/reference-assets/modern-human-collage-reference.png` and use it as the canonical style anchor.
5. Create one shared style lock prompt and one shared negative prompt for the lesson image set, and reuse them across the full set.
6. Generate one calibration image first before generating the rest of the lesson images.
7. If the calibration image or later images drift away from the reference style, revise the shared style lock and regenerate before finalizing.
8. When image generation is available, generate the lesson images and save them in the lesson `assets/` folder.
9. Create `voiceover.json` in the lesson folder with one narration segment per slide by default, adding fragment-level narration only when it genuinely helps instruction.
10. Define one female profile and one male profile in that manifest by default so the learner can switch voices in the browser.
11. When ElevenLabs credentials are configured locally, run `scripts/generate_elevenlabs_voiceover.py` against that manifest and save the audio files in the lesson `voiceover/` folder.
12. Then provide the complete `index.html` file with those images and audio references included.
13. Do not output a separate CSS file unless I explicitly ask for one.
14. Do not change the shared style unless absolutely necessary.
15. If new shared CSS is truly needed, put it in a short "CSS additions" section and explain exactly where it goes in shared-styles/master.css.
16. Do not invent organization policy, legal requirements, or clinical claims that are not supported by the source content.

Deck requirements:
- Usually 10-16 slides for a 15-minute lesson, unless the source clearly justifies more.
- Let the course and lesson content dictate the slide sequence.
- Choose the best lesson shape from the content rather than repeating a fixed formula.
- Include practical application when it meaningfully helps the lesson.
- Include `3–5` original images by default unless the user explicitly overrides that.
- Use images where they improve clarity, memory, tone, or scenario understanding, not as random decoration.
- Follow `OPENRECOVERY_IMAGE_CREATION_GUIDE.md` and keep all images in one consistent lesson-level style.
- Match the canonical reference image closely enough that the lesson images feel like the same family, not merely “inspired by” it.
- Reuse one shared style lock paragraph and one shared negative prompt across the lesson image set instead of rewriting the art direction from scratch image by image.
- If narration is enabled for the lesson, prefer one slide-enter narration file per slide unless the content specifically benefits from fragment-level cues.
- End with a concise key takeaways slide.
- Match the structure and polish defined in PRESENTATION_CONSISTENCY_REQUIREMENTS.md.
- Use `SLIDE_TEMPLATES.md` as a menu of layout/composition patterns, not a required content sequence.
- Do not force scenario, response script, reflection, knowledge check, documentation, or objectives slides into every lesson.

Before generating the final HTML, silently check:
- does the title fit without awkward wrapping?
- are transitions subtle and consistent?
- are images using the shared media treatment if present?
- if images are used, do they follow the OpenRecovery image guide and feel like the same visual family?
- do the images avoid flat vector / generic SaaS drift and clearly resemble the canonical reference style?
- does the deck actually include the expected `3–5` images unless the user asked otherwise?
- if narration is requested, does the lesson include `voiceover.json`, stable slide ids, local audio file references for both voice profiles, and an in-browser voice selector?
- are there any oversized paragraphs that should be broken into cards or columns?
- does the deck feel like unmistakably OpenRecovery based on the consistency spec?
- does the flow feel earned by the content rather than copied from another lesson?
```
