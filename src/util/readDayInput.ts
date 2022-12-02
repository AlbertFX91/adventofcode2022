import readFile from "./readFile"

export const readDayInput = (day: string, fileName: string = 'input.txt'): Promise<string> => {
  return readFile(`inputs/${day}/${fileName}`);
}