import { Test, TestingModule } from '@nestjs/testing';
import { GamemovesController } from './gamemoves.controller';

describe('GamemovesController', () => {
  let controller: GamemovesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamemovesController],
    }).compile();

    controller = module.get<GamemovesController>(GamemovesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
