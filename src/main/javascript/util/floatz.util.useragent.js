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
		// FIXME Cache IE
		return new IE();
	}

	/**
	 * Detect if device is mobile.
	 *
	 * @returns {boolean} true if mobile, false if not
	 */
	static isMobile() {
		let ua = navigator.userAgent;
		if (ua.match(/Android/i)) {
			return true;
		} else if (ua.match(/webOS/i)) {
			return true;
		} else if (ua.match(/iPhone/i)) {
			return true;
		} else if (ua.match(/iPod/i)) {
			return true;
		} else if (ua.match(/iPad/i)) {
			return true;
		} else if (ua.match(/Windows Phone/i)) {
			return true;
		} else if (ua.match(/SymbianOS/i)) {
			return true;
		} else if (ua.match(/RIM/i) || ua.match(/BB/i)) {
			return true;
		} else {
			return false;
		}
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
	 *     browser specific CSS less.
	 * </p>
	 *
	 * @returns {boolean} true if IE, false if other browser
	 */
	detect() {
		let version = this.version();
		if (version > 0 && version <= 11) {
			DOM.queryUnique("html").origNode().id = "ie-" + version;
		}
		return version > 0;
	}
}

