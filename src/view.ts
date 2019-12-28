export default class View {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");

        this.canvas.style.backgroundColor = "black";
        this.canvas.width = 500;
        this.canvas.height = 500;
        document.getElementById("root").appendChild(this.canvas);

        this.drawGrid();
        this.drawCircle(500 / 6, 500 / 6, 50);
        this.drawCross(3*500/6, 500/6, 50);
    }

    public drawLine(x1: number, y1: number, x2: number, y2: number): void {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.strokeStyle = "white";
        this.context.stroke();
    }

    public drawCircle(x: number, y: number, radius: number): void {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2);
        this.context.strokeStyle = "white";
        this.context.stroke();
    }

    public drawCross(x: number, y: number, radius: number): void {
        this.drawLine(x-radius, y-radius, x + radius, y+ radius);
        this.drawLine(x + radius, y-radius, x - radius, y + radius)
    }

    /**
     * drawGrid
     */
    public drawGrid(): void {
        this.drawLine(this.canvas.width / 3, 0, this.canvas.width / 3, this.canvas.height);
        this.drawLine(2*this.canvas.width / 3, 0, 2*this.canvas.width / 3, this.canvas.height);
        this.drawLine(0, this.canvas.height / 3, this.canvas.width, this.canvas.height / 3);
        this.drawLine(0, 2*this.canvas.height / 3, this.canvas.width, 2*this.canvas.height / 3);
    }
}
