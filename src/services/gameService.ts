import { MultiplierService } from "./multiplierService";

export class GameService {
    private multiplierService;
    private foundDiamonds: number = 0;

    constructor(private cells: number, private minesAmount: number) {
        this.multiplierService = new MultiplierService(cells, minesAmount);
    }

    changeData(cells: number, minesAmount: number) {
        this.cells = cells;
        this.minesAmount = minesAmount;
        this.multiplierService.updateData(cells, minesAmount);
    }

    get currentMultiplier() {
        console.log("currentMultiplier:", "diamonds:", this.foundDiamonds);
        return this.multiplierService.calculateMultiplier(this.foundDiamonds);
    }

    foundDiamond() {
        if (this.foundDiamonds === this.totalDiamonds) throw new Error("Exceeded the maximum amount of possible diamonds.");
        this.foundDiamonds++;
    }

    private get totalDiamonds() {
        return this.cells - this.minesAmount;
    }
}