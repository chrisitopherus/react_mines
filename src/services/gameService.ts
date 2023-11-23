import { MultiplierService } from "./multiplierService";

export class GameService {
    private multiplierService;
    private diamondAmount: number = 0;
    public foundDiamonds: number = 0;

    constructor(cells: number, minesAmount: number) {
        this.multiplierService = new MultiplierService(cells, minesAmount);
        this.diamondAmount = cells - minesAmount;
    }

    changeData(cells: number, minesAmount: number) {
        this.diamondAmount = cells - minesAmount;
        this.multiplierService.updateData(cells, minesAmount);
    }

    get currentMultiplier() {
        return this.multiplierService.calculateMultiplier(this.foundDiamonds);
    }

    foundDiamond() {
        if (this.foundDiamonds === this.diamondAmount) throw new Error("Exceeded the maximum amount of possible diamonds.");
        this.foundDiamonds++;
    }

    reset() {
        this.foundDiamonds = 0;
    }

    get diamondsLeft() {
        return this.diamondAmount - this.foundDiamonds;
    }
}