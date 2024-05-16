import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from '../events-gateway/gateway.module';

import { RoomController } from 'src/controller/api/room/room.controller';
import { RoomService } from 'src/service/room.service';
import { RoomRepository } from 'src/repository/room.repository';

import { GameController } from 'src/controller/api/game/game.controller';
import { GameService } from 'src/service/game.service';
import { GameRepository } from 'src/repository/game.repository';

import { GameMovesController } from 'src/controller/api/gamemoves/gamemoves.controller';
import { GameMovesService } from 'src/service/gamemoves.service';
import { GameMovesRepository } from 'src/repository/gamemoves.repository';

import { OtherRoutesController } from 'src/controller/api/otherroutes/otherroutes.controller';
import { OtherRoutesService } from 'src/service/otherroutes.service';
import { OtherRoutesRepository } from 'src/repository/otherroutes.repository';

@Module({
  imports: [GatewayModule],
  controllers: [AppController, RoomController, GameController, GameMovesController, OtherRoutesController],
  providers: [AppService, RoomService, GameService, GameMovesService, OtherRoutesRepository, OtherRoutesService, GameRepository, GameMovesRepository, RoomRepository],
})
export class AppModule { }
