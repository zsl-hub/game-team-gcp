import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GameService } from 'src/service/game.service';
import { Game } from 'src/dto/game.dto';

@Controller('api/v1/Game')
export class GameController {
    constructor(private readonly gameService: GameService) { }

    @Get()
    async findAll(): Promise<Game[]> {
        return await this.gameService.findAll();
    }

    @Get(":id")
    async findOne(@Param('id') id: string): Promise<Game> {
        return await this.gameService.findOne(id);
    }
    
    @Get("/getName/:id")
    async findOneName(@Param('id') id: string): Promise<Object> {
        return await this.gameService.findOneName(id);
    }

    @Post()
    async add(@Body() body: Game): Promise<string> {
        return await this.gameService.add(body);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: Game): Promise<string> {
        return await this.gameService.update(id, body);
    }

    @Delete("/:id")
    async delete(@Param('id') id: string): Promise<string> {
        return await this.gameService.delete(id)
    }

    @Post("/join")
    async join(@Body() body: Game) {
        return this.gameService.join(body, body);
    }
}
