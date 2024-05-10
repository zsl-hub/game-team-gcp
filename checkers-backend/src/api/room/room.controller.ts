import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ApiService } from '../api.service';
import { Datastore } from '@google-cloud/datastore';

@Controller('api/v1/Room')
export class RoomController {
    constructor(private readonly apiService: ApiService) {}
    datastore = new Datastore({databaseId:'checkers-datastore', projectId:"checkers-zsl"});

    @Get()
    async FindAll(): Promise<object> {
        try{
            const query = this.datastore.createQuery('Room')
            const result = await this.datastore.runQuery(query)
            return await this.apiService.ApiSuccessData({result})
        }
        catch(err){return await this.apiService.ApiErrorData(err);}
    }
    // @Get(":id")
    // async FindOne(@Param() id: number ): Promise<object> {
    //     try{
    //         const taskKey = await this.datastore.key([ 'Room', 5704568633556992 ]);
    //         const result = this.datastore.get(taskKey).then(async results => {
    //             return results[0];
    //         })
    //         return await this.apiService.ApiSuccessData({result})
    //     }
    //     catch(err){return await this.apiService.ApiErrorData(err);}
    // }
    @Post()
    async AddOne(@Body() body: object): Promise<string> {
        try{
            /*{"RoomName":"Fight","StartingColor":"random"}*/
            const taskKey = await this.datastore.key('Room');
            const entity = {
              key: taskKey,
              data: {body},
            };
            await this.datastore.save(entity);
            return await this.apiService.ApiSuccessNoData();
        }
        catch(err){return await this.apiService.ApiErrorNoData();}
    }
    // @Put(':id')
    // async UpdateOne(@Param('id') id: number, @Body() body: string): Promise<string> {
    //     try{
    //         console.log(id)
    //         console.log(body);
    //         const taskKey = await this.datastore.key([ 'Room', id ]);
    //         const data = {
    //             key: taskKey,
    //             data:body,
    //         }
            
    //         await this.datastore.update(data)
    //         return await this.apiService.ApiSuccessNoData();
    //     }
    //     catch(err){return await this.apiService.ApiErrorNoData();}
    // }
    // @Delete(':id')
    // async DeleteOne(@Param('id') id: number): Promise<string> {
    //     try{
    //         console.log(id);
    //         const taskKey = await this.datastore.key([ 'Room', id ]);
    //         await this.datastore.delete(taskKey)
    //         return await this.apiService.ApiSuccessNoData();
    //     }
    //     catch(err){return await this.apiService.ApiErrorNoData();}
    // }
}
