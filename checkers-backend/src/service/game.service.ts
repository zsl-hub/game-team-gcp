import { GameRepository } from "src/repository/game.repository"
import { Game } from 'src/dto/game.dto'
import { Injectable } from "@nestjs/common";

@Injectable()
export class GameService {
    constructor(private readonly gameRepository: GameRepository) { }

    async findAll(): Promise<Game[]> {
        return await this.gameRepository.findAll();
    }

    async findOne(id: string): Promise<Game> {
        return await this.gameRepository.findOne(id);
    }

    async add(body: Game): Promise<string> {
        return await this.gameRepository.add(body);
    }

    async update(id: string, body: Game): Promise<string> {
        return await this.gameRepository.update(id, body);
    }

    async delete(id: string): Promise<string> {
        return await this.gameRepository.delete(id);
    }
}