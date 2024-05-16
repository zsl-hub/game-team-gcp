import { IsNotEmpty } from 'class-validator';

class board {
    "A": string[8];
    "B": string[8];
    "C": string[8];
    "D": string[8];
    "E": string[8];
    "F": string[8];
    "G": string[8];
    "H": string[8];
}

export class gameMove {
    gameMoveId: string;
    @IsNotEmpty()
    gameId: number;
    @IsNotEmpty()
    current: board;
    @IsNotEmpty()
    onMove: string;
}