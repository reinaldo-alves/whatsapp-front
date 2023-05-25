import { IAllMessages, ICounter, IMessage, IRoom, IUser } from "../types/types";

export function selectRandom(array:Array<any>) {
    const index = Math.floor(Math.random() * array.length);
    const random = array[index];
    return random
}

export function isInArray (array: Array<IUser>, email: string) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].email === email) {
        return true;
        }
    }
    return false;
}

export function cutString (original: string, search: string) {
    const index = original.indexOf(search);
    let newString = original.slice(0, index) + original.slice(index + search.length);
    return newString
}

export const updateMessages = (previous: IAllMessages, message: IMessage, roomName: string) => {
    if (!previous[roomName]) {
      previous[roomName] = []
    }
    const updated = [...previous[roomName], message];
    return {...previous, [roomName]: updated};
  }

export const updateCounter = (previous: ICounter, roomName: string, active: IRoom) => {
    if (!previous[roomName]) {
        previous[roomName] = 0
    }
    let updated = 0;
    if (roomName !== active.roomname) {
        updated = previous[roomName] + 1;
    }
    return {...previous, [roomName]: updated}
}

export const restartCounter = (previous: ICounter, roomName: string) => {return {...previous, [roomName]: 0}}

export const searchUserbyEmail = (email: string, array: Array<IUser>) => {
    return array.find(item => item.email === email)
}

export const reorderRooms = (rooms: Array<IRoom>, roomname: string) => {
    const index = rooms.findIndex((item) => item.roomname === roomname);
    if (index !== -1) {
        const selectedRoom = rooms.splice(index, 1)[0];
        rooms.unshift(selectedRoom)
    }
    return rooms
}