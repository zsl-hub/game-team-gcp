import { Datastore } from '@google-cloud/datastore';
import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiService } from '../api.service';
import { createGame } from './game.dto'

@Controller('api/v1/Game')
export class GameController {
    constructor(private readonly api: ApiService) { }
    datastore = new Datastore({ databaseId: 'checkers-datastore', projectId: "checkers-zsl" });

    @Get()
    async findAll(): Promise<object> {
        try {
            const result = await this.api.findAll("Game")
            return await this.api.ApiSuccessData({ result })
        }
        catch (err) { throw new NotFoundException("Couldn't find all games")}
    }

    @Get(":id")
    async findOne(@Param('id') id: string): Promise<object> {
        try {
            const result = await this.api.findOne(id, "Game")
            return await this.api.ApiSuccessData({ result })
        }
        catch (err) { throw new NotFoundException("Couldn't find all gamemoves")}
    }

    @Post()
    async add(@Body() body: createGame): Promise<string> {
        try {
            const taskKey =  this.datastore.key('Game');
            const entity = {
                key: taskKey,
                data: { body },
            };
            await this.datastore.save(entity);
            return await this.api.ApiSuccessNoData();
        }
        catch (err) {throw new BadRequestException('Something bad happened')}
    }
    
    @Delete(":id")
    async delete(@Param('id') id: string): Promise<string> {
        try {
            await this.api.delete(id,"Game")
            return await this.api.ApiSuccessNoData();
        }
        catch (err) {console.log(err); throw new BadRequestException('Something bad happened')}
    }
}
