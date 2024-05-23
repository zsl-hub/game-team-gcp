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

    async findOneName( id: string): Promise<Object> {
        const query = this.datastore.createQuery("game").filter(new PropertyFilter(("roomId"), "=", id))
        const [game, queryInfo] = await query.run();
        return game[0];
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
        const query = this.datastore.createQuery("game").filter(new PropertyFilter("roomId", "=", id));
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
        const taskKeyAdd = this.datastore.key('game');
        const entityAdd = {
            key: taskKeyAdd,
            data: copy,
        };
        await this.datastore.save(entityAdd);
        const basicBoard = {
            "H": [2, 0, 2, 0, 2, 0, 2, 0],
            "G": [0, 2, 0, 2, 0, 2, 0, 2],
            "F": [2, 0, 2, 0, 2, 0, 2, 0],
            "E": [0, 0, 0, 0, 0, 0, 0, 0],
            "D": [0, 0, 0, 0, 0, 0, 0, 0],
            "C": [0, 1, 0, 1, 0, 1, 0, 1],
            "B": [1, 0, 1, 0, 1, 0, 1, 0],
            "A": [0, 1, 0, 1, 0, 1, 0, 1]
        };
        const gameMoveId = uuidv4();
        const gameMoveData = {
            gameMoveId: gameMoveId,
            roomId: copy.roomId,
            current: basicBoard
        }
        const taskKeyAdd2 = this.datastore.key('gameMove');
        const entityAdd2 = {
            key: taskKeyAdd2,
            data: gameMoveData,
        };
        await this.datastore.save(entityAdd2);
        return "Success";
    }
}