import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from '../events-gateway/gateway.module';

import { RoomController } from '../api/room/room.controller';
import { GameController } from '../api/game/game.controller';
import { GameMovesController } from '../api/gamemoves/gamemoves.controller';
import { OtherRoutesController } from '../api/other/otherroutes.controller';
import { ApiService } from '../api/api.service';

@Module({
  imports: [GatewayModule],
  controllers: [AppController, RoomController, GameController, GameMovesController, OtherRoutesController],
  providers: [AppService, ApiService],
})
export class AppModule { }
