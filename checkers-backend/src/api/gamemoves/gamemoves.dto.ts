enum color
{
    "red",
    "black"
}

export class createGameMove
{
    gameMoveId: string;
    gameId: number;
    current: object;
    possible: string[];
    onMove: string;
}