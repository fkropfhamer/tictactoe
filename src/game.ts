import View from "./view";
import { BoardState } from "./enums";

export default class Game {
    private view: View
    private playBoard: BoardState[][]
    
    constructor() {
        this.view = new View();
        const column1 = [BoardState.X, BoardState.X, BoardState.Empty];
        const column2 = [BoardState.O, BoardState.Empty, BoardState.O];
        const column3 = [BoardState.Empty, BoardState.O, BoardState.O];
        this.playBoard = [column1, column2, column3];

        this.view.drawBoard(this.playBoard);
    }

    private playerHasWon(): boolean {
        for(let i = 0; i<3; i++) {
            if (this.playBoard[i][0] === this.playBoard[i][1] && this.playBoard[i][1] === this.playBoard[i][2]) {
                return true;
            }
            if (this.playBoard[0][i] === this.playBoard[1][i] && this.playBoard[1][i] === this.playBoard[2][i]) {
                return true;
            }
        }
        if (this.playBoard[0][0] === this.playBoard[1][1] && this.playBoard[1][1] === this.playBoard[2][2]) {
            return true;
        }
        if (this.playBoard[2][0] === this.playBoard[1][1] && this.playBoard[1][1] === this.playBoard[0][2]) {
            return true;
        }

        return false;
    }
    
}
