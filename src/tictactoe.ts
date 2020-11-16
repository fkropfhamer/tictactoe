import View from './view';
import TicTacToeModel from './tictactoemodel';
import TicTacToeView from './tictactoeview';
import { FieldState } from './enums';


export default class TicTacToe {
    private model: TicTacToeModel;
    private view: View;

    constructor(view?: View, canvas?: HTMLCanvasElement, root?: HTMLElement, color?: string) {
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

        this.model.setFieldState(0, 0, FieldState.X);

        this.view.render(this.model);
    }
}
