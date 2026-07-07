let annotate = null;
let annotationGroup = null;
let motionAnimate = null;
window.__dsNotesEnhancement = {
  roughNotation: "loading",
  motion: "loading",
  annotations: 0,
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const enhancementReady = Promise.allSettled([
  import("https://esm.sh/rough-notation@0.5.1?bundle"),
  import("https://cdn.jsdelivr.net/npm/motion@12.42.2/+esm"),
])
  .then(([roughNotationResult, motionResult]) => {
    if (roughNotationResult.status === "fulfilled") {
      annotate = roughNotationResult.value.annotate;
      annotationGroup = roughNotationResult.value.annotationGroup;
      window.__dsNotesEnhancement.roughNotation = "ready";
    } else {
      window.__dsNotesEnhancement.roughNotation = "failed";
    }

    if (motionResult.status === "fulfilled") {
      motionAnimate = motionResult.value.animate;
      window.__dsNotesEnhancement.motion = "ready";
    } else {
      window.__dsNotesEnhancement.motion = "failed";
    }

    window.requestAnimationFrame(() => {
      renderRoughAnnotations();
    });
  })
  .catch((error) => {
    window.__dsNotesEnhancement.error = error?.message ?? String(error);
  });


const state = {
  activeProblemId: window.DS_NOTES_PROBLEMS[0]?.id,
  activePattern: "All",
  cardIndex: 0,
  revealed: false,
};

let activeAnnotations = [];
let isAnimatingCard = false;

const els = {
  search: document.querySelector("#searchInput"),
  filters: document.querySelector("#patternFilters"),
  list: document.querySelector("#problemList"),
  source: document.querySelector("#problemSource"),
  title: document.querySelector("#problemTitle"),
  summary: document.querySelector("#problemSummary"),
  meta: document.querySelector("#metaPanel"),
  pattern: document.querySelector("#patternText"),
  invariant: document.querySelector("#invariantText"),
  gotcha: document.querySelector("#gotchaText"),
  counter: document.querySelector("#cardCounter"),
  question: document.querySelector("#cardQuestion"),
  answer: document.querySelector("#cardAnswer"),
  previous: document.querySelector("#prevCard"),
  reveal: document.querySelector("#revealCard"),
  next: document.querySelector("#nextCard"),
  aha: document.querySelector("#ahaList"),
  review: document.querySelector("#reviewList"),
  questionCount: document.querySelector("#questionCount"),
  questions: document.querySelector("#questionList"),
};

function uniquePatterns() {
  const patterns = window.DS_NOTES_PROBLEMS.flatMap((problem) => problem.patterns);
  return ["All", ...Array.from(new Set(patterns)).sort()];
}

function activeProblem() {
  return window.DS_NOTES_PROBLEMS.find((problem) => problem.id === state.activeProblemId);
}

function filteredProblems() {
  const term = els.search.value.trim().toLowerCase();
  return window.DS_NOTES_PROBLEMS.filter((problem) => {
    const matchesPattern =
      state.activePattern === "All" || problem.patterns.includes(state.activePattern);
    const haystack = [
      problem.title,
      problem.source.name,
      problem.canonical?.title,
      problem.summary,
      ...problem.patterns,
      ...problem.gotchas,
      ...problem.ahaClicks,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return matchesPattern && haystack.includes(term);
  });
}

function renderFilters() {
  els.filters.innerHTML = "";
  for (const pattern of uniquePatterns()) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chip";
    button.textContent = pattern;
    button.setAttribute("aria-pressed", String(pattern === state.activePattern));
    button.addEventListener("click", () => {
      state.activePattern = pattern;
      render();
    });
    els.filters.append(button);
  }
}

function renderProblemList() {
  const problems = filteredProblems();
  els.list.innerHTML = "";

  for (const problem of problems) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "problem-link";
    button.setAttribute("aria-current", String(problem.id === state.activeProblemId));
    button.innerHTML = `
      <strong>${problem.title}</strong>
      <small>${problem.canonical ? `LC ${problem.canonical.number}` : problem.source.name} · ${problem.patterns.join(", ")}</small>
    `;
    button.addEventListener("click", () => {
      state.activeProblemId = problem.id;
      state.cardIndex = 0;
      state.revealed = false;
      render();
    });
    els.list.append(button);
  }
}

