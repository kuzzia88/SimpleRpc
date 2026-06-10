const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("desktop", {
  getVersions: () => ipcRenderer.invoke("app:get-versions"),
  startRpc: (data) => ipcRenderer.invoke("rpc:start", data)
});
