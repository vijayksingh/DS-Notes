# Longest Unique Substring

- Source: Structy, `longest-unique-substring`
- Canonical: LeetCode 3, Longest Substring Without Repeating Characters
- Pattern: Sliding Window, Hash Set, Two Pointers
- Difficulty: Medium

## Problem Memory

Find the longest contiguous piece of a string where no character repeats.

The important word is **contiguous**. This is a substring problem, not a subsequence problem.

## Intuition

Keep a window that represents the current unique substring.

The right pointer tries to grow the window. If the new character breaks uniqueness, the left pointer repairs the window by moving forward until the duplicate is removed.

Future-me phrase:

> Right explores. Left repairs.

## False Start

My first instinct was: add the right character into a set, compare `set.size` with the current window length, and shrink when they differ.

That feels natural, but it has a timing bug. By the time `set.size !== windowLength`, I have already consumed the rightmost character. If I then shrink from the left and remove characters from the set, I cannot cleanly reason about the duplicate right character that caused the problem, because it was admitted before the window was repaired.

The better order is:

1. Look at the right character before adding it.
2. While the set already has that character, remove `s[left]` and move `left`.
3. Now add the right character.
4. Compare the valid window length against the best answer.

So the key is not "detect invalid after adding." The key is "make room before admitting the duplicate."

## Invariant

After the shrink step finishes, every character in the current window is unique.

That is why the current window length is safe to compare against the best answer.

## Gotchas

- Update the answer only after the window is valid.
- Use `right - left + 1` for the current length.
- Do not clear the whole set when you see a duplicate. Shrink just enough.
- Do not confuse substring with subsequence.
- Do not use `set.size !== windowLength` as the main repair signal after adding the right character. Check whether the right character already exists before admitting it.

## Aha Clicks

- The set is not storing the final substring. It is enforcing the current window invariant.
- You never need to move `left` backwards because every discarded start is already worse for the current `right`.
- The duplicate character tells you exactly when the window became invalid.
- The order matters: repair first, then admit the right character, then score the window.

## Walkthrough Seed

For `pwwkew`:

- Start with `pw`.
- The next `w` creates a duplicate, so move `left` past the old `w`.
- Continue with `wke`.
- The final `w` forces a shrink again, leaving `kew`.

The best length is `3`.

## Code

```js
const longestUniqueSubstring = (s) => {
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
};
```

## Review Cards

### What pattern should this trigger?

Longest contiguous substring with a validity condition means sliding window.

### What must stay true about the window?

After shrinking, it contains no repeated characters.

### Why is the algorithm linear?

Each pointer only moves forward. Each character is inserted once and removed at most once.

### What mistake should I watch for?

Clearing the whole window on a duplicate loses useful work. Shrink just enough.

### Why not just compare `set.size` with the window length?

Because that detects the duplicate after the right character has already been admitted. It is cleaner to check `set.has(s[right])` first, shrink until that is false, then add the right character into a valid window.
