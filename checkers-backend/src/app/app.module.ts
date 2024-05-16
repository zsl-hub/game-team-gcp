import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from '../events-gateway/gateway.module';

import { RoomController } from 'src/controller/api/room/room.controller';
import { RoomService } from 'src/service/room.service';
import { GameController } from 'src/controller/api/game/game.controller';
import { GameService } from 'src/service/game.service';
import { GameMovesController } from 'src/controller/api/gamemoves/gamemoves.controller';
import { GameMovesService } from 'src/service/gamemoves.service';
import { OtherRoutesController } from 'src/controller/api/otherroutes/otherroutes.controller';
import { OtherRoutesService } from 'src/service/otherroutes.service';
import { ResponseService } from 'src/service/response.service';

@Module({
  imports: [GatewayModule],
  controllers: [AppController, RoomController, GameController, GameMovesController, OtherRoutesController],
  providers: [AppService, ResponseService, RoomService, GameService, GameMovesService, OtherRoutesService],
})
export class AppModule { }
