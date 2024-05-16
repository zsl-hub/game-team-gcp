import { GameMovesRepository } from "src/repository/gamemoves.repository"
import { GameMove } from 'src/dto/gamemoves.dto'
import { Injectable } from "@nestjs/common";

@Injectable()
export class GameMovesService {
    constructor(private readonly GameMovesRepository: GameMovesRepository) { }

    async findAll(): Promise<GameMove[]> {
        return await this.GameMovesRepository.findAll();
    }

    async findOne(id: string): Promise<GameMove> {
        return await this.GameMovesRepository.findOne(id);
    }

    async add(body: GameMove): Promise<string> {
        return await this.GameMovesRepository.add(body);
    }

    async update(id: string, body: GameMove): Promise<string> {
        return await this.GameMovesRepository.update(id, body);
    }

    async delete(id: string): Promise<string> {
        return await this.GameMovesRepository.delete(id);
    }
}