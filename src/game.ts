import View from "./view";
import { BoardState } from "./enums";

export default class Game {
    private view: View
    private playBoard: BoardState[][]
    
    constructor() {
        this.view = new View();
        this.clearBoard();

        this.view.addClickEventListener(this.changeBoardState.bind(this));
    }

    private changeBoardState(i: number, j: number): void {
        if (this.playBoard[i][j] === BoardState.Empty) {
            this.playBoard[i][j] = BoardState.X;
            this.view.drawBoard(this.playBoard);
            if (this.playerHasWon()) {
                alert("you won! :D");
                this.clearBoard();
            } else if(this.boardIsFull()) {
                alert("tie! :|");
                this.clearBoard();
            } else {
                this.botTurn();
            }
            
        }
    }

    private clearBoard(): void {
        const column1 = [BoardState.Empty, BoardState.Empty, BoardState.Empty];
        const column2 = [BoardState.Empty, BoardState.Empty, BoardState.Empty];
        const column3 = [BoardState.Empty, BoardState.Empty, BoardState.Empty];
        this.playBoard = [column1, column2, column3];
        this.view.clearCanvas();
    }

    private boardIsFull(): boolean {
        return !this.playBoard.map(
            (column) => column.map((boardState) => boardState === BoardState.Empty)
            .reduce((a, b) => a || b, false))
            .reduce((a, b) =>  a || b, false);
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

    private isWinningLine(state1: BoardState, state2: BoardState, state3: BoardState): boolean {
        const condition1: boolean = state1 === state2;
        const condition2: boolean = state2 === state3;
        const condition3: boolean = state3 !== BoardState.Empty;
        return condition1 && condition2 && condition3
    }

    private botTurn(): void {
        this.randomTurn();
        this.view.drawBoard(this.playBoard);
        if (this.playerHasWon()) {
            alert("you lose! :(");
            this.clearBoard();
        }
        
    }

    private randomTurn(): void {
        let i: number;
        let j: number;

        while(true) {
            i = Math.floor(Math.random() * 3);
            j = Math.floor(Math.random() * 3);
            if(this.playBoard[i][j] === BoardState.Empty) {
                break;
            }
        }
        this.playBoard[i][j] = BoardState.O;
    }
    
}
