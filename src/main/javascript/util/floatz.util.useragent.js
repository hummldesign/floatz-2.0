import DOM from "../dom/floatz.dom.dom.js";

/**
 * User agent utilities.
 */
export default class UserAgent {

	/**
	 * IE specific utilities
	 * @returns {IE} IE specific utilities
	 */
	static ie() {
		return new IE();
	}
}

/**
 * IE specific utilities.
 */
class IE {

	/**
	 * Get IE version.
	 *
	 * @returns {number} Version number or 0 if not Internet explorer
	 * @see https://codepen.io/gapcode/
	 */
	version() {
		let ua = window.navigator.userAgent;
		let msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		let trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		let edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// Edge (IE 12+) => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}

		// other browser
		return 0;
	}

	/**
	 * Detect IE.
	 * <p>
	 *     Injects id into html containing ie-<version> which can be used for
	 *     browser specific CSS styles.
	 * </p>
	 *
	 * @returns {boolean} true if IE, false if other browser
	 */
	detect() {
		let version  = this.version();
		if(version >0 && version <= 11) {
			DOM.queryUnique("html").origNode().id = "ie-" + version;
		}
		return version > 0;
	}
}

