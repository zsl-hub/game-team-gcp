import { Datastore } from '@google-cloud/datastore';
import { BadRequestException, Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { ApiService } from '../api.service';
import { createRoom } from './room.dto'

@Controller('api/v1/Room')
export class RoomController {
    constructor(private readonly apiService: ApiService) { }
    datastore = new Datastore({ databaseId: 'checkers-datastore', projectId: "checkers-zsl" });

    @Get()
    async findAll(): Promise<object> {
        try {
            const query = this.datastore.createQuery('Room')
            const result = await this.datastore.runQuery(query)
            return await this.apiService.ApiSuccessData({ result })
        }
        catch (err) { throw new NotFoundException("Couldn't find all rooms")}
    }

    @Post()
    async add(@Body() body: createRoom): Promise<string> {
        try {
            const taskKey = await this.datastore.key('Room');
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
