export interface IUser {
    id: string,
    name: string
    avatar: string | null;
    color: string
}

export interface IMessage {
    user: IUser
    message: string
    hour: string
}