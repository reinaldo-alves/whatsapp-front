import { IAllMessages, IMessage, IUser } from "../types/types";

export function selectRandom(array:Array<any>) {
    const index = Math.floor(Math.random() * array.length);
    const random = array[index];
    return random
}

export function isInArray (array: Array<IUser>, id: string) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
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