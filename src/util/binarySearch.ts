export function binarySearch <T>(arr: T[], target: T, comparator?: (a: T, b: T) => number): number {
  let l = 0, h = arr.length - 1, m, comparison;

  const def = (a: T, b: T) => a < b ? -1 : (a > b ? 1: 0);
  comparator = comparator ?? def;
  while (l <= h) {
      m = (l + h) >>> 1;
      comparison = comparator(arr[m], target);
      if (comparison < 0) {
          l = m + 1;
      } else if (comparison > 0) {
          h = m - 1;
      } else {
          return m;
      }
  }
  return~l;
};