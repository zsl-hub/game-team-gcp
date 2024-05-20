import { IsNotEmpty } from "class-validator";

export class user {
    @IsNotEmpty()
    roomId: string;
    @IsNotEmpty()
    userName: string;
    @IsNotEmpty()
    userId: string
}