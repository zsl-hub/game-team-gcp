import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GameMovesService } from 'src/service/gamemoves.service';
import { gameMove } from 'src/dto/gamemoves.dto';

@Controller('api/v1/GameMoves')
export class GameMovesController {
    constructor(private readonly gameMovesService: GameMovesService) { }

    @Get()
    async findAll(): Promise<gameMove[]> {
        return await this.gameMovesService.findAll();
    }

    @Get(":id")
    async findOne(@Param('id') id: string): Promise<gameMove> {
        return await this.gameMovesService.findOne(id);
    }


    @Post()
    async add(@Body() body: gameMove): Promise<string> {
        return await this.gameMovesService.add(body);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: gameMove): Promise<string> {
        return await this.gameMovesService.update(id, body);
    }

    @Delete(":id")
    async delete(@Param('id') id: string): Promise<string> {
        return await this.gameMovesService.delete(id)
    }
}
