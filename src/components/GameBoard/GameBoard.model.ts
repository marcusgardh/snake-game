export default class Square {
    rowPosition: number = 0;
    colPosition: number = 0;
    color: string = "";
    hasObstacle: {yes: boolean, removed: number} = {yes: false, removed: 0};
    playerCanMove: boolean = false;
}