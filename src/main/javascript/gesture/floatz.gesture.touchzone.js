import {DOMElement} from "../dom/floatz.dom.dom.js";
import {EVENT_TOUCHEND, EVENT_TOUCHSTART} from "../dom/floatz.dom.events.js";

// Constants for events

/**
 * Touch zone.
 */
export class TouchZone {
	/**
	 * Constructor.
	 *
	 * @param {DOMElement} container Touch zone to listen for swipe events
	 */
	constructor(container) {
		this._touchStartX = 0;
		this._touchEndX = 0;
		this._minSwipePixels = 30; // TODO: Make configurable
		this._container = container;
		this._handlers = [];

		this._container.addEvent(EVENT_TOUCHSTART, (event) => {
			this._touchStartX = event.changedTouches[0].screenX;
		});

		this._container.addEvent(EVENT_TOUCHEND, (event) => {
			this._touchEndX = event.changedTouches[0].screenX;
			this._handlers.forEach((handler) => {
				handler(this);
			});
		});
	}

	/**
	 * Get horizontal gesture start position.
	 *
	 * @returns {number} Touch start position
	 */
	touchStartX() {
		return this._touchStartX;
	}

	/**
	 * Get horizontal gesture end position.
	 *
	 * @returns {number} Touch end position
	 */
	touchEndX() {
		return this._touchEndX;
	}

	/**
	 * Swipe left handler.
	 *
	 * @param {Function} handler Swipe handler
	 * @returns TouchZone} Touchzone object for chaining
	 */
	onSwipeLeft(handler) {
		this._handlers.push(() => {
			if (this.touchEndX() <= this.touchStartX()) {
				let moved = this.touchStartX() - this.touchEndX();
				if (moved > this._minSwipePixels) {
					handler(this);
				}
			}
		});
		return this;
	}

	/**
	 * Swipe right handler.
	 *
	 * @param {Function} handler Swipe handler
	 * @returns {TouchZone} Touchzone object for chaining
	 */
	onSwipeRight(handler) {
		this._handlers.push(() => {
			if (this.touchEndX() >= this.touchStartX()) {
				let moved = this.touchEndX() - this.touchStartX();
				if (moved > this._minSwipePixels) {
					handler(this);
				}
			}
		});
		return this;
	}
}

///////////////////////////////////////
// Private member functions

