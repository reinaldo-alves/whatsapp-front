import { createContext, useState } from "react";
import { IAllMessages, IRoom } from "../types/types";

export const MessageContext = createContext({} as any);

export const MessageStore = ({ children }: any) => {
    const [allMessages, setAllMessages] = useState({} as IAllMessages);
    
    const roomDefault = {
        name: '',
        avatar: '',
        users: [],
        messages: [],
        group: true,
        roomname: ''
    }
    
    const [rooms, setRooms] =useState([] as Array<IRoom>);
    const [activeRoom, setActiveRoom] =useState(roomDefault as IRoom);
    const [myRooms, setMyRooms] = useState([] as Array<IRoom>)

    const [activator, setActivator] = useState(false);

    return (
        <MessageContext.Provider value={{allMessages, setAllMessages, rooms, setRooms, activeRoom, setActiveRoom, myRooms, setMyRooms, activator, setActivator}}>
            { children }
        </MessageContext.Provider>
    )
}