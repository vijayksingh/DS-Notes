# Minimum Window Substring

AlgoMonster problem, close to LeetCode 76, Minimum Window Substring.
Pattern: sliding window with frequency maps.

## Problem

Given two strings, `original` and `check`, return the shortest substring of `original` that contains every character in `check`.

Duplicates matter. If `check = "aabc"`, the answer window must contain two `a`s, one `b`, and one `c`.

If multiple valid windows have the same length, return the lexicographically smallest one. For `original = "cdbaebaecd"` and `check = "abc"`, both `cdba` and `baec` have length `4`, so the answer is `baec`.

`original` and `check` contain uppercase and lowercase English letters, and characters are case-sensitive.

## Approach Memory

I need the shortest part of `original` that contains all characters from `check`. The detail that changes the problem is duplicates: if `check` is `aabc`, the window must contain two `a`s, one `b`, and one `c`. So this is not a `set` problem; I need a `frequency map`.

First I build a frequency map called `need` from `check`. Then I scan `original` with a sliding window and keep another frequency map called `have` for the current window. `right` adds one character into `have`, and `left` removes one character from `have` when the current window is already valid and I want to see if it can become smaller.

The only annoying part is knowing when the window has enough characters. I do not compare the whole `need` map and `have` map every time. Instead, `required` is the number of distinct characters I need, and `formed` is how many of those character requirements are currently satisfied. When `formed === required`, the current window has everything `check` asks for.

Once the window is valid, I save it if it is better, then move `left` inward. Better means shorter first. If two valid windows have the same length, I keep the `lexicographically smaller` one.

## Code

```js
function getMinimumWindow(original, check) {
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
};
```

## Recall

My invariant is that `have` counts only the current window `original[left..right]`. When `formed === required`, that window has enough of every character from `check`, including duplicates.

For `original = "cdbaebaecd"` and `check = "abc"`, both `cdba` and `baec` are valid windows of length 4, so I return `baec` because it is lexicographically smaller.

The key order is: add `original[right]`, update `formed` if this character just became satisfied, then shrink from `left` while the window is valid.

The reason I need `required` and `formed` is simple: only one character changes when I move a pointer. I can update the answer for that one character instead of comparing both `frequency maps` from scratch.

The corner case I watch for is using `check.length` as `required`. That is wrong because duplicates live inside the frequency values. `required` should be `need.size`.
