# Longest Unique Substring

Structy problem, canonical match: LeetCode 3, Longest Substring Without Repeating Characters.
Pattern: sliding window with a set.

## Problem

Given a string `s`, return the length of the longest substring without repeating characters.

The answer is a length, not the substring itself. The substring must be contiguous, so skipped characters do not count.

For `s = "pwwkew"`, the answer is `3` because `wke` is a valid substring, while `pwke` is not contiguous.

## Approach Memory

I would use a sliding window with two pointers and a set. `right` expands the window by looking at the next character, and the set tells me whether that character is already inside; if it is, `left` shrinks the window while I delete characters from the set. Once `s[right]` is no longer in the set, I insert it and update the best length from the valid window.

My first instinct was close but slightly wrong: I wanted to add the right character, compare `set.size` with the window length, and shrink when those diverged. That detects the duplicate too late, because the right character has already been inserted. The cleaner invariant is that after shrinking, the set and the window describe the same contiguous substring with no duplicates.

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

## Recall

My invariant is that after shrinking, the set and the current window describe the same characters, with no duplicates.

For `pwwkew`, I would point out that `wke` is valid because it is contiguous, while `pwke` is not a substring even though its characters are unique.

The runtime is O(n) because `right` only moves forward to expand and `left` only moves forward to shrink; the set insert/delete work happens at most once per character.

The corner case I watch for is checking for the duplicate too late by inserting `s[right]` first and only then comparing `set.size` with the window length.
