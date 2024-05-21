import { IsNotEmpty } from 'class-validator';

enum GameResult {
    Draw = "draw",
    FirstWin = "firstWin",
    SecondWin = "secondWin",
    Ongoing = "ongoing"
}


export class Game {
    gameId: string;
    @IsNotEmpty()
    roomId: string;
    @IsNotEmpty()
    player1Color: string;
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