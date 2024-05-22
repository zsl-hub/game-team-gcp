import { IsNotEmpty } from 'class-validator';

export enum GameResult {
    Draw = "draw",
    FirstWin = "firstWin",
    SecondWin = "secondWin",
    Ongoing = "ongoing"
}


export class Game {
    @IsNotEmpty()
    roomId: string;
    @IsNotEmpty()
    player1Id: string;
    
    gameId: string;
    player1Name: string;
    player2Name: string;
    player2Id: string;
    gameEnded: boolean;
    gameResult: GameResult;
}