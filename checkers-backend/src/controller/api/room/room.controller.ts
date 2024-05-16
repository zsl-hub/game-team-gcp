import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoomService } from 'src/service/room.service';
import { Room } from 'src/dto/room.dto';

@Controller('api/v1/Room')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }

    @Get()
    async findAll(): Promise<Room[]> {
        return await this.roomService.findAll();
    }

    @Get(":id")
    async findOne(@Param('id') id: string): Promise<Room> {
        return await this.roomService.findOne(id);
    }

    @Post()
    async add(@Body() body: Room): Promise<string> {
        return await this.roomService.add(body);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: Room): Promise<string> {
        return await this.roomService.update(id, body);
    }

    @Delete(":id")
    async delete(@Param('id') id: string): Promise<string> {
        return await this.roomService.delete(id)
    }
}
