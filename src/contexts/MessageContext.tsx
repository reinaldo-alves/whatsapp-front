import { createContext, useRef, useState } from "react";
import { IAllMessages, ICounter, IRoom } from "../types/types";

export const MessageContext = createContext({} as any);

export const MessageStore = ({ children }: any) => {
    const [allMessages, setAllMessages] = useState({} as IAllMessages);
    const [counter, setCounter] = useState({} as ICounter);
    
    const roomDefault = {
        name: '',
        avatar: '',
        users: [],
        group: true,
        roomname: ''
    }
    
    const [rooms, setRooms] = useState([] as Array<IRoom>);
    const [activeRoom, setActiveRoom] = useState(roomDefault as IRoom);
    const [myRooms, setMyRooms] = useState([] as Array<IRoom>)
    const [fixed, setFixed] = useState(roomDefault as IRoom);

    const [activator, setActivator] = useState(false);
    const [newRoom, setNewRoom] = useState(false);

    const messageInputRef = useRef(null);

    return (
        <MessageContext.Provider value={{allMessages, setAllMessages, rooms, setRooms, activeRoom, setActiveRoom, myRooms, setMyRooms, activator, setActivator, counter, setCounter, fixed, setFixed, messageInputRef, newRoom, setNewRoom}}>
            { children }
        </MessageContext.Provider>
    )
}