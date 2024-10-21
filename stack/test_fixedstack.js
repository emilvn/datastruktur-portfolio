import FixedStack from "./fixedstack.js";

const str = "Hello, world";
const stack = new FixedStack(str.length);

for (const l of str) {
  stack.push(l);
}

while (stack.size() > 0) {
  console.log(stack.pop());
}
