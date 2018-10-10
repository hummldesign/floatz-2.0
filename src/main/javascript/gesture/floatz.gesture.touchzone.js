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
	constructor(container, options = {}) {

		this._options = options;
		this._options.thresholdX = 30;

		this._touchStartX = 0;
		this._touchEndX = 0;
		this._touchStartY = 0;
		this._touchEndY = 0;
		this._container = container;
		this._handlers = [];

		this._container.addEvent(EVENT_TOUCHSTART, (event) => {
			this._touchStartX = event.changedTouches[0].screenX;
			this._touchStartY = event.changedTouches[0].screenY;
		});

		this._container.addEvent(EVENT_TOUCHEND, (event) => {
			this._touchEndX = event.changedTouches[0].screenX;
			this._touchEndY = event.changedTouches[0].screenY;
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

	touchStartY() {
		return this._touchStartY;
	}

	touchEndY() {
		return this._touchEndY;
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
				let movedX = this.touchStartX() - this.touchEndX();
				let movedY = this.touchStartY() - this.touchEndY();
				if(movedY < 0) {
					movedY = movedY * -1;
				}
				if (movedX > this._options.thresholdX && movedX > movedY) {
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
				let movedX = this.touchEndX() - this.touchStartX();
				let movedY = this.touchEndY() - this.touchStartY();
				if(movedY < 0) {
					movedY = movedY * -1;
				}
				if (movedX > this._options.thresholdX && movedX > movedY) {
					handler(this);
				}
			}
		});
		return this;
	}
}

///////////////////////////////////////
// Private member functions

