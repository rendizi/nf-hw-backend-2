import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {CreateRoomDto} from "./dtos/CreateRoom.dto";
import Room, {IRoom} from "./models/Room";
import RoomModel from "./models/Room";

dotenv.config();

class RoomService {
    async CreateRoom(createRoomDto: CreateRoomDto, user: string):Promise<IRoom> {
            const {name} = createRoomDto;
            const newRoom = new RoomModel({
                name,
                users: [user],
                messages: []
            })
            await newRoom.save();
            return newRoom
    }
    async SendMessage(message:string, sender: string, roomId: string) {
        const room = await RoomModel.findById(roomId);
        if (!room) {
            throw new Error('Room not found');
        }

        const createdAt = new Date(Date.now())

        const newMessage = {
            sender,
            message,
            createdAt
        };

        room.messages.push(newMessage);

        await room.save();
    }

    async joinRoom(user: string, id: string){
        const room = await RoomModel.findById(id);
        if (!room) {
            throw new Error('Room not found');
        }
        if (room.users.includes(user)) {
            throw new Error('User already in the room');
        }
        room.users.push(user);
        await room.save();
        return room;
    }

    async getUsers(user: string): Promise<IRoom[]> {
        try {
            const rooms = await RoomModel.find({ users: user });
            return rooms;
        } catch (error) {
            throw new Error('Error fetching user\'s rooms: ' + error);
        }
    }

}

export default RoomService;
