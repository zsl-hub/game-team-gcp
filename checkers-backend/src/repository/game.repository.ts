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
        body.player1Id = uuidv4();
        body.player2Id = uuidv4();
        if (body.player1Color == "Random"){body.player1Color = (["Red","Black"])[Math.floor(Math.random()*([1,2]).length)]}
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
}