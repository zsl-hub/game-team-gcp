import { IsNotEmpty } from "class-validator";

export class User {
    @IsNotEmpty()
    roomId: string;
    @IsNotEmpty()
    userName: string;
    @IsNotEmpty()
    userId: string
}