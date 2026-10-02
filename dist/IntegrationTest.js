"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("node:assert/strict");
const Utils_1 = require("./Utils");
// Check that formatAddition correctly uses add to make the result message.
const result = Utils_1.utils.formatAddition(2, 3);
assert.equal(result, "2 + 3 = 5");
console.log("Integration test passed: 2 + 3 = 5.");
