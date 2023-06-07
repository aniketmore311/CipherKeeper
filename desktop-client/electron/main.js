//@ts-check
const path = require("path")
const { app, BrowserWindow, ipcMain } = require("electron")
const WebSocket = require("ws")
const chokidar = require("chokidar")
const state = require("./state")
const handlers = require("./handlers")
const autoreload = require("./autoreload")


function createWindow() {
    const win = new BrowserWindow({
        width: 1080,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })
    // win.loadURL(`file://${__dirname}/web-contents/index.html`);
    win.loadFile("./web-contents/index.html")
    win.maximize()
    // auto reload
    autoreload.setup()
}

app.whenReady().then(() => {
    handlers.setup(ipcMain)
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform != "darwin") {
        app.quit()
    }
})