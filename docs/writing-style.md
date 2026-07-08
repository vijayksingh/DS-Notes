# DS Notes Writing Style

These notes are for recall after solving. The reader is future-me, not a stranger reading a tutorial. The job of a note is to bring back the path I actually took through the problem: what I thought first, where that thought broke, what changed in my mental model, and how the final code follows from that change.

## The Shape

A good note should read like a calm debrief. It should begin by saying what the problem is really asking and why a pattern started to fit. From there, it should describe the first approach I reached for, especially if that approach was wrong or incomplete. The most valuable part of the note is usually the failure point: the exact reason the first idea stopped making sense. After that, the note should explain the corrected invariant or approach in plain language, then connect that approach to a small example and the final code.

The note should not feel like a pile of flashcards. Flashcards are useful for drilling, but the main note should rebuild the memory. If I solved the problem yesterday and open the note today, I should be able to read the approach in order and feel the original click come back.

## The Voice

Use first person when it helps preserve the learning moment. It is better to write, "My first idea was to compare the set size with the window length, but that detects the problem too late," than to write a detached rule like, "Do not compare set size with window length." The first version reminds me of the mistake I actually made. The second version is just a warning without context.

The tone should be direct and conversational. Avoid sounding like official documentation. Avoid pretending the final solution was obvious from the start. The useful note is the one that remembers the confusion clearly enough to prevent it next time.

## Paragraphs Over Fragments

Prefer paragraphs over bullets. A bullet is allowed only when it is summarizing something after the explanation has already been rebuilt. If the bullet list becomes the main explanation, the note has failed. The reader should not have to stitch together six tiny facts to understand the approach.

For problem pages, the bottom notes should also avoid fragmented list energy. They can be short, but they should read like compact observations or recall checks written in sentences, not like scattered labels.

## What Matters Most

Capture the invariant in human language. Say what the window, pointer, set, stack, queue, or map means at that moment in the algorithm. Capture the false signal if I had one. Capture the order of operations if that was the click. Capture the small example only when it helps reconnect the idea to code.

The goal is not to record every possible gotcha. The goal is to preserve the few details that would let me reconstruct the solution under interview pressure.
