"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dockerRoutes_1 = __importDefault(require("./dockerRoutes"));
const mcpRoute_1 = __importDefault(require("./mcpRoute"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/", dockerRoutes_1.default);
app.use("/", mcpRoute_1.default);
app.use("/api", mcpRoute_1.default);
app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Docker Automation API running on port ${port}`);
});

