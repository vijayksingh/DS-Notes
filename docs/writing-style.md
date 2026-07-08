# DS Notes Writing Style

These notes are for recall after solving. The reader is future-me, not a stranger reading a tutorial. The job of a note is to bring back the path I actually took through the problem: what I thought first, where that thought broke, what changed in my mental model, and how the final code follows from that change.

## The Shape

A good note should read like a calm debrief, but the visible approach on the page should stay interview-sized. The approach should usually be one easy paragraph of two or three sentences: the pattern, what the main pointers or data structure do, and when the answer is updated. If there was a false start, capture it after the approach in a short paragraph instead of stretching the approach itself.

Every note must include the problem statement before the approach. Future-me should not need to open LeetCode, Structy, AlgoMonster, or any other site just to remember what the question asked. Write the statement in plain language, preserve the exact return value, include the detail that changes the approach, and add the smallest example that exposes the trick. If the app uses structured data, add this to `problemStatement` as well as the markdown note.

The note should not feel like a pile of flashcards. Flashcards are useful for drilling, but the main note should rebuild the memory. If I solved the problem yesterday and open the note today, I should be able to read the approach in order and feel the original click come back.

## The Voice

Use first person when it helps preserve the learning moment. It is better to write, "My first idea was to compare the set size with the window length, but that detects the problem too late," than to write a detached rule like, "Do not compare set size with window length." The first version reminds me of the mistake I actually made. The second version is just a warning without context.

The tone should be direct and conversational. Avoid sounding like official documentation. Avoid pretending the final solution was obvious from the start. The useful note is the one that remembers the confusion clearly enough to prevent it next time.

Simple does not mean vague. The approach must explicitly name the pattern and the data structure. If the solution depends on a frequency map, say `frequency map`. If it depends on a set, stack, queue, heap, prefix sum, or two pointers, name that directly. Do not hide the important idea behind soft wording like "counts", "validity rule", or "some map" when a precise term would help recall.

## Paragraphs Over Fragments

Prefer paragraphs over bullets. A bullet is allowed only when it is summarizing something after the explanation has already been rebuilt. If the bullet list becomes the main explanation, the note has failed. The reader should not have to stitch together six tiny facts to understand the approach.

For problem pages, the bottom notes should also avoid fragmented list energy. Recall checks should read like things I would say to an interviewer: "My invariant is...", "The runtime is...", "The corner case I watch for is...". They should demonstrate that I understand the moving parts and edge cases, not merely ask me questions.

## Symbols And Terms

Use backticks for code symbols and exact terminology that must stand apart from normal prose: `left`, `right`, `need`, `have`, `formed`, `required`, `s[right]`, `set.size`, `frequency map`. This helps me separate English explanation from the names I need to say or type.

Do not backtick every important English phrase. If every other word is styled, the page becomes noisy and the distinction stops helping. Keep the top summary especially calm; reserve symbol styling for actual variable names, expressions, inputs, outputs, and a few core technical terms.

Use consistent names across the whole page. If the code uses `need` and `have`, the approach, invariant, recall checks, and code comments should use `need` and `have` too. Do not switch between `windowMap`, `map`, `check map`, and `have` unless the note is deliberately explaining that naming choice.

## What Matters Most

Capture the invariant in human language. Say what the window, pointer, set, stack, queue, or map means at that moment in the algorithm. Capture the false signal if I had one. Capture the order of operations if that was the click. Capture the small example only when it helps reconnect the idea to code.

The goal is not to record every possible gotcha. The goal is to preserve the few details that would let me reconstruct the solution under interview pressure.

## Code For Recall

The code block should be annotated for recall, not decorated. Comments should explain state meaning, pointer movement, and the exact moment a flag or invariant changes. Useful comments sound like: "`need` says what the final answer must contain", "score before removing `original[left]` because the current window is valid", or "`formed` changes only when one character crosses its required count."

Avoid comments that merely restate syntax. Do not write "increment left" above `left++` unless the comment explains why that move is safe or what condition it may break. The best comments are the ones that let me reconstruct the algorithm after forgetting the implementation details.

For every solution, the code annotations should answer these recall questions when relevant: what each data structure means, what makes the current state valid, when the answer is updated, when the shrink/expand loop stops, and which edge case would break a naive version.

## Page Checklist

Before calling a problem note done, check these:

- The problem statement is present on the page and in the markdown note.
- The approach names the pattern and the data structure explicitly.
- Code symbols and key terms are formatted consistently, but the prose is not visually overloaded.
- The invariant explains what the main state represents right now.
- The code comments teach recall points instead of narrating syntax.
- The example reconnects the tricky rule to the final answer.
