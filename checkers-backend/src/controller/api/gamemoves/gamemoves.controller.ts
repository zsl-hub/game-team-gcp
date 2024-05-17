import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { GameMovesService } from 'src/service/gamemoves.service';
import { GameMove } from 'src/dto/gamemoves.dto';

@Controller('api/v1/GameMoves')
export class GameMovesController {
    constructor(private readonly gameMovesService: GameMovesService) { }

    @Get()
    async findAll(): Promise<GameMove[]> {
        const response = await this.gameMovesService.findAll();
        if(response === undefined){ throw new InternalServerErrorException("Error occured");}
        return response;
    }

    @Get(":id")
    async findOne(@Param('id') id: string): Promise<GameMove> {
        const response = await this.gameMovesService.findOne(id);
        if(response === undefined){ throw new InternalServerErrorException("Error occured");}
        return response;
    }

    @Post()
    async add(@Body() body: GameMove): Promise<string> {
        const response = await this.gameMovesService.add(body);
        if(response != "Success"){throw new InternalServerErrorException("Error occured");}
        return response;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: GameMove): Promise<string> {
        return await this.gameMovesService.update(id, body);
    }

    @Delete(":id")
    async delete(@Param('id') id: string): Promise<string> {
        return await this.gameMovesService.delete(id)
    }
}
