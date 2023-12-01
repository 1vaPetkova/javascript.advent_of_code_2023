import { readFile } from "node:fs";
import { promisify } from "node:util";

const path = "Puzzles/Day1/input1.txt";
let input;
const words = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
];

const mapping = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const readFileAsync = promisify(readFile);
let data = await readFileAsync(path, "utf-8");

data = data
  .split("\n")
  .filter((l) => l)
  .map((row) => {
    let digitsObject = [];
    words.forEach((w) => {
      if (row.includes(w)) {
        digitsObject = digitsObject.concat(matchDigits(row, w));
      }
    });
    digitsObject.sort((a, b) => a.index - b.index);
    let first = digitsObject[0].word;
    let last = digitsObject[digitsObject.length - 1].word;

    if (typeof first == "string") {
      first = mapping[first];
    }

    if (typeof last == "string") {
      last = mapping[last];
    }

    const value = parseInt(`${first}${last}`);

    return value;
  });

const sum = data.reduce((acc, a) => acc + a, 0);
console.log("sum", sum);

function matchDigits(string, substring) {
  const digits = [];
  let index = string.indexOf(substring);

  while (index !== -1) {
    digits.push({ index: index, word: substring });
    index = string.indexOf(substring, index + 1);
  }

  return digits;
}
