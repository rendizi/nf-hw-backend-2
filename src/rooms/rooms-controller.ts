import { Request, Response } from 'express';
import RoomService from './rooms-service';

class AuthController {
    private roomService: RoomService;

    constructor(roomService: RoomService) {
        this.roomService = roomService;
    }

    createRoom = async (req: Request, res: Response):Promise<void> => {
        try{
            const payload = req.user as DecodedData;
            const user = payload.username
            const {name} = req.body
            const room = await this.roomService.CreateRoom({name},user)
            res.status(201).json(room)
        }
        catch (err){
            res.status(500).json({ message: 'Error creating room' });
        }
    }

    sendMessage = async (req: Request, res: Response) => {
        try{
            const payload = req.user as DecodedData
            const sender = payload.username
            const { message } = req.body
            const roomId = req.params.id

            await this.roomService.SendMessage(message, sender, roomId)
            res.status(200).json({message: "success"})}
        catch (err){
            res.status(500).json({ message: 'Error sending message' });
        }
    }

    joinRoom = async (req: Request, res: Response) => {
        try{
            const payload = req.user as DecodedData
            const user = payload.username
            const roomid = req.params.id

            await this.roomService.joinRoom(user, roomid)
        }
        catch (err){
            res.status(500).json({ message: 'Error: '+err });
        }
    }

    controlSocket = (socket) => {
        console.log("a user connected")
        socket.on('join', )
    }
}

interface DecodedData{
    _id: string;
    username: string;
}

export default AuthController;
