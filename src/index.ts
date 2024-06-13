import 'dotenv/config';
import express from 'express';
import connectDB from './db';
import globalRouter from './global-router';
import { logger } from './logger';
import http from "http";
import { Server } from "socket.io";
import RoomsService from "./rooms/rooms-service";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const roomService = new RoomsService();

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join-room", (room) => {
    socket.join(room);
    io.to(room).emit("user-online", { userId: socket.id, room });
  });

  socket.on("send-message", (data) => {
    const { room, message, sender } = data;
    io.to(room).emit("message", { message, sender });
  });

  socket.on("typing", (data) => {
    const { room, sender } = data;
    io.to(room).emit("typing", sender);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

const PORT = process.env.PORT || 3000;

connectDB();

app.use(logger);
app.use(express.json());
app.use('/api/v1/', globalRouter);

app.get('/helloworld', (request, response) => {
  response.send("Hello World!");
});

server.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});
