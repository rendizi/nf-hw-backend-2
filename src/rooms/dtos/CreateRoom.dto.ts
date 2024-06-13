export interface CreateRoomDto{
    name: string
}

export interface CreateMessageDto{
    message: string
    senderId: string
    createdAt: Date
}