import { Room, Colors } from 'src/dto/room.dto'
import { RoomRepository } from "src/repository/room.repository"
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';

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

    async createRoom(body: Room): Promise<Room> {
        body.roomId = uuidv4();
        body.isAvailable = true;
        body.player2Id = null;
        if (body.startingColor == "Random"){body.startingColor = Colors[(["Red","Black"])[Math.floor(Math.random()*([1,2]).length)]]}
        const response = await this.RoomRepository.createRoom(body);
        return body;
    }
}