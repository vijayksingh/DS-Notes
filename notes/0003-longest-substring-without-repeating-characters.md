# Longest Unique Substring

Structy problem, canonical match: LeetCode 3, Longest Substring Without Repeating Characters.
Pattern: sliding window with a set.

## Approach Memory

I would solve this with a sliding window and a set: the right pointer tries to add a new character, and if that character is already inside the window, I move left until the duplicate is removed. The important detail is that I repair before admitting the right character, instead of adding first and then noticing `set.size !== window.length`. Once the window is valid again, I update the best length.

My first instinct was close but slightly wrong: I wanted to add the right character, compare `set.size` with the window length, and shrink when those diverged. That detects the duplicate too late, because the right character has already been admitted. The cleaner invariant is that after repair, the set and the window describe the same contiguous substring with no duplicates.

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

My invariant is that after the repair step, the set and the current window describe the same characters, with no duplicates.

For `pwwkew`, I would point out that `wke` is valid because it is contiguous, while `pwke` is not a substring even though its characters are unique.

The runtime is O(n) because right only moves forward to explore and left only moves forward to repair; each character is added once and removed at most once.

The corner case I watch for is detecting the duplicate too late by adding the right character first and only then comparing `set.size` with the window length.
