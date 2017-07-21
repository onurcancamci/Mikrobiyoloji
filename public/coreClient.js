

const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', function () {
  
});
socket.addEventListener('message', function incoming(event) {
  console.log(event.data);
});








