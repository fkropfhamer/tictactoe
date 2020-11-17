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

    constructor(view: View | HTMLCanvasElement | HTMLElement, gameMode = GameMode.TwoPlayer, color?: string) {
        this.gameMode = gameMode;

        if (view instanceof HTMLCanvasElement) {
            this.view = new TicTacToeView(view, color);
        } else if (view instanceof HTMLElement) {
            const canvas = document.createElement('canvas');
            this.view = new TicTacToeView(canvas);
            view.appendChild(canvas);
        } else {
            this.view = view;
        }
        
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

        if (this.checkEnding()) {
            return;
        }

        if (this.gameMode === GameMode.Easy) {
            this.randomMove();
            this.checkEnding();
        }

        if (this.gameMode === GameMode.Medium) {
            this.mediumMove();
            this.checkEnding();
        }

        if (this.gameMode === GameMode.Hard) {
            this.hardMove();
            this.checkEnding();
        }


        if (this.gameMode === GameMode.TwoPlayer) {
            this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X
        }

        this.view.render(this.model)
        this.isCalculatingMove = false;
    }

    private checkEnding() {
        const gameState = this.checkGameState(this.model.getBoard());

        if (gameState) {
            console.log(gameState, 'won');
            if (gameState.winner === FieldState.Empty) {
                this.model.setEndingState(EndingState.Tie);
                
                this.view.render(this.model)
                this.isCalculatingMove = false;
                
                return true;
            }

            const endingState = gameState.winner === FieldState.X ? EndingState.XWin : EndingState.OWin;

            this.model.setEndingState(endingState);
            this.model.setWinningLine(gameState.winningLine);

            this.view.render(this.model)
            this.isCalculatingMove = false;

            return true;
        }

        return false;
    }

    private randomMove() {
        while(true) {
            let i = Math.floor(Math.random() * 3);
            let j = Math.floor(Math.random() * 3);

            if(this.model.getFieldState(i, j) === FieldState.Empty) {
                this.model.setFieldState(i, j, FieldState.O);
                break;
            }
        }
    }

    private mediumMove() {
        const board = this.model.getBoard().map((a) => [...a])
    
        let bestScore = -Infinity;
        let move = {i: -1, j: -1};
        for (let i = 0;i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === FieldState.Empty) {
                    board[i][j] = FieldState.O;
    
                    const score = this.minimaxNoDepth(board, false);

                    board[i][j] = FieldState.Empty;
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
        this.model.setFieldState(move.i, move.j, FieldState.O);
    }

    private hardMove() {
        const board = this.model.getBoard().map((a) => [...a])
    
        let bestScore = -Infinity;
        let move = {i: -1, j: -1};
        for (let i = 0;i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === FieldState.Empty) {
                    board[i][j] = FieldState.O;
    
                    const score = this.minimax(board, false, 0);

                    board[i][j] = FieldState.Empty;
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
        this.model.setFieldState(move.i, move.j, FieldState.O);
    }

    private checkGameState(board: FieldState[][]) {
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
                x = x && (b !== FieldState.Empty);
            });
        });

        if (x) {
            return {winner: FieldState.Empty, winningLine: [] }
        }
        
        return null;
    }

    private minimaxNoDepth(board: FieldState[][], isMaximizing: boolean) {
        const gameState = this.checkGameState(board);
        
        if (gameState) {
            if (gameState.winner === FieldState.O) {
                return EndingState.OWin;
            }

            if (gameState.winner === FieldState.X) {
                return EndingState.XWin;
            }
                    
            return EndingState.Tie;
        }

        let bestScore: number;
        if (isMaximizing) {
            bestScore = -Infinity;
            for (let i = 0;i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === FieldState.Empty) {
                        board[i][j] = FieldState.O;
                        const score = this.minimaxNoDepth(board, false);
                        board[i][j] = FieldState.Empty;
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
        } else {
            bestScore = Infinity;
            for (let i = 0;i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === FieldState.Empty) {
                        board[i][j] = FieldState.X;
                        const score = this.minimaxNoDepth(board, true);
                        board[i][j] = FieldState.Empty;
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
        }
        return bestScore;
    }

    private minimax(board: FieldState[][], isMaximizing: boolean, depth: number) {
        const gameState = this.checkGameState(board);
        
        if (gameState) {
            if (gameState.winner === FieldState.O) {
                return 10 - depth;
            }

            if (gameState.winner === FieldState.X) {
                return -10 + depth;
            }
                    
            return EndingState.Tie;
        }

        let bestScore: number;
        if (isMaximizing) {
            bestScore = -Infinity;
            for (let i = 0;i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === FieldState.Empty) {
                        board[i][j] = FieldState.O;
                        const score = this.minimax(board, false, depth + 1);
                        board[i][j] = FieldState.Empty;
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
        } else {
            bestScore = Infinity;
            for (let i = 0;i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === FieldState.Empty) {
                        board[i][j] = FieldState.X;
                        const score = this.minimax(board, true, depth + 1);
                        board[i][j] = FieldState.Empty;
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
        }
        return bestScore;
    }
}
