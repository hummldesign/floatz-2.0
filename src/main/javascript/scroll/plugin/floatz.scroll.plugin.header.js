import DOM from "../../dom/floatz.dom.dom.js";
import {Direction} from "../floatz.scroll.scroller.js";
import {ScrollPlugin} from "../floatz.scroll.scroller.js";
import {SCROLL_EVENT_BEFORENAVGIATE} from "../floatz.scroll.scroller.js";
import {EVENT_HASHCHANGE} from "../../dom/floatz.dom.events.js";

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
		this.options().scrollOnload = true;
		this._header = DOM.queryUnique(this.options().headerSelector);
		this._slidedOffset = this._header.height();
		this._visible = true;
		this._canHide = window.location.hash.length === 0;
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

			// Adjust scroll position on page load
			DOM.addEvent(window, "load", () => {
				this._adjustScrollPosOnHashNavigation(true);
			});

			// Add custom event handler
			DOM.addEvent(scroller.container(), SCROLL_EVENT_BEFORENAVGIATE, (navItem) => {
				this._handleBeforeNavigate(navItem);
			});

			// Add event handler for location changes
			DOM.addEvent(window, EVENT_HASHCHANGE, () => {
				this._handleHashChange();
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
		if (this._header.hasClass(HEADER_FIXED_SLIDED)) {
			if (this._visible && this._canHide) {

				// Don´t hide header when scrolling over top position on mobile devices
				if (this.scroller().scrollPos() >= this._slidedOffset) {
					this._header.animate("transition")
						.end(() => {
							this._hideScrollShadow();
							this.scroller().offset(0);
						})
						.trigger(() => {
							// console.debug(LOG_PREFIX + "Hiding header");
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
		if (this._header.hasClass(HEADER_FIXED_SLIDED)) {
			if (!this._visible) {
				// Don´t show header when scrolling below bottom position on mobile device
				if ((this.scroller().prevScrollPos() +
					this.scroller().viewportSize()) <= this.scroller().scrollSize()) {

					// console.debug(LOG_PREFIX + "Showing header");
					this._header.css("top", null);
					this.scroller().offset(this._header.height() * -1);
					this._showScrollShadow();
					this._visible = true;
				}
			}
		}
	}

	/**
	 * Handle before navigation.
	 *
	 * @param event Custom scroll event
	 * @private
	 */
	_handleBeforeNavigate(event) {
		// Define header offset for slideout header on navigation depending on scroll direction
		if (this._header.hasClass(HEADER_FIXED_SLIDED)) {
			let target = DOM.queryUnique(event.detail.target);
			let targetPos = this.scroller().direction() === Direction.VERTICAL ?
				target.position().top : target.position().left;

			if (targetPos > this.scroller().scrollPos()) {
				this.scroller().offset(0);
			} else {
				this.scroller().offset(this._header.height() * -1);
			}
		}
	}

	/**
	 * Show scroll shadow.
	 * @private
	 */
	_showScrollShadow() {
		if (this._visible && !this._header.hasClass(SCROLL_SHADOW)) {
			// console.debug(LOG_PREFIX + "Showing scroll shadow");
			this._header.addClass(SCROLL_SHADOW);
		}
	}

	/**
	 * Hide scroll shadow.
	 * @private
	 */
	_hideScrollShadow() {
		if (this._header.hasClass(SCROLL_SHADOW)) {
			// console.debug(LOG_PREFIX + "Hiding scroll shadow");
			this._header.removeClass(SCROLL_SHADOW);
		}
	}

	_handleHashChange() {
		this._adjustScrollPosOnHashNavigation(false);
	}

	/**
	 * Adjust scroll position on hash navigation.
	 * @param {boolean} onload True on page load, otherwise false
	 * @private
	 */
	_adjustScrollPosOnHashNavigation(onload) {
		if (window.location.hash.length > 0) {
			let hash = window.location.hash.substring(1); // Remove #

			// Try to find target in page sections (using its non-technical id)
			let target = DOM.query(".flz-page-section")
				.find(section => section.data("id") === hash);

			// Try to find target via its technical id
			if (!target) {
				target = DOM.queryById(hash);
			}
			if (target) {

				// FIXME - Prevent hiding header when scrolling with hashes (initial load works)

				this.scroller().scrollTo(target, {
					complete: () => {
						if(onload) {
							if (!this._canHide) {
								// Prevent hiding the header to early
								window.setTimeout(() => {
									this._canHide = true;
								}, 1000);
							}
						}
					}
				});
			}
		}
	}
}
