import { isNotEmpty, IsNotEmpty } from 'class-validator';

export enum Colors {
    Red = "Red",
    Black = "Black",
    Random = "Random"
}

export class Room {
    roomId: string;
    player2Id: string;
    isAvailable: boolean;
    @IsNotEmpty()
    roomName: string;
    @IsNotEmpty()
    startingColor: Colors;
    @IsNotEmpty()
    player1Id: string;
}