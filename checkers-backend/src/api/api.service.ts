import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { Datastore } from '@google-cloud/datastore';
import { createRoom } from './room/room.dto';

@Injectable()
export class ApiService {
    datastore = new Datastore({ databaseId: 'checkers-datastore', projectId: "checkers-zsl" });

    async findAll(kind: string): Promise<object> {
        try {
            const query = this.datastore.createQuery(kind)
            const result = await this.datastore.runQuery(query)
            return result;
        }
        catch (err) { throw new NotFoundException("Couldn't find all rooms")}
    }

    async findOne( id: string, kind: string): Promise<object> {
        try {
            const taskKey = this.datastore.key([kind, parseInt(id)]);
            const res = await this.datastore.get(taskKey);
            return res[0]; 
        }
        catch (err) {console.log(err); throw new NotFoundException("Couldn't find this room")}
    }

    async delete( id: string, kind: string): Promise<string> {
        try {
            const taskKey = this.datastore.key(["Room", parseInt(id)]);
            await this.datastore.delete(taskKey);
            return "success"
        }
        catch (err) {console.log(err); throw new BadRequestException('Something bad happened')}
    }

    async ApiSuccessData(data : object): Promise<object>
    {
        return {result:"success", data:data}
    }
    async ApiSuccessNoData(): Promise<string>
    {
        try{return "Everything went ok!"}
        catch(err){return "Everything went ok!, but our handler returned an issue"}
    }
}
