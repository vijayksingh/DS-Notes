# DS Notes Design System

DS Notes should feel like a calm study notebook: tactile, readable, and quick to scan.
Decoration is allowed only when it supports recall or orientation.

## Foundations

- **Paper surfaces** use warm off-white tokens and subtle borders. Avoid pure white panels.
- **Notebook texture** belongs to study content. Navigation should be quieter than the page.
- **Blue ink** marks selection, source links, and active study affordances.
- **Handwritten type** is for headings, labels, controls, and flashcard prompts.
- **Body type** is for longer explanatory text.
- **Focus states** must be visible and intentional. Native controls such as mobile disclosures use blue-ink focus treatment, not browser-default rings.
- **Borderless controls** use inline focus marks. Question rows and flashcard toolbar controls should emphasize their text/number, not draw full rectangular boxes.

## Tokens

The first shared token layer lives in `styles.css`.

- `--surface-panel`: floating index/sidebar paper.
- `--surface-panel-quiet`: quieter navigation paper for desktop index surfaces.
- `--surface-control`: quiet controls and selected rows.
- `--surface-highlight`: inline study emphasis and section headings.
- `--paper-card`, `--paper-card-layer-1`, `--paper-card-layer-2`: memory-card stack paper.
- `--border-soft`: default sketched border.
- `--border-strong`: active or selected sketched border.
- `--rule-soft`: faint dividers inside notebook/card content.
- `--radius-panel`, `--radius-control`, `--radius-pill`: hand-cut shapes.
- `--shadow-panel`, `--shadow-touch`: restrained paper depth.

## Components

### Workbench

The full interface sits on a centered desk, not against the browser edge.

- Keep the sidebar and notebook page together as one centered workbench on wide desktop screens.
- Do not let the notebook remain pinned left with a large empty right side.
- The notebook page can keep a readable max width; center the larger composition instead of stretching the page.

### Index Tray

The sidebar is an index tray, not a second notebook page.

- It should wrap its content instead of filling the viewport with empty paper.
- Search, filters, and selected problem rows should be quiet until interacted with.
- Active states use blue ink or highlighter marks, not heavy filled buttons.
- On desktop, keep the tray visible but visually quieter than the notebook page.
- On tablet, the tray becomes a shallow horizontal index before the notebook: brand, search/filter controls, and current problem should sit in one compact strip rather than a tall stacked panel.
- On narrow tablets, switch the index to a two-column strip before controls get squeezed. Never keep a search input so narrow that the placeholder becomes clipped.
- On mobile, the tray becomes an unframed quick-index disclosure. The collapsed state shows the current problem and a browse affordance; search and filters live inside the expanded utility strip.
- Mobile search is a notebook field, not a card: transparent background, no rounded box, and only a quiet baseline for orientation.
- Search results must never collapse into blank space. Show a short empty state when nothing matches.
- The active problem is marked with a title highlighter only. Do not use a left rail or card-like selected row inside the index.

### Pattern Filters

Filters are navigation aids, not primary actions.

- Use handwritten chip labels with transparent default states.
- The active filter uses a content-width highlighter mark.
- On mobile, filters stay in one short row so opening the index does not become a full-screen form.
- Mobile filter chips still need 44px tap targets even when their visual treatment stays quiet.

### Question Bank

The question bank is a table of contents for the memory card stack.

- It should orient the current card without becoming the main visual target.
- Active state uses the prompt number and a low inline highlighter. Avoid full blue link styling.
- Prompt rows stay unboxed; hover can add a faint inline mark but not a filled row.
- Keyboard focus follows the same inline system: strengthen the prompt text highlighter and number, never outline the full row.

### Memory Card

Flashcards are the main study object.

- Controls stay visually secondary. Reveal/Hide is plain ink text with a subtle underline, never a filled button or loud highlighter.
- Toolbar focus should strengthen the ink mark on the focused control instead of adding button chrome.
- On mobile, flashcard controls stay in one compact row so the card itself remains near the top of the revision flow.
- Mobile flashcard controls use transparent 44px hit areas. Quiet controls should not become tiny controls.
- Answers reveal inside the card language, not as alert panels.
- Card movement should feel like moving through a small stack.

### Core Model

The core model is the fastest path to the problem intuition.

- Keep it compact and close to the problem header.
- Use a stable ink rail instead of animated or generated brackets.
- Labels should help scanning; the invariant and avoid text are the actual content.
- Treat the pattern as the recognition hook. Invariant and avoid text should read like body notes, not three equally bold headings.
- Do not frame it as a card. It belongs on the notebook page itself.
- On mobile, keep label/value rows compact. Do not stack every label above its value unless the content would otherwise overflow.

### Field Notes

Field notes are the bottom revision lists.

- They should feel like written annotations, not generic markdown bullets.
- Aha lists use small blue ink marks.
- Review prompt lists use quiet numbered marks for repeatable practice.
- Headings can use a soft highlighter band; avoid boxes around these sections.