function renderMeta(problem) {
  const sourceLabel = problem.source.name.split(":")[0] ?? problem.source.name;
  const canonical = problem.canonical
    ? `
      <div class="meta-item">
        <span class="label">Canonical</span>
        <a
          href="${problem.canonical.url}"
          target="_blank"
          rel="noreferrer"
          title="${problem.canonical.title}"
        >
          ${problem.canonical.platform} ${problem.canonical.number}
        </a>
      </div>
    `
    : "";

  els.meta.innerHTML = `
    <div class="meta-item">
      <span class="label">Source</span>
      <a href="${problem.source.url}" target="_blank" rel="noreferrer" title="${problem.source.name}">
        ${sourceLabel}
      </a>
    </div>
    ${canonical}
    <div class="meta-item">
      <span class="label">Level</span>
      <strong>${problem.difficulty}</strong>
    </div>
    <div class="meta-item">
      <span class="label">Note</span>
      <a href="${problem.notePath}" title="${problem.notePath}">Markdown</a>
    </div>
  `;
}

function renderCard(problem) {
  const cards = problem.cards;
  const card = cards[state.cardIndex];
  const hasCards = cards.length > 0;

  els.counter.textContent = hasCards ? `${state.cardIndex + 1} / ${cards.length}` : "0 / 0";
  els.question.textContent = card?.question ?? "No cards yet.";
  els.answer.textContent = card?.answer ?? "";
  els.answer.hidden = !state.revealed;
  els.reveal.textContent = state.revealed ? "Hide" : "Reveal";
  els.previous.disabled = !hasCards;
  els.next.disabled = !hasCards;
  els.reveal.disabled = !hasCards;
}

function renderCardOnly() {
  const problem = activeProblem();
  if (!problem) return;

  renderCard(problem);
  renderQuestionBank(problem);
}

async function animateCardChange(updateState, direction = 1) {
  if (isAnimatingCard) return;

  const card = document.querySelector(".flashcard");
  const stack = document.querySelector(".flashcard-stack");
  const layerOne = document.querySelector(".deck-layer-one");
  const layerTwo = document.querySelector(".deck-layer-two");
  const canAnimate = motionAnimate && card && stack && !prefersReducedMotion.matches;

  if (!canAnimate) {
    updateState();
    renderCardOnly();
    return;
  }

  isAnimatingCard = true;
  els.previous.disabled = true;
  els.next.disabled = true;
  els.reveal.disabled = true;

  try {
    const outgoingCard = card.cloneNode(true);
    outgoingCard.classList.add("flashcard-ghost");
    outgoingCard.setAttribute("aria-hidden", "true");
    outgoingCard.querySelectorAll("[id]").forEach((node) => node.removeAttribute("id"));
    stack.append(outgoingCard);

    updateState();
    renderCardOnly();

    const incomingCard = motionAnimate(
      card,
      {
        x: [direction * 8, 0],
        y: [7, 0],
        rotate: [direction * 0.25, 0],
      },
      { type: "spring", duration: 0.28, bounce: 0.03 }
    );

    const firstLayer = layerOne
      ? motionAnimate(
          layerOne,
          {
            x: [13, 8],
            y: [12, 7],
            rotate: [-0.24, 0.2],
            opacity: [0.82, 1],
          },
          { type: "spring", duration: 0.28, bounce: 0.02 }
        )
      : null;

    const secondLayer = layerTwo
      ? motionAnimate(
          layerTwo,
          {
            x: [18, 13],
            y: [17, 12],
            rotate: [0.12, -0.24],
            opacity: [0.62, 1],
          },
          { type: "spring", duration: 0.28, bounce: 0.02 }
        )
      : null;

    const outgoing = motionAnimate(
      outgoingCard,
      {
        x: [0, direction * -52, direction * -92],
        y: [0, -6, -10],
        rotate: [0, direction * -1.4, direction * -2.4],
        opacity: [1, 1, 0],
      },
      { duration: 0.24, ease: "easeOut" }
    );

    await Promise.all(
      [outgoing, incomingCard, firstLayer, secondLayer]
        .filter(Boolean)
        .map((animation) => animation.finished)
    );
    outgoingCard.remove();
  } finally {
    const problem = activeProblem();
    const hasCards = problem?.cards.length > 0;
    document.querySelectorAll(".flashcard-ghost").forEach((ghost) => ghost.remove());
    els.previous.disabled = !hasCards;
    els.next.disabled = !hasCards;
    els.reveal.disabled = !hasCards;
    isAnimatingCard = false;
  }
}

