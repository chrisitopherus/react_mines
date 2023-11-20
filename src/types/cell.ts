export enum CellType {
    Mine = "mine",
    Diamond = "diamond"
}

export type CellInformation = {
    isRevealed: boolean;
    type: CellType;
}