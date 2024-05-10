import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ApiService } from '../api.service';
import { Datastore } from '@google-cloud/datastore';
import { take } from 'rxjs';

@Controller('api/v1/Game')
export class GameController {
    constructor(private readonly apiService: ApiService) {}
    datastore = new Datastore({databaseId:'checkers-datastore', projectId:"checkers-zsl"});

    @Get()
    async FindAll(): Promise<object> {
        try
        {
            const query = this.datastore.createQuery('Game')
            const result = await this.datastore.runQuery(query)
            return await this.apiService.ApiSuccessData({result})
        }
        catch(err){return await this.apiService.ApiErrorData(err);}
    }
    
    // @Get(":id")
    // async FindOne(@Param() id: number ): Promise<object> {
    //     try{
    //         const taskKey = await this.datastore.key([ 'Game', id ]);
    //         const result = await this.datastore.createQuery('Game').hasAncestor(taskKey);
    //         return await this.apiService.ApiSuccessData({result})
    //     }
    //     catch(err){return await this.apiService.ApiErrorData(err);}
    // }

    @Post()
    async AddOne(@Body() body: object): Promise<string> {
        try{
            /*{"RoomName":"Fight","StartingColor":"random"}*/
            const taskKey = await this.datastore.key('Game');
            const entity = {
              key: taskKey,
              data: {body},
            };
            await this.datastore.save(entity);
            return await this.apiService.ApiSuccessNoData();
        }
        catch(err){return await this.apiService.ApiErrorNoData();}
    }

//     @Put(':id')
//     async UpdateOne(@Param('id') id: number, @Body() body: string): Promise<string> {
//         try{
//             console.log(id)
//             console.log(body);
//             const taskKey = await this.datastore.key([ 'Game', id ]);
//             const data = {
//                 key: taskKey,
//                 data:body,
//             }
            
//             await this.datastore.update(data)
//             return await this.apiService.ApiSuccessNoData();
//         }
//         catch(err){return await this.apiService.ApiErrorNoData();}
//     }
//     @Delete(':id')
//     async DeleteOne(@Param('id') id: number): Promise<string> {
//         try{
//             console.log(id);
//             const taskKey = await this.datastore.key([ 'Game', id ]);
//             await this.datastore.delete(taskKey)
//             return await this.apiService.ApiSuccessNoData();
//         }
//         catch(err){return await this.apiService.ApiErrorNoData();}
//     }
}
