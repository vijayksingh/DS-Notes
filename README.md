# DS Notes

A small personal system for turning solved data-structure problems into revisable intuition cards.

The idea is simple:

- capture each problem once with canonical metadata;
- write down the intuition, gotchas, and "aha" moments while they are still fresh;
- review those notes through a lightweight flashcard-style documentation site.

## Structure

```text
.
├── index.html
├── styles.css
├── app.js
├── data/
│   └── problems.js
├── notes/
│   └── 0003-longest-substring-without-repeating-characters.md
└── templates/
    └── problem-note.md
```

## How to add a problem

1. Copy `templates/problem-note.md` into `notes/`.
2. Add a matching entry to `data/problems.js`.
3. Keep the `canonical` section filled in when the problem exists on LeetCode.
4. Write the cards as questions you want your future self to answer, not as polished explanations.

## Local review

Open `index.html` in a browser. No build step is required.

If a browser blocks local scripts, run a tiny static server:

```bash
python3 -m http.server 5173
```

Then open `http://localhost:5173`.

## Card writing rule

Each problem should preserve three kinds of memory:

- **Approach**: what pattern unlocked the solution?
- **Invariant**: what must stay true while the algorithm runs?
- **Gotcha**: what mistake would make you fail this again?

