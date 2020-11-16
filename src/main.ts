import "./index.css";
import TicTacToe from "./tictactoe";

function main(): void {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    new TicTacToe(undefined, canvas);
}

main();
