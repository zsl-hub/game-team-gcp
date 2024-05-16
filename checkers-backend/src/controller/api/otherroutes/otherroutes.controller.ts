import { Controller, Get } from "@nestjs/common";
import { room } from "src/dto/room.dto"
import { OtherRoutesService } from "src/service/otherroutes.service"

@Controller("/api/v1")
export class OtherRoutesController {
    constructor(private readonly otherRoutesService: OtherRoutesService) { }

    @Get("/getAllAvailableRooms")
    async getAllAvailableRooms(): Promise<room[]> {
        return await this.otherRoutesService.getAllAvailableRooms();
    }
}
