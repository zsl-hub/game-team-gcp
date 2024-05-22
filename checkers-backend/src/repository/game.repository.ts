import { Datastore, PropertyFilter } from '@google-cloud/datastore';
import { Game } from 'src/dto/game.dto'
import { v4 as uuidv4 } from 'uuid';

export class GameRepository {
    datastore = new Datastore({ databaseId: 'checkers-datastore', projectId: "checkers-zsl" });

    async findAll(): Promise<Game[]> {
        const query = this.datastore.createQuery("game")
        const [game, queryInfo] = await query.run();
        return game;
    }

    async findOne(id: string): Promise<Game> {
        const query = this.datastore.createQuery("game").filter(new PropertyFilter(("gameId"), "=", id))
        const [game, queryInfo] = await query.run();
        return game[0];
    }

    async add(body: Game): Promise<string> {
        body.gameId = uuidv4();
        const taskKey = this.datastore.key('game');
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
        const [game, queryInfo] = await query.run();
        const taskKey = game[0][this.datastore.KEY];
        const entity = {
            key: taskKey,
            data: body,
        };
        await this.datastore.update(entity);
        return "Success";
    }

    async delete(id: string): Promise<string> {
        const query = this.datastore.createQuery("game").filter(new PropertyFilter("gameId", "=", id));
        const [game, queryInfo] = await query.run();
        await this.datastore.delete(game[0][this.datastore.KEY]);
        return "Success";
    }

    async join(body: Game, copy: Game): Promise<string> {
        const query = this.datastore.createQuery("room").filter(new PropertyFilter("roomId", "=", body.roomId));
        const [room, queryInfo] = await query.run();
        room[0].player2Id = body.player2Id;
        room[0].isAvailable = false;
        const taskKeyUpdate = room[0][this.datastore.KEY];
        const entityUpdate = {
            key: taskKeyUpdate,
            data: room[0],
        };
        await this.datastore.update(entityUpdate);

        body.gameId = uuidv4();
        const taskKeyAdd = this.datastore.key('game');
        const entityAdd = {
            key: taskKeyAdd,
            data: copy,
        };
        await this.datastore.save(entityAdd);
        return "Success";
    }
}