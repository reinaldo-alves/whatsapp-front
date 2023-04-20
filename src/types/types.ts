export interface IUser {
    id: string,
    name: string
    avatar: string | undefined;
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
    messages: Array<IMessage>;
}