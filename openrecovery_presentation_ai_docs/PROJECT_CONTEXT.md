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
└── ethics-boundaries-recovery-counseling/
    └── lesson-01-understanding-professional-boundaries/
        └── index.html
```

## Intended Repo Structure

```text
openrecovery-presentations/
├── index.html
├── core-assets/
│   └── dist/
├── shared-styles/
│   └── master.css
└── presentations/
    └── course-name/
        └── lesson-name/
            └── index.html
```

## Editable Files

Usually edit only:

```text
index.html
shared-styles/master.css
presentations/course-name/lesson-name/index.html
```

Do not modify Reveal.js core files unless the tech team explicitly asks:

```text
core-assets/dist/reveal.css
core-assets/dist/reveal.js
core-assets/dist/theme/white.css
```
