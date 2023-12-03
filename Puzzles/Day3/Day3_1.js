import { readFile } from "node:fs";
import { promisify } from "node:util";

const path = "Puzzles/Day3/input3.txt";

const readFileAsync = promisify(readFile);

const input = await readFileAsync(path, "utf-8");
const schema = input
  .split("\n")
  .filter((l) => l)
  .map((l) => l.split(""));

let output = [];

for (let row = 0; row < schema.length; row++) {
  let numberStr = "";
  let hasSymbol = false;
  for (let col = 0; col < schema[row].length; col++) {
    // Check if the current element is a digit
    if (!isDigit(row, col)) {
      clear(numberStr, hasSymbol);
      numberStr = "";
      hasSymbol = false;
      continue;
    }

    //This element is a digit
    numberStr += schema[row][col];
    if (!hasSymbol) hasSymbol = lookForSymbols(row, col);
  }
  clear(numberStr, hasSymbol);
}

const result = output?.reduce((acc, a) => acc + a, 0);
console.log(result);

function clear(numberStr, hasSymbol) {
  if (numberStr.length && hasSymbol) {
    output.push(parseInt(numberStr));
  }
}

function lookForSymbols(row, col) {
  //right
  if (isSymbol(row, col + 1)) {
    return true;
  }
  //right down
  if (isSymbol(row + 1, col + 1)) {
    return true;
  }
  //down
  if (isSymbol(row + 1, col)) {
    return true;
  }

  //down left
  if (isSymbol(row + 1, col - 1)) {
    return true;
  }

  //left
  if (isSymbol(row, col - 1)) {
    return true;
  }

  //up left
  if (isSymbol(row - 1, col - 1)) {
    return true;
  }

  //up
  if (isSymbol(row - 1, col)) {
    return true;
  }

  //up right
  if (isSymbol(row - 1, col + 1)) {
    return true;
  }

  return false;
}

function isDigit(row, col) {
  if (!isInBounds(row, col)) {
    return false;
  }
  const regex = new RegExp("[0-9]");
  return regex.test(schema[row][col]);
}

function isSymbol(row, col) {
  if (!isInBounds(row, col)) {
    return false;
  }
  const regex = new RegExp("[^0-9.]");
  return regex.test(schema[row][col]);
}

function isInBounds(row, col) {
  return (
    row >= 0 && row < schema.length && col >= 0 && col < schema[row].length
  );
}
