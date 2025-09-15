import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
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

app.listen(port, () => {
  console.log(`🚀 Docker Automation API running at http://localhost:${port}`);
});
