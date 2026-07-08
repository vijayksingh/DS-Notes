# Longest Unique Substring

Structy problem, canonical match: LeetCode 3, Longest Substring Without Repeating Characters.
Pattern: sliding window with a set.

## Approach Memory

I would use two pointers: `right` expands the window by looking at the next character, and `left` shrinks the window when that character is already inside. Before inserting `s[right]`, I keep moving `left` and deleting from the set until `s[right]` is no longer present. Then I insert the character and update the best length from the valid window.

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

The runtime is O(n) because `right` only moves forward to expand and `left` only moves forward to shrink; each character is inserted once and removed at most once.

The corner case I watch for is checking for the duplicate too late by inserting `s[right]` first and only then comparing `set.size` with the window length.
