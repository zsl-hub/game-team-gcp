enum gameResult{
    "draw" = 0,
    "firstWin" = 1,
    "secondWin" = 2
}

export class createGame
{
    roomId: number;
    player1Name: string;
    player2Name: string;
    gameEnded: boolean;
    moves: string;
    gameResult: gameResult;
}