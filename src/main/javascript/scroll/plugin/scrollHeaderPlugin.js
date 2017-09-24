import DOM from "../../dom/dom.js";
import {ScrollPlugin} from "../scroller.js";

/**
 * Scroll header plugin.
 */
export class ScrollHeaderPlugin extends ScrollPlugin {

	/**
	 * Constructor.
	 *
	 * @param scroller Reference to scroller
	 * @param options Plugin options
	 */
	constructor(scroller, options = {}) {
		super(scroller, options);

		// Default options
		this.options().selector = options.selector || "header";
		this.options().hideOnScrollForward = options.hideOnScrollForward || false;

		// Add header offset correction to scroller
		this._header = DOM.queryUnique(this._options.selector);
		this.scroller().offset(this._header.height() * -1);
	}

	onScrollForward() {
		if (this.options().hideOnScrollForward) {
			this._header.css("top", -this._header.height() + "px");
			this.scroller().offset(0);
		}
	}

	onScrollBackward() {
		if(this.options().hideOnScrollForward) {
			this._header.css("top", null);
			this.scroller().offset(-this._header.height());
		}
	}
}
