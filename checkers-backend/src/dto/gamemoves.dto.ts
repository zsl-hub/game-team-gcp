import { IsNotEmpty } from 'class-validator';

export class Board {
    @IsNotEmpty()
    "A": number[];
    @IsNotEmpty()
    "B": number[];
    @IsNotEmpty()
    "C": number[];
    @IsNotEmpty()
    "D": number[];
    @IsNotEmpty()
    "E": number[];
    @IsNotEmpty()
    "F": number[];
    @IsNotEmpty()
    "G": number[];
    @IsNotEmpty()
    "H": number[];
}

export class GameMove {
    gameMoveId: string;
    @IsNotEmpty()
    gameId: string;
    @IsNotEmpty()
    current: Board;
}

export class PositionMove extends GameMove {
    @IsNotEmpty()
    move: string;
    @IsNotEmpty()
    playerId: string;
}