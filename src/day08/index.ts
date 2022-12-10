import { readDayInput } from "../util/readDayInput";


/**
 * Get the number of positions until a value inside values is more or equals than value
 * E.g. [1,2,3,6,7], 1 => 4
 * E.g. [1,2,3,6,7], 4 => 4
 * E.g. [1,2,3,6,7], 5 => 4
 * E.g. [1,2,3,6,7], 6 => 4
 * E.g. [1,2,3,6,7], 7 => 5
 * @param values 
 * @param value 
 * @returns 
 */
const getPoints = (values: number[], value: number) => {
  let res = 0;
  for (let i = 0; i < values.length; i++) {
    if (values[i] < value) {
      res++;
    }
    else if (values[i] >= value) {
      res++;
      break;
    }
  }
  return res;
};

export default async function treetopTreeHouse() {
  const file = await readDayInput('day08');
  const matrix: number[][] = [];
  for (const line of file.split('\n')) {
    matrix.push(line.split('').map((x) => parseInt(x)));
  };

  // 
  /**
   * Matrix transposed.
   * The plan is to check if the current value is higher than the elements on the right, left, top and bottom.
   * Right and left it's easy with the matrix, checking if the Math.max values on each segment (row.slice(0, pos) or row.slice(pos+1)) is less than the current value
   * For Top and Right, we want to use the same approach but we can't operate by columns. For achieving this, the matrix transposed is 
   * calculated, allowing to do the same operation, because the columns are converted to rows.
   */
  let transpose: number[][] = JSON.parse(JSON.stringify(matrix));
  transpose = transpose[0].map((col, i) => transpose.map(row => row[i]));

  const h = matrix.length;
  const w = matrix[0].length;

  // O(nlogn) 
  // Functions: isVisible by directions. By segments, checks if the current matrix value is higher than the maximum number in a segment
  const isVisibleOnLeft = (row: number, col: number) => Math.max(...matrix[row].slice(0, col)) < matrix[row][col];
  const isVisibleOnRight = (row: number, col: number) => Math.max(...matrix[row].slice(col+1)) < matrix[row][col];
  const isVisibleOnTop = (row: number, col: number) => Math.max(...transpose[col].slice(0, row)) < matrix[row][col];
  const isVisibleOnBottom = (row: number, col: number) => Math.max(...transpose[col].slice(row+1)) < matrix[row][col];

  // O(n)
  // Functions: getPoints by directions. By segments, calculates the points
  const getRightPoints = (row: number, col: number) => getPoints(matrix[row].slice(col+1), matrix[row][col]);
  const getLeftPoints = (row: number, col: number) => getPoints(matrix[row].slice(0, col).reverse(), matrix[row][col]);
  const getTopPoints = (row: number, col: number) => getPoints(transpose[col].slice(0, row).reverse(), matrix[row][col]);
  const getBottomPoints = (row: number, col: number) => getPoints(transpose[col].slice(row+1), matrix[row][col]);
  

  let sol1 = 0;
  let sol2 = 0;

  /**
   * O(n * n * (nlogn+n)) => O(n^3*log(n)) 💣💥
   */
  for (let row = 0; row < h; row++) { // O(n)
    for (let col = 0; col < w; col++) { // O(n)
      if ( isVisibleOnLeft(row, col)  // O(nlogn)
        || isVisibleOnRight(row, col) 
        || isVisibleOnTop(row, col) 
        || isVisibleOnBottom(row, col)) {
        sol1++;
      }
      const points = getRightPoints(row, col)  // O(n)
        * getLeftPoints(row, col) 
        * getTopPoints(row, col) 
        * getBottomPoints(row, col);
      if (points > sol2) {
        sol2 = points;
      }
    }
  }

  return {
    sol1, // 1684
    sol2, // 486540
  }
}