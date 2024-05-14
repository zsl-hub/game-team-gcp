import { Datastore } from '@google-cloud/datastore';
import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiService } from '../api.service';
import { createGameMove } from './gamemoves.dto'

@Controller('api/v1/GameMoves')
export class GameMovesController {
    constructor(private readonly api: ApiService) { }
    constructor(private readonly api: ApiService) { }
    datastore = new Datastore({ databaseId: 'checkers-datastore', projectId: "checkers-zsl" });

    @Get()
    async findAll(): Promise<object> {
        try {
            const result = await this.api.findAll("GameMove")
            return await this.api.ApiSuccessData({ result })
        }
        catch (err) { throw new NotFoundException("Couldn't find all gamemoves")}
    }

    @Get(":id")
    async findOne(@Param('id') id: string): Promise<object> {
        try {
            const result = await this.api.findOne(id, "GameMove")
            return await this.api.ApiSuccessData({ result })
        }
        catch (err) { throw new NotFoundException("Couldn't find all gamemoves")}
    }

    @Post()
    async add(@Body() body: createGameMove): Promise<string> {
        try {
            const taskKey = this.datastore.key('GameMove');
            const taskKey = this.datastore.key('GameMove');
            const entity = {
                key: taskKey,
                data: { body },
            };
            await this.datastore.save(entity);
            return await this.api.ApiSuccessNoData();
            return await this.api.ApiSuccessNoData();
        }
        catch (err) {throw new BadRequestException('Something bad happened')}
    }
    
    @Delete(":id")
    async delete(@Param('id') id: string): Promise<string> {
        try {
            await this.api.delete(id,"GameMove")
            return await this.api.ApiSuccessNoData();
        }
        catch (err) {console.log(err); throw new BadRequestException('Something bad happened')}
    }
}
    
    @Delete(":id")
    async delete(@Param('id') id: string): Promise<string> {
        try {
            await this.api.delete(id,"GameMove")
            return await this.api.ApiSuccessNoData();
        }
        catch (err) {console.log(err); throw new BadRequestException('Something bad happened')}
    }
}