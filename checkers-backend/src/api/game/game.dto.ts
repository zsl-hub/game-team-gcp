enum gameResult {
    "draw",
    "firstWin",
    "secondWin",
    "ongoing"
}

export class createGame {
    gameId: string;
    roomId: number;
    player1Name: string;
    player2Name: string;
    gameEnded: boolean;
    moves: string[];
    gameResult: gameResult;
}