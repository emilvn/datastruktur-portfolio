import { logSuccess, logError } from "./log.js";

/**
 *
 * @param {(() => boolean)[]} tests
 */
export function runTests(tests) {
  const total = tests.length;
  const results = tests.map((test) => test());
  const allPassed = results.every((result) => result);
  if (allPassed) {
    logSuccess("\nAll tests passed!");
  } else {
    const failed = results.filter((result) => !result);
    logSuccess(`${total - failed.length} tests passed`);
    logError(`${failed.length} tests failed`);
  }
  console.log("Ran " + total + " tests");
  logSuccess("Passed: " + (total - results.filter((result) => !result).length));
  logError("Failed: " + results.filter((result) => !result).length);
}
