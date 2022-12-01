import { binaryInsert } from "../util/binaryInsert";
import { readDayInput } from "../util/readDayInput"

// O(nlog(m))
export const CaloriesCounter = async () => {
  const s = await readDayInput('day01');
  const lines = s.split('\n');

  const maxs = [0, 0, 0];
  let acc = 0;
  
  // O(nlog(m))
  for (const s of lines) { // O(n)
    if (!s)  {
      // O(log(m))
      binaryInsert(maxs, acc, true, (a, b) => b - a);
      maxs.pop();
      acc = 0;
      continue;
    }
    acc += Number.parseInt(s);
  }

  return {
    max: maxs[0],
    maxSum: maxs.reduce((a, b) => a + b, 0)
  };
}

