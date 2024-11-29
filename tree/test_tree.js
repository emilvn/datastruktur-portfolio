import { logError, logSuccess } from "../test_helpers/log.js";
import Tree, { TreeNode } from "./tree.js";

function makeTree() {
  const tree = new Tree("A");
  const b = new TreeNode("B");
  const c = new TreeNode("C");
  const d = new TreeNode("D");
  const e = new TreeNode("E");
  const f = new TreeNode("F");
  const g = new TreeNode("G");
  const h = new TreeNode("H");
  const i = new TreeNode("I");
  const j = new TreeNode("J");
  const k = new TreeNode("K");
  const l = new TreeNode("L");
  const m = new TreeNode("M");
  const n = new TreeNode("N");
  const o = new TreeNode("O");
  const p = new TreeNode("P");
  const q = new TreeNode("Q");
  const r = new TreeNode("R");
  const s = new TreeNode("S");
  const t = new TreeNode("T");
  const u = new TreeNode("U");
  const v = new TreeNode("V");
  const w = new TreeNode("W");
  const x = new TreeNode("X");
  const y = new TreeNode("Y");
  const z = new TreeNode("Z");

  tree.root.appendChild(b);
  tree.root.appendChild(c);
  b.appendChild(d);
  b.appendChild(e);
  c.appendChild(f);
  c.appendChild(g);
  d.appendChild(h);
  d.appendChild(i);
  e.appendChild(j);
  e.appendChild(k);
  f.appendChild(l);
  f.appendChild(m);
  g.appendChild(n);
  g.appendChild(o);
  h.appendChild(p);
  h.appendChild(q);
  i.appendChild(r);
  i.appendChild(s);
  j.appendChild(t);
  j.appendChild(u);
  k.appendChild(v);
  k.appendChild(w);
  l.appendChild(x);
  l.appendChild(y);
  m.appendChild(z);

  return tree;
}

const allValues = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// Test bfsIterate
function test_bfsIterate() {
  const tmpTree = makeTree();
  const foundValues = [];
  Tree.bfsIterate(tmpTree, (current) => {
    foundValues.push(current.value);
  });
  const foundAllValues = allValues.every((value) =>
    foundValues.includes(value)
  );
  if (!foundAllValues) {
    logError("bfsIterate failed to find all values");
    logError("Expected: " + allValues);
    logError("Found: " + foundValues);
  }
  const noDuplicates = foundValues.length === allValues.length;
  if (!noDuplicates) {
    logError("bfsIterate found duplicate values");
    logError("Expected: " + allValues);
    logError("Found: " + foundValues);
  }

  return foundAllValues && noDuplicates;
}

// Test dfsIterate
function test_dfsIterate() {
  const tmpTree = makeTree();
  const foundValues = [];
  Tree.dfsIterate(tmpTree, (current) => {
    foundValues.push(current.value);
  });
  const foundAllValues = allValues.every((value) =>
    foundValues.includes(value)
  );
  if (!foundAllValues) {
    logError("dfsIterate failed to find all values");
    logError("Expected: " + allValues);
    logError("Found: " + foundValues);
  }
  const noDuplicates = foundValues.length === allValues.length;
  if (!noDuplicates) {
    logError("dfsIterate found duplicate values");
    logError("Expected: " + allValues);
    logError("Found: " + foundValues);
  }

  return foundAllValues && noDuplicates;
}

// Test layerCount
function test_layerCount() {
  const tmpTree = makeTree();
  const count = tmpTree.layerCount;
  if (count !== 4) {
    logError("layerCount failed to count layers");
    logError("Expected: 4");
    logError("Found: " + count);
  }
  return count === 4;
}

// Test addValue
function test_addValue() {
  const tmpTree = makeTree();
  tmpTree.addValue("1");
  const found = tmpTree.findValue("1");
  if (!found || found.value !== "1") {
    logError("addValue failed to add value");
    logError("Expected: 1");
    logError("Found: " + found.value);
  }
  return found;
}

// Test findValue
function test_findValue() {
  const tmpTree = makeTree();
  const found = tmpTree.findValue("X");
  if (!found || found.value !== "X") {
    logError("findValue failed to find value");
    logError("Expected: X");
    logError("Found: " + found.value);
  }
  return found;
}

// Test removeValue
function test_removeValue() {
  const tmpTree = makeTree();
  tmpTree.removeValue("X");
  const found = tmpTree.findValue("X");
  if (found) {
    logError("removeValue failed to remove value");
    logError("Expected: null");
    logError("Found: " + found.value);
  }
  return !found;
}

// Test toString/dump
// visual inspection required
function test_dump() {
  let tmpTree = makeTree();
  tmpTree.dump();
  return true;
}

// Run tests
const tests = [
  test_bfsIterate,
  test_dfsIterate,
  test_layerCount,
  test_addValue,
  test_findValue,
  test_removeValue,
  test_dump,
];
const results = tests.map((test) => test());
const passed = results.every((result) => result);
if (passed) {
  logSuccess("All tests passed!");
} else {
  const failed = results.filter((result) => !result);
  logError(`${failed.length} tests failed`);
}
