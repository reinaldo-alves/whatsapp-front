export function selectRandom(array:Array<any>) {
    const index = Math.floor(Math.random() * array.length);
    const random = array[index];
    return random
}