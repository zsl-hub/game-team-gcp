import { Datastore, PropertyFilter } from '@google-cloud/datastore';
import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiService } from '../api.service';
import { createGame } from './game.dto'
import { v4 as uuidv4 } from 'uuid';

@Controller('api/v1/Game')
export class GameController {
    constructor(private readonly api: ApiService) { }
    datastore = new Datastore({ databaseId: 'checkers-datastore', projectId: "checkers-zsl" });

    @Get()
    async findAll(): Promise<object> {
        try {
            const result = await this.api.findAll("game")
            return await this.api.ApiSuccessData({ result })
        }
        catch (err) { throw new NotFoundException("Couldn't find all games") }
    }

    @Get(":id")
    async findOne(@Param('id') id: string): Promise<object> {
        try {
            const result = await this.api.findOne(id, "game")
            return await this.api.ApiSuccessData({ result })
        }
        catch (err) { throw new NotFoundException("Couldn't find all gamemoves") }
    }

    @Post()
    async add(@Body() body: createGame): Promise<string> {
        try {
            body.gameId = uuidv4();
            const taskKey = this.datastore.key('game');
            const entity = {
                key: taskKey,
                data: body,
            };
            await this.datastore.save(entity);
            return await this.api.ApiSuccessNoData();
        }
        catch (err) { throw new BadRequestException('Something bad happened') }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: createGame): Promise<string> {
        try {        
            body.gameId = id;
            const query = this.datastore.createQuery("game").filter(new PropertyFilter("gameId","=",id));
            const res = await query.run();
            const taskKey = res[0][0][this.datastore.KEY];
            const entity = {
                key: taskKey,
                data: body ,
            };
            await this.datastore.update(entity);
            return await this.api.ApiSuccessNoData();
        }
        catch (err) {
            throw new BadRequestException('Something bad happened')
        }
    }

    @Delete(":id")
    async delete(@Param('id') id: string): Promise<string> {
        try {
            const query = this.datastore.createQuery("game").filter(new PropertyFilter("gameId","=",id));
            const res = await query.run();
            await this.datastore.delete(res[0][0][this.datastore.KEY]);
            return await this.api.ApiSuccessNoData();
        }
        catch (err) {console.log(err); throw new BadRequestException('Something bad happened')}
    }
}
