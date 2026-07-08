export const problems = [
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
    problemStatement: [
      "Given a string `s`, return the length of the longest substring without repeating characters.",
      "The answer is a length, not the substring itself. The substring must be contiguous, so skipped characters do not count.",
      "Example: for `s = \"pwwkew\"`, the answer is `3` because `wke` is a valid substring, while `pwke` is not contiguous.",
    ],
    approach: [
      "I would use a sliding window with two pointers and a set. `right` expands the window by looking at the next character, and the set tells me whether that character is already inside; if it is, `left` shrinks the window while I delete characters from the set. Once `s[right]` is no longer in the set, I insert it and update the best length from the valid window.",
    ],
    patternSummary:
      "This is sliding window with a set: the window gives me the contiguous substring, and the set lets me detect duplicates in O(1) while I expand and shrink.",
    invariant:
      "After I finish shrinking, the set represents the current window exactly, and that window has no repeated characters.",
    gotchas: [
      "A unique set of characters is not enough; the answer must come from one contiguous window.",
      "When a duplicate arrives, shrink only until that specific duplicate is gone.",
      "Update the answer after the window is valid again.",
      "Do not add `s[right]` first and then notice `set.size !== windowLength`; check the set before inserting.",
    ],
    ahaClicks: [
      "`right` expands the window, and `left` shrinks it only when the next character would create a duplicate.",
      "The set is not the answer by itself. It is just the quick way to know what is currently inside the window, while the window boundaries are what actually define the substring.",
      "The click was the order of operations: make room for the right character before adding it, then score the window only after it is valid again.",
    ],
    reviewPrompts: [
      "For `pwwkew`, I would point out that `wke` is valid because it is contiguous, while `pwke` is not a substring even though its characters are unique.",
      "My invariant is that after shrinking, the set and the current window describe the same characters, with no duplicates.",
      "The runtime is O(n) because `right` only moves forward to expand and `left` only moves forward to shrink; the set insert/delete work happens at most once per character.",
      "The corner case I watch for is checking for the duplicate too late by inserting `s[right]` first and only then comparing `set.size` with the window length.",
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
        cue: "Shrink",
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
  {
    id: "leetcode-0076",
    slug: "minimum-window-substring",
    title: "Minimum Window Substring",
    difficulty: "Hard",
    source: {
      name: "AlgoMonster: Minimum Window Substring",
      url: "https://algo.monster/problems/minimum_window_substring",
    },
    canonical: {
      platform: "LeetCode",
      number: 76,
      title: "Minimum Window Substring",
      url: "https://leetcode.com/problems/minimum-window-substring/",
    },
    notePath: "notes/0076-minimum-window-substring.md",
    patterns: ["Sliding Window", "Hash Map", "Two Pointers"],
    summary:
      "Find the shortest part of original that contains all characters from check, including duplicate counts. If lengths tie, return the lexicographically smallest window.",
    problemStatement: [
      "Given two strings, `original` and `check`, return the shortest substring of `original` that contains every character in `check`.",
      "Duplicates matter. If `check = \"aabc\"`, the answer window must contain two `a`s, one `b`, and one `c`.",
      "If multiple valid windows have the same length, return the lexicographically smallest one. For `original = \"cdbaebaecd\"` and `check = \"abc\"`, both `cdba` and `baec` have length `4`, so the answer is `baec`.",
      "`original` and `check` contain uppercase and lowercase English letters, and characters are case-sensitive.",
    ],
    approach: [
      "Because `check` can contain duplicates, this is a frequency map problem, not a set problem. I build a frequency map called `need` from `check`, then keep another frequency map called `have` for the current window in `original`. `right` adds one character into `have`, `left` removes one character from `have` while the window is valid, and `required` / `formed` tells me when every needed frequency is satisfied; when `formed === required`, I score the window and keep the shorter answer, breaking ties with the lexicographically smaller string.",
    ],
    patternSummary:
      "Sliding window with frequency maps: `need` is the target, `have` is the current window, and `required` / `formed` tells me when the window is valid.",
    invariant:
      "`have` counts `original[left..right]`. When `formed === required`, that window contains every needed character count.",
    gotchas: [
      "`check` can contain duplicates, so a `set` is not enough; use a `frequency map`.",
      "`required` is `need.size`, not `check.length`.",
      "`formed` changes only when a character crosses the needed-count boundary.",
      "Score the window before removing `original[left]`, because that is the valid window.",
      "For equal lengths, compare the candidate string with the saved answer.",
    ],
    ahaClicks: [
      "The window is valid when it has enough counts, not when it has exactly the same map as `check`. Extra characters are allowed.",
      "I do not need to compare two `frequency maps` from scratch. Moving a pointer changes one character, so I update `formed` only for that character.",
      "A character becomes satisfied when its `have` count equals its `need` count. Extra copies after that do not make `formed` bigger.",
      "The shrink loop is where the shortest answer is found: while the window is valid, score it, then remove from the left.",
    ],
    reviewPrompts: [
      "My invariant is that `have` counts only `original[left..right]`, and `formed === required` only when that window has all needed counts.",
      "For `cdbaebaecd` and `abc`, both `cdba` and `baec` have length 4, so I return `baec` because it is `lexicographically smaller`.",
      "The key order is add `original[right]`, update `formed` if that character just became satisfied, then shrink from `left` while the window is valid.",
      "The reason `required` is `need.size` is that duplicates are already stored in the map counts.",
      "I score before removing `left` because after the removal the window may stop being valid.",
    ],
    solutionLanguage: "JavaScript",
    solutionCode: `function getMinimumWindow(original, check) {
  // need says what the final answer must contain.
  // Example: check = "aabc" means need has a:2, b:1, c:1.
  const need = new Map();

  for (const char of check) {
    need.set(char, (need.get(char) ?? 0) + 1);
  }

  // have says what the current window original[left..right] contains.
  const have = new Map();

  // required is about distinct characters, not total characters.
  // For "aabc", required is 3 because the distinct needs are a, b, c.
  const required = need.size;

  // formed counts how many distinct needs are satisfied right now.
  // formed becomes 3 only when a, b, and c all have enough frequency.
  let formed = 0;

  let left = 0;
  let answer = "";

  for (let right = 0; right < original.length; right++) {
    const rightChar = original[right];

    // Expand: include original[right] in the current window.
    have.set(rightChar, (have.get(rightChar) ?? 0) + 1);

    // This requirement is newly satisfied only when the count reaches exactly
    // the needed count. Extra copies after that do not increase formed again.
    if (need.has(rightChar) && have.get(rightChar) === need.get(rightChar)) {
      formed++;
    }

    // If formed == required, the window is valid.
    // Now shrink it from the left to find the smallest valid version.
    while (left <= right && formed === required) {
      const candidate = original.slice(left, right + 1);

      // Score before removing original[left], because the current window is valid.
      if (
        answer === "" ||
        candidate.length < answer.length ||
        (candidate.length === answer.length && candidate < answer)
      ) {
        answer = candidate;
      }

      const leftChar = original[left];
      have.set(leftChar, have.get(leftChar) - 1);

      // If removing leftChar makes its count too small, the window is no
      // longer valid, so the shrink loop must stop after this move.
      if (need.has(leftChar) && have.get(leftChar) < need.get(leftChar)) {
        formed--;
      }

      left++;
    }
  }

  return answer;
}

module.exports = {
  getMinimumWindow,
};`,
    cards: [
      {
        cue: "Pattern",
        question: "What is the one-line pattern recognition for this problem?",
        answer:
          "It asks for the shortest contiguous substring that contains required character counts, so use `sliding window` with `frequency maps`.",
      },
      {
        cue: "Need Map",
        question: "Why do I start by counting `check`?",
        answer:
          "Because `check` can contain duplicates. The `need` map tells me the exact count each character must have inside the answer window.",
      },
      {
        cue: "Counters",
        question: "What do `required` and `formed` mean?",
        answer:
          "`required` is how many distinct character requirements exist. `formed` is how many of those requirements are currently satisfied by the window.",
      },
      {
        cue: "Valid Window",
        question: "When is the current window valid?",
        answer:
          "The window is valid when `formed === required`. That means every distinct character in `need` has enough frequency in `have`.",
      },
      {
        cue: "Shrink",
        question: "What happens inside the shrink loop?",
        answer:
          "First score the current valid window. Then remove `original[left]`. If that removal makes a needed character too low, decrement `formed` and stop shrinking.",
      },
      {
        cue: "Tie Break",
        question: "Where does the lexicographic tie-break fit?",
        answer:
          "It belongs in the best-answer update. Replace the answer when the candidate is shorter, or when it has the same length and is `lexicographically smaller`.",
      },
      {
        cue: "False Start",
        question: "What comparison am I avoiding?",
        answer:
          "I am avoiding a full `need` map versus `have` map comparison after every move. Since one pointer move changes one character, I only update `formed` for that character.",
      },
      {
        cue: "Cost",
        question: "What is the runtime story?",
        answer:
          "Each pointer only moves forward, so the window maintenance is linear. The maps are small because the input is only English letters.",
      },
    ],
  },
];
