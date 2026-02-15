# Desktop App Guide

Docker Automation can run as a desktop application on **Linux** and **Windows**. The app bundles the React frontend and Express backend together so everything runs locally — no cloud server required.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| **Node.js** | v18 or later |
| **npm** | v8 or later (included with Node.js) |
| **Docker** | Installed and running on the host |
| **Git** | To clone the repository |

> **Linux users:** your user must be in the `docker` group, or you must run the app with access to `/var/run/docker.sock`.
>
> ```bash
> sudo usermod -aG docker $USER
> # Log out and back in for the change to take effect
> ```

---

## Quick Start (Run from Source)

### 1. Clone & Install

```bash
git clone https://github.com/Harihkvent/Docker-Automation.git
cd Docker-Automation
npm run install:all
```

### 2. Build Client & Server

```bash
npm run build:all
```

> **Windows users:** use `npm run build:client:win` instead of `npm run build:client` if the above command fails, then run `npm run build:server` separately.

### 3. Launch the App

```bash
npm run start:electron
```

The application window will open and connect to the backend running on `http://localhost:5000`.

---

## Build Distributable Packages

You can package the app into an installer for your platform.

### Linux (.AppImage, .deb, .rpm)

```bash
npm run dist:linux
```

Built packages are placed in the `release/` directory:

| Format | File | How to Run |
|--------|------|------------|
| **AppImage** | `Docker Automation-*.AppImage` | `chmod +x *.AppImage && ./*.AppImage` |
| **deb** | `docker-automation-desktop_*.deb` | `sudo dpkg -i *.deb` |
| **rpm** | `docker-automation-desktop-*.rpm` | `sudo rpm -i *.rpm` |

### Windows (.exe installer)

```bash
npm run dist:win
```

Run the generated `.exe` installer from the `release/` directory and follow the setup wizard.

### Build for Current Platform (auto-detect)

```bash
npm run dist
```

---

## Receiving Updates

The app is configured with **GitHub Releases** as an update source. When a new release is published to the repository, users who installed a distributable package can update as follows:

1. Go to [Releases](https://github.com/Harihkvent/Docker-Automation/releases) on GitHub.
2. Download the latest package for your platform.
3. Install it over the existing version — your settings are preserved.

> **Tip for maintainers:** create a GitHub Release and attach the built packages. electron-builder can automate this with `npm run dist -- --publish always` (requires a `GH_TOKEN` environment variable).

---

## Project Structure (Desktop-Specific Files)

```
Docker-Automation/
├── electron/
│   ├── main.js        # Electron main process — spawns backend, opens window
│   └── preload.js     # Preload script — exposes isElectron flag to renderer
├── package.json        # Root package.json with Electron scripts & builder config
├── client/             # React frontend (built to client/build/)
└── server/             # Express backend (compiled to server/dist/)
```

---

## How It Works

1. **Electron main process** (`electron/main.js`) starts the Express server as a child process on `http://localhost:5000`.
2. The React production build is loaded into the Electron `BrowserWindow`.
3. The React app detects it is running inside Electron and automatically sets the API URL to `http://localhost:5000`.
4. The Express backend communicates with Docker through `/var/run/docker.sock` (Linux) or the Docker Desktop named pipe (Windows).

No internet connection is required — everything runs on your machine.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| **"Cannot connect to Docker"** | Make sure Docker is installed and running. On Linux, verify your user is in the `docker` group. |
| **Window opens but shows a blank page** | Run `npm run build:all` first — the React build must exist in `client/build/`. |
| **Port 5000 is already in use** | Stop whatever is using port 5000, or set a custom port: `PORT=5001 npm run start:electron` (you will also need to rebuild the client with the matching `REACT_APP_API_URL`). |
| **AppImage won't launch on Linux** | Make it executable: `chmod +x *.AppImage`. You may also need `libfuse2`: `sudo apt install libfuse2`. |
| **Windows build fails on Linux** | Cross-platform builds require additional tools. Build Windows packages on a Windows machine or use CI. |

---

## Uninstalling

- **AppImage:** simply delete the `.AppImage` file.
- **deb:** `sudo apt remove docker-automation-desktop`
- **rpm:** `sudo rpm -e docker-automation-desktop`
- **Windows:** use **Add or Remove Programs** in Settings.
