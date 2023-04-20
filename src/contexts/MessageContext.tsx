import { createContext, useState } from "react";
import { IMessage } from "../types/types";

export const MessageContext = createContext({} as any);

export const MessageStore = ({ children }: any) => {
    const [messages, setMessages] =useState([] as Array<IMessage>);

    return (
        <MessageContext.Provider value={{messages, setMessages}}>
            { children }
        </MessageContext.Provider>
    )
}