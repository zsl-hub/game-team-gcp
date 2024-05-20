import { OtherRoutesRepository } from "../repository/otherroutes.repository"
import { Room } from "../dto/room.dto"
import { Body, Injectable } from "@nestjs/common";
import { PositionMove } from "../dto/gamemoves.dto";
import { start } from "repl";

@Injectable()
export class OtherRoutesService {
    constructor(private readonly OtherRoutesRepository: OtherRoutesRepository) { }

    async getAllAvailableRooms(): Promise<Room[]> {
        return await this.OtherRoutesRepository.getAllAvailableRooms();
    }

    async checkRange(start: number, end: number): Promise<number> {
        if (end < 1 || start < 1 || end > 32 || start > 32) { return 1; }; // Move out of the board
        return 0;
    }

    async checkDefined(array: number[]): Promise<number> {
        if (array.includes(undefined)) { return 1; } // Some variable was undefined
        return 0;
    }

    async endTileEmpty(endValue: number): Promise<number> {
        if (endValue != 0) { return 1; } // There was a piece on ending square
        return 0;
    }

    async startTileEmpty(startValue: number): Promise<number> {
        if (startValue == 0) { return 1; } // There was no piece on starting square
        return 0;
    }

    async checkAxisX(startColl: number, endColl: number): Promise<number> {
        if (Math.abs(startColl - endColl) > 2) { return 1; } // Too far right or left
        return 0;
    }

    async checkAxisY(startRow: number, endRow: number): Promise<number> {
        if (Math.abs(startRow - endRow) > 2) { return 1; } // Too far up or down
        return 0;
    }

    async checkQueen(startValue: number, endValue: number): Promise<number> {
        if (endValue == startValue + 2) { return 1; } // check for the queen case
        return 0;
    }

    async makeMove(@Body() body: PositionMove): Promise<number> {
        const tab = body.move.split(":");
        const collIndex = [[7, 1, 3, 5], [6, 0, 2, 4]]
        const board = Object.keys(body.current).map((key) => body.current[key])
        if (Object.keys(body.current)[0] != "A") { board.reverse() }

        const start = parseInt(tab[0]);
        const startRow = Math.ceil(start / 4) - 1;
        const startColl = collIndex[startRow % 2][start % 4]
        const startValue = board[startRow][startColl];
        const otherPieceType = (startValue == 3 || startValue == 4) ? startValue - 2 : startValue + 2;

        console.log("Start Value: ", startValue, " Row: ", startRow, " Coll: ", startColl, " Start: ", start)
        const end = parseInt(tab[1]);
        const endRow = Math.ceil(end / 4) - 1;
        const endColl = collIndex[endRow % 2][end % 4]
        const endValue = board[endRow][endColl];
        console.log("End Value: ", endValue, " Row: ", endRow, " Coll: ", endColl, " End: ", end)

        if (await this.checkQueen(startValue, endValue)) { return 0; }
        if (await this.checkRange(start, end)) { ; return 0; }
        if (await this.checkDefined([start, end, startRow, startColl, endRow, endColl, startValue, endValue])) { return 0; }
        if (await this.endTileEmpty(endValue)) { return 0; }
        if (await this.startTileEmpty(startValue)) { return 0; }
        if (await this.checkAxisX(startColl, endColl)) { return 0; }
        if (await this.checkAxisY(startRow, endRow)) { return 0; }

        if (Math.abs(start - end) > 5) { // Take occurs
            const rowBetween = startRow + ((end - start) % 2)
            console.log(rowBetween)
            const collBetween = startColl + (endColl % 4) - (endRow % 2)
            console.log(collBetween)
            const betweenValue = board[rowBetween][collIndex[rowBetween % 2][collBetween]]
            console.log(betweenValue)
            if (betweenValue == 0 || betweenValue == otherPieceType) { return 0; }
        }
        return await this.OtherRoutesRepository.makeMove(body);
    }
}