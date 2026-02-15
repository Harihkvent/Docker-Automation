"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
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
// Serve the React client build when available (used by Electron desktop app)
const clientBuildPath = path_1.default.join(__dirname, "..", "..", "client", "build");
app.use(express_1.default.static(clientBuildPath));
app.get("*", (_req, res, next) => {
    // Only serve index.html for requests that accept HTML (browser navigation),
    // not for API calls expecting JSON
    if (_req.headers.accept && _req.headers.accept.includes("text/html")) {
        const indexPath = path_1.default.join(clientBuildPath, "index.html");
        res.sendFile(indexPath, (err) => {
            if (err)
                next();
        });
    }
    else {
        next();
    }
});
app.listen(port, () => {
    console.log(`🚀 Docker Automation API running at http://localhost:${port}`);
});
