import { readFile } from "node:fs";
import { promisify } from "node:util";

const path = "Puzzles/Day4/input4.txt";

const readFileAsync = promisify(readFile);

const input = await readFileAsync(path, "utf-8");
let cards = input
  .split("\n")
  .filter((l) => l)
  .map((line, index) => {
    const numbers = line
      .split(":")[1]
      .trim()
      .split(/\s+\|\s+/g);
    const winningNumbers = numbers
      .at(0)
      .split(/\s+/g)
      .map((n) => parseInt(n));
    const elfNumbers = numbers
      .at(1)
      .split(/\s+/g)
      .map((n) => parseInt(n));
    return { cardNumber: index + 1, winningNumbers, elfNumbers };
  });

const winners = [];
for (let card of cards) {
  let matchingNumbers = [];
  for (const elfNumber of card.elfNumbers) {
    if (card.winningNumbers.includes(elfNumber)) {
      matchingNumbers.push(elfNumber);
    }
  }
  const points = matchingNumbers.length
    ? Math.pow(2, matchingNumbers.length - 1)
    : 0;
  winners.push({ cardNumber: card.cardNumber, matchingNumbers, points });
}
const totalPoints = winners.map((p) => p.points).reduce((acc, a) => acc + a, 0);
console.log(totalPoints);
