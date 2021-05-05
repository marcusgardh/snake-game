export class Circle {
    rowPosition: number = 0;
    colPosition: number = 0;
    color: string = "";
    tail: {x: number, y: number}[] = [];
}

export class Square {
    rowPosition: number = 0;
    colPosition: number = 0;
    color: string = "";
    hasObstacle: {yes: boolean, removed: number} = {yes: false, removed: 0};
    hasTail: boolean = false;
}
