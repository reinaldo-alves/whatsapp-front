import { createContext, useState } from "react";
import { IUser } from "../types/types";

export const UserContext = createContext({} as any);

export const UserStore = ({ children }: any) => {
    const [users, setUsers] =useState([]);
    const [user, setUser] =useState({} as IUser);
    const [id, setId] = useState('');
    const [name, setName] =useState('');
    const [email, setEmail] =useState('');
    const [avatar, setAvatar] =useState('');
    const [password, setPassword] =useState('');
    const [joined, setJoined] =useState(false);
    const [otherUsers, setOtherUsers] = useState([] as Array<IUser>);
    const [showMenu, setShowMenu] = useState(false)

    return (
        <UserContext.Provider value={{id, setId, user, setUser, name, setName, email, setEmail, avatar, setAvatar, password, setPassword, joined, setJoined, users, setUsers, otherUsers, setOtherUsers, showMenu, setShowMenu}}>
            { children }
        </UserContext.Provider>
    )
}