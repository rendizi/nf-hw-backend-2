import { Router } from 'express';
import authRouter from './auth/auth-router';
// other routers can be imported here
import roomsRouter from './rooms/rooms-router';
import cors from "cors";

const globalRouter = Router();

globalRouter.use(cors())
globalRouter.use(authRouter);
globalRouter.use(roomsRouter)


// other routers can be added here

export default globalRouter;
