import { readDayInput } from "../util/readDayInput";

// O(n)
export async function campCleanup() {
  const s = await readDayInput('day04');
  const lines = s.split('\n');

  let fullyContainsCount = 0;
  let isOverlappingCount = 0;

  // O(n)
  for (const s of lines) { 
    const [a1, a2, b1, b2] = s.match(/[\d]+/g)?.map((v) => parseInt(v)) as unknown as number[];
    const isFullyContains = (a1 >= b1 && a2 <= b2) || (b1 >= a1 && b2 <= a2);
    const isOverlapping = Math.min(a2, b2) - Math.max(a1, b1) >= 0;

    fullyContainsCount += isFullyContains as unknown as number;
    isOverlappingCount += isOverlapping as unknown as number;
  }

  return {
    fullContains: fullyContainsCount,
    overlapping: isOverlappingCount,
  };
}
