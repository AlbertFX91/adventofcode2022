import { readDayInput } from "../util/readDayInput";

// O(nm)
export async function sumPriorities01() {
  const s = await readDayInput('day03');
  const lines = s.split('\n');

  let acc = 0;

  // O(nm)
  for (const s of lines) { 
    const seg1 = new Set<string>();
    // O(m)
    for(let i = 0; i < s.length; i++) {
      const char = s[i];
      // Segment 1
      if (i < s.length / 2) {
        seg1.add(char);
      // segment 2: char repeated
      } else if (seg1.has(char)) {
        const priority = char.charCodeAt(0) - (char === char.toLowerCase() ? 96 : 38);
        acc += priority;
        break;
      }
    }
  }

  return acc;
}

export async function sumPriorities02() {
  const s = await readDayInput('day03');
  const lines = s.split('\n');

  let acc = 0;
  const groupSize = 3;

  /**
   * n: num lines
   * m: num chars in a line
   * g: group size = 3
   * 
   * O = O(n/g * (O(g) + O(gm)) => O(nm)
   */
  for (let i = 0; i < lines.length; i += groupSize) { // O(n/g) => O(n)

    // O(mg)
    const s = Array.from({length: groupSize}, (_, j) => i + j) // O(g) => O(k) [i, i+1, i+2]
      .reduce((set, j) => j % groupSize === 0 ? 
        // Initialize set with all the characters of the first line of the group
        new Set(lines[j].split('')) : // O(m)
        // New set with the characters contained in the previous set
        new Set(lines[j].split('').filter((c) => set.has(c))),  // O(m)
      new Set());
    // Get first character
    const char = s.values().next().value;
    // Char -> Priority
    const priority = char.charCodeAt(0) - (char === char.toLowerCase() ? 96 : 38);
    acc += priority;
  }
  return acc;
}