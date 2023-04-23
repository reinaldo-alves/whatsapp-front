import { createContext, useState } from "react";
import { IMessage, IRoom } from "../types/types";

export const MessageContext = createContext({} as any);

export const MessageStore = ({ children }: any) => {
    const [messages, setMessages] =useState([] as Array<IMessage>);
    const [rooms, setRooms] =useState([] as Array<IRoom>);

    return (
        <MessageContext.Provider value={{messages, setMessages, rooms, setRooms}}>
            { children }
        </MessageContext.Provider>
    )
}