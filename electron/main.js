const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const { fork } = require("child_process");
const http = require("http");

let mainWindow;
let serverProcess;
const SERVER_PORT = 5000;

/**
 * Poll the backend server until it responds, then resolve.
 * Times out after maxAttempts * interval milliseconds.
 */
function waitForServer(port, maxAttempts = 20, interval = 500) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const check = () => {
      attempts++;
      const req = http.get(`http://localhost:${port}/list`, (res) => {
        resolve();
      });
      req.on("error", () => {
        if (attempts >= maxAttempts) {
          reject(new Error("Server did not start in time"));
        } else {
          setTimeout(check, interval);
        }
      });
      req.end();
    };
    check();
  });
}

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

app.whenReady().then(async () => {
  startServer();

  // Wait for the server to accept connections before opening the window
  try {
    await waitForServer(SERVER_PORT);
  } catch {
    console.warn("Server health check timed out — opening window anyway");
  }

  createWindow();

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
