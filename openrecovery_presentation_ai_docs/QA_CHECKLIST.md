# QA Checklist For Every Deck

## File / Path Checks

- [ ] Lesson file is at `presentations/course-name/lesson-name/index.html`
- [ ] HTML links to `../../../core-assets/dist/reveal.css`
- [ ] HTML links to `../../../core-assets/dist/theme/white.css`
- [ ] HTML links to `../../../shared-styles/master.css`
- [ ] Plugin paths use `../../../core-assets/dist/plugin/...`
- [ ] Do not link to `../../../core-assets/plugin/...`

## Visual Checks

- [ ] First slide title fits when the browser window is smaller
- [ ] No major title has overlapping text
- [ ] No ugly orphan words on title/reflection slides
- [ ] Text is readable in embedded iframe view
- [ ] Text is readable in fullscreen view
- [ ] Final takeaway boxes have readable text color
- [ ] Cards are aligned and not cramped
- [ ] Arrows are small enough and not distracting
- [ ] Transitions feel subtle and consistent; avoid aggressive depth effects
- [ ] If images or diagrams are used, they follow the shared media/image treatment

## Navigation Checks

- [ ] Left/right arrows work
- [ ] Up/down arrows work if vertical slides exist
- [ ] Progress bar appears
- [ ] Slide number appears
- [ ] Fragments reveal in the right order
- [ ] Overview mode works if enabled
- [ ] Search plugin does not break the deck

## Content Checks

- [ ] Lesson has an appropriate number of slides for its time estimate
- [ ] Learning objectives are clear
- [ ] At least one practical scenario or application slide exists
- [ ] If there is a script, it sounds like something staff could actually say
- [ ] Key takeaways are concise
- [ ] No unsupported legal/clinical claims are presented as definitive policy

## LMS Preview Checks

- [ ] Root `index.html` iframe uses explicit `index.html` path
- [ ] Expand presentation button works
- [ ] Embedded deck is navigable after clicking inside it
- [ ] Page works locally
- [ ] Page works on Vercel
