import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { RoomService } from 'src/service/room.service';
import { Room } from 'src/dto/room.dto';

@Controller('api/v1/Room')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }

    @Get()
    async findAll(): Promise<Room[]> {
        const response = await this.roomService.findAll();
        if(response === undefined){ throw new InternalServerErrorException("Error occured");}
        return response;
    }

    @Get(":id")
    async findOne(@Param('id') id: string): Promise<Room> {
        const response = await this.roomService.findOne(id);
        if(response === undefined){ throw new InternalServerErrorException("Error occured");}
        return response;
    }

    @Post()
    async add(@Body() body: Room): Promise<string> {
        const response = await this.roomService.add(body);
        if(response != "Success"){throw new InternalServerErrorException("Error occured");}
        return response;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: Room): Promise<string> {
        const response = await this.roomService.update(id, body);
        if(response != "Success"){throw new InternalServerErrorException("Error occured");}
        return response;
    }

    @Delete(":id")
    async delete(@Param('id') id: string): Promise<string> {
        const response = await this.roomService.delete(id)
        if(response != "Success"){throw new InternalServerErrorException("Error occured");}
        return response;
    }

    @Post("/createRoom")
    async createRoom(@Body() body: Room): Promise<Room>{
        const response = await this.roomService.createRoom(body);
        if (!response){throw new BadRequestException(response);}
        return response;
    }
}
