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
}

export enum GameMode {
    Easy,
    Medium,
    Hard,
    TwoPlayer,
}