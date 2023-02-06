const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const httpServer = http.createServer(app);

const io = new Server(httpServer);

const { PORT = 5001 } = process.env;

app.get("/", (req, res, next) => {
  return res.sendFile(__dirname + "/index.html");
});

httpServer.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("listening on port 5001");
});

io.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("chatMessage", (message) => {
    ws.broadcast.emit("chatMessage", message);
  });
});
