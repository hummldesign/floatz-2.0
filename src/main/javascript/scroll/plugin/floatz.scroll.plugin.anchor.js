import DOM from "../../dom/floatz.dom.dom.js";
import {ScrollPlugin} from "../floatz.scroll.scroller.js";
import {EVENT_CLICK} from "../../dom/floatz.dom.events.js";
import {SCROLL_EVENT_AFTERNAVGIATE, SCROLL_EVENT_BEFORENAVGIATE} from "../floatz.scroll.scroller.js";

/**
 * Scroll anchor plugin.
 * <p>
 *    Adds scroll-to navigation to all scroll anchors.
 * </p>
 */
export class ScrollAnchorPlugin extends ScrollPlugin {

	constructor(options = {}) {
		super(options);

		// Default options
		this.options().anchorsSelector = options.anchorsSelector || ".flz-scroll-anchor";
		this._anchors = this._prepareAnchors();
		this._clickHandlers = [];
	}

	/**
	 * Click anchor handler.
	 *
	 * @param handler Custom handler
	 * @returns {ScrollAnchorPlugin} ScrollAnchorPlugin for chaining
	 */
	onClick(handler) {
		this._clickHandlers.push(handler);
		return this;
	}

	/**
	 * Prepare scroll anchors.
	 *
	 * @return {Array} Scroll anchors
	 * @private
	 */
	_prepareAnchors() {
		let anchors = DOM.query(this.options().anchorsSelector);
		anchors.forEach((anchor) => {
			anchor.addEvent(EVENT_CLICK, (event) => {
				this._handleClick(anchor, event);
			});
		});
		return anchors;
	}

	/**
	 * Handle click on scroll anchor.
	 *
	 * @param anchor Reference to scroll anchor that has been clicked
	 * @param event Click event
	 * @private
	 */
	_handleClick(anchor, event) {
		// Use scroll navigation only when href contains an id
		if (anchor.attr("href").startsWith("#")) {
			let beforeEvent = DOM.createEvent(SCROLL_EVENT_BEFORENAVGIATE, true, true, anchor);
			let afterEvent = DOM.createEvent(SCROLL_EVENT_AFTERNAVGIATE, true, false, anchor);

			// Fire before navigation event
			if (DOM.dispatchEvent(this.scroller().container(), beforeEvent)) {
				event.preventDefault();
				event.stopPropagation();

				// Execute click handlers
				this._clickHandlers
					.forEach(handler => {
						handler(anchor, event);
					})
				;

				// Scroll to section the menu navigation item points to
				this.scroller().scrollTo(anchor.attr("href"), {
					complete: () => {
						// Fire after navigation event
						DOM.dispatchEvent(this.scroller().container(), afterEvent);
					},
				});
			}
		}
	}
}