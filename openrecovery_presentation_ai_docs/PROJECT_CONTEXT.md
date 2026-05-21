# Project Context

## Goal

Create many consistent Reveal.js HTML5 slide decks for OpenRecovery LMS training courses.

The presentations should be:

- lightweight HTML5
- embeddable in the LMS dashboard
- consistent across courses
- professional but not over-designed
- easy for AI to generate from lesson content
- easy for the tech team to render, embed, or migrate

## Current Prototype

Prototype repo:

```text
https://github.com/IsaacEpstein81/openrecovery-presentations
```

Prototype preview:

```text
https://openrecovery-presentations.vercel.app/
```

Current test lesson:

```text
presentations/
└── sexual-harassment-in-treatment-settings/
    └── lesson-01-what-employees-need-to-know/
        ├── index.html
        ├── IMAGE_PROMPTS.md
        └── assets/
```

Current root preview shell:

```text
index.html
```

`index.html` currently embeds one primary lesson inside an LMS-style wrapper with sidebar, topbar, fullscreen behavior, and an assistant panel. During active local/Vercel iteration, lesson URLs and stylesheet links may use `?v=...` query strings to force the iframe to load the latest deck changes.

## Intended Repo Structure

```text
openrecovery-presentations/
├── index.html
├── core-assets/
│   └── dist/
├── shared-runtime/
│   └── lesson-runtime.js
├── shared-styles/
│   ├── lesson-runtime.css
│   └── master.css
└── presentations/
    └── course-name/
        └── lesson-name/
            ├── index.html
            ├── IMAGE_PROMPTS.md
            ├── voiceover.json
            ├── voiceover/
            └── assets/
```

## Editable Files

Usually edit only:

```text
index.html
shared-runtime/lesson-runtime.js
shared-styles/lesson-runtime.css
shared-styles/master.css
presentations/course-name/lesson-name/index.html
presentations/course-name/lesson-name/assets/*
openrecovery_presentation_ai_docs/*.md
```

Do not modify Reveal.js core files unless the tech team explicitly asks:

```text
core-assets/dist/reveal.css
core-assets/dist/reveal.js
core-assets/dist/theme/white.css
```
