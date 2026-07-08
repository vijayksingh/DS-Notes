# Longest Unique Substring

Structy problem, canonical match: LeetCode 3, Longest Substring Without Repeating Characters.
Pattern: sliding window with a set.

## Approach Memory

The problem is asking for the longest contiguous piece of the string where every character is unique. The word that matters is contiguous. Once I notice that, this stops feeling like a "generate all substrings" problem and starts looking like a window problem: keep a valid slice, grow it when possible, and repair it when it breaks.

My first idea was to keep a `Set`, keep expanding the window, and compare `set.size` with the current window length. If those two numbers differ, then the window must contain a duplicate, so I would shrink from the left.

That idea is close, but the timing is wrong. By the time `set.size !== window.length`, I have already added or consumed the rightmost character that caused the duplicate. Now the set is telling me that something is wrong, but the window no longer has a clean story: I am repairing after admitting a character that should not have been admitted yet.

The fix was to flip the order. Before adding `s[right]`, I ask whether the set already contains that character. If it does, I move `left` forward and delete characters from the set until that right character is no longer inside the window. Only then do I add the right character.

That makes the invariant simple: after the repair step, the set represents exactly the current window, and the current window has no duplicate characters. Once that is true, I can safely compare the window length against the best answer.

The phrase I want to remember is: right explores, left repairs. The right pointer tries to bring in a new character. The left pointer only moves when the new character would break uniqueness.

For `pwwkew`, the first `pw` is fine. The next `w` is already in the set, so the left side moves until the old `w` is gone. Later, `wke` becomes the best window. The final `w` forces another repair, and the valid ending window becomes `kew`. The answer is `3`, and `pwke` is not allowed because it is not contiguous.

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

The invariant is that the current window has no duplicate characters after the shrink step finishes.

The important mistake is checking for invalidity too late. Do not use `set.size !== window.length` as the main repair signal after admitting `right`. Check whether `s[right]` is already present, repair first, then add it.

The complexity is linear because neither pointer moves backward. Each character enters the set once and leaves it at most once.

The small off-by-one check is that a window from `left` through `right` has length `right - left + 1`.
