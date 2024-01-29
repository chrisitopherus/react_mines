/**
 * Calculates the factorial of a given number.
 * @description The factorial of a non-negative integer n is the product of all positive integers less than or equal to n.
 * @param number The number for which the factorial is to be calculated.
 * @returns The factorial of the given number.
 */
export const factorial = (number: number) => {
    if (number === 0) return 1;
    let value = number;
    for (let i = number; i > 1; i--) {
        value *= i - 1;
    }

    return value;
};