import { Datastore, PropertyFilter } from '@google-cloud/datastore';
import { Room } from '../dto/room.dto'
import { PositionMove } from "../dto/gamemoves.dto"
import { Body } from '@nestjs/common';
import { User } from 'src/dto/user.dto';

export class OtherRoutesRepository {
    datastore = new Datastore({ databaseId: 'checkers-datastore', projectId: "checkers-zsl" });
    query = this.datastore.createQuery("room");

    async getAllAvailableRooms(): Promise<Room[]> {
        const query = this.datastore.createQuery("room").filter(new PropertyFilter("isAvailable", "=", 1));
        const result = await query.run();
        return result[0];
    }

    async renameUser(@Body() body: User): Promise<number> {
        const query = this.datastore.createQuery("game").filter(new PropertyFilter("roomId", "=", body.roomId));
        const [game, queryInfo] = await query.run();
        if (game[0].player1Id) {
            game[0].player1Name = body.userName
        }
        else {
            game[0].player2Name = body.userName
        }
        const taskKey = game[0][this.datastore.KEY];
        const entity = {
            key: taskKey,
            data: game[0],
        };
        await this.datastore.upsert(entity);
        return 1;
    }

    async makeMove(@Body() body: PositionMove): Promise<number> {
        const query = this.datastore.createQuery("gameMove").filter(new PropertyFilter("gameId", "=", body.gameId));
        const [move, queryInfo] = await query.run();
        const taskKey = move[0][this.datastore.KEY];
        const entity = {
            key: taskKey,
            data: body,
        };
        await this.datastore.update(entity);
        return 1;
    }
}