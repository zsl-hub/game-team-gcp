import { OtherRoutesRepository } from "../repository/otherroutes.repository"
import { Room } from "../dto/room.dto"
import { Body, Injectable } from "@nestjs/common";
import { start } from "repl";
import { User } from "../dto/user.dto";
import { elementAt } from "rxjs";
import { GameMove } from "src/dto/gamemoves.dto";

@Injectable()
export class OtherRoutesService {
    constructor(private readonly OtherRoutesRepository: OtherRoutesRepository) { }

    async renameUser(@Body() body: User): Promise<number> {
        const response = await this.OtherRoutesRepository.renameUser(body);
        if (!response) { return 0; }
        return 1;
    }

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

    async makeMove(@Body() body: GameMove): Promise<string> {
        console.log(body)
        const tab = body.move.split(":");
        const collIndex = [[7, 1, 3, 5], [6, 0, 2, 4]]
        let board = Object.keys(body.current).map((key) => body.current[key])
        if (Object.keys(body.current)[0] != "A") { board.reverse() }

        if (board.find(element => element.find(ele => ele == 2 || ele == 4)) === undefined) { return "BlackWon"; }
        if (board.find(element => element.find(ele => ele == 1 || ele == 3)) === undefined) { return "RedWon"; }

        const start = parseInt(tab[0]);
        const startRow = Math.ceil(start / 4) - 1;
        const startColl = collIndex[startRow % 2][start % 4]
        const startValue = board[startRow][startColl];
        const otherPieceType = (startValue == 3 || startValue == 4) ? startValue - 2 : startValue + 2;

        // console.log("Start Value: ", startValue, " Row: ", startRow, " Coll: ", startColl, " Start: ", start)
        const end = parseInt(tab[1]);
        const endRow = Math.ceil(end / 4) - 1;
        const endColl = collIndex[endRow % 2][end % 4]
        const endValue = board[endRow][endColl];
        // console.log("End Value: ", endValue, " Row: ", endRow, " Coll: ", endColl, " End: ", end)

        if (await this.checkQueen(startValue, endValue)) { return "There was a queen there"; }
        if (await this.checkRange(start, end)) { return "Move out of range"; }
        if (await this.checkDefined([start, end, startRow, startColl, endRow, endColl, startValue, endValue])) { return "Error occured"; }
        if (await this.endTileEmpty(endValue)) { return "Ending tile isn't empty"; }
        if (await this.startTileEmpty(startValue)) { return "You can't move a ghost! Starting tile was empty"; }
        if (await this.checkAxisX(startColl, endColl)) { return "You went too far!"; }
        if (await this.checkAxisY(startRow, endRow)) { return "You went too far!"; }

        if (Math.abs(start - end) > 5) { // Take occurs
            const betweenRow = startRow + ((end - start) % 2)
            console.log(betweenRow)
            const betweenColl = startColl + (endColl % 4) - (endRow % 2)
            console.log(betweenColl)
            const betweenValue = board[betweenRow][collIndex[betweenRow % 2][betweenColl]]
            console.log(betweenValue)
            if (betweenValue == 0 || betweenValue == otherPieceType) { return "You can't move through a ghost. Tile between is empty"; }
            board[betweenRow][betweenColl] = 0;
        }
        board[endRow][endColl] = startValue;
        board[startRow][startColl] = 0;
        console.log(board)
        return await this.OtherRoutesRepository.makeMove(body);
    }
}