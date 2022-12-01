import { binarySearch } from "./binarySearch";

export function binaryInsert <T> (arr: T[], target: T, duplicate?: boolean, comparator?: (a: T, b: T) => number): number {
  var i = binarySearch(arr, target, comparator);
  if (i >= 0) {
    if (!duplicate) {
        return i;
    }
  } else {
      i = ~i;
  }
  arr.splice(i, 0, target);
  return i;
};