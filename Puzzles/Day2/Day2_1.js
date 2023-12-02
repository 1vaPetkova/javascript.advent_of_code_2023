import { readFile } from "node:fs";
import { promisify } from "node:util";

const path = "Puzzles/Day2/input2.txt";

const readFileAsync = promisify(readFile);

const availableCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

let data = await readFileAsync(path, "utf-8");
data = data
  .split("\n")
  .filter((l) => l)
  .map((line) => {
    const details = line.split(":");
    const gameNumber = details[0].trim().split(/\s+/g)[1];
    return getGameInfo(details[1].trim(), gameNumber);
  })
  .filter((g) => g.isPossible)
  .reduce((acc, f) => acc + f.game, 0);
console.log(data);

function isCombinationPossible(count, colour) {
  if (availableCubes[colour] < count) {
    return false;
  }
  return true;
}

function getGameInfo(combos, gameNumber) {
  const gameInfo = {
    game: Number(gameNumber),
    isPossible: true,
  };
  const combinations = combos.trim().split(";");
  for (const combo of combinations) {
    const cubes = combo
      .trim()
      .split(/,\s+/g)
      .map((t) => {
        const set = t.split(/\s+/g);
        return { count: Number(set[0]), colour: set[1] };
      });
    if (cubes.some((c) => !isCombinationPossible(c.count, c.colour))) {
      gameInfo.isPossible = false;
      break;
    }
  }
  return gameInfo;
}
