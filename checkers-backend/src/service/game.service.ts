import { GameRepository } from "src/repository/game.repository"
import { Game, GameResult } from 'src/dto/game.dto'
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GameService{
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

    async join(body: Game, copy:Game): Promise<string> {
        copy.gameEnded = false;
        copy.gameId = uuidv4();
        copy.player1Name = "Anonymous"
        copy.player2Name = "Anonymous"
        copy.gameResult= GameResult["Ongoing"];
        await this.gameRepository.join(body, copy)
        return "ok";
    }
}