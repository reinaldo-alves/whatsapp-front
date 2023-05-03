export interface IUser {
    id: string,
    name: string
    avatar: string;
    color: string
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