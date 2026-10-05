"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("./index");
async function testUserUpdate() {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri)
        throw new Error("MONGODB_URI is required");
    await mongoose_1.default.connect(mongoUri);
    const server = index_1.app.listen(0);
    const { port } = server.address();
    const base = `http://127.0.0.1:${port}/api/users`;
    const tag = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    let userId;
    try {
        const created = await axios_1.default.post(base, {
            username: `ci-${tag}`,
            email: `before-${tag}@example.com`,
            password: "test-password",
            age: 25,
        });
        userId = created.data._id;
        const invalidEmail = await axios_1.default.put(`${base}/${userId}`, {
            username: `ci-${tag}`,
            email: "not-an-email",
            password: "test-password",
            age: 31,
        }, { validateStatus: () => true });
        if (invalidEmail.status !== 400)
            throw new Error(`Invalid email should return 400, got ${invalidEmail.status}`);
        const invalidAge = await axios_1.default.put(`${base}/${userId}`, {
            username: `ci-${tag}`,
            email: `after-${tag}@example.com`,
            password: "test-password",
            age: 121,
        }, { validateStatus: () => true });
        if (invalidAge.status !== 400)
            throw new Error(`Invalid age should return 400, got ${invalidAge.status}`);
        const updated = await axios_1.default.put(`${base}/${userId}`, {
            username: `ci-${tag}`,
            email: `after-${tag}@example.com`,
            password: "test-password",
            age: 31,
        });
        if (updated.status !== 200)
            throw new Error(`Expected 200, got ${updated.status}`);
        if (updated.data.email !== `after-${tag}@example.com`) {
            throw new Error(`Expected updated email, got ${updated.data.email}`);
        }
        if (updated.data.age !== 31)
            throw new Error(`Expected updated age 31, got ${updated.data.age}`);
        console.log("PASS PUT /api/users/:id validates email and age, then updates both");
    }
    finally {
        if (userId)
            await axios_1.default.delete(`${base}/${userId}`).catch(() => undefined);
        await new Promise((resolve, reject) => {
            server.close((error) => error ? reject(error) : resolve());
        });
        await mongoose_1.default.disconnect();
    }
}
testUserUpdate().catch((error) => {
    console.error("FAIL PUT /api/users/:id validates email and age");
    console.error(error);
    process.exitCode = 1;
});
