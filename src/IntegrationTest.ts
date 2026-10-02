import assert = require("node:assert/strict");
import { utils } from "./Utils";

// Check that formatAddition correctly uses add to make the result message.
const result = utils.formatAddition(2, 3);
assert.equal(result, "2 + 3 = 5");

console.log("Integration test passed: 2 + 3 = 5.");
