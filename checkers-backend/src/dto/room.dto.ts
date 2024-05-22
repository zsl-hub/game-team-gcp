import { isNotEmpty, IsNotEmpty } from 'class-validator';

export enum Colors {
export enum Colors {
    Red = "Red",
    Black = "Black",
    Random = "Random"
}

export class Room {
    roomId: string;
    user2Id: string;
    isAvailable: boolean;
    userId: string;
    user2Id: string;
    isAvailable: boolean;
    @IsNotEmpty()
    roomName: string;
    @IsNotEmpty()
    startingColor: Colors;
}