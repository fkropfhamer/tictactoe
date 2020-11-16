import { EndingState, FieldState } from "./enums";

export default interface Model {
    board: FieldState[][]
    winnigLine: number[]
    endingState?: EndingState 
}
