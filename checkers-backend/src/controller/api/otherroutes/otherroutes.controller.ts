import { Controller, Get, InternalServerErrorException } from "@nestjs/common";
import { Room } from "src/dto/room.dto"
import { OtherRoutesService } from "src/service/otherroutes.service"

@Controller("/api/v1")
export class OtherRoutesController {
    constructor(private readonly otherRoutesService: OtherRoutesService) { }

    @Get("/getAllAvailableRooms")
    async getAllAvailableRooms(): Promise<Room[]> {
        const response = await this.otherRoutesService.getAllAvailableRooms();
        if(response === undefined){ throw new InternalServerErrorException("Error occured");}
        return response;
    }
}
