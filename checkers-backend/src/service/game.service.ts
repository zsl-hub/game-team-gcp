import { Datastore, PropertyFilter } from '@google-cloud/datastore';
import { Injectable } from '@nestjs/common';
import { game } from '../dto/game.dto'
import { v4 as uuidv4 } from 'uuid';
import { ResponseService } from './response.service';

@Injectable()
export class GameService {
    datastore = new Datastore({ databaseId: 'checkers-datastore', projectId: "checkers-zsl" });
    constructor(private readonly ResponseService: ResponseService) { }

    async findAll(): Promise<game[]> {
        const query = this.datastore.createQuery("game")
        const result = await query.run();
        return result[0];
    }

    async findOne(id: string): Promise<game> {
        const query = this.datastore.createQuery("game")
            .filter(new PropertyFilter(("gameId"), "=", id))
        const result = await query.run();
        return result[0][0];
    }

    async add(body: game): Promise<string> {
        const res = body;
        res.gameId = uuidv4();
        res.player1Id = uuidv4();
        res.player2Id = uuidv4();
        const taskKey = this.datastore.key('game');
        const entity = {
            key: taskKey,
            data: body,
        };
        await this.datastore.save(entity);
        return await this.ResponseService.SuccessNoData();
    }

    async update(id: string, body: game) {
        body.gameId = id
        const query = this.datastore.createQuery("game").filter(new PropertyFilter("gameId", "=", id));
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
        const query = this.datastore.createQuery("game").filter(new PropertyFilter("gameId", "=", id));
        const res = await query.run();
        await this.datastore.delete(res[0][0][this.datastore.KEY]);
        return await this.ResponseService.SuccessNoData();
    }
}
