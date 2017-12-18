import DOM from "../../dom/floatz.dom.dom.js";
import {ScrollPlugin} from "../floatz.scroll.scroller.js";
import {ScrollEvent} from "../floatz.scroll.scroller.js";

/**
 * Scroll header plugin.
 * <p>
 *    Adds fixed header support to scrolled page.
 * </p>
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
		this.options().headerSelector = options.headerSelector || "header";
		this._header = DOM.queryUnique(this.options().headerSelector);
		this.options().slideOutOffset = this._header.height();
	}

	/**
	 * @override
	 */
	scroller(scroller) {
		let _scroller = super.scroller(scroller);
		if (scroller) {
			// Add header offset correction to given scroller
			if (this._header.css("position") === "fixed") {
				_scroller.scroller().offset(this._header.height() * -1)
			}

			// Add custom event handler
			DOM.addEvent(scroller.container(), ScrollEvent.BEFORE_NAVGIATE, (e) => {
				this.onBeforeNavigate(e);
			});
		}

		return _scroller;
	}

	/**
	 * Scroll forward handler.
	 */
	onScrollForward() {
		// FIXME Hide only once, not on every scroll change
		if (this._header.hasClass("flz-page-header-fixed-slided")) {
			// Don´t hide header when scrolling over top position on mobile devices
			if (this.scroller().scrollPos() >= this.options().slideOutOffset) {
				this._header.css("top", -this._header.height() + "px");
				this.scroller().offset(0);
			}
		}
	}

	/**
	 * Scroll backward handler.
	 */
	onScrollBackward() {
		// FIXME Show only once, not on every scroll change
		if (this._header.hasClass("flz-page-header-fixed-slided")) {
			// Don´t show header when scrolling below bottom position on mobile device
			if ((this.scroller().prevScrollPos() +
					this.scroller().viewportSize()) <= this.scroller().scrollSize()) {
				this._header.css("top", null);
				this.scroller().offset(-this._header.height());
			}
		}
	}

	/**
	 * Before navigation handler.
	 */
	onBeforeNavigate() {
		// Remove header offset for slideout header on navigation
		if (this._header.hasClass("flz-page-header-fixed-slided")) {
			this.scroller().options().offset = 0;
		}
	}
}
