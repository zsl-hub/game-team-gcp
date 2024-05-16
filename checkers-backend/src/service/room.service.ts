import { Room } from 'src/dto/room.dto'
import { RoomRepository } from "src/repository/room.repository"
import { Injectable } from "@nestjs/common";

@Injectable()
export class RoomService {
    constructor(private readonly RoomRepository: RoomRepository) { }

    async findAll(): Promise<Room[]> {
        return await this.RoomRepository.findAll();
    }

    async findOne(id: string): Promise<Room> {
        const data = await this.RoomRepository.findOne(id);
        return data;
    }

    async add(body: Room): Promise<string> {
        return await this.RoomRepository.add(body);
    }

    async update(id: string, body: Room): Promise<string> {
        return await this.RoomRepository.update(id, body);
    }

    async delete(id: string): Promise<string> {
        return await this.RoomRepository.delete(id);
    }
}