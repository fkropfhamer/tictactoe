import { EndingState, FieldState } from "./enums";
import Model from "./model";

export default class TicTacToeModel implements Model {
    public winnigLine = [];
    public endingState? = undefined
    public board = [
        [FieldState.Empty, FieldState.Empty, FieldState.Empty],
        [FieldState.Empty, FieldState.Empty, FieldState.Empty],
        [FieldState.Empty, FieldState.Empty, FieldState.Empty],
    ];
}