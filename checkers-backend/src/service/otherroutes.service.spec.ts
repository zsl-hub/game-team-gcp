import { Test, TestingModule } from '@nestjs/testing';
import { OtherRoutesService } from './otherroutes.service';
import { OtherRoutesRepository } from '../repository/otherroutes.repository';
import { OtherRoutesController } from '../controller/api/otherroutes/otherroutes.controller';
import { BadRequestException } from '@nestjs/common';

describe('Methods', () => {
    let service: OtherRoutesService;
    let repository: OtherRoutesRepository;
    let controller: OtherRoutesController;

    beforeEach(() => {
        repository = new OtherRoutesRepository();
        service = new OtherRoutesService(repository);
        controller = new OtherRoutesController(service);
    });

    describe('Check Range 1', () => {
        it('Start: 22, End: 11, Negation expected', async () => {
            const result = await service.checkRange(22, 33);
            expect(result).toBe(1);
        });
    });

    describe('Check Range 2 ', () => {
        it('Start: 22, End: 18, Should accept', async () => {
            const result = await service.checkRange(22, 18);
            expect(result).toBe(0);
        });
    });

    describe('Check Define 1', () => {
        it('Checks if any of values is undefined, Should reject', async () => {
            const result = await service.checkDefined([1, 2, undefined, 2, 1]);
            expect(result).toBe(1);
        });
    });

    describe('Check Define 2', () => {
        it('Checks if any of values is undefined, Should accept', async () => {
            const result = await service.checkDefined([-1.1, -1, 0, 1, 1.1]);
            expect(result).toBe(0);
        });
    });

    describe('endTileEmpty 1', () => {
        it('Checks if value is 0, should reject', async () => {
            const result = await service.endTileEmpty(undefined);
            expect(result).toBe(1);
        });
    });

    describe('endTileEmpty 2', () => {
        it('Checks if value is 0, should accept', async () => {
            const result = await service.endTileEmpty(0);
            expect(result).toBe(0);
        });
    });

    describe('endTileEmpty 3', () => {
        it('Checks if value is 0, should reject', async () => {
            const result = await service.endTileEmpty(1);
            expect(result).toBe(1);
        });
    });


    describe('startTileEmpty 1', () => {
        it('Checks if value is 0, should reject', async () => {
            const result = await service.startTileEmpty(undefined);
            expect(result).toBe(0);
        });
    });

    describe('startTileEmpty 2', () => {
        it('Checks if value is 0, should accept', async () => {
            const result = await service.startTileEmpty(0);
            expect(result).toBe(1);
        });
    });

    describe('startTileEmpty 3', () => {
        it('Checks if value is 0, should reject', async () => {
            const result = await service.startTileEmpty(1);
            expect(result).toBe(0);
        });
    });

    describe('Check Axis X 1', () => {
        it('check if move was possible, rejection expected', async () => {
            const result = await service.checkAxisX(3, 6);
            expect(result).toBe(1);
        });
    });

    describe('Check Axis X 2', () => {
        it('check if move was possible, acceptance expected', async () => {
            const result = await service.checkAxisX(3, 4);
            expect(result).toBe(0);
        });
    });

    describe('Check Axis Y 1', () => {
        it('check if move was possible, rejection expected', async () => {
            const result = await service.checkAxisY(3, 6);
            expect(result).toBe(1);
        });
    });

    describe('Check Axis Y 2', () => {
        it('check if move was possible, acceptance expected', async () => {
            const result = await service.checkAxisY(3, 4);
            expect(result).toBe(0);
        });
    });
});

