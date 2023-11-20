import { CellInformation, CellType } from "../types/cell";
import { randomInt } from "../utilities/randomInt";

export class FieldGenerationService {
    constructor() {

    }

    generateMineField(size: number, mineAmount: number) {
        const mines: number[] = [];
        const field: CellInformation[] = Array(size);
        while (mines.length < mineAmount) {
            const int = randomInt(0, size - 1);
            if (mines.includes(int)) continue;
            mines.push(int);
        }

        for (let i = 0; i < size; i++) {
            if (mines.includes(i)) {
                field[i] = ({ isRevealed: false, type: CellType.Mine });
            } else {
                field[i] = ({ isRevealed: false, type: CellType.Diamond });
            }

        }

        return field;
    }
}