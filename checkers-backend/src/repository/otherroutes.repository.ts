import { Datastore, PropertyFilter } from '@google-cloud/datastore';
import { Room } from 'src/dto/room.dto'

export class OtherRoutesRepository {
    datastore = new Datastore({ databaseId: 'checkers-datastore', projectId: "checkers-zsl" });
    query = this.datastore.createQuery("room");

    async getAllAvailableRooms(): Promise<Room[]> {
        const query = this.datastore.createQuery("room").filter(new PropertyFilter("isAvailable", "=", 1));
        const result = await query.run();
        return result[0];
    }
}