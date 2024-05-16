import { Datastore, PropertyFilter } from '@google-cloud/datastore';
import { room } from "src/dto/room.dto"

export class OtherRoutesService {
    datastore = new Datastore({ databaseId: 'checkers-datastore', projectId: "checkers-zsl" });

    async getAllAvailableRooms(): Promise<room[]> {
        const query = this.datastore.createQuery("room").filter(new PropertyFilter("isAvailable", "=", 1));
        const res = await query.run();
        return res[0];
    }
}