describe("Game", () => {
    let service: OtherRoutesService;
    let repository: OtherRoutesRepository;
    let controller: OtherRoutesController;

    beforeEach(() => {
        repository = new OtherRoutesRepository();
        service = new OtherRoutesService(repository);
        controller = new OtherRoutesController(service);
    });

    describe('BasicMove', () => {
        it('Expect 1', async () => {
            const data = {
                current: {
                    "H": [2, 0, 2, 0, 2, 0, 2, 0],
                    "G": [0, 2, 0, 2, 0, 2, 0, 2],
                    "F": [2, 0, 2, 0, 2, 0, 2, 0],
                    "E": [0, 0, 0, 0, 0, 0, 0, 0],
                    "D": [0, 0, 0, 0, 0, 0, 0, 0],
                    "C": [0, 1, 0, 1, 0, 1, 0, 1],
                    "B": [1, 0, 1, 0, 1, 0, 1, 0],
                    "A": [0, 1, 0, 1, 0, 1, 0, 1]
                },
                gameId: "someid",
                gameMoveId: "someid",
                move: "22:18",
                playerId: "someid"
            };
            const result = await controller.makeMove(data);
            expect(result).toBe(1);
        });
    });

    describe('BasicMove', () => {
        it('Expect 1', async () => {
            const data = {
                current: {
                    "H": [2, 0, 2, 0, 2, 0, 2, 0],
                    "G": [0, 2, 0, 2, 0, 2, 0, 2],
                    "F": [2, 0, 2, 0, 2, 0, 2, 0],
                    "E": [0, 0, 0, 0, 0, 0, 0, 0],
                    "D": [0, 0, 0, 0, 0, 0, 0, 0],
                    "C": [0, 1, 0, 1, 0, 1, 0, 1],
                    "B": [1, 0, 1, 0, 1, 0, 1, 0],
                    "A": [0, 1, 0, 1, 0, 1, 0, 1]
                },
                gameId: "someid",
                gameMoveId: "someid",
                move: "9:14",
                playerId: "someid"
            };
            const result = await controller.makeMove(data);
            expect(result).toBe(1);
        });
    });

    describe('BasicMove, Checker in between', () => {
        it('Expected 0', async () => {
            const data = {
                current: {
                    "A": [0, 1, 0, 1, 0, 1, 0, 1],
                    "B": [1, 0, 1, 0, 1, 0, 1, 0],
                    "C": [0, 1, 0, 1, 0, 1, 0, 1],
                    "D": [0, 0, 0, 0, 0, 0, 0, 0],
                    "E": [0, 0, 0, 2, 0, 0, 0, 0],
                    "F": [2, 0, 2, 0, 2, 0, 2, 0],
                    "G": [0, 2, 0, 2, 0, 2, 0, 2],
                    "H": [2, 0, 2, 0, 2, 0, 2, 0]
                },
                gameId: "someid",
                gameMoveId: "someid",
                move: "22:18",
                playerId: "someid"
            };
            const result = await service.makeMove(data);
            expect(result).toBe(0);
        });
    });

    describe('BasicMove, Checker in between', () => {
        it('Expected 0', async () => {
            const data = {
                current: {
                    "A": [0, 1, 0, 1, 0, 1, 0, 1],
                    "B": [1, 0, 1, 0, 1, 0, 1, 0],
                    "C": [0, 1, 0, 1, 0, 1, 0, 1],
                    "D": [0, 0, 1, 0, 0, 0, 0, 0],
                    "E": [0, 0, 0, 0, 0, 0, 0, 0],
                    "F": [2, 0, 2, 0, 2, 0, 2, 0],
                    "G": [0, 2, 0, 2, 0, 2, 0, 2],
                    "H": [2, 0, 2, 0, 2, 0, 2, 0]
                },
                gameId: "someid",
                gameMoveId: "someid",
                move: "9:14",
                playerId: "someid"
            };
            const result = await service.makeMove(data);
            expect(result).toBe(0);
        });
    });

    describe('Take, No checker', () => {
        it('Expected 0', async () => {
            const data = {
                current: {
                    "A": [0, 0, 0, 0, 0, 0, 0, 0],
                    "B": [0, 0, 0, 0, 0, 0, 0, 0],
                    "C": [0, 0, 0, 0, 0, 0, 0, 0],
                    "D": [0, 0, 1, 0, 0, 0, 0, 0],
                    "E": [0, 0, 0, 0, 0, 0, 0, 0],
                    "F": [0, 0, 0, 0, 0, 0, 0, 0],
                    "G": [0, 0, 0, 0, 0, 0, 0, 0],
                    "H": [0, 0, 0, 0, 0, 0, 0, 0]
                },
                gameId: "someid",
                gameMoveId: "someid",
                move: "14:5",
                playerId: "someid"
            };
            const result = await service.makeMove(data);
            expect(result).toBe(0);
        });
    });

    describe('Take, No checker', () => {
        it('Expected 0', async () => {
            const data = {
                current: {
                    "A": [0, 0, 0, 0, 0, 0, 0, 0],
                    "B": [0, 0, 0, 0, 0, 0, 0, 0],
                    "C": [0, 0, 0, 0, 0, 0, 0, 0],
                    "D": [0, 0, 2, 0, 0, 0, 0, 0],
                    "E": [0, 0, 0, 0, 0, 0, 0, 0],
                    "F": [0, 0, 0, 0, 0, 0, 0, 0],
                    "G": [0, 0, 0, 0, 0, 0, 0, 0],
                    "H": [0, 0, 0, 0, 0, 0, 0, 0]
                },
                gameId: "someid",
                gameMoveId: "someid",
                move: "14:5",
                playerId: "someid"
            };
            const result = await service.makeMove(data);
            expect(result).toBe(0);
        });
    });

    describe('Take in the corner, Queens', () => {
        it('Expected 0', async () => {
            const data = {
                current: {
                    "A": [0, 0, 0, 0, 0, 0, 0, 0],
                    "B": [0, 0, 0, 0, 0, 0, 0, 0],
                    "C": [0, 0, 0, 0, 0, 0, 0, 0],
                    "D": [0, 0, 0, 0, 0, 0, 0, 0],
                    "E": [0, 0, 0, 0, 0, 0, 0, 0],
                    "F": [0, 0, 0, 0, 0, 0, 0, 0],
                    "G": [0, 4, 0, 0, 0, 0, 0, 0],
                    "H": [3, 0, 0, 0, 0, 0, 0, 0]
                },
                gameId: "someid",
                gameMoveId: "someid",
                move: "29:22",
                playerId: "someid"
            };
            const result = await service.makeMove(data);
            expect(result).toBe(1);
        });
    });

    describe('Take in the corner, Queens', () => {
        it('Expected 1', async () => {
            const data = {
                current: {
                    "A": [0, 0, 0, 0, 0, 0, 0, 0],
                    "B": [0, 0, 0, 0, 0, 0, 0, 0],
                    "C": [0, 0, 0, 0, 0, 0, 0, 0],
                    "D": [0, 0, 0, 0, 0, 0, 0, 0],
                    "E": [0, 0, 0, 0, 0, 0, 0, 0],
                    "F": [0, 0, 0, 0, 0, 0, 0, 0],
                    "G": [0, 3, 0, 0, 0, 0, 0, 0],
                    "H": [4, 0, 0, 0, 0, 0, 0, 0]
                },
                gameId: "someid",
                gameMoveId: "someid",
                move: "29:22",
                playerId: "someid"
            };
            const result = await service.makeMove(data);
            expect(result).toBe(1);
        });
    });

    describe('Take in the corner, Queens', () => {
        it('Expected 1', async () => {
            const data = {
                current: {
                    "A": [0, 0, 0, 0, 0, 0, 0, 3],
                    "B": [0, 0, 0, 0, 0, 0, 4, 0],
                    "C": [0, 0, 0, 0, 0, 0, 0, 0],
                    "D": [0, 0, 0, 0, 0, 0, 0, 0],
                    "E": [0, 0, 0, 0, 0, 0, 0, 0],
                    "F": [0, 0, 0, 0, 0, 0, 0, 0],
                    "G": [0, 3, 0, 0, 0, 0, 0, 0],
                    "H": [4, 0, 0, 0, 0, 0, 0, 0]
                },
                gameId: "someid",
                gameMoveId: "someid",
                move: "4:11",
                playerId: "someid"
            };
            const result = await service.makeMove(data);
            expect(result).toBe(1);
        });
    });

    describe('Take in the corner, Queens', () => {
        it('Expected 1', async () => {
            const data = {
                current: {
                    "A": [0, 0, 0, 0, 0, 0, 0, 3],
                    "B": [0, 0, 0, 0, 0, 0, 4, 0],
                    "C": [0, 0, 0, 0, 0, 0, 0, 0],
                    "D": [0, 0, 0, 0, 0, 0, 0, 0],
                    "E": [0, 0, 0, 0, 0, 0, 0, 0],
                    "F": [0, 0, 0, 0, 0, 0, 4, 0],
                    "G": [0, 3, 0, 0, 0, 3, 0, 3],
                    "H": [4, 0, 0, 0, 0, 0, 4, 0]
                },
                gameId: "someid",
                gameMoveId: "someid",
                move: "32:23",
                playerId: "someid"
            };
            const result = await service.makeMove(data);
            expect(result).toBe(1);
        });
    });

    describe('Take in the corner, Queens', () => {
        it('Expected 1', async () => {
            const data = {
                current: {
                    "A": [0, 0, 0, 0, 0, 0, 0, 3],
                    "B": [0, 0, 0, 0, 0, 0, 4, 0],
                    "C": [0, 0, 0, 0, 0, 0, 0, 0],
                    "D": [0, 0, 0, 0, 0, 0, 0, 0],
                    "E": [0, 0, 0, 0, 0, 0, 0, 0],
                    "F": [0, 0, 0, 0, 0, 0, 4, 0],
                    "G": [0, 3, 0, 0, 0, 3, 0, 3],
                    "H": [4, 0, 0, 0, 0, 0, 4, 0]
                },
                gameId: "someid",
                gameMoveId: "someid",
                move: "28:19",
                playerId: "someid"
            };
            const result = await service.makeMove(data);
            expect(result).toBe(1);
        });
    });

    describe('Take in the corner', () => {
        it('Expected 1', async () => {
            const data = {
                current: {
                    "A": [0, 2, 0, 0, 0, 0, 0, 3],
                    "B": [1, 0, 1, 0, 0, 0, 4, 0],
                    "C": [0, 2, 0, 0, 0, 0, 0, 0],
                    "D": [0, 0, 0, 0, 0, 0, 0, 0],
                    "E": [0, 0, 0, 0, 0, 0, 0, 0],
                    "F": [0, 0, 0, 0, 0, 0, 4, 0],
                    "G": [0, 3, 0, 0, 0, 3, 0, 3],
                    "H": [4, 0, 0, 0, 0, 0, 4, 0]
                },
                gameId: "someid",
                gameMoveId: "someid",
                move: "1:10",
                playerId: "someid"
            };
            const result = await service.makeMove(data);
            expect(result).toBe(1);
        });
    });

    describe('Take in the corner', () => {
        it('Expected 1', async () => {
            const data = {
                current: {
                    "A": [0, 2, 0, 0, 0, 0, 0, 3],
                    "B": [1, 0, 1, 0, 0, 0, 4, 0],
                    "C": [0, 2, 0, 0, 0, 0, 0, 0],
                    "D": [0, 0, 0, 0, 0, 0, 0, 0],
                    "E": [0, 0, 0, 0, 0, 0, 0, 0],
                    "F": [0, 0, 0, 0, 0, 0, 4, 0],
                    "G": [0, 3, 0, 0, 0, 3, 0, 3],
                    "H": [4, 0, 0, 0, 0, 0, 4, 0]
                },
                gameId: "someid",
                gameMoveId: "someid",
                move: "5:14",
                playerId: "someid"
            };
            const result = await service.makeMove(data);
            expect(result).toBe(1);
        });
    });

    describe('Take in the corner', () => {
        it('Expected 1', async () => {
            const data = {
                current: {
                    "A": [0, 0, 0, 0, 0, 0, 0, 3],
                    "B": [0, 0, 1, 0, 0, 0, 4, 0],
                    "C": [0, 2, 0, 2, 0, 0, 0, 0],
                    "D": [0, 0, 1, 0, 0, 0, 0, 0],
                    "E": [0, 0, 0, 0, 0, 0, 0, 0],
                    "F": [0, 0, 0, 0, 0, 0, 4, 0],
                    "G": [0, 3, 0, 0, 0, 3, 0, 3],
                    "H": [4, 0, 0, 0, 0, 0, 4, 0]
                },
                gameId: "someid",
                gameMoveId: "someid",
                move: "14:5",
                playerId: "someid"
            };
            const result = await service.makeMove(data);
            expect(result).toBe(1);
        });
    });
})