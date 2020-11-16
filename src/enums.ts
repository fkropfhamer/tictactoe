export enum FieldState {
    Empty,
    X,
    O,
}

export enum Color {
    Black = "black",
    White = "white",
}

export enum EndingState {
    Tie = 0,
    OWin = 1,
    XWin = -1,
    NotEnded = -2
}

export enum GameMode {
    Easy,
    Medium,
    Hard,
    TwoPlayer,
}

export enum Player {
    X,
    O
}
