import { Controller, Get, NotFoundException } from "@nestjs/common";
import { Datastore, PropertyFilter } from '@google-cloud/datastore';
import { ApiService } from "../api.service";

@Controller("/api/v1")
export class OtherRoutesController {
    constructor(private readonly api: ApiService) { }
    datastore = new Datastore({ databaseId: 'checkers-datastore', projectId: "checkers-zsl" });

    @Get("/getAllAvailableRooms")
    async getAllRooms(): Promise<object> {
        try {
            const query = this.datastore.createQuery("room").filter(new PropertyFilter("isAvailable", "=", 1));
            const res = await query.run();
            return await this.api.ApiSuccessData({ res })
        }
        catch (err) { throw new NotFoundException("Couldn't find all available rooms") }
    }
}
