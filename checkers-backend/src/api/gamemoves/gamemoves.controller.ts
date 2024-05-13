import { Datastore } from '@google-cloud/datastore';
import { BadRequestException, Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { ApiService } from '../api.service';
import { createGameMove } from './gamemoves.dto'

@Controller('api/v1/GameMoves')
export class GameMovesController {
    constructor(private readonly apiService: ApiService) { }
    datastore = new Datastore({ databaseId: 'checkers-datastore', projectId: "checkers-zsl" });

    @Get()
    async findAll(): Promise<object> {
        try {
            const query = this.datastore.createQuery('GameMoves')
            const result = await this.datastore.runQuery(query)
            return await this.apiService.ApiSuccessData({ result })
        }
        catch (err) { throw new NotFoundException("Couldn't find all gamemoves")}
    }

    @Post()
    async Add(@Body() body: createGameMove): Promise<string> {
        try {
            /*{"RoomName":"Fight","StartingColor":"random"}*/
            const taskKey = await this.datastore.key('GameMovies');
            const entity = {
                key: taskKey,
                data: { body },
            };
            await this.datastore.save(entity);
            return await this.apiService.ApiSuccessNoData();
        }
        catch (err) {throw new BadRequestException('Something bad happened')}
    }
}
