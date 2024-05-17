import { Datastore, PropertyFilter } from '@google-cloud/datastore';
import { Room } from 'src/dto/room.dto'
import { v4 as uuidv4 } from 'uuid';

export class RoomRepository {
    datastore = new Datastore({ databaseId: 'checkers-datastore', projectId: "checkers-zsl" });

    async findAll(): Promise<Room[]> {
        const query = this.datastore.createQuery("room")
        const [rooms, queryInfo] = await query.run();
        return rooms;
    }

    async findOne(id: string): Promise<Room> {
        const query = this.datastore.createQuery("room").filter(new PropertyFilter(("roomId"), "=", id))
        const [rooms, queryInfo] = await query.run();
        return rooms[0];
    }

    async add(body: Room): Promise<string> {
        body.roomId = uuidv4();
        const taskKey = this.datastore.key('roomId');
        const entity = {
            key: taskKey,
            data: body,
        };
        await this.datastore.save(entity);
        return "Success";
    }

    async update(id: string, body: Room): Promise<string> {
        body.roomId = id;
        const query = this.datastore.createQuery("room").filter(new PropertyFilter("roomId", "=", id));
        const [rooms, queryInfo] = await query.run();
        const taskKey = rooms[0][this.datastore.KEY];
        const entity = {
            key: taskKey,
            data: body,
        };
        await this.datastore.update(entity);
        return "Success";
    }

    async delete(id: string): Promise<string> {
        const query = this.datastore.createQuery("room").filter(new PropertyFilter("roomId", "=", id));
        const [rooms, queryInfo] = await query.run();
        await this.datastore.delete(rooms[0][this.datastore.KEY]);
        return "Success";
    }
}