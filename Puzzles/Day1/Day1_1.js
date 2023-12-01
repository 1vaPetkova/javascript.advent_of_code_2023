import { readFile } from "node:fs";
import { promisify } from "node:util";

const path = "Puzzles/Day1/input1.txt";

const readFileAsync = promisify(readFile);
let data = await readFileAsync(path, "utf-8");
data = data
  .split("\n")
  .filter((l) => l)
  .map((e) => e.split("").filter((el) => !isNaN(el)));

let sum = findSum(data);
console.log(sum);

function findSum(input) {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    let line = input[i];
    if (line.length === 0) {
      continue;
    }
    if (line.length === 1) {
      sum += parseInt(`${line[0]}${line[0]}`);
    } else {
      sum += parseInt(`${line[0]}${line[line.length - 1]}`);
    }
  }
  return sum;
}
