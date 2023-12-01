import { readFile } from "node:fs";

const path = "Puzzles/Day1/input1.txt";
let input;

readFile(path, "utf8", (err, data) => {
  if (err) throw err;
  input = data.split("\n").map((e) => e.split("").filter((el) => !isNaN(el)));
  console.log(input);
  let sum = findSum(input);
  console.log("sum", sum);
});

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
