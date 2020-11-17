import { EndingState, FieldState } from "./enums";
import View from "./view";
import Model from "./model";
import BoardPosition from "./boardposition";

export default class TicTacToeView implements View {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private color: string;

    constructor(canvas: HTMLCanvasElement, color = 'white') {
        this.canvas = canvas
        const context = this.canvas.getContext("2d");
        
        if (!context) {
            throw Error('2d rendering context is not supported')
        }
        
        this.context = context;

        this.color = color;
    }

    public render(model: Model) {
        console.log('render');
    
        this.clearCanvas();
        
        this.drawGrid();
        this.drawBoard(model.getBoard());
        
        const winningLine = model.getWinningLine();

        if (winningLine) {
            this.drawWinningLine(winningLine);
        }
    }

    public addClickEventListener(fn: (i: number, j: number) => void): void {
        this.canvas.addEventListener("click", (event: MouseEvent) => {
            const x: number = event.offsetX;
            const y: number = event.offsetY;
            const gridSize: number = this.canvas.width / 3;

            const i: number = Math.floor(x / gridSize);
            const j: number = Math.floor(y / gridSize);

            fn(i, j);
        });
    }

    private drawBoard(board: FieldState[][]): void {
        this.drawGrid();
        board.forEach((column, i) => {
            column.forEach((state, j) => {
                this.drawFieldState(i, j, state);
            })
        })
    }

    private drawWinningLine(boardPositions: BoardPosition[]): void {
        const x1 = this.mapBoardPosition(boardPositions[0].i);
        const y1 = this.mapBoardPosition(boardPositions[0].j);
        const x2 = this.mapBoardPosition(boardPositions[2].i);
        const y2 = this.mapBoardPosition(boardPositions[2].j);

        this.drawLine(x1, y1, x2, y2);
    }

    private clearCanvas(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private drawLine(x1: number, y1: number, x2: number, y2: number): void {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.strokeStyle = this.color;
        this.context.stroke();
    }

    private drawCircle(x: number, y: number, radius: number): void {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2);
        this.context.strokeStyle = this.color;
        this.context.stroke();
    }

    private drawCross(x: number, y: number, radius: number): void {
        this.drawLine(x - radius, y - radius, x + radius, y + radius);
        this.drawLine(x + radius, y - radius, x - radius, y + radius)
    }

    private drawGrid(): void {
        this.drawLine(this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
        this.drawLine(2 * this.canvas.width / 3, 0, 2 * this.canvas.width / 3, this.canvas.height);
        this.drawLine(0, this.canvas.height / 3, this.canvas.width, this.canvas.height / 3);
        this.drawLine(0, 2 * this.canvas.height / 3, this.canvas.width, 2 * this.canvas.height / 3);
    }

    private mapBoardPosition(z: number): number {
        const gridSize = this.canvas.width / 6;
        return (z * 2 + 1) * gridSize;
    }

    private drawFieldState(i: number, j: number, fieldState: FieldState): void {
        const x = this.mapBoardPosition(i);
        const y = this.mapBoardPosition(j);
        if(fieldState === FieldState.O) {
            this.drawCircle( x,  y, this.canvas.height / 10);
        }
        if(fieldState === FieldState.X) {
            this.drawCross( x,  y, this.canvas.height / 10);
        }
    }
}
