export interface Room {
    id: number;
    name: string;
    users: string[];
    messages: {
        sender: string,
        message: string,
        createdAt: Date
    }[]
}
