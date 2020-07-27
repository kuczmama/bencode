isEqual = (expected, actual) => {
  if (expected === actual) return true;
  if (typeof expected !== typeof actual) return false;
  if (Array.isArray(expected) && Array.isArray(actual)) {
    if (expected.length !== actual.length) return false;
    let sol = true;
    for (let i = 0; i < expected.length; i++) {
      sol = sol && isEqual(expected[i], actual[i]);
    }
    return sol;
  }
  return JSON.stringify(expected) === JSON.stringify(actual);
};

const red = (str) => `\x1b[31m${str}\x1b[0m`;
const green = (str) => `\x1b[32m${str}\x1b[0m`;

let testNum = 0;
const passed = [];
const failed = [];
module.exports.assert = (actual, expected) => {
  testNum++;
  if (isEqual(expected, actual)) {
    process.stdout.write(green("."));
    passed.push(".");
  } else {
    const message = red(
      `${testNum} Expected: ${JSON.stringify(
        expected
      )}, but got: ${JSON.stringify(actual)}`
    );
    failed.push(message);
    console.log(message);
  }
};

module.exports.printTestResults = () => {
  if (failed.length === 0) {
    console.log(`\n\nAll ${passed.length} tests passed`);
  } else {
    console.log(
      `\n\n${red(`Failed: ${failed.length} Tests`)}\nRan ${
        passed.length + failed.length
      } Tests\nPassed: ${passed.length}`
    );
  }
};
