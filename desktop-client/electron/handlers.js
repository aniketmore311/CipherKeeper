//@ts-check
let state = require("./state")
/**
 * @param {import("electron").IpcMain} ipcMain 
 */
function setup(ipcMain) {
    ipcMain.handle('ping', async (event) => {
        return "pong"
    })
    ipcMain.handle("setState", async (event, key, value) => {
        if (typeof key != "string") {
            throw new Error(`type of key must be string found ${typeof key}`)
        }
        state.set(key, value)
    })
    ipcMain.handle("getState", async (event, key) => {
        if (typeof key != "string") {
            throw new Error(`type of key must be string found ${typeof key}`)
        }
        return state.get(key)
    })
}

module.exports = {
    setup
}
