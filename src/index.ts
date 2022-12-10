import caloriesCounter from "./day01";
import { rockPaperScissors01, rockPaperScissors02 } from "./day02";
import {sumPriorities01, sumPriorities02} from "./day03";
import { campCleanup } from "./day04";
import supplyStacks from "./day05";
import tuningTrouble from "./day06";
import noSpaceOnDevice from "./day07";
import treetopTreeHouse from "./day08";
import { timer } from "./util/timer";

await timer('day01', caloriesCounter);

await timer('day02-1', rockPaperScissors01);
await timer('day02-2', rockPaperScissors02);

await timer('day03-1', sumPriorities01);
await timer('day03-2', sumPriorities02);


await timer('day04', campCleanup);

await timer('day05', supplyStacks);

await timer('day06', tuningTrouble);

await timer('day07', noSpaceOnDevice);

await timer('day08', treetopTreeHouse);