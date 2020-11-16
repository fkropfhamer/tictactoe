import View from './view';
import TicTacToeModel from './tictactoemodel';
import TicTacToeView from './tictactoeview';
import { FieldState, GameMode, Player } from './enums';


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
}
