import { readDayInput } from "../util/readDayInput"

// Rules
const winsTo: Record<string, string> = {
  'A': 'Z',
  'B': 'X',
  'C': 'Y',
}
const equalsTo: Record<string, string> = {
  'A': 'X',
  'B': 'Y',
  'C': 'Z'
}
const losesTo: Record<string, string> = {
  'A': 'Y',
  'B': 'Z',
  'C': 'X',
}
const points: Record<string, number> = {
  'X': 1,
  'Y': 2,
  'Z': 3,
}

// O(n)
export const rockPaperScissors01 = async () => {
  const s = await readDayInput('day02');
  const lines = s.split('\n');

  let score = 0;

  // O(n)
  for (const s of lines) {
    const a = s[0], b = s[2];
    // O(k)
    score += points[b] + (
      // We've lose
      winsTo[a] == b ? 0 
      // Draw
      : equalsTo[a] == b ? 3 
      // Win
      : 6);
  }

  return score;
}

// O(n)
export const rockPaperScissors02 = async () => {
  const s = await readDayInput('day02');
  const lines = s.split('\n');
  let score = 0;
  // O(n)
  for (const s of lines) {
    const a = s[0], res = s[2];
    // O(k)
    const b = res == 'X' ? winsTo[a] : res == 'Y' ? equalsTo[a] : losesTo[a];
    // O(k)
    score += points[b] + (winsTo[a] == b ? 0 : equalsTo[a] == b ? 3 : 6);
  }

  return score;
}