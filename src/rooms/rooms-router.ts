import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth-middleware';
import RoomsService from "./rooms-service";
import RoomsController from "./rooms-controller";
import {Server, Socket} from "socket.io";

const roomsRouter = Router();

const roomService = new RoomsService();
const roomController = new RoomsController(roomService);

roomsRouter.post('/chats/create', authMiddleware,roomController.createRoom);
roomsRouter.post('/chats/join/:id', authMiddleware, roomController.joinRoom);
roomsRouter.post('/chats/send/:id', authMiddleware, roomController.sendMessage)

export default roomsRouter;
