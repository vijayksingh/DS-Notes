import { existsSync } from "node:fs";
import { problems } from "../src/data/problems.js";

for (const problem of problems) {
  if (!problem.id || !problem.slug || !problem.title) {
    throw new Error(`Problem entry is missing identity fields: ${problem.title ?? "unknown"}`);
  }

  const publicNotePath = problem.notePath.replace(/^notes\//, "public/notes/");
  if (!existsSync(publicNotePath)) {
    throw new Error(`Missing note for ${problem.id}: ${publicNotePath}`);
  }

  if (!problem.approach?.length) {
    throw new Error(`Missing approach copy for ${problem.id}`);
  }

  if (!problem.problemStatement?.length) {
    throw new Error(`Missing problem statement for ${problem.id}`);
  }

  if (!problem.cards?.length) {
    throw new Error(`Missing flashcards for ${problem.id}`);
  }

  if (!problem.solutionCode?.trim()) {
    throw new Error(`Missing reference solution for ${problem.id}`);
  }
}

console.log(`validated ${problems.length} problem entr${problems.length === 1 ? "y" : "ies"}`);
