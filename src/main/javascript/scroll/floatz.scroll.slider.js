import DOM, {DOMElement} from "../dom/floatz.dom.dom.js";
import {Scroller, Direction} from "./floatz.scroll.scroller.js";
import {TouchZone} from "../gesture/floatz.gesture.touchzone.js";
import {EVENT_RESIZE} from "../dom/floatz.dom.events.js";

// Constants for events

/**
 * Slider.
 * <p>
 *     Please consider that you have to execute destruct() when the slider is not needed anymore (e.g. when used
 *     within a temporary dialog) in order to de-register window resize events used by the slider.
 * </p>
 */
export class Slider {
	/**
	 * Constructor.
	 *
	 * @param {DOMElement=} container Optional slider container (default is element with class .flz-scroll-slider)
	 */
	constructor(container) {

		// Initialize slider container
		this._container = container || DOM.queryUnique(".flz-scroll-slider");

		// Initialize scroll container for slider
		this._scroller = new Scroller(this._container, {
			direction: Direction.HORIZONTAL
		});

		// Retrieve slider items
		this._items = this._container.query(".flz-scroll-slider-item");
		this._position = 0;
		this._resizing = false;

		// Initialize swipe navigation
		new TouchZone(this._container)
			.onSwipeRight(() => {
				this.prev();
			})
			.onSwipeLeft(() => {
				this.next();
			})
		;

		// Initialize resize handler to dynamically adapt the width of the slider items based on the viewport size
		this._resizeHandler = () => {
			// Adjust events to maximum of 60fps
			if(!this._resizing) {
				this._resizing = true;
				window.requestAnimationFrame(() => {
					_handleResize(this._scroller, this._container, this._items, this._position);
					this._resizing = false;
				});
			}
		};
		DOM.addEvent(window, EVENT_RESIZE, this._resizeHandler);

		// Trigger initial resizing
		_handleResize(this._scroller, this._container, this._items, this._position);
	}

	/**
	 * Get / set slider position
	 * @param {number=} position Optional position
	 * @returns {number|Slider} Position or slider for chaining if used as setter
	 */
	pos(position) {
		if (position) {
			if (position >= 0 && position <= (this._items.length - 1)) {
				this._scroller.scrollPos(position * this._container.width());
				this._position = position;
				_adjustItemHeight(this._container, this._items[this._position]);
			}
			return this;
		} else {
			return this._position;
		}
	}

	/**
	 * Go back to previous slider item.
	 */
	prev() {
		if (this._position > 0) {
			_changeScrollPos(this._container, this._scroller, this._scroller.scrollPos() - this._container.width(), this._items, this._position, this._position - 1);
			this._position -= 1;
		}
	}

	/**
	 * Go forward to next slider item.
	 */
	next() {
		if (this._position < (this._items.length - 1)) {
			_changeScrollPos(this._container, this._scroller, this._scroller.scrollPos() + this._container.width(), this._items, this._position, this._position + 1);
			this._position += 1;
		}
	}

	/**
	 * Deconstructor.
	 * <p>
	 *     Please consider that you have to execute destruct() when the slider is not needed anymore (e.g. when used
	 *     within a temporary dialog) in order to de-register window resize events used by the slider.
	 * </p>
	 */
	destruct() {
		DOM.removeEvent(window, EVENT_RESIZE, this._resizeHandler);
	}
}

/**
 * Change scroll position.
 *
 * @param {DOMElement} container  Slider container
 * @param {Scroller} scroller Slider scroller
 * @param scrollPos Scroll position
 * @param {Array} items Slider items
 * @param {number} currentPos {number} Current position
 * @param {number} newPos Next position
 * @private
 */
function _changeScrollPos(container, scroller, scrollPos, items, currentPos, newPos) {

	// Adjust container height in order to see content of slider item that scrolls in
	if (items[currentPos].height() < items[newPos].height()) {
		_adjustItemHeight(container, items[newPos]);
	}

	// Scroll to new item using its scroll position
	scroller.scrollTo(scrollPos, {
		complete: () => {

			// Adjust slider item height after scroll animation
			_adjustItemHeight(container, items[newPos]);
		}
	});
}

/**
 * Adjust the height of a slider item.
 *
 * @param container Slider container
 * @param item Slider item to change*
 * @private
 */
function _adjustItemHeight(container, item) {
	container.height(item.height());
}

/**
 * Adjust slider item heights, slider scroll position and current slider item height depending on window size.
 *
 * @param {Scroller} scroller
 * @param {DOMElement} container
 * @param {Array} items
 * @param {number} position
 * @private
 */
function _handleResize(scroller, container, items, position) {

	// Adjust width of each screen
	items.forEach((item) => {
		item.width(container.width());
	});

	// Adjust scroll position
	scroller.scrollPos(position * container.width());

	// Adjust height of active slider item
	_adjustItemHeight(container, items[position]);
}