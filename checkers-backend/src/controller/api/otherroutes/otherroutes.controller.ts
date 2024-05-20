import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Param, Post } from "@nestjs/common";
import { Room } from "../../../dto/room.dto"
import { GameMove, Board, PositionMove } from "../../../dto/gamemoves.dto"
import { OtherRoutesService } from "../../../service/otherroutes.service"

@Controller("/api/v1")
export class OtherRoutesController {
    constructor(private readonly otherRoutesService: OtherRoutesService) { }

    @Get("/getAllAvailableRooms")
    async getAllAvailableRooms(): Promise<Room[]> {
        const response = await this.otherRoutesService.getAllAvailableRooms();
        if (response === undefined) { throw new InternalServerErrorException("Error occured"); }
        return response;
    }

    @Post("/makeMove/")
    async makeMove(@Body() body: PositionMove): Promise<number> {
        const response = await this.otherRoutesService.makeMove(body);
        if (!response) { throw new BadRequestException(response); }
        return 1;
    }
}