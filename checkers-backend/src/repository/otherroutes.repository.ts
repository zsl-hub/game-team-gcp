import { Datastore, PropertyFilter } from '@google-cloud/datastore';
import { Room } from '../dto/room.dto'
import { PositionMove } from "../dto/gamemoves.dto"
import { Body } from '@nestjs/common';

export class OtherRoutesRepository {
    datastore = new Datastore({ databaseId: 'checkers-datastore', projectId: "checkers-zsl" });
    query = this.datastore.createQuery("room");

    async getAllAvailableRooms(): Promise<Room[]> {
        const query = this.datastore.createQuery("room").filter(new PropertyFilter("isAvailable", "=", 1));
        const result = await query.run();
        return result[0];
    }

    async makeMove(@Body() body: PositionMove): Promise<number> {
        const query = this.datastore.createQuery("gameMove").filter(new PropertyFilter("gameId", "=", body.gameId));
        const [rooms, queryInfo] = await query.run();
        const taskKey = rooms[0][this.datastore.KEY];
        const entity = {
            key: taskKey,
            data: body,
        };
        await this.datastore.update(entity);
        return 1;
    }
}