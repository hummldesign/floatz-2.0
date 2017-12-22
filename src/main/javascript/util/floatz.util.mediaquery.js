import StringUtils from "./floatz.util.strings.js";

/**
 * Media size enum.
 *
 * @type {Object}
 */
export const MediaSize = Object.freeze({
	XXS: Symbol("(min-width: 0) and (max-width: 320px)"),
	XS: Symbol("(min-width: 321px) and (max-width: 480px)"),
	S: Symbol("(min-width: 481px) and (max-width: 767px)"),
	M: Symbol("min-width: 768px) and (max-width: 979px)"),
	L: Symbol("(min-width: 980px) and (max-width: 1199px)"),
	XL: Symbol("(min-width: 1200px) and (max-width: 1599px)"),
	XXL: Symbol("(min-width: 1600px)"),
	LTE_XS: Symbol("(max-width: 480px)"),
	LTE_S: Symbol("(max-width: 767px)"),
	LTE_M: Symbol("(max-width: 979px)"),
	LTE_L: Symbol("(max-width: 1199px)"),
	LTE_XL: Symbol("(max-width: 1599px)"),
	LTE_XXL: Symbol("(min-width: 0)"),
	GTE_XXS: Symbol("(min-width: 0)"),
	GTE_XS: Symbol("(min-width: 321px)"),
	GTE_S: Symbol("(min-width: 481px)"),
	GTE_M: Symbol("(min-width: 768px)"),
	GTE_L: Symbol("(min-width: 980px)"),
	GTE_XL: Symbol("(min-width: 1200px)")
});

/**
 * Media query utilities.
 */
export default class MediaQuery {

	/**
	 * Match media query.
	 * <p>
	 *     Provides support for multiple queries combined via OR operator like in CSS.
	 *     In case of AND operator use CSS syntax "(<query>) and (<query>)".
	 * </p>
	 *
	 * @param {...symbol|...string} queries
	 */
	static match(...queries) {
		if (window.matchMedia) {
			let results = [];

			// Execute media queries and remember results
			queries.forEach((query) => {
				results.push(window.matchMedia(typeof query === "symbol" ?
					StringUtils.fromSymbol(query) : query));
			});

			// Filter out only matches in results
			return results.filter((mq) => mq.matches).length > 0;

		} else {
			console.error("matchMedia not available");
		}
		return false;
	}
}