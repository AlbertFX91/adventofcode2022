import caloriesCounter from "./day01";
import { rockPaperScissors01, rockPaperScissors02 } from "./day02";
import { timer } from "./util/timer";

await timer('day01', caloriesCounter)

await timer('day02-1', rockPaperScissors01)
await timer('day02-2', rockPaperScissors02)