import { Injectable } from '@nestjs/common';


@Injectable()
export class ApiService {
    async ApiSuccessData(data : object): Promise<object>
    {
        return {result:"success", data:data}
    }

    
    async ApiErrorData(data: object): Promise<object>
    {
        try{return {result:"error", data:data}}
        catch(err){return {result:"error both in code and within handler", data:data}}
    }

    async ApiSuccessNoData(): Promise<string>
    {
        try{return "Everything went ok!"}
        catch(err){return "Everything went ok!, but our handler returned an issue"}
    }

    async ApiErrorNoData(): Promise<string>
    {
        try{return "Error occured"}
        catch(err){return "Error occured both in app and within handler"}
    }
}
