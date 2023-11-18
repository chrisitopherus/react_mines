import { combination } from "../utilities/combination";
import { round } from "../utilities/round";

/**
 * Represents a service for calculating multipliers in "Mines", based on the number of diamonds found and the total cells and mines.
 */
export class MultiplierService {
    /**
     * The total number of cells in the game.
     */
    private readonly totalCells;

    /**
     * The number of mines in the game.
     */
    private mines = 5;

    /**
     * The number of diamonds in the game.
     */
    private readonly diamonds : number;

    /**
     * Represents the house edge.
     */
    private readonly houseEdge = 0.99;

    /**
     * Initializes a new instance of `MultiplierService` with the specified number of total cells and mines.
     * @param totalCells The total number of cells in the game.
     * @param mines The number of mines in the game.
     */
    constructor(totalCells: number, mines: number) {
        this.totalCells = totalCells;
        this.mines = mines;
        this.diamonds = this.totalCells - this.mines;
    }

    /**
     * Calculates the game multiplier based on the number of diamonds already found.
     * @param alreadyFoundDiamonds The number of diamonds that have already been found.
     * @returns The calculated multiplier, rounded to two decimal places.
     */
    calculateMultiplier(alreadyFoundDiamonds: number) {
        if (alreadyFoundDiamonds === 0) return 1;
        const totalDiamondCombinations = combination(this.totalCells, alreadyFoundDiamonds);
        const onlyDiamondCombinations = combination(this.diamonds, alreadyFoundDiamonds);
        return round(this.houseEdge * (totalDiamondCombinations / onlyDiamondCombinations), 2);
    }
}