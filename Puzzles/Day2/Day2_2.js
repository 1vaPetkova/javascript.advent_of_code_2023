import { readFile } from "node:fs";
import { promisify } from "node:util";

const path = "Puzzles/Day2/input2.txt";

const readFileAsync = promisify(readFile);

let data = await readFileAsync(path, "utf-8");
data = data
  .split("\n")
  .filter((l) => l)
  .map((line) => {
    const details = line.split(":");
    return getGamePower(details[1].trim());
  })
  .reduce((acc, f) => acc + f, 0);
console.log("sum: ", data);

function getGamePower(row) {
  const combos = row
    .split(";")
    .map((combo) =>
      combo
        .trim()
        .split(/,\s+/g)
        .map((t) => {
          const set = t.split(/\s+/g);
          return { count: Number(set[0]), colour: set[1] };
        })
    )
    .flat();

  let red = combos.filter((c) => c.colour === "red")?.map((c) => c.count);
  red = red ? Math.max(...red) : 1;

  let blue = combos.filter((c) => c.colour === "blue")?.map((c) => c.count);
  blue = blue ? Math.max(...blue) : 1;

  let green = combos.filter((c) => c.colour === "green")?.map((c) => c.count);
  green = green ? Math.max(...green) : 1;

  return red * blue * green;
}
