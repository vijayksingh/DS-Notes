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
    invariant:
      "The current window from left to right contains no repeated characters after the shrink step finishes.",
    gotchas: [
      "Substring means contiguous. Do not accidentally solve for subsequence.",
      "When a duplicate arrives, shrink only until that specific duplicate is gone.",
      "Update the answer after the window is valid again.",
      "Do not wait for `set.size !== windowLength` after adding right. Repair before admitting a duplicate.",
    ],
    ahaClicks: [
      "The right pointer explores; the left pointer repairs.",
      "You do not restart after a duplicate because everything before left is already disqualified for the current right.",
      "The set is not the answer. The window boundaries are the answer.",
      "The order matters: make room for the right character before adding it.",
    ],
    reviewPrompts: [
      "Walk through `pwwkew` and say why the answer is `wke`, not `pwke`.",
      "Explain why each character is added and removed at most once.",
      "Describe the invariant before writing code.",
      "Explain why comparing `set.size` to window length after adding right is the wrong repair signal.",
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
        question: "What is the one-line pattern recognition for this problem?",
        answer:
          "It asks for the longest contiguous substring under a validity rule, so use sliding window: expand right, shrink left when the window becomes invalid.",
      },
      {
        question: "What should the window always mean?",
        answer:
          "After handling the current right character, the window should contain no duplicates. That invariant makes its length safe to compare with the best answer.",
      },
      {
        question: "What exactly happens when the right character is already inside the window?",
        answer:
          "Move left forward, removing characters from the set, until the duplicate copy has been removed. Then the right character can belong to a valid unique window.",
      },
      {
        question: "Why is the set-size-vs-window-length approach a trap?",
        answer:
          "It notices the duplicate only after the right character has already been added. Instead, check `set.has(s[right])` first, shrink until that is false, then add the right character and score the valid window.",
      },
      {
        question: "Why is this O(n) instead of O(n²)?",
        answer:
          "The right pointer only moves forward, and the left pointer only moves forward. Every character enters the window once and leaves it at most once.",
      },
      {
        question: "What is the classic off-by-one check?",
        answer:
          "When the window spans indexes left through right, its length is `right - left + 1`, not `right - left`.",
      },
    ],
  },
];
