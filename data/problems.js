window.DS_NOTES_PROBLEMS = [
  {
    id: "leetcode-0003",
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Unique Substring",
    difficulty: "Medium",
    source: {
      name: "Structy: Longest Unique Substring",
      url: "https://structy.net/problems/longest-unique-substring",
    },
    canonical: {
      platform: "LeetCode",
      number: 3,
      title: "Longest Substring Without Repeating Characters",
      url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    },
    notePath: "notes/0003-longest-substring-without-repeating-characters.md",
    patterns: ["Sliding Window", "Hash Set", "Two Pointers"],
    summary:
      "Find the length of the longest contiguous slice of a string where every character is unique.",
    approach: [
      "This problem becomes manageable once I treat the current substring as a window that must stay unique. The right pointer tries to bring in the next character, and the left pointer only moves when that next character would create a duplicate.",
      "The mistake I initially made was trying to add the right character first and then compare `set.size` with the window length. That detects the duplicate too late. The cleaner approach is to check whether `s[right]` already exists in the set, shrink from the left until it does not, and only then add the right character.",
      "After that repair step, the set and the window mean the same thing again: every character between `left` and `right` is unique. That is the moment when the window length is safe to compare against the best answer.",
    ],
    patternSummary:
      "Use a sliding window because the answer is a contiguous substring whose validity can be repaired locally instead of recomputed from scratch.",
    invariant:
      "After the shrink step finishes, the set contains exactly the characters in the current `left..right` window, and that window has no repeated characters.",
    gotchas: [
      "Substring means the answer must be contiguous, so a unique collection of characters is not enough unless the window boundaries also stay valid.",
      "When a duplicate arrives, shrink only until that specific duplicate is gone.",
      "Update the answer after the window is valid again.",
      "Do not wait for `set.size !== windowLength` after adding right. Repair before admitting a duplicate.",
    ],
    ahaClicks: [
      "The right pointer is the explorer and the left pointer is the repair step. I only move left when the next right character would break the uniqueness of the current window.",
      "The set is not the answer by itself. It is just the quick way to know what is currently inside the window, while the window boundaries are what actually define the substring.",
      "The click was the order of operations: make room for the right character before adding it, then score the window only after it is valid again.",
    ],
    reviewPrompts: [
      "When reviewing `pwwkew`, say out loud why `wke` is valid and `pwke` is not, even though both contain unique characters.",
      "Before writing code, restate the invariant: after repair, the set and the current window mean the same thing, and neither contains duplicates.",
      "To justify the runtime, remember that both pointers only move forward, so every character is added once and removed at most once.",
      "The false-start check is whether I am detecting the duplicate too late by comparing `set.size` to the window length after admitting the right character.",
    ],
    solutionLanguage: "JavaScript",
    solutionCode: `const longestUniqueSubstring = (s) => {
  const set = new Set()
  let window = ""
  let maxWindow = 0
  let left = 0
  let right = 0

  for (right; right < s.length; right++) {
    const char = s[right];

    if(set.has(char)) {
      // shrink condition arrived
      while(set.has(char)) {
        window = window.slice(1)
        set.delete(s[left])
        left++
      }
    }

    // now the right char is not in set anymore
    window += char
    set.add(char)

    // we added and now we will compute the maxWindow size
    if(set.size === window.length) {
      maxWindow = Math.max(window.length, maxWindow)
    }

  }

  return maxWindow
};

module.exports = {
  longestUniqueSubstring,
};`,
    cards: [
      {
        cue: "Pattern",
        question: "What is the one-line pattern recognition for this problem?",
        answer:
          "It asks for the longest contiguous substring under a validity rule, so use sliding window: expand right, shrink left when the window becomes invalid.",
      },
      {
        cue: "Invariant",
        question: "What should the window always mean?",
        answer:
          "After handling the current right character, the window should contain no duplicates. That invariant makes its length safe to compare with the best answer.",
      },
      {
        cue: "Repair",
        question: "What exactly happens when the right character is already inside the window?",
        answer:
          "Move left forward, removing characters from the set, until the duplicate copy has been removed. Then the right character can belong to a valid unique window.",
      },
      {
        cue: "False Start",
        question: "Why is the set-size-vs-window-length approach a trap?",
        answer:
          "It notices the duplicate only after the right character has already been added. Instead, check `set.has(s[right])` first, shrink until that is false, then add the right character and score the valid window.",
      },
      {
        cue: "Cost",
        question: "Why is this O(n) instead of O(n²)?",
        answer:
          "The right pointer only moves forward, and the left pointer only moves forward. Every character enters the window once and leaves it at most once.",
      },
      {
        cue: "Boundary",
        question: "What is the classic off-by-one check?",
        answer:
          "When the window spans indexes left through right, its length is `right - left + 1`, not `right - left`.",
      },
    ],
  },
];
