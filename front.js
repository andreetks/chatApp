import {WebSocket} from "ws";
import express from "express";

const socket = new WebSocket("ws://localhost:3000");

socket.onopen = (e) => {
  console.log("[open] Connection established");
  console.log("Sending to server");
  socket.send(JSON.stringify({
    type: "hello from client",
    content: [ 1, "2" ]
  }));
};

socket.onmessage = (event) => {
  console.log(`[message] Data received from server: ${event.data}`);
};

socket.onclose = (event) => {
  if (event.wasClean) {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    console.log('[close] Connection died');
  }
};

socket.onerror = (error) => {
  console.log(`${error}`);
};


const PORT = 3001
const app = express()

app.listen(PORT)