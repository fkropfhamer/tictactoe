import { EndingState, FieldState } from "./enums";

export default interface Model {
    getBoard: () => FieldState[][]
    getWinningLine: () => number[] | null
    getEndingState: () => EndingState 
}
