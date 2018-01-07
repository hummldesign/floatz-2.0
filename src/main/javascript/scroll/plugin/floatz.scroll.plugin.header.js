import DOM from "../../dom/floatz.dom.dom.js";
import {ScrollPlugin} from "../floatz.scroll.scroller.js";
import {SCROLL_EVENT_BEFORENAVGIATE} from "../floatz.scroll.scroller.js";

const SCROLL_SHADOW = "flz-page-header-scrollshadow";
const HEADER_FIXED_SLIDED = "flz-page-header-fixed-slided";
const LOG_PREFIX = "floatz | ScrollHeaderPlugin | ";

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
		this._visible = true;
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
			DOM.addEvent(scroller.container(), SCROLL_EVENT_BEFORENAVGIATE, () => {
				this._handleBeforeNavigate();
			});
		}

		return _scroller;
	}

	/**
	 * Scroll handler.
	 */
	onScroll() {
		// Show scroll shadow depending on scroll position
		if (this.scroller().scrollPos() > 0) {
			this._showScrollShadow();
		} else {
			this._hideScrollShadow();
		}
	}

	/**
	 * Scroll forward handler.
	 */
	onScrollForward() {
		// FIXME Hide only once, not on every scroll change
		if (this._header.hasClass(HEADER_FIXED_SLIDED)) {
			if (this._visible) {
				// Don´t hide header when scrolling over top position on mobile devices
				if (this.scroller().scrollPos() >= this.options().slideOutOffset) {
					this._header.animate("transition")
						.end(() => {
							this._hideScrollShadow();
							this.scroller().offset(0);
						})
						.trigger(() => {
							console.debug(LOG_PREFIX + "Hiding header");
							this._header.css("top", -this._header.height() + "px");
							this._visible = false;
						})
					;
				}
			}
		}
	}

	/**
	 * Scroll backward handler.
	 */
	onScrollBackward() {
		// FIXME Show only once, not on every scroll change
		if (this._header.hasClass(HEADER_FIXED_SLIDED)) {
			if (!this._visible) {
				// Don´t show header when scrolling below bottom position on mobile device
				if ((this.scroller().prevScrollPos() +
						this.scroller().viewportSize()) <= this.scroller().scrollSize()) {

					console.debug(LOG_PREFIX + "Showing header");
					this._header.css("top", null);
					this.scroller().offset(-this._header.height());
					this._showScrollShadow();
					this._visible = true;
				}
			}
		}
	}

	/**
	 * Handle before navigation.
	 * @private
	 */
	_handleBeforeNavigate() {
		// Remove header offset for slideout header on navigation
		if (this._header.hasClass(HEADER_FIXED_SLIDED)) {
			this.scroller().options().offset = 0;
		}
	}

	/**
	 * Show scroll shadow.
	 * @private
	 */
	_showScrollShadow() {
		if (this._visible && !this._header.hasClass(SCROLL_SHADOW)) {
			console.debug(LOG_PREFIX + "Showing scroll shadow");
			this._header.addClass(SCROLL_SHADOW);
		}
	}

	/**
	 * Hide scroll shadow.
	 * @private
	 */
	_hideScrollShadow() {
		if (this._header.hasClass(SCROLL_SHADOW)) {
			console.debug(LOG_PREFIX + "Hiding scroll shadow");
			this._header.removeClass(SCROLL_SHADOW);
		}
	}
}
