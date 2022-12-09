import { readDayInput } from "../util/readDayInput";

export default async function tuningTrouble() {
  const data = await readDayInput('day06');
  const sizePackage = 4;
  const sizeMessage = 14;
  let sol1 = 0;
  let sol2 = 0;

  const min = sizePackage > sizeMessage ? sizeMessage : sizePackage;

  for (let i = min; i < data.length; i++) {
    // Sol1
    if (!sol1 && i >= min) {
      const packet = data.slice(i - sizePackage, i);
      if (hasUniqueChars(packet)) {
        sol1 = i;
      }
    }
    // Sol2
    if (!sol2 && i >= sizeMessage) {
      const message = data.slice(i - sizeMessage, i);
      if (hasUniqueChars(message)) {
        sol2 = i;
      }
    }

    if (sol1 && sol2) break;
  }

  return {
    sol1,
    sol2,
  };

}

function hasUniqueChars(s: string): Boolean {
  return (new Set(s.split(''))).size === s.length;
}