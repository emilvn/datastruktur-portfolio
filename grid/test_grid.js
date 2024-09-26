import { Grid } from "./grid.js";

let grid;

console.log("Test: Initialize grid with correct dimensions");
grid = new Grid(3, 3);
grid.clear();
grid.dump();
console.log("Expected rows: 3");
console.log("Actual rows:", grid.rows());
console.log("Expected cols: 3");
console.log("Actual cols:", grid.cols());
console.log(
  "-----------------------------------------------------------------"
);

console.log("Test: Set and get values correctly");
grid.clear();
grid.set(0, 0, "A");
grid.set({ row: 1, col: 1 }, "B");
grid.dump();
console.log("Expected value at (0,0): A");
console.log("Actual value:", grid.get(0, 0));
console.log("Expected value at (1,1): B");
console.log("Actual value:", grid.get({ row: 1, col: 1 }));

console.log(
  "-----------------------------------------------------------------"
);

console.log("Test: Return undefined for out-of-bound access");
grid.clear();
grid.dump();
console.log("Expected value at (3,3): undefined");
console.log("Actual value:", grid.get(3, 3));
console.log("Expected value at (-1,0): undefined");
console.log("Actual value:", grid.get({ row: -1, col: 0 }));
console.log(
  "-----------------------------------------------------------------"
);

console.log("Test: Convert between row, col and index correctly");
grid.clear();
grid.dump();
console.log("Expected index for (1,1): 4");
console.log("Actual index:", grid.indexFor(1, 1));
console.log("Expected rowCol for index 4: {row: 1, col: 1}");
console.log("Actual rowCol: ", grid.rowColFor(4));
console.log(
  "-----------------------------------------------------------------"
);

console.log("Test: Return correct neighbours");
grid.clear();
grid.set(1, 1, "Center");
grid.set(0, 1, "N");
grid.set(2, 1, "S");
grid.set(1, 0, "W");
grid.set(1, 2, "E");
grid.dump();
console.log(
  "Expected neighbours for (1,1): [{row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}, {row: 1, col: 0}, {row: 1, col: 2}, {row: 2, col: 0}, {row: 2, col: 1}, {row: 2, col: 2} ]"
);
console.log("Actual neighbours:", grid.neighbours(1, 1));
console.log(
  "-----------------------------------------------------------------"
);

console.log("Test: Return correct neighbour values");
grid.clear();
grid.set(1, 1, "Center");
grid.set(0, 1, "N");
grid.set(2, 1, "S");
grid.set(1, 0, "W");
grid.set(1, 2, "E");
grid.dump();
console.log("Expected neighbour values for (1,1): [N, S, W, E]");
console.log("Actual neighbour values:", grid.neighbourValues(1, 1));
console.log(
  "-----------------------------------------------------------------"
);

console.log("Test: Fill the grid with a specific value");
grid.clear();
console.log("Before filling with X");
grid.dump();
grid.fill("X");
console.log("After filling with X");
grid.dump();
console.log(
  "-----------------------------------------------------------------"
);

console.log("Test: north, south, east, west");
grid.clear();
grid.set(1, 1, "Center");
grid.set(0, 1, "N");
grid.set(2, 1, "S");
grid.set(1, 0, "W");
grid.set(1, 2, "E");
grid.dump();
console.log("Expected north of (1,1): N");
console.log("Actual north:", grid.north(1, 1));
console.log("Expected south of (1,1): S");
console.log("Actual south:", grid.south(1, 1));
console.log("Expected west of (1,1): W");
console.log("Actual west:", grid.west(1, 1));
console.log("Expected east of (1,1): E");
console.log("Actual east:", grid.east(1, 1));
console.log(
  "-----------------------------------------------------------------"
);
