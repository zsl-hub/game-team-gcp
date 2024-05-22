import { isNotEmpty, IsNotEmpty } from 'class-validator';

export enum Colors {
    Red = "Red",
    Black = "Black",
    Random = "Random"
}

export class Room {
    roomId: string;
    isAvailable: boolean;
    player2Id: string;
    userId: string;
    @IsNotEmpty()
    roomName: string;
    @IsNotEmpty()
    startingColor: Colors;
    @IsNotEmpty()
    player1Id: string;
}