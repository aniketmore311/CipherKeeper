const socket = new WebSocket('ws://localhost:8081');

socket.addEventListener('message', event => {
    if (event.data === 'reload') {
        location.reload();
    } else {
        console.log(event.data)
    }
});