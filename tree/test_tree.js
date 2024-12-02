import { logError, logSuccess } from "../test_helpers/log.js";
import { runTests } from "../test_helpers/test.js";
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
    logError("FAILED: bfsIterate");
    logError("\tfailed to find all values:");
    logError("\tExpected: " + allValues);
    logError("\tFound: " + foundValues);
    return false;
  }
  const noDuplicates =
    foundValues.length === allValues.length && foundAllValues;
  if (!noDuplicates) {
    logError("FAILED: bfsIterate");
    logError("\tfound duplicate values:");
    logError("\tExpected: " + allValues);
    logError("\tFound: " + foundValues);
    return false;
  }
  logSuccess("PASSED: bfsIterate");
  return foundAllValues && noDuplicates;
}

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
    logError("FAILED: dfsIterate");
    logError("\tfailed to find all values:");
    logError("\tExpected: " + allValues);
    logError("\tFound: " + foundValues);
    return false;
  }
  const noDuplicates = foundValues.length === allValues.length;
  if (!noDuplicates) {
    logError("FAILED: dfsIterate");
    logError("\tfound duplicate values:");
    logError("\tExpected: " + allValues);
    logError("\tFound: " + foundValues);
    return false;
  }

  logSuccess("PASSED: dfsIterate");
  return true;
}

function test_layerCount() {
  const tmpTree = makeTree();
  const count = tmpTree.layerCount;
  if (count !== 4) {
    logError("FAILED: layerCount");
    logError("\tfailed to count layers:");
    logError("\tExpected: 4");
    logError("\tFound: " + count);
    return false;
  }
  logSuccess("PASSED: layerCount");
  return true;
}

function test_addValue() {
  const tmpTree = makeTree();
  tmpTree.addValue("1");
  const found = tmpTree.findValue("1");
  if (!found || found.value !== "1") {
    logError("FAILED: addValue");
    logError("\tfailed to add value:");
    logError("\tExpected: 1");
    logError("\tFound: " + found.value);
    return false;
  }
  logSuccess("PASSED: addValue");
  return true;
}

function test_findValue() {
  const tmpTree = makeTree();
  const found = tmpTree.findValue("X");
  if (!found || found.value !== "X") {
    logError("FAILED: findValue");
    logError("\tfailed to find value:");
    logError("\tExpected: X");
    logError("\tFound: " + found.value);
    return false;
  }
  logSuccess("PASSED: findValue");
  return true;
}

function test_removeValue() {
  const tmpTree = makeTree();
  tmpTree.removeValue("X");
  const found = tmpTree.findValue("X");
  if (found) {
    logError("FAILED: removeValue");
    logError("\tfailed to remove value:");
    logError("\tExpected: null");
    logError("\tFound: " + found.value);
    return false;
  }
  logSuccess("PASSED: removeValue");
  return true;
}

function test_dump() {
  let tmpTree = makeTree();
  tmpTree.dump();
  return true;
}

export const tests = [
  test_dump,
  test_bfsIterate,
  test_dfsIterate,
  test_layerCount,
  test_addValue,
  test_findValue,
  test_removeValue,
];

if (import.meta.main) {
  console.log("Running Tree tests...");
  runTests(tests);
}
