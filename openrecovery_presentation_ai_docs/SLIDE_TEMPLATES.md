# Slide Template Library

Use this file to choose how a slide is arranged, not what the slide must be about.

The source lesson content should determine:

- what each slide is about
- what order the slides appear in
- which slide types are skipped
- whether the lesson is concept-first, scenario-first, process-first, comparison-first, or something else

This file should determine:

- how the content is laid out
- which shared classes are used
- which transitions fit the moment
- how dense or spacious the slide should feel

## How To Use This File

1. Build the lesson outline from the source content first.
2. For each slide in that outline, choose the layout pattern that best fits the amount and type of information.
3. Reuse shared classes from `shared-styles/master.css`.
4. Repeat a strong layout when it helps the lesson feel coherent.
5. Skip any template that does not serve the lesson.

## Shared Building Blocks

These are the main structural pieces already defined in `shared-styles/master.css`.

- `.slide-shell` — base slide container with centered spacing
- `.center` / `.left` — alignment helpers
- `.brand-kicker` / `.brand-dot` — small brand label above major content
- `.subtitle` / `.muted` — supporting text treatments
- `.card-grid` / `.card-grid.two` — grid wrappers
- `.card` — standard content card
- `.two-column` — split layout
- `.quote-box` — emphasized full-width or side-panel callout
- `.boundary-spectrum` / `.spectrum-card` — ordered multi-card continuum
- `.scenario` — large case/situation panel
- `.script-box` — dialogue or scripted language block
- `.media-panel` / `.media-frame` / `.media-grid` — shared media system
- `.reflection-slide` / `.reflection-content` / `.reflection-title` — centered prompt layout
- `.dark-slide` / `.takeaway-list` — closing summary treatment
- `.footer-note` — small footer metadata line

## Structural Templates

1. **Opening Hero**
   - Arrangement: centered title, subtitle, topic pills, and footer note
   - Use classes: `.title-slide`, `.slide-shell.center`, `.title-content`, `.lesson-title`, `.title-subtitle`, `.pill-row`, `.footer-note`
   - Best for: lesson openings or major section openers
   - Transition: `fade`

2. **Single-Idea Callout**
   - Arrangement: one dominant statement or definition with minimal support copy
   - Use classes: `.slide-shell`, `.quote-box` or `.clean-title` + `.subtitle`
   - Best for: emphasis, definitions, or one strong idea
   - Transition: `fade`

3. **Split Explainer**
   - Arrangement: left-side explanation, right-side example, warning, quote, or visual emphasis
   - Use classes: `.two-column`, `.left`, `.card`, `.quote-box`
   - Best for: concept + support material
   - Transition: `slide` or `fade`

4. **Three-Card Grid**
   - Arrangement: three equal cards across a row
   - Use classes: `.card-grid`, `.card`
   - Best for: three parallel ideas, categories, principles, or examples
   - Transition: `slide`

5. **Two-Card Comparison**
   - Arrangement: two equal cards side by side
   - Use classes: `.card-grid.two`, `.card`
   - Best for: comparisons, distinctions, option pairs, pros/cons, do/don't
   - Transition: `slide`

6. **Spectrum / Continuum Row**
   - Arrangement: three to five horizontally ordered cards
   - Use classes: `.boundary-spectrum`, `.spectrum-card`
   - Best for: progression, risk levels, stages, tiers, or maturity scales
   - Transition: `slide`

7. **Framework / Step Sequence**
   - Arrangement: ordered cards representing a process or repeatable sequence
   - Use classes: `.card-grid`, `.card`, or `.boundary-spectrum` when ordered visually
   - Best for: steps, models, pathways, or decision sequences
   - Transition: `slide`

8. **Scenario / Case Frame**
   - Arrangement: one large central panel, optionally followed by one or two supporting cards beneath
   - Use classes: `.scenario`, `.script-box`, `.card-grid.two`
   - Best for: case examples, story setups, decision moments, or applied judgment
   - Transition: `fade`

9. **Script / Dialogue Panel**
   - Arrangement: full-width script box with staged lines or sample language
   - Use classes: `.script-box`, `.muted`
   - Best for: phrases, scripts, staff language, or modeled responses
   - Transition: `slide` or `fade`

10. **Table / Matrix**
   - Arrangement: full-width comparison or reference table
   - Use classes: `table.clean-table`
   - Best for: dense comparisons, criteria, reference points, or rule summaries
   - Transition: `slide`
   - Note: use sparingly

11. **Media Feature**
   - Arrangement: one dominant image or media frame with caption, optionally paired with short text
   - Use classes: `.media-panel`, `.media-frame`, `.media-caption`, `.two-column`
   - Best for: one strong visual moment, one diagram, or one screenshot
   - Transition: `fade`

12. **Media Comparison / Gallery**
   - Arrangement: two or three matching media frames in a grid
   - Use classes: `.media-grid`, `.media-grid.three`, `.media-frame`, `.media-caption`
   - Best for: side-by-side visual comparison or multiple examples in one visual family
   - Transition: `slide`

13. **Diagram / Screenshot Review**
   - Arrangement: contained diagram or screenshot with annotation, caption, or side explanation
   - Use classes: `.media-frame.contain`, `.media-caption`, `.two-column`
   - Best for: UI, charts, policy diagrams, decision trees, or process visuals
   - Transition: `slide`

14. **Centered Prompt**
   - Arrangement: large centered prompt with optional supporting cards below
   - Use classes: `.reflection-slide`, `.reflection-content`, `.reflection-title`, `.card-grid`
   - Best for: reflection, pause points, discussion prompts, or self-check moments
   - Transition: `fade`

15. **Dark Closing Summary**
   - Arrangement: dark slide with takeaway list or summary cards
   - Use classes: `.dark-slide`, `.takeaway-list`
   - Best for: endings, synthesis, or final reinforcement
   - Transition: `slide`

16. **Vertical Detail Stack**
   - Arrangement: one overview slide followed by one or more optional deeper-detail child slides
   - Use structure: parent `<section>` containing nested `<section>` slides
   - Best for: optional examples, references, elaboration, or secondary detail
   - Transition: usually `slide`

## Quick Selection Guide

Use this shortcut when choosing a layout:

- one big idea: `Single-Idea Callout`
- one explanation plus one example: `Split Explainer`
- three parallel points: `Three-Card Grid`
- two contrasting ideas: `Two-Card Comparison`
- ordered progression: `Spectrum / Continuum Row`
- step-by-step process: `Framework / Step Sequence`
- real-world case: `Scenario / Case Frame`
- scripted language: `Script / Dialogue Panel`
- dense comparison or reference: `Table / Matrix`
- one important image or screenshot: `Media Feature`
- multiple visual examples: `Media Comparison / Gallery`
- diagram with commentary: `Diagram / Screenshot Review`
- centered pause or reflection: `Centered Prompt`
- final synthesis: `Dark Closing Summary`
- optional deeper detail: `Vertical Detail Stack`

## Transition Guidance By Layout

- `fade`: opening hero, single-idea callout, scenario frame, centered prompt, media feature
- `slide`: grids, comparisons, spectrum rows, process steps, tables, most standard content slides
- Keep transitions subtle even when layouts vary

## Layout Rules

- Prefer repeating proven structural patterns rather than inventing one-off arrangements.
- Keep whitespace generous.
- Avoid overfilling any one slide.
- Use fragments to stage multi-part content only when it improves pacing.
- If a layout does not fit the content cleanly, choose a different template rather than forcing the content into it.
