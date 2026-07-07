# DS Notes Design System

DS Notes should feel like a calm study notebook: tactile, readable, and quick to scan.
Decoration is allowed only when it supports recall or orientation.

## Foundations

- **Paper surfaces** use warm off-white tokens and subtle borders. Avoid pure white panels.
- **Notebook texture** belongs to study content. Navigation should be quieter than the page.
- **Blue ink** marks selection, source links, and active study affordances.
- **Handwritten type** is for headings, labels, controls, and flashcard prompts.
- **Body type** is for longer explanatory text.

## Tokens

The first shared token layer lives in `styles.css`.

- `--surface-panel`: floating index/sidebar paper.
- `--surface-control`: quiet controls and selected rows.
- `--border-soft`: default sketched border.
- `--border-strong`: active or selected sketched border.
- `--radius-panel`, `--radius-control`, `--radius-pill`: hand-cut shapes.
- `--shadow-panel`, `--shadow-touch`: restrained paper depth.

## Components

### Index Tray

The sidebar is an index tray, not a second notebook page.

- It should wrap its content instead of filling the viewport with empty paper.
- Search, filters, and selected problem rows should be quiet until interacted with.
- Active states use blue ink or highlighter marks, not heavy filled buttons.

### Memory Card

Flashcards are the main study object.

- Controls stay visually secondary.
- Answers reveal inside the card language, not as alert panels.
- Card movement should feel like moving through a small stack.
