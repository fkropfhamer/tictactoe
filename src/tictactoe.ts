import View from './view';
import TicTacToeModel from './tictactoemodel';
import TicTacToeView from './tictactoeview';
import { EndingState, FieldState, GameMode, Player } from './enums';


export default class TicTacToe {
    private model: TicTacToeModel;
    private view: View;
    private gameMode: GameMode;
    private isCalculatingMove = false;
    private currentPlayer = Player.X;

    constructor(view?: View, canvas?: HTMLCanvasElement, root?: HTMLElement, color?: string, gameMode = GameMode.TwoPlayer) {
        this.gameMode = gameMode;
        
        if (!view) {
            if (!canvas) {
                canvas = document.createElement('canvas');
            } 

            if (root) {
                root.appendChild(canvas);
            }

            view = new TicTacToeView(canvas, color);

            
        }
        
        this.view = view;
        this.model = new TicTacToeModel();

        this.view.addClickEventListener(this.onClick.bind(this))

        this.view.render(this.model);
    }

    public changeGameMode(gameMode: GameMode) {
        this.gameMode = gameMode;
        this.reset();
    }

    private reset() {
        this.model = new TicTacToeModel();
        this.currentPlayer = Player.X;
        this.view.render(this.model);
    }

    private onClick(i: number, j: number) {
        if (this.model.getEndingState() !== EndingState.NotEnded) {
            this.reset();

            return;
        }
        
        if (this.isCalculatingMove) {
            return
        }
        this.isCalculatingMove = true;

        const currentState = this.model.getFieldState(i, j)

        if (currentState !== FieldState.Empty) {
            this.isCalculatingMove = false;
            return
        }

        const mark = this.currentPlayer === Player.X ? FieldState.X : FieldState.O
        this.model.setFieldState(i, j, mark)

        const gameState = this.checkGameState();

        if (gameState) {
            console.log(gameState, 'won');
            if (gameState.winner === FieldState.Empty) {
                this.model.setEndingState(EndingState.Tie);
                
                this.view.render(this.model)
                this.isCalculatingMove = false;
                
                return;
            }

            const endingState = gameState.winner === FieldState.X ? EndingState.XWin : EndingState.OWin;

            this.model.setEndingState(endingState);
            this.model.setWinningLine(gameState.winningLine);

            this.view.render(this.model)
            this.isCalculatingMove = false;

            return;
        }

        if (this.gameMode === GameMode.Easy) {
            this.randomMove();
        }

        if (this.gameMode === GameMode.Medium) {
            this.mediumMove();
        }

        if (this.gameMode === GameMode.Hard) {
            this.hardMove();
        }

        if (this.gameMode === GameMode.TwoPlayer) {
            this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X
        }

        this.view.render(this.model)
        this.isCalculatingMove = false;
    }

    private randomMove() {

    }

    private mediumMove() {

    }

    private hardMove() {

    }

    private checkGameState() {
        const board = this.model.getBoard();
        
        for(let i = 0; i < 3; i++) {
            if (board[i][0] !== FieldState.Empty && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return {winner: board[i][0], winningLine: [{i, j: 0 }, {i, j: 1}, {i, j: 2}]};
            }

            if (board[0][i] !== FieldState.Empty && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return { winner: board[0][i], winningLine: [{i: 0, j: i }, {i: 1, j: i}, {i: 2, j: i}]}
            }
        }

        if (board[0][0] !== FieldState.Empty && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return { winner: board[1][1], winningLine: [{i: 0, j: 0 }, {i: 1, j: 1}, {i: 2, j: 2}]};
        }

        if (board[0][2] !== FieldState.Empty && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return { winner: board[1][1], winningLine: [{i: 0, j: 2 }, {i: 1, j: 1}, {i: 2, j: 0}]};
        }

        let x = true;

        board.forEach((c) => {
            c.forEach(b => {
                x = x && b === FieldState.Empty;
            });
        });

        if (x) {
            return {winner: FieldState.Empty, winningLine: [] }
        }
        
        return null;
    }
}
