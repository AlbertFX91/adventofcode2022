export async function timer(label: string, fn: any) {
  console.time(label);
  const res = await fn();
  console.timeEnd(label);
  return res;
}


export async function measure(label: string, fn: any, loops: number = 10000) {

  let acc = 0; 
  for (let i = 0; i < loops; i++) {
    let start = Date.now();
    await fn();
    acc += Date.now() - start;
  }
  const avg = acc / loops;
  console.log(`${label}: ${avg} ms`)
}