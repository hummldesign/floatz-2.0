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

    /**
     * Check if object is a string
     *
     * @param obj Object
     * @returns {boolean} true if string, false if not
     */
    static isString(obj) {
        return obj instanceof String || typeof obj === "string";
    }

    /**
     * Convert string from camel case to kebap case.
     *
     * @param string String in camel case (e.g. alternateLabel)
     * @returns {string} String in kebap case (e.g. alternate-label)
     */
    static fromCamelCase(string) {
        return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    }

    /**
     * Convert string from kebap case to camel case.
     *
     * @param string String in kebap case
     */
    static toCamelCase(string) {
        string.replace(/-([a-z])/g, function (m, w) {
            return w.toUpperCase();
        });
    }
}
