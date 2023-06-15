export interface IUser {
    id: string;
    email: string;
    name: string;
    avatar: string;
    password: string;
    color: string
    online: boolean;
}

export interface IMessage {
    user: IUser
    message: string
    hour: string
}

export interface IRoom {
    name: string;
    avatar: string;
    users: Array<IUser>;
    group: boolean;
    roomname: string
}

export interface IAllMessages {
    [roomName: string]: Array<IMessage>
}

export interface ICounter {
    [roomName: string]: number
}