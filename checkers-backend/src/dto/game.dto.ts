import { IsNotEmpty } from 'class-validator';

enum GameResult {
    Draw = "draw",
    FirstWin = "firstWin",
    SecondWin = "secondWin",
    Ongoing = "ongoing"
}

enum Color {
    Red = "Red",
    Black = "Black"
}

export class Game {
    gameId: string;
    @IsNotEmpty()
    roomId: number;
    @IsNotEmpty()
    player1Color: Color;
    @IsNotEmpty()
    player1Name: string;
    player1Id: string;
    @IsNotEmpty()
    player2Name: string;
    player2Id: string;
    @IsNotEmpty()
    gameEnded: boolean;
    @IsNotEmpty()
    gameResult: GameResult;
}