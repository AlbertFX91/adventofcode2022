export async function timer(fn: any) {
  console.time('timer');
  const res = await fn();
  console.timeEnd('timer');
  return res;
}