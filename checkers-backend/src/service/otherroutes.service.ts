import { OtherRoutesRepository } from "../repository/otherroutes.repository"
import { Room } from "../dto/room.dto"
import { Body, Injectable } from "@nestjs/common";
import { PositionMove } from "../dto/gamemoves.dto";

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

    async makeMove(@Body() body: PositionMove): Promise<number> {
        const tab = body.move.split(":");
        const board = Object.keys(body.current).map((key) => body.current[key])
        if (Object.keys(body.current)[0] != "A") { board.reverse() }
        console.log(board)

        const start = parseInt(tab[0]);
        const startRow = Math.ceil(start / 4) - 1;
        const startColl = (start % 4) * 2 - 2 + (Math.abs(startRow % 2 - 1))
        const startValue = board[startRow][startColl];
        console.log("Start Value: ", startValue, " Row: ", startRow, " Coll: ", startColl, " Start: ", start)
        const end = parseInt(tab[1]);
        const endRow = Math.ceil(end / 4) - 1;
        const endColl = (end % 4) * 2 - 2 + (Math.abs(endRow % 2 - 1))
        const endValue = board[endRow][endColl];
        console.log("End Value: ", endValue, " Row: ", endRow, " Coll: ", endColl, " End: ", end)

        if (await this.checkRange(start, end)) { console.log(1); return 0; }
        if (await this.checkDefined([start, end, startRow, startColl, endRow, endColl, startValue, endValue])) { console.log(2); return 0; }
        if (await this.endTileEmpty(endValue)) { console.log(3); return 0; }
        if (await this.startTileEmpty(startValue)) { console.log(4); return 0; }
        if (await this.checkAxisX(startColl, endColl)) { console.log(5); return 0; }
        if (await this.checkAxisY(startRow, endRow)) { console.log(6); return 0; }

        if (Math.abs(start - end) > 5) { // Take occurs
            console.log("Take!")
            if (board[startRow + (endRow - startRow)][startColl + (endRow - startRow)]) { return 0; } //Empty tile between
        }
        // console.log(start, end);
        return await this.OtherRoutesRepository.makeMove(body);
    }
}