import express, { json } from "express";
import { io } from "socket.io-client";
import path from "path";

const app = express();
const port = 3000;
const socket = io("ws://localhost:8000");

socket.on("connect", () => {
  console.log(socket.id);
});

socket.on("disconnect", () => {
  console.log(socket.id);
});


socket.emit("message",{"data": "cpa"});

socket.on("nullish",(data) =>{
    console.log(data)
})

app.get("/", (req, res) => {

  res.send(
    '<!DOCTYPE html>  <html lang="en">  <head>      <meta charset="UTF-8">      <meta http-equiv="X-UA-Compatible" content="IE=edge">      <meta name="viewport" content="width=device-width, initial-scale=1.0">      <title>ChatApp</title>  </head>  <body>      <h1>Hello World</h1>  </body>  </html>'
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
