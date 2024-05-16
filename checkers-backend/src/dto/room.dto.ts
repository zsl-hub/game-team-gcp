import { IsNotEmpty } from 'class-validator';

enum Colors {
    Red = "red",
    Black = "black",
    Random = "random"
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