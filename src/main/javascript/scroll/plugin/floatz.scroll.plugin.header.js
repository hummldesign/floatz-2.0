import DOM from "../../dom/floatz.dom.dom.js";
import {ScrollPlugin} from "../floatz.scroll.scroller.js";

/**
 * Scroll header plugin.
 */
export class ScrollHeaderPlugin extends ScrollPlugin {

	/**
	 * Constructor.
	 *
	 * @param options Plugin options
	 */
	constructor(options = {}) {
		super(options);

		// Default options
		this.options().selector = options.selector || "header";

		// Add header offset correction to scroller
		this._header = DOM.queryUnique(this._options.selector);
		this.scroller().offset(this._header.height() * -1);
	}

	/**
	 * Scroll forward handler.
	 */
	onScrollForward() {
		if (this._header.hasClass("flz-header-fixed-slideout")) {
			this._header.css("top", -this._header.height() + "px");
			this.scroller().offset(0);
		}
	}

	/**
	 * Scroll backward handler.
	 */
	onScrollBackward() {
		if (this._header.hasClass("flz-header-fixed-slideout")) {
			this._header.css("top", null);
			this.scroller().offset(-this._header.height());
		}
	}
}
