import { Datastore, PropertyFilter } from '@google-cloud/datastore';
import { Game } from 'src/dto/game.dto'
import { v4 as uuidv4 } from 'uuid';

export class GameRepository {
    datastore = new Datastore({ databaseId: 'checkers-datastore', projectId: "checkers-zsl" });

    async findAll(): Promise<Game[]> {
        const query = this.datastore.createQuery("game")
        const [rooms, queryInfo] = await query.run();
        return rooms;
    }

    async findOne(id: string): Promise<Game> {
        const query = this.datastore.createQuery("game").filter(new PropertyFilter(("gameId"), "=", id))
        const [rooms, queryInfo] = await query.run();
        return rooms[0];
    }

    async add(body: Game): Promise<string> {
        body.gameId = uuidv4();
        const taskKey = this.datastore.key('gameId');
        const entity = {
            key: taskKey,
            data: body,
        };
        await this.datastore.save(entity);
        return "Success";
    }

    async update(id: string, body: Game): Promise<string> {
        body.gameId = id;
        const query = this.datastore.createQuery("game").filter(new PropertyFilter("gameId", "=", id));
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
        const query = this.datastore.createQuery("game").filter(new PropertyFilter("gameId", "=", id));
        const [rooms, queryInfo] = await query.run();
        await this.datastore.delete(rooms[0][this.datastore.KEY]);
        return "Success";
    }
}