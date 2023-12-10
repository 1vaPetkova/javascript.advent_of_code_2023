import { readFile } from "node:fs";
import { promisify } from "node:util";

const path = "Puzzles/Day6/input6.txt";

const readFileAsync = promisify(readFile);

const input = await readFileAsync(path, "utf-8");
const data = input.split("\n").filter((l) => l);

const time = data[0].split(":")[1].trim().replace(/\s+/g, "");
const distance = data[1].split(":")[1].trim().replace(/\s+/g, "");

const a = 1;
const b = -Number(time);
const c = Number(distance);

const values = findPossibleValues(a, b, c).length;

console.log(values);

//=================================================================

function findPossibleValues(a, b, c) {
  const { x1, x2 } = solveTheQuadraticEqation(a, b, c);

  const solutions = [];
  let x = Math.ceil(x1) === x1 ? x1 + 1 : Math.ceil(x1);
  while (x > x1 && x < x2) {
    solutions.push(x);
    x++;
  }
  return solutions;
}

function solveTheQuadraticEqation(a, b, c) {
  //D = b^2 - 4ac
  const D = Math.sqrt(Math.pow(b, 2) - 4 * a * c);

  //x1,2 = -b +- D / 2a
  const x1 = (-b - D) / (2 * a);
  const x2 = (-b + D) / (2 * a);
  return { x1, x2 };
}
