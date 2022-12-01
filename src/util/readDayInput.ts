import readFile from "./readFile"

export const readDayInput = async (day: string, fileName: string = 'input.txt') => {
  return readFile(`inputs/${day}/${fileName}`);
}