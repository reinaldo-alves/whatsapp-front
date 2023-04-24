import { createContext, useState } from "react";
import { IMessage, IRoom } from "../types/types";

export const MessageContext = createContext({} as any);

export const MessageStore = ({ children }: any) => {
    const [messages, setMessages] =useState([] as Array<IMessage>);
    
    const roomDefault = {
        name: '',
        avatar: '',
        users: [],
        messages: [],
        group: true,
        roomname: ''
    }
    
    const [rooms, setRooms] =useState([] as Array<IRoom>);
    const [room, setRoom] =useState(roomDefault as IRoom);
    const [myRooms, setMyRooms] = useState([] as Array<IRoom>)

    return (
        <MessageContext.Provider value={{messages, setMessages, rooms, setRooms, room, setRoom, myRooms, setMyRooms}}>
            { children }
        </MessageContext.Provider>
    )
}