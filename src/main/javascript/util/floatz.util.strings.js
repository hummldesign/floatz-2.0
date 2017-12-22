/**
 * String utilities.
 */
export default class Strings {

	/**
	 * Remove all spaces.
	 *
	 * @param str String
	 * @returns {string} String without spaces
	 */
	static nospace(str) {
		return str.replace(/\s/g, "");
	}

	/**
	 * Get description string from symbol.
	 *
	 * @param {symbol} symbol Symbol
	 * @returns {string} Symbol description
	 */
	static fromSymbol(symbol) {
		return String(symbol).slice(7, -1);
	}
}
