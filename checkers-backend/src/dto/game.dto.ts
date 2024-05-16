import { IsNotEmpty } from 'class-validator';

enum gameResult {
    "draw",
    "firstWin",
    "secondWin",
    "ongoing"
}

enum color {
    "red",
    "black"
}

export class game {
    gameId: string;
    @IsNotEmpty()
    roomId: number;
    @IsNotEmpty()
    player1Color: color;
    @IsNotEmpty()
    player1Name: string;
    player1Id: string;
    @IsNotEmpty()
    player2Name: string;
    player2Id: string;
    @IsNotEmpty()
    gameEnded: boolean;
    @IsNotEmpty()
    gameResult: gameResult;
}