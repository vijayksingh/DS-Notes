# DS Notes

A small personal system for turning solved data-structure problems into revisable intuition cards.

The idea is simple:

- capture each problem once with canonical metadata;
- write down the intuition, gotchas, and "aha" moments while they are still fresh;
- review those notes through a lightweight flashcard-style documentation site.

## Structure

```text
.
├── src/
│   ├── components/
│   │   └── ProblemNotebook.astro
│   ├── data/
│   │   └── problems.js
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── scripts/
│   │   └── app.js
│   └── styles/
│       └── global.css
├── public/
│   ├── notes/
│   │   └── 0003-longest-substring-without-repeating-characters.md
│   └── scripts/
│       └── app.js
├── scripts/
│   └── check-data.mjs
└── templates/
    └── problem-note.md
```

## How to add a problem

1. Copy `templates/problem-note.md` into `public/notes/`.
2. Add a matching entry to `src/data/problems.js`.
3. Keep the `canonical` section filled in when the problem exists on LeetCode.
4. Write the approach as an interview-sized paragraph, then write cards as questions you want your future self to answer.
5. Run `npm run check:data`.

## Local review

Run the Astro dev server:

```bash
npm run dev
```

Then open `http://127.0.0.1:5173/`.

To build the static site:

```bash
npm run build
```

## Card writing rule

Each problem should preserve three kinds of memory:

- **Approach**: what pattern unlocked the solution?
- **Invariant**: what must stay true while the algorithm runs?
- **Gotcha**: what mistake would make you fail this again?
