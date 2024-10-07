/**
 * Checks if the input is within the allowed options of a datalist.
 * @param {String} input - The input value to check.
 * @param {Array} options - Array of allowed option values.
 * @returns {Boolean} - Returns true if the input is valid, false otherwise.
 */
export function isValidOption(input, options) {
  return options.includes(input);
}
