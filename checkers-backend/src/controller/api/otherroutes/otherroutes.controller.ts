import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Param, Post, Put } from "@nestjs/common";
import { Room } from "../../../dto/room.dto"
import { GameMove, Board, PositionMove } from "../../../dto/gamemoves.dto"
import { OtherRoutesService } from "../../../service/otherroutes.service"
import { User } from "../../../dto/user.dto";

@Controller("/api/v1")
export class OtherRoutesController {
    constructor(private readonly otherRoutesService: OtherRoutesService) { }

    @Get("/getAllAvailableRooms")
    async getAllAvailableRooms(): Promise<Room[]> {
        const response = await this.otherRoutesService.getAllAvailableRooms();
        if (response === undefined) { throw new InternalServerErrorException("Error occured"); }
        return response;
    }

    @Post("/makeMove")
    async makeMove(@Body() body: PositionMove): Promise<string> {
        const response = await this.otherRoutesService.makeMove(body);
        if (response == "RedWon") { return "Red"; }
        if (response == "BlackWon") { return "Black"; }
        if (response != "Accepted") { throw new BadRequestException(response); }
        return "Accepted";
    }

    @Put("/renameUser")
    async renameUser(@Body() body: User): Promise<number> {
        const response = await this.otherRoutesService.renameUser(body);
        if (!response) { return 0; }
        return 1;
    }
}