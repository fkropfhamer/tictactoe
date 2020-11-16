import { EndingState, FieldState } from "./enums";

export default interface Model {
    getBoard: () => FieldState[][]
    getWinnigLine: () => number[] | null
    getEndingState: () => EndingState 
}
