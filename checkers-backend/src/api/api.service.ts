import { Injectable } from '@nestjs/common';


@Injectable()
export class ApiService {
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
