import { OtherRoutesRepository } from "src/repository/otherroutes.repository"
import { Room } from "src/dto/room.dto"
import { Injectable } from "@nestjs/common";

@Injectable()
export class OtherRoutesService {
    constructor(private readonly OtherRoutesRepository: OtherRoutesRepository) { }

    async getAllAvailableRooms(): Promise<Room[]> {
        return await this.OtherRoutesRepository.getAllAvailableRooms();
    }
}