function renderQuestionBank(problem) {
  els.questionCount.textContent = `${problem.cards.length} prompts`;
  els.questions.innerHTML = "";

  for (const [index, card] of problem.cards.entries()) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "question-jump";
    button.setAttribute("aria-current", String(index === state.cardIndex));
    const questionText = document.createElement("span");
    questionText.className = "question-text";
    questionText.textContent = card.question;
    button.append(questionText);
    button.addEventListener("click", () => {
      if (index === state.cardIndex) return;
      const direction = index >= state.cardIndex ? 1 : -1;
      animateCardChange(() => {
        state.cardIndex = index;
        state.revealed = false;
      }, direction);
    });
    li.append(button);
    els.questions.append(li);
  }
}

function renderListItems(element, items) {
  element.innerHTML = "";
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    element.append(li);
  }
}

function renderProblem() {
  const problem = activeProblem();
  if (!problem) return;

  els.source.textContent = problem.source.name;
  els.title.textContent = problem.title;
  els.summary.textContent = problem.summary;
  els.pattern.textContent = problem.patterns.join(" + ");
  els.invariant.textContent = problem.invariant;
  els.gotcha.textContent = problem.gotchas[0] ?? "-";

  renderMeta(problem);
  renderCard(problem);
  renderQuestionBank(problem);
  renderListItems(els.aha, problem.ahaClicks);
  renderListItems(els.review, problem.reviewPrompts);
  window.requestAnimationFrame(renderRoughAnnotations);
}

function render() {
  renderFilters();
  renderProblemList();
  renderProblem();
}

els.search.addEventListener("input", render);

els.previous.addEventListener("click", () => {
  const problem = activeProblem();
  animateCardChange(() => {
    state.cardIndex = (state.cardIndex - 1 + problem.cards.length) % problem.cards.length;
    state.revealed = false;
  }, -1);
});

els.next.addEventListener("click", () => {
  const problem = activeProblem();
  animateCardChange(() => {
    state.cardIndex = (state.cardIndex + 1) % problem.cards.length;
    state.revealed = false;
  }, 1);
});

els.reveal.addEventListener("click", () => {
  state.revealed = !state.revealed;
  renderCard(activeProblem());

  if (state.revealed && motionAnimate && !prefersReducedMotion.matches) {
    motionAnimate(
      els.answer,
      { opacity: [0, 1], y: [-4, 0] },
      { duration: 0.18, ease: "easeOut" }
    );
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === " " && event.target === document.body) {
    event.preventDefault();
    els.reveal.click();
  }
  if (event.key === "ArrowRight") els.next.click();
  if (event.key === "ArrowLeft") els.previous.click();
});

render();

function clearAnnotations() {
  for (const annotation of activeAnnotations) {
    if (typeof annotation.remove === "function") {
      annotation.remove();
    }
  }
  activeAnnotations = [];
}

function renderRoughAnnotations() {
  if (!annotate || !annotationGroup) return;
  clearAnnotations();

  const title = els.title;

  if (!title) return;

  activeAnnotations = [
    annotate(title, {
      type: "underline",
      color: "#1f5e9f",
      strokeWidth: 2,
      padding: 2,
      iterations: 1,
      animationDuration: 0,
    }),
  ];

  annotationGroup(activeAnnotations).show();
  window.__dsNotesEnhancement.annotations = activeAnnotations.length;
}

window.addEventListener("resize", () => {
  window.requestAnimationFrame(() => {
    renderRoughAnnotations();
  });
});
