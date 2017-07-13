

let socket = io(); 

socket.on("connect" , function (a,b) {
  console.log(a,b);
});

socket.emit("login", {
  username: "onurcan",
  password: "asdf"
});











