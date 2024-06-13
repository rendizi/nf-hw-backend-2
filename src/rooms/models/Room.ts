import mongoose, { Document, Schema } from 'mongoose';

export interface IRoom extends Document {
    name: string,
    users: string[]
    messages: {
        sender: string,
        message: string,
        createdAt: Date
    }[]
}

const MessageSchema: Schema = new Schema({
    sender: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { _id: false });

const RoomSchema: Schema = new Schema({
    name: { type: String, required: true },
    users: { type: [String], required: true },
    messages: { type: [MessageSchema], required: false, default: [] }
});

export default mongoose.model<IRoom>('Room', RoomSchema);
