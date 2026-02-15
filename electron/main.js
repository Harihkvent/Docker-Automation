const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const { fork } = require("child_process");

let mainWindow;
let serverProcess;
const SERVER_PORT = 5000;

function startServer() {
  const serverPath = path.join(__dirname, "..", "server", "dist", "index.js");
  serverProcess = fork(serverPath, [], {
    env: { ...process.env, PORT: String(SERVER_PORT) },
    silent: true,
  });

  serverProcess.stdout.on("data", (data) => {
    console.log(`[server] ${data.toString().trim()}`);
  });

  serverProcess.stderr.on("data", (data) => {
    console.error(`[server] ${data.toString().trim()}`);
  });

  serverProcess.on("error", (err) => {
    console.error("Failed to start server:", err);
    dialog.showErrorBox(
      "Server Error",
      `Could not start the backend server.\n\n${err.message}`
    );
  });

  serverProcess.on("exit", (code) => {
    console.log(`Server process exited with code ${code}`);
    serverProcess = null;
  });
}

function stopServer() {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "Docker Automation",
    icon: path.join(__dirname, "..", "client", "public", "docker.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load the React production build
  const clientBuildPath = path.join(
    __dirname,
    "..",
    "client",
    "build",
    "index.html"
  );
  mainWindow.loadFile(clientBuildPath);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  startServer();

  // Give the server a moment to start before loading the UI
  setTimeout(createWindow, 1500);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  stopServer();
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  stopServer();
});
