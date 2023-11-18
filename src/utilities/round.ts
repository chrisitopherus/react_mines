/**
 * Rounds a number to a specified number of decimal places.
 * @param number The number to be rounded.
 * @param decimalPlaces The number of decimal places to round to.
 * @returns The rounded number.
 */
export const round = (number: number, decimalPlaces: number) => {
    const multiplier = 10 ** decimalPlaces;
    return Math.round(number * multiplier) / multiplier;
}