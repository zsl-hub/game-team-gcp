enum gameResult{
    "draw",
    "firstWin",
    "secondWin",
    "ongoing", 
}

export class createGame
{
    roomId: number;
    player1Name: string;
    player2Name: string;
    gameEnded: boolean;
    moves: string[];
    gameResult: gameResult;
}