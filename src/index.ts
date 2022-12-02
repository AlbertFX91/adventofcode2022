import caloriesCounter from "./day01";
import { rockPaperScissors01, rockPaperScissors02 } from "./day02";
import { timer } from "./util/timer";

console.log('> Day01: ', await timer(caloriesCounter))

console.log('> Day02 - 1: ', await timer(rockPaperScissors01));
console.log('> Day02 - 2: ', await timer(rockPaperScissors02));
