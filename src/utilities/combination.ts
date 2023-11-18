import { factorial } from "./factorial";

/**
 * Calculates the number of ways to choose k items from a set of n items without regard to the order (a.k.a. n choose k).
 * @param n The total number of items.
 * @param k The number of items to choose.
 * @returns The number of combinations.
 * @throws If either n or k is negative.
 */
export const combination = (n: number, k: number) => {
    if (n < 0 || k < 0) throw new Error('Invalid input');
    if (k > n) return 0;
    if (k === 0 || n === k) return 1;
    return factorial(n) / (factorial(k) * factorial(n - k));
}