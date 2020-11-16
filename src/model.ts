import Boardpostion from "./boardposition";
import { EndingState, FieldState } from "./enums";

export default interface Model {
    getBoard: () => FieldState[][]
    getWinningLine: () => Boardpostion[] | null
    getEndingState: () => EndingState 
    setWinningLine: (winningLine: Boardpostion[]) => void
    setEndingState: (endingState: EndingState) => void 
}
