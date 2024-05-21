import { Datastore, PropertyFilter } from '@google-cloud/datastore';
import { GameMove } from 'src/dto/gamemoves.dto'
import { v4 as uuidv4 } from 'uuid';

export class GameMovesRepository {
    datastore = new Datastore({ databaseId: 'checkers-datastore', projectId: "checkers-zsl" });

    async findAll(): Promise<GameMove[]> {
        const query = this.datastore.createQuery("gameMoves");
        const [gameMoves, queryInfo] = await query.run();
        return gameMoves;
    }

    async findOne(id: string): Promise<GameMove> {
        const query = this.datastore.createQuery("gameMove").filter(new PropertyFilter(("gameMoveId"), "=", id))
        const [gameMoves, queryInfo] = await query.run();
        return gameMoves[0];
    }

    async add(body: GameMove): Promise<string> {
        body.gameMoveId = uuidv4();
        const taskKey = this.datastore.key('gameMove');
        const entity = {
            key: taskKey,
            data: body,
        };
        await this.datastore.save(entity);
        return "Success";
    }

    async update(id: string, body: GameMove): Promise<string> {
        body.gameMoveId = id;

        const query = this.datastore.createQuery("gameMove").filter(new PropertyFilter("gameMoveId", "=", id));
        const [gameMoves, queryInfo] = await query.run();
        const taskKey = gameMoves[0][this.datastore.KEY];
        const entity = {
            key: taskKey,
            data: body,
        };
        await this.datastore.update(entity);
        return "Success";
    }

    async delete(id: string): Promise<string> {
        const query = this.datastore.createQuery("gameMove").filter(new PropertyFilter("gameMoveId", "=", id));
        const [gameMoves, queryInfo] = await query.run();
        await this.datastore.delete(gameMoves[0][this.datastore.KEY]);
        return "Success";
    }
}