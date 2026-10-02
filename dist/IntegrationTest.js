"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("node:assert/strict");
const express = require("express");
const Utils_1 = require("./Utils");
const app = express();
// The route handler is integrated with the project's add utility.
app.get("/add", (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.json({ sum: Utils_1.utils.add(a, b) });
});
function integrationTest() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = app.listen(0, "127.0.0.1");
        yield new Promise((resolve) => server.once("listening", resolve));
        try {
            const address = server.address();
            if (!address || typeof address === "string") {
                throw new Error("Could not determine the test server address.");
            }
            const response = yield fetch(`http://127.0.0.1:${address.port}/add?a=2&b=3`);
            const body = yield response.json();
            assert.equal(response.status, 200);
            assert.deepEqual(body, { sum: 5 });
            console.log("Integration test passed: /add returned 5 for 2 + 3.");
        }
        finally {
            yield new Promise((resolve, reject) => {
                server.close((error) => (error ? reject(error) : resolve()));
            });
        }
    });
}
integrationTest().catch((error) => {
    console.error("Integration test failed:", error);
    process.exitCode = 1;
});
