import { EndingState, FieldState } from "./enums";
import Model from "./model";

export default class TicTacToeModel implements Model {
    private winningLine = null;
    private endingState = EndingState.NotEnded
    private board: FieldState[][]

    constructor() {
        this.board = [
            [FieldState.Empty, FieldState.Empty, FieldState.Empty],
            [FieldState.Empty, FieldState.Empty, FieldState.Empty],
            [FieldState.Empty, FieldState.Empty, FieldState.Empty],
        ];
    }

    public getWinningLine(): number[] | null {
        return this.winningLine;
    }

    public getEndingState() {
        return this.endingState;
    }

    public getBoard() {
        return this.board;
    }

    public setFieldState(i: number, j: number, fieldState: FieldState) {
        if (i > 2 || i < 0) {
            throw Error('undefined index');
        }

        if (j > 2 || j < 0) {
            throw Error('undefined index');
        } 

        this.board[i][j] = fieldState;
    }

    public getFieldState(i: number, j: number) {
        if (i > 2 || i < 0) {
            throw Error('undefined index');
        }

        if (j > 2 || j < 0) {
            throw Error('undefined index');
        } 

        return this.board[i][j];
    }
}