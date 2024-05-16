import { Datastore, PropertyFilter } from '@google-cloud/datastore';
import { gameMove } from 'src/dto/gamemoves.dto'
import { v4 as uuidv4 } from 'uuid';
import { ResponseService } from './response.service';

export class GameMovesService {
    datastore = new Datastore({ databaseId: 'checkers-datastore', projectId: "checkers-zsl" });
    constructor(private readonly ResponseService: ResponseService) { }

    async findAll(): Promise<gameMove[]> {
        const query = this.datastore.createQuery("gameMove")
        const result = await query.run();
        return result[0];
    }

    async findOne(id: string): Promise<gameMove> {
        const query = this.datastore.createQuery("gameMove")
            .filter(new PropertyFilter(("gameMoveId"), "=", id))
        const result = await query.run();
        return result[0][0];
    }

    async add(body: gameMove): Promise<string> {
        body.gameMoveId = uuidv4();
        const taskKey = this.datastore.key('gameMove');
        const entity = {
            key: taskKey,
            data: body,
        };
        await this.datastore.save(entity);
        return await this.ResponseService.SuccessNoData();
    }

    async update(id: string, body: gameMove): Promise<string> {
        body.gameMoveId = id;
        const query = this.datastore.createQuery("gameMove").filter(new PropertyFilter("gameMoveId", "=", id));
        const res = await query.run();
        const taskKey = res[0][0][this.datastore.KEY];
        const entity = {
            key: taskKey,
            data: body,
        };
        await this.datastore.update(entity);
        return await this.ResponseService.SuccessNoData();
    }

    async delete(id: string): Promise<string> {
        const query = this.datastore.createQuery("gameMove").filter(new PropertyFilter("gameMoveId", "=", id));
        const res = await query.run();
        await this.datastore.delete(res[0][0][this.datastore.KEY]);
        return await this.ResponseService.SuccessNoData();
    }
}