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
    logSuccess("All tests passed!");
  } else {
    const failed = results.filter((result) => !result);
    logSuccess(`${total - failed.length} tests passed`);
    logError(`${failed.length} tests failed`);
  }
}
