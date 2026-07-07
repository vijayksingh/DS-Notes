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

## Invariant

After the shrink step finishes, every character in the current window is unique.

That is why the current window length is safe to compare against the best answer.

## Gotchas

- Update the answer only after the window is valid.
- Use `right - left + 1` for the current length.
- Do not clear the whole set when you see a duplicate. Shrink just enough.
- Do not confuse substring with subsequence.

## Aha Clicks

- The set is not storing the final substring. It is enforcing the current window invariant.
- You never need to move `left` backwards because every discarded start is already worse for the current `right`.
- The duplicate character tells you exactly when the window became invalid.

## Walkthrough Seed

For `pwwkew`:

- Start with `pw`.
- The next `w` creates a duplicate, so move `left` past the old `w`.
- Continue with `wke`.
- The final `w` forces a shrink again, leaving `kew`.

The best length is `3`.

## Review Cards

### What pattern should this trigger?

Longest contiguous substring with a validity condition means sliding window.

### What must stay true about the window?

After shrinking, it contains no repeated characters.

### Why is the algorithm linear?

Each pointer only moves forward. Each character is inserted once and removed at most once.

### What mistake should I watch for?

Clearing the whole window on a duplicate loses useful work. Shrink just enough.

