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

let winners = [];
for (let card of cards) {
  let matches = 0;
  for (const elfNumber of card.elfNumbers) {
    if (card.winningNumbers.includes(elfNumber)) {
      matches++;
    }
  }
  winners.push({ cardNumber: card.cardNumber, matches });
}

const cardsCount = winners.length;
for (let index = 0; index < winners.length; index++) {
  const matches = winners[index].matches;
  const cardNumber = winners[index].cardNumber;
  for (let m = 1; m <= matches; m++) {
    const nextIndex = cardNumber - 1 + m;
    if (nextIndex < cardsCount) {
      winners.push(winners[nextIndex]);
    }
  }
}

console.log(winners.length);
