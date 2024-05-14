import { BadRequestException, Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { Datastore } from '@google-cloud/datastore';

@Injectable()
export class ApiService {
    datastore = new Datastore({ databaseId: 'checkers-datastore', projectId: "checkers-zsl" });
    constructor(private readonly apiService: ApiService) { }

    async findAll(kind: string): Promise<object> {
        try {
            const query = this.datastore.createQuery(kind)
            const result = await this.datastore.runQuery(query)
            return result;
        }
        catch (err) { throw new NotFoundException("Couldn't find all rooms")}
    }

    async delete(@Param('id') id: string, kind: string): Promise<string> {
        try {
            const taskKey = this.datastore.key(["Room", parseInt(id)]);
            await this.datastore.delete(taskKey);
            return await "success"
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
