export default class StringUtils {

	/**
	 * Remove all spaces.
	 *
	 * @param str String
	 * @returns {string} String without spaces
	 */
	static nospace(str) {
		return str.replace(/\s/g, "");
	}
}
