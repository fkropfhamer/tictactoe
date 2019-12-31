import View from "./view";
import { BoardState, EndingState } from "./enums";
import IBoardPosition from "./boardpositioninterface";

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
            if (this.isEndingState()) {
                this.handleEnd();
            } else {
                this.botTurn();
            }
            
        }
    }

    private handleEnd(): void {
        const endingState = this.getEndingState();
        let message: string;
        switch(endingState) {
            case EndingState.Tie:
                message = "Tie! :|";
                break;
            case EndingState.OWin:
                message = "You lost! :(";
                break;
            case EndingState.XWin:
                message = "You won :D";
                break;
            default:
                throw Error(`unknwon end state: ${endingState}`);
        }

        if (endingState !== EndingState.Tie) {
        this.view.drawWinningLine(this.getWinningLine());
        }

        setTimeout(() => {
            alert(message);
            this.clearBoard();
        });
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
        return this.getWinningLine().length === 3;
    }

    private getWinningLine(): IBoardPosition[] {
        for(let i = 0; i<3; i++) {
            if (this.isWinningLine(this.playBoard[i][0], this.playBoard[i][1], this.playBoard[i][2])) {
                return [{i, j: 0}, {i, j: 1}, {i, j: 2}];
            }
            if (this.isWinningLine(this.playBoard[0][i], this.playBoard[1][i], this.playBoard[2][i])) {
                return [{i: 0, j: i}, {i: 1, j: i}, {i: 2, j: i}];
            }
        }
        if (this.isWinningLine(this.playBoard[0][0], this.playBoard[1][1], this.playBoard[2][2])) {
            return [{i: 0, j: 0}, {i: 1, j: 1}, {i: 2, j: 2}];
        }
        if (this.isWinningLine(this.playBoard[2][0], this.playBoard[1][1], this.playBoard[0][2])) {
            return [{i: 2, j: 0}, {i: 1, j: 1}, {i: 0, j: 2}];
        }

        return [];
    }

    private isEndingState(): boolean {
        return this.playerHasWon() || this.boardIsFull(); 
    }

    private getEndingState(): EndingState {
        if (this.isEndingState()) {
            if (this.playerHasWon()) {
                const winningPosition = this.getWinningLine()[0];
                const winningState = this.playBoard[winningPosition.i][winningPosition.j];
                if (winningState === BoardState.O) {
                    return EndingState.OWin;
                }
                return EndingState.XWin;
            }
            return EndingState.Tie;
        } 
        throw Error("game has not ended");
    }

    private isWinningLine(state1: BoardState, state2: BoardState, state3: BoardState): boolean {
        const condition1: boolean = state1 === state2;
        const condition2: boolean = state2 === state3;
        const condition3: boolean = state3 !== BoardState.Empty;
        return condition1 && condition2 && condition3
    }

    private botTurn(): void {
        // this.randomTurn();
        this.minimaxTurn();
        this.view.drawBoard(this.playBoard);
        if (this.isEndingState()) {
            this.handleEnd();
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

    private minimaxTurn(): void {
        let bestScore = -Infinity;
        let move: IBoardPosition;
        for (let i = 0;i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.playBoard[i][j] === BoardState.Empty) {
                    this.playBoard[i][j] = BoardState.O;
                    const score = this.minimax(this.playBoard, false, 0);
                    this.playBoard[i][j] = BoardState.Empty;
                    if (score > bestScore) {
                        bestScore = score;
                        move = { i, j };
                    }
                    if (score === bestScore) {
                        move = Math.random() < 0.2 ? move : { i, j };
                    }
                }
            }
        }
        this.playBoard[move.i][move.j] = BoardState.O;
    }

    private minimax(board: BoardState[][], isMaximizing: boolean, depth: number): number {
        if (this.isEndingState()) {
            return this.getEndingState();
        }
        let bestScore: number;
        if (isMaximizing) {
            bestScore = -Infinity;
            for (let i = 0;i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (this.playBoard[i][j] === BoardState.Empty) {
                        this.playBoard[i][j] = BoardState.O;
                        const score = this.minimax(this.playBoard, false, depth + 1);
                        this.playBoard[i][j] = BoardState.Empty;
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
        } else {
            bestScore = Infinity;
            for (let i = 0;i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (this.playBoard[i][j] === BoardState.Empty) {
                        this.playBoard[i][j] = BoardState.X;
                        const score = this.minimax(this.playBoard, true, depth + 1);
                        this.playBoard[i][j] = BoardState.Empty;
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
        }
        return bestScore;
    }
}
