import View from "./view";
import { BoardState } from "./enums";
import Config from "./config";

export default class Game {
    private view: View
    private playBoard: BoardState[][]
    
    constructor() {
        this.view = new View();
        this.clearBoard();

        this.view.addClickEventListener(this.changeBoardState.bind(this));
        this.view.drawBoard(this.playBoard);
    }

    private changeBoardState(i: number, j: number): void {
        this.playBoard[i][j] = BoardState.X;
        this.view.drawBoard(this.playBoard);
        if (this.playerHasWon()) {
            alert("you won");
        }
    }

    private clearBoard() {
        const column1 = [BoardState.Empty, BoardState.Empty, BoardState.Empty];
        const column2 = [BoardState.Empty, BoardState.Empty, BoardState.Empty];
        const column3 = [BoardState.Empty, BoardState.Empty, BoardState.Empty];
        this.playBoard = [column1, column2, column3];
    }

    private playerHasWon(): boolean {
        for(let i = 0; i<3; i++) {
            if (this.isWinningLine(this.playBoard[i][0], this.playBoard[i][1], this.playBoard[i][2])) {
                return true;
            }
            if (this.isWinningLine(this.playBoard[0][i], this.playBoard[1][i], this.playBoard[2][i])) {
                return true;
            }
        }
        if (this.isWinningLine(this.playBoard[0][0], this.playBoard[1][1], this.playBoard[2][2])) {
            return true;
        }
        if (this.isWinningLine(this.playBoard[2][0], this.playBoard[1][1], this.playBoard[0][2])) {
            return true;
        }

        return false;
    }

    private isWinningLine(state1: BoardState, state2: BoardState, state3: BoardState) {
        const condition1 = state1 === state2;
        const condition2 = state2 === state3;
        const condition3 = state3 !== BoardState.Empty;
        return condition1 && condition2 && condition3
    }
    
}
