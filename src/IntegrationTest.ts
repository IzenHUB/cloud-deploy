import assert = require("node:assert/strict");
import express = require("express");
import { utils } from "./Utils";

const app = express();

// The route handler is integrated with the project's add utility.
app.get("/add", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  res.json({ sum: utils.add(a, b) });
});

async function integrationTest(): Promise<void> {
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));

  try {
    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Could not determine the test server address.");
    }

    const response = await fetch(
      `http://127.0.0.1:${address.port}/add?a=2&b=3`,
    );
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, { sum: 5 });
    console.log("Integration test passed: /add returned 5 for 2 + 3.");
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

integrationTest().catch((error: unknown) => {
  console.error("Integration test failed:", error);
  process.exitCode = 1;
});
