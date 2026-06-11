const { app, BrowserWindow, shell, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const { startRpc, stopRpc } = require("./rpc");

const isDev = process.env.NODE_ENV === "development";
const devServerUrl = process.env.NEXT_DEV_SERVER_URL || "http://localhost:3001";
const iconPath = path.join(__dirname, "..", "icon.png");

function getProductionUrl() {
  return url.pathToFileURL(path.join(__dirname, "..", "out", "index.html")).toString();
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 580,
    height: 780,
    title: "SimpleRpc",
    icon: iconPath,
    frame: false,
    hasShadow: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadURL(isDev ? devServerUrl : getProductionUrl());

  mainWindow.webContents.setWindowOpenHandler(({ url: targetUrl }) => {
    shell.openExternal(targetUrl);
    return { action: "deny" };
  });

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
}

ipcMain.handle("app:get-versions", () => ({
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  node: process.versions.node
}));

ipcMain.handle("rpc:start", async (_event, data) => {
  await startRpc(data);
  return { ok: true };
});

ipcMain.handle("rpc:stop", async (_event) => {
  await stopRpc();
  return { ok: true };
});

ipcMain.handle("close-app", async (_event) => {
  app.quit();
});

ipcMain.handle("minimize-app", async (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win?.minimize();
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
