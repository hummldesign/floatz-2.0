/**
 * Media size enum.
 *
 * @type {string}
 */

export const MEDIA_SIZE_XXS = "(min-width: 0) and (max-width: 320px)";
export const MEDIA_SIZE_XS = "(min-width: 321px) and (max-width: 480px)";
export const MEDIA_SIZE_S = "(min-width: 481px) and (max-width: 767px)";
export const MEDIA_SIZE_M = "min-width: 768px) and (max-width: 979px)";
export const MEDIA_SIZE_L = "(min-width: 980px) and (max-width: 1199px)";
export const MEDIA_SIZE_XL = "(min-width: 1200px) and (max-width: 1599px)";
export const MEDIA_SIZE_XXL = "(min-width: 1600px)";
export const MEDIA_SIZE_LTE_XS = "(max-width: 480px)";
export const MEDIA_SIZE_LTE_S = "(max-width: 767px)";
export const MEDIA_SIZE_LTE_M = "(max-width: 979px)";
export const MEDIA_SIZE_LTE_L = "(max-width: 1199px)";
export const MEDIA_SIZE_LTE_XL = "(max-width: 1599px)";
export const MEDIA_SIZE_LTE_XXL = "(min-width: 0)";
export const MEDIA_SIZE_GTE_XXS = "(min-width: 0)";
export const MEDIA_SIZE_GTE_XS = "(min-width: 321px)";
export const MEDIA_SIZE_GTE_S = "(min-width: 481px)";
export const MEDIA_SIZE_GTE_M = "(min-width: 768px)";
export const MEDIA_SIZE_GTE_L = "(min-width: 980px)";
export const MEDIA_SIZE_GTE_XL = "(min-width: 1200px)";

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
	 * @param queries One or more media queries (symbols or strings)
	 */
	static match(...queries) {
		if (window.matchMedia) {
			let results = [];

			// Execute media queries and remember results
			queries.forEach((query) => {
				results.push(window.matchMedia(query));
			});

			// Filter out only matches in results
			return results.filter((mq) => mq.matches).length > 0;

		} else {
			console.error("matchMedia not available");
		}
		return false;
	}
}