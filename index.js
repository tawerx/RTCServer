import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("hello");
});

const room = "fdf";
io.on("connection", (socket) => {
  console.log("user connected");
  console.log(socket.id);
  socket.join(room);
  socket.on("offer", (offer) => {
    socket.to(room).emit("getOffer", offer);
  });
  socket.on("answer", (answer) => {
    socket.to(room).emit("getAnswer", answer);
  });
  socket.on("ice", (ice) => {
    socket.to(room).emit("getIce", ice);
  });
});

server.listen(9999, () => console.log("server start 8888"));
