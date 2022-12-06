import { readDayInput } from "../util/readDayInput";

type State = {
  [col: number]: string[]
}

export default async function supplyStacks() {
  const s = await readDayInput('day05');
  const lines = s.split('\n');

  const {
    movementsIndex,
    state
  } = parseInitialState(lines);

  // Deep copy for sol 2
  const stateSol2: State = JSON.parse(JSON.stringify(state))

  // Parse movements
  for (let i = movementsIndex; i < lines.length; i++) {
    // Parse line O(k)
    const {
      size,
      from,
      to
    } = parseMovement(lines[i]);

    // Sol 1
    move(state, size, from, to);
    // Sol 2
    move(stateSol2, size, from, to, true);
  }

  // Create output
  const sol1 = Object.values(state).reduce((acc, values) => acc + values[values.length-1] ?? '', '');
  const sol2 = Object.values(stateSol2).reduce((acc, values) => acc + values[values.length-1] ?? '', '');

  return {
    sol1, 
    sol2,
  }
}

function parseInitialState(lines: string[]): {
  movementsIndex: number,
  state: State
} {
  const state: {[col: number]: string[]} = {};
  let iMovements = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // We've finished the initial state
    if (!line) {
      iMovements = i + 1;
      break; 
    }
    // O(m)
    let matches = [...line.matchAll(/\[([a-zA-z]+)\]/g)];
    matches.forEach((match) => {
        if (match.index === undefined) return;
        const i = match.index + 1;
        const val = line[i];
        const col = Math.ceil(i / 4);

        // Init column
        if (!state[col]) state[col] = [];
        // Save value
        state[col].push(val);
    });
  }

  // Reverse columns
  Object.values(state).forEach((l) => l.reverse());

  return {
    movementsIndex: iMovements,
    state: state,
  }

}
function parseMovement(line: string): {
  size: number,
  from: number,
  to: number,
} {
  // Parse line
  const [size, from, to] = line.match(/[\d]+/g)?.map((v) => parseInt(v)) as unknown as number[]; 
  return {
    size,
    from,
    to,
  }
}

function move(state: State, size: number, from: number, to: number, isCrateMover9001: boolean = false) {
  // Get stacks and mutate 'from' column
  const stacks = state[from].splice(state[from].length - size);
  // Mutate to column
  state[to].push(...(isCrateMover9001 ? stacks : stacks.reverse()));
}
