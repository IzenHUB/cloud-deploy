"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
const node_dns_1 = require("node:dns");
(0, node_dns_1.setServers)(['1.1.1.1', '8.8.8.8']);
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.static(path_1.default.resolve(__dirname, '../public')));
exports.app.use("/api", UserRoutes_1.default);
// Only connect and listen when run directly, not when imported by tests
if (require.main === module) {
    mongoose_1.default.connect("mongodb+srv://sthananarin_db_user:MC3sE1LJQ1PKdshy@cluster-cloud-deploy.clgpt1j.mongodb.net/")
        .then(() => {
        console.log("Connected to MongoDB");
        exports.app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000");
        });
    })
        .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
}
