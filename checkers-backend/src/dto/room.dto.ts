import { IsNotEmpty } from 'class-validator';

enum Colors {
    Red = "Red",
    Black = "Black",
    Random = "Random"
}

export class Room {
    roomId: string;
    @IsNotEmpty()
    roomName: string;
    @IsNotEmpty()
    startingColor: Colors;
    @IsNotEmpty()
    isAvailable: boolean;
}