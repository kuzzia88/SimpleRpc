const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("desktop", {
  getVersions: () => ipcRenderer.invoke("app:get-versions"),
  closeApp: () => ipcRenderer.invoke("close-app"),
  minimizeApp: () => ipcRenderer.invoke("minimize-app"),
  startRpc: (data) => ipcRenderer.invoke("rpc:start", data),
  stopRpc: () => ipcRenderer.invoke("rpc:stop")
});
