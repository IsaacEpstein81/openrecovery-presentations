# New Lesson Deck Prompt

Copy and paste this into a fresh AI session when you want a new OpenRecovery lesson deck created from a source document.

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
12. create `voiceover.json` in the lesson folder using `openrecovery_presentation_ai_docs/ELEVENLABS_VOICEOVER_WORKFLOW.md`, write that narration from the actual slide content, and use the shared pronunciation rules file for recurring spoken-form fixes when possible
13. define one female voice profile and one male voice profile by default unless I explicitly ask for a single voice
14. add stable `<section id="...">` values for each narrated slide and wire the deck to local pre-generated audio files through the shared lesson runtime assets instead of browser speech synthesis or lesson-specific inline narration code
15. when ElevenLabs credentials are configured locally, preferably through the repo-root `.env`, run `scripts/generate_elevenlabs_voiceover.py` against that `voiceover.json` file and save the audio files in the lesson `voiceover/` folder
16. expose the browser voice selector so the learner can switch between the rendered voice profiles
17. include the generated images in the deck using the shared media classes and keep the deck consistent with `PRESENTATION_CONSISTENCY_REQUIREMENTS.md`, `OPENRECOVERY_IMAGE_CREATION_GUIDE.md`, `shared-styles/master.css`, `shared-styles/lesson-runtime.css`, and `shared-runtime/lesson-runtime.js`
18. if the generated images drift toward flat vector or generic SaaS illustration, revise the shared style lock and regenerate them before finalizing the deck
19. do not redesign the deck system unless truly necessary
20. update CURRENT_TASK.md, SESSION_LOG.md, and DECISIONS.md if any durable shared-system change is made

Use `openrecovery_presentation_ai_docs/AI_DECK_GENERATION_PROMPT.md` for the deck-generation rules.

Source document:
[PASTE LOCAL FILE PATH, GOOGLE DOC LINK, OR LESSON CONTENT]

Use the source document to infer the course name, lesson number, lesson title, estimated time, audience, and key concepts unless I explicitly override them.

Optional notes:
- target lesson: [only if the source document contains multiple lessons]
- must-cover concepts: [optional]
- desired scenario or roleplay: [optional]
- desired script language: [optional]
- desired visuals: [optional]
- image preference override: [optional, if you want fewer, more, or no images]
- narration preference override: [optional, if you want no narration or fragment-level narration]
- voiceover alignment note: [optional, if you want the narration tighter, looser, or more explicitly matched to slide fragments]
- compliance or policy cautions: [optional]
```
