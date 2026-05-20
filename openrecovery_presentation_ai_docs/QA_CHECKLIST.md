# QA Checklist For Every Deck

## File / Path Checks

- [ ] Lesson file is at `presentations/course-name/lesson-name/index.html`
- [ ] HTML links to `../../../core-assets/dist/reveal.css`
- [ ] HTML links to `../../../core-assets/dist/theme/white.css`
- [ ] HTML links to `../../../shared-styles/master.css` or a versioned equivalent such as `../../../shared-styles/master.css?v=...`
- [ ] Plugin paths use `../../../core-assets/dist/plugin/...`
- [ ] Do not link to `../../../core-assets/plugin/...`

## Visual Checks

- [ ] First slide title fits when the browser window is smaller
- [ ] No major title has overlapping text
- [ ] No ugly orphan words on title/reflection slides
- [ ] Text is readable in embedded iframe view
- [ ] Text is readable in fullscreen view
- [ ] Slide-specific width overrides match in embedded iframe view and fullscreen
- [ ] Final takeaway boxes have readable text color
- [ ] Final takeaway title/cards are not artificially narrowed in embedded view
- [ ] Cards are aligned and not cramped
- [ ] Two-column slides do not overlap in embedded iframe view
- [ ] Arrows are small enough and not distracting
- [ ] If an in-deck navigator exists, its launcher does not block important slide content in framed view
- [ ] If compact in-deck launchers share a bottom dock, they sit cleanly side by side and the slide content clears them in framed view
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
- [ ] If click-to-advance is enabled, it does not hijack links or custom controls
- [ ] If a custom slide navigator exists, it opens, closes, and jumps to the intended slide
- [ ] If a custom slide navigator exists, its scroll affordance is visible without requiring a trackpad gesture or mouse wheel

## Voiceover Checks

- [ ] If narration is enabled, `voiceover.json` exists in the lesson folder
- [ ] If narration is enabled, expected audio files exist in the lesson `voiceover/` folder for each declared voice profile
- [ ] The narration toggle loads, starts, and stops cleanly
- [ ] If narration controls auto-collapse, reopening or closing them does not interrupt playback unless the explicit stop action is used
- [ ] If a dock-level pause/resume control exists, it appears only during an active narration session and resumes the current slide audio without restarting it
- [ ] If multiple voice profiles exist, the in-browser voice selector changes playback to the chosen voice
- [ ] Slide changes play the intended local audio file
- [ ] If narration is intended to feel like guided playback, remaining slide fragments reveal during the MP3 before the deck advances
- [ ] If the learner manually navigates during narration, the current audio can continue without forcing one extra automatic slide advance at the end of that cue
- [ ] Narration does not require a browser API key or live text-to-speech call

## Content Checks

- [ ] Lesson has an appropriate number of slides for its time estimate
- [ ] Learning objectives are clear
- [ ] At least one practical scenario or application slide exists
- [ ] If there is a script, it sounds like something staff could actually say
- [ ] Key takeaways are concise
- [ ] No unsupported legal/clinical claims are presented as definitive policy

## LMS Preview Checks

- [ ] Root `index.html` iframe uses explicit `index.html` path
- [ ] Root `index.html` iframe uses an updated version token when cache-busting is needed during active preview iteration
- [ ] Root `index.html` iframe allows autoplay when narrated lessons are embedded
- [ ] Expand presentation button works
- [ ] Embedded deck is navigable after clicking inside it
- [ ] External resource links open outside the iframe
- [ ] Page works locally
- [ ] Page works on Vercel
