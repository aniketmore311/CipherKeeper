//@ts-check
const WebSocket = require('ws')
const chokidar = require('chokidar')
const path = require('path')

function setup() {
    let wss = new WebSocket.Server({ port: 8081 })
    wss.on('connection', (ws) => {
        ws.send("ACK")
    })
    const watcher = chokidar.watch(path.join(__dirname, ".."), { ignored: /node_modules|[/\\]\./ });
    watcher.on('change', () => {
        // console.log("sending reload signal")
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send('reload');
            }
        });
    });

}

module.exports = {
    setup
}