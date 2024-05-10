import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RoomController } from './api/room/room.controller';
import { GameController } from './api/game/game.controller';
import { GameMovesController } from './api/gamemoves/gamemoves.controller';
import { ApiService } from './api/api.service';

@Module({
  imports: [],
  controllers: [AppController, RoomController, GameController, GameMovesController],
  providers: [AppService, ApiService],
})
export class AppModule {}
