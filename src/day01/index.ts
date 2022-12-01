import { binaryInsert } from "../util/binaryInsert";
import { readDayInput } from "../util/readDayInput"

// O(nlog(m))
export const CaloriesCounter = async () => {
  const s = await readDayInput('day01');
  const lines = s.split('\n');

  const max = [0, 0, 0];
  let acc = 0;

  console.time('test');
  
  // O(nlog(m))
  for (const s of lines) { // O(n)
    if (!s)  {
      // O(log(m))
      binaryInsert(max, acc, true, (a, b) => b - a);
      max.pop();
      acc = 0;
      continue;
    }
    acc += Number.parseInt(s);
  }
  console.timeEnd('test');

  console.log('[Day01] Max calories: ', max[0])
  console.log('[Day01] Max sum calories: ', max.reduce((a, b) => a + b, 0))

  return max;
}

