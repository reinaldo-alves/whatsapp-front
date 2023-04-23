import { createContext, useState } from "react";
import { IUser } from "../types/types";

export const UserContext = createContext({} as any);

export const UserStore = ({ children }: any) => {
    const [users, setUsers] =useState([]);
    const [user, setUser] =useState({} as IUser);
    const [id, setId] = useState('');
    const [name, setName] =useState('');
    const [avatar, setAvatar] =useState('');
    const [joined, setJoined] =useState(false);

    return (
        <UserContext.Provider value={{id, setId, user, setUser, name, setName, avatar, setAvatar, joined, setJoined, users, setUsers}}>
            { children }
        </UserContext.Provider>
    )
}