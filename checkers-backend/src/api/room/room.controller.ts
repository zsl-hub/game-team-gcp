import { Datastore,  } from '@google-cloud/datastore';
import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiService } from '../api.service';
import { createRoom } from './room.dto'

@Controller('api/v1/Room')
export class RoomController {
    constructor(private readonly api: ApiService) { }
    datastore = new Datastore({ databaseId: 'checkers-datastore', projectId: "checkers-zsl" });

    @Get()
    async findAll(): Promise<object> {
        try {
            const result = await this.api.findAll("Room")
            return await this.api.ApiSuccessData({ result })
        }
        catch (err) { throw new NotFoundException("Couldn't find all rooms")}
    }

    @Get(":id")
    async findOne(@Param('id') id: string): Promise<object> {
        try {
            const result = await this.api.findOne(id, "Room")
            return await this.api.ApiSuccessData({ result })
        }
        catch (err) { throw new NotFoundException("Couldn't find all gamemoves")}
    }

    @Post()
    async add(@Body() body: createRoom): Promise<string> {
        try {
            const taskKey = this.datastore.key('Room');
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
            await this.api.delete(id,"Room")
            return await this.api.ApiSuccessNoData();
        }
        catch (err) {console.log(err); throw new BadRequestException('Something bad happened')}
    }
}
