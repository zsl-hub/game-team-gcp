import { Controller, Get } from "@nestjs/common";
import { Room } from "src/dto/room.dto"
import { OtherRoutesService } from "src/service/otherroutes.service"

@Controller("/api/v1")
export class OtherRoutesController {
    constructor(private readonly otherRoutesService: OtherRoutesService) { }

    @Get("/getAllAvailableRooms")
    async getAllAvailableRooms(): Promise<Room[]> {
        return await this.otherRoutesService.getAllAvailableRooms();
    }
}
