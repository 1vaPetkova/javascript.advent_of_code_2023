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
  let starCoords = null;
  for (let col = 0; col < schema[row].length; col++) {
    // Check if the current element is a digit
    if (!isDigit(row, col)) {
      clear(numberStr, starCoords);
      numberStr = "";
      starCoords = null;
      continue;
    }

    //This element is a digit
    numberStr += schema[row][col];
    if (!starCoords) starCoords = lookForStars(row, col);
  }
  clear(numberStr, starCoords);
}

output = output
  .filter((o) => o.numbers.length === 2)
  .map((o) => o.numbers.at(0) * o.numbers.at(1));

const result = output.reduce((acc, a) => acc + a, 0);
console.log(result);

//===================================================================================

function clear(numberStr, starCoords) {
  if (numberStr.length && starCoords) {
    const locationStr = starCoords.join(",");
    const number = parseInt(numberStr);
    if (output.some((o) => o.location === locationStr)) {
      output = output.map((o) =>
        o.location === locationStr
          ? { ...o, numbers: [...o.numbers, number] }
          : o
      );
    } else {
      output.push({ numbers: [number], location: locationStr });
    }
  }
}

function lookForStars(row, col) {
  //right
  let result = findStar(row, col + 1);

  //down right
  if (!result) {
    result = findStar(row + 1, col + 1);
  }

  //down
  if (!result) {
    result = findStar(row + 1, col);
  }

  //down left
  if (!result) {
    result = findStar(row + 1, col - 1);
  }

  //left
  if (!result) {
    result = findStar(row, col - 1);
  }

  //up left
  if (!result) {
    result = findStar(row - 1, col - 1);
  }

  //up
  if (!result) {
    result = findStar(row - 1, col);
  }

  //up right
  if (!result) {
    result = findStar(row - 1, col + 1);
  }

  return result;
}

function isDigit(row, col) {
  if (!isInBounds(row, col)) {
    return false;
  }
  const regex = new RegExp("[0-9]");
  return regex.test(schema[row][col]);
}

function findStar(row, col) {
  if (!isInBounds(row, col)) {
    return null;
  }
  if (schema[row][col] === "*") {
    return [row, col];
  }
  return null;
}

function isInBounds(row, col) {
  return (
    row >= 0 && row < schema.length && col >= 0 && col < schema[row].length
  );
}
