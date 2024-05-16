import { IsNotEmpty } from 'class-validator';

enum colors {
    "red",
    "black",
    "random"
}

export class room {
    roomId: string;
    @IsNotEmpty()
    roomName: string;
    @IsNotEmpty()
    startingColor: colors;
    @IsNotEmpty()
    isAvailable: boolean;
}