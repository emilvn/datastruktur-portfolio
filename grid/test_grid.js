import { logError, logSuccess } from "../test_helpers/log.js";
import { runTests } from "../test_helpers/test.js";
import Grid from "./grid.js";

function makeGrid() {
  return new Grid(3, 3);
}

function test_constructor() {
  const grid = makeGrid();
  if (grid.rows() !== 3) {
    logError("FAILED: constructor");
    logError("\tfailed to initialize rows");
    logError("\tExpected: 3");
    logError("\tFound: " + grid.rows());
    return false;
  }

  if (grid.cols() !== 3) {
    logError("FAILED: constructor");
    logError("\tfailed to initialize cols");
    logError("\tExpected: 3");
    logError("\tFound: " + grid.cols());
    return false;
  }

  logSuccess("PASSED: constructor");
  return true;
}

function test_setAndGet() {
  const grid = makeGrid();
  grid.set(0, 0, "A");
  grid.set({ row: 1, col: 1 }, "B");
  if (grid.get(0, 0) !== "A") {
    logError("FAILED: setAndGet");
    logError("\tfailed to set and get value correctly");
    logError("\tExpected: A");
    logError("\tFound: " + grid.get(0, 0));
    return false;
  }

  if (grid.get({ row: 1, col: 1 }) !== "B") {
    logError("FAILED: setAndGet");
    logError("\tfailed to set and get value correctly");
    logError("\tExpected: B");
    logError("\tFound: " + grid.get({ row: 1, col: 1 }));
    return false;
  }

  logSuccess("PASSED: setAndGet");
  return true;
}

function test_outOfBoundAccess() {
  const grid = makeGrid();
  if (grid.get(3, 3) !== undefined) {
    logError("FAILED: outOfBoundAccess");
    logError("\tfailed to return undefined for out-of-bound access");
    logError("\tExpected: undefined");
    logError("\tFound: " + grid.get(3, 3));
    return false;
  }

  if (grid.get({ row: -1, col: 0 }) !== undefined) {
    logError("FAILED: outOfBoundAccess");
    logError("\tfailed to return undefined for out-of-bound access");
    logError("\tExpected: undefined");
    logError("\tFound: " + grid.get({ row: -1, col: 0 }));
    return false;
  }

  logSuccess("PASSED: outOfBoundAccess");
  return true;
}

function test_convertBetweenRowColAndIndex() {
  const grid = makeGrid();
  if (grid.indexFor(1, 1) !== 4) {
    logError("FAILED: convertBetweenRowColAndIndex");
    logError("\tfailed to convert between row, col and index correctly");
    logError("\tExpected: 4");
    logError("\tFound: " + grid.indexFor(1, 1));
    return false;
  }

  if (grid.rowColFor(4).row !== 1 || grid.rowColFor(4).col !== 1) {
    logError("FAILED: convertBetweenRowColAndIndex");
    logError("\tfailed to convert between row, col and index correctly");
    logError("\tExpected: {row: 1, col: 1}");
    logError("\tFound: " + grid.rowColFor(4));
    return false;
  }

  logSuccess("PASSED: convertBetweenRowColAndIndex");
  return true;
}

function test_neighbours() {
  const grid = makeGrid();
  grid.set(1, 1, "Center");
  grid.set(0, 1, "N");
  grid.set(2, 1, "S");
  grid.set(1, 0, "W");
  grid.set(1, 2, "E");
  if (
    JSON.stringify(grid.neighbours(1, 1)) !==
    JSON.stringify([
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 1, col: 0 },
      { row: 1, col: 2 },
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
    ])
  ) {
    logError("FAILED: neighbours");
    logError("\tfailed to return correct neighbours");
    logError(
      "\tExpected: [{row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}, {row: 1, col: 0}, {row: 1, col: 2}, {row: 2, col: 0}, {row: 2, col: 1}, {row: 2, col: 2} ]"
    );
    logError("\tFound: " + grid.neighbours(1, 1));
    return false;
  }

  logSuccess("PASSED: neighbours");
  return true;
}

function test_neighbourValues() {
  const grid = makeGrid();
  grid.set(1, 1, "Center");
  grid.set(0, 1, "N");
  grid.set(2, 1, "S");
  grid.set(1, 0, "W");
  grid.set(1, 2, "E");
  const expectedValues = ["N", "S", "W", "E"];
  const foundValues = grid.neighbourValues(1, 1);
  if (
    !expectedValues.every((value) => foundValues.includes(value)) ||
    !foundValues.every((value) => expectedValues.includes(value))
  ) {
    logError("FAILED: neighbourValues");
    logError("\tfailed to return correct neighbour values");
    logError("\tExpected: [N, S, W, E]");
    logError("\tFound: " + grid.neighbourValues(1, 1));
    return false;
  }

  logSuccess("PASSED: neighbourValues");
  return true;
}

function test_fill() {
  const grid = makeGrid();
  grid.fill("X");
  if (
    JSON.stringify(grid.grid) !==
    JSON.stringify([
      ["X", "X", "X"],
      ["X", "X", "X"],
      ["X", "X", "X"],
    ])
  ) {
    logError("FAILED: fill");
    logError("\tfailed to fill the grid with a specific value");
    logError("\tExpected: [[X, X, X], [X, X, X], [X, X, X]]");
    logError("\tFound: " + grid.grid);
    return false;
  }

  logSuccess("PASSED: fill");
  return true;
}

function test_northSouthEastWest() {
  const grid = makeGrid();
  grid.set(1, 1, "Center");
  grid.set(0, 1, "N");
  grid.set(2, 1, "S");
  grid.set(1, 0, "W");
  grid.set(1, 2, "E");
  if (grid.north(1, 1) !== "N") {
    logError("FAILED: northSouthEastWest");
    logError("\tfailed to return correct north");
    logError("\tExpected: N");
    logError("\tFound: " + grid.north(1, 1));
    return false;
  }

  if (grid.south(1, 1) !== "S") {
    logError("FAILED: northSouthEastWest");
    logError("\tfailed to return correct south");
    logError("\tExpected: S");
    logError("\tFound: " + grid.south(1, 1));
    return false;
  }

  if (grid.west(1, 1) !== "W") {
    logError("FAILED: northSouthEastWest");
    logError("\tfailed to return correct west");
    logError("\tExpected: W");
    logError("\tFound: " + grid.west(1, 1));
    return false;
  }

  if (grid.east(1, 1) !== "E") {
    logError("FAILED: northSouthEastWest");
    logError("\tfailed to return correct east");
    logError("\tExpected: E");
    logError("\tFound: " + grid.east(1, 1));
    return false;
  }

  logSuccess("PASSED: northSouthEastWest");
  return true;
}

function test_dump() {
  const grid = makeGrid();
  grid.fill("X");
  grid.dump();
  return true;
}

export const tests = [
  test_dump,
  test_constructor,
  test_setAndGet,
  test_outOfBoundAccess,
  test_convertBetweenRowColAndIndex,
  test_neighbours,
  test_neighbourValues,
  test_fill,
  test_northSouthEastWest,
];

// change to true to run test file seperately
if (false) {
  console.log("Running Grid tests...");
  runTests(tests);
}
