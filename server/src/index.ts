import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import dockerRoutes from "./dockerRoutes";
import mcpRoute from "./mcpRoute";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/", dockerRoutes);
app.use("/", mcpRoute);
app.use("/api", mcpRoute);

// Serve the React client build when available (used by Electron desktop app)
const clientBuildPath = path.join(__dirname, "..", "..", "client", "build");
app.use(express.static(clientBuildPath));
app.get("*", (_req, res, next) => {
  const indexPath = path.join(clientBuildPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) next();
  });
});

app.listen(port, () => {
  console.log(`🚀 Docker Automation API running at http://localhost:${port}`);
});
