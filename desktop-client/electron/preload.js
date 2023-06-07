//@ts-check
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    ping: async () => { return ipcRenderer.invoke('ping') },
    getState: async (key) => { return ipcRenderer.invoke('getState', key) },
    setState: async (key, value) => { return ipcRenderer.invoke('setState', key, value) },
})