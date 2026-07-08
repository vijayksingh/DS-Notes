# DS Notes Writing Style

These notes are for recall after solving. The reader is future-me, not a stranger reading a tutorial. The job of a note is to bring back the path I actually took through the problem: what I thought first, where that thought broke, what changed in my mental model, and how the final code follows from that change.

## The Shape

A good note should read like a calm debrief, but the visible approach on the page should stay interview-sized. The approach should usually be one easy paragraph of two or three sentences: the pattern, what the main pointers or data structure do, and when the answer is updated. If there was a false start, capture it after the approach in a short paragraph instead of stretching the approach itself.

The note should not feel like a pile of flashcards. Flashcards are useful for drilling, but the main note should rebuild the memory. If I solved the problem yesterday and open the note today, I should be able to read the approach in order and feel the original click come back.

## The Voice

Use first person when it helps preserve the learning moment. It is better to write, "My first idea was to compare the set size with the window length, but that detects the problem too late," than to write a detached rule like, "Do not compare set size with window length." The first version reminds me of the mistake I actually made. The second version is just a warning without context.

The tone should be direct and conversational. Avoid sounding like official documentation. Avoid pretending the final solution was obvious from the start. The useful note is the one that remembers the confusion clearly enough to prevent it next time.

## Paragraphs Over Fragments

Prefer paragraphs over bullets. A bullet is allowed only when it is summarizing something after the explanation has already been rebuilt. If the bullet list becomes the main explanation, the note has failed. The reader should not have to stitch together six tiny facts to understand the approach.

For problem pages, the bottom notes should also avoid fragmented list energy. Recall checks should read like things I would say to an interviewer: "My invariant is...", "The runtime is...", "The corner case I watch for is...". They should demonstrate that I understand the moving parts and edge cases, not merely ask me questions.

## What Matters Most

Capture the invariant in human language. Say what the window, pointer, set, stack, queue, or map means at that moment in the algorithm. Capture the false signal if I had one. Capture the order of operations if that was the click. Capture the small example only when it helps reconnect the idea to code.

The goal is not to record every possible gotcha. The goal is to preserve the few details that would let me reconstruct the solution under interview pressure.
