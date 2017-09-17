import DOM from "../dom/dom.js";
import Easing from "../animation/easing.js"
import {DOMElement} from "../dom/dom.js";

/**
 * Notes:
 * ------
 * document.body.scrollTop / scrollLeft
 * containerElement.scrollTop / scrollLeft
 * childelement.offsetTop / offsetLeft => Position relative to document (fixed)
 * childelement.getClientBoundingRect.top / left => Position relative to _container (variable)
 */


// TODO Refactor to direction in constructor, using only start/end instead of left, right, top, bottom to ease the API

/**
 * Scroll direction enum.
 *
 * @type {Object}
 */
export const Direction = Object.freeze({
	HORIZONTAL: Symbol("horizontal"),
	VERTICAL: Symbol("vertical")
});

/**
 * Scroll manager.
 */
export class Scroller {
	/**
	 * Constructor.
	 *
	 * @param {?(DOMElement|Object|string)} container Scroll container (default is window)
	 */
	constructor(container = window) {
		if (DOM.isWindow(container)) {
			this._container = container;
			this._scrollable = document.body;
		} else {
			this._container = DOM.queryUnique(container).origNode;
			this._scrollable = this._container;
		}
	}

	/**
	 * Scroll handler.
	 *
	 * @param handler Custom handler
	 * @returns {Scroller} Scroller for chaining
	 */
	onScroll(handler) {
		DOM.addEvent(this._container, "scroll", () => {
			handler();
		});
		return this;
	}

	/**
	 * Scroll to
	 * @param {(number|Object|string)} target Target element or position
	 * @param {Object=} options Scroll options
	 * @returns {Scroller} Scroller for chaining
	 */
	scrollTo(target, options = {}) {
		options.direction = options.direction || Direction.VERTICAL;
		options.duration = options.duration || 600;
		options.easing = options.easing || Easing.easeInOutQuad;
		options.offset = options.offset || 0;
		options.scrollable = this._scrollable;
		new ScrollAnimation(this._container, target, options);
		return this;
	}

	/**
	 * Get/set vertical scroll position.
	 *
	 * @param {number=} pos Scroll position
	 * @returns {(number|Scroller)} Scroll position in px or Scroller for chaining when used as setter
	 */
	scrollY(pos) {
		if (pos === undefined) {
			return this._scrollable.scrollTop;
		}
		this._scrollable.scrollTop = pos;
		return this;
	}

	/**
	 * Get/set horizontal scroll position.
	 *
	 * @param {number=} pos Scroll position
	 * @returns {(number|Scroller)} Scroll position in px or Scroller for chaining when used as setter
	 */
	scrollX(pos) {
		if (pos === undefined) {
			return this._scrollable.scrollLeft;
		}
		this._scrollable.scrollLeft = pos;
		return this;
	}

	/**
	 * Get height of the scroll containers content.
	 * Returns the height of the scroll container in case that it is larger than its content.
	 *
	 * @returns {number} Height in px
	 */
	scrollHeight() {
		return this._scrollable.scrollHeight;
	}

	/**
	 * Get width of the scroll containers content.
	 *
	 * Returns the width of the scroll container in case that it is larger than its content.
	 * @return {number} Width in px
	 */
	scrollWidth() {
		return this._scrollable.scrollWidth;
	}

	/**
	 * Get height of scroll containers viewport.
	 *
	 * @returns {number} Height in px
	 */
	height() {
		if (DOM.isWindow(this._container)) {
			return this._container.innerHeight;
		} else {
			return this._container.getBoundingClientRect().height;
		}
	}

	/**
	 * Get width of scroll containers viewport.
	 *
	 * @returns {number} Width in px
	 */
	width() {
		if (DOM.isWindow(this._container)) {
			return this._container.innerWidth;
		} else {
			return this._container.getBoundingClientRect().width;
		}
	}

	/**
	 * Determine if target is visible within the viewport of the scroll container.
	 *
	 * @param target
	 */
	visible(target) {
		// TODO
		// overlap top
		// overlap bottom
		// overlap top and bottom

	}
}

/**
 * Scroll animation.
 *
 * Inspired by:
 * http://callmecavs.com/jump.js/
 */
export class ScrollAnimation {

	/**
	 * Constructor.
	 *
	 * @param {Object} container Scroll container
	 * @param {(number|string|Object)} target Target element or position
	 * @param {Object} options Scroll options
	 */
	constructor(container, target, options) {
		this._container = null;      // Scroll container
		this._options = null;        // Scroll configuration
		this._element = null;        // Scroll target DOMElement
		this._start = null;          // Scroll start position in px
		this._stop = null;           // Scroll stop position in px
		this._distance = null;       // Scroll distance in px
		this._timeStart = null;      // Scroll start time in ms
		this._timeElapsed = null;    // Scroll time already elapsed ms
		this._next = null;           // Next scroll position in px

		this._container = container;
		this._options = options;

		// Convert target to DOMElement
		this._element = this.element(target);

		// Get _start pos
		this._start = this.startPos();

		// Get _stop position
		this._stop = this.stopPos(target);

		// Get _distance
		this._distance = this._stop - this._start + this._options.offset;

		// Start scroll animation
		// Note: the arrow function sets context for usage of this in animate
		window.requestAnimationFrame((t) => this.animate(t));
	}

	/**
	 * Get start position.
	 *
	 * @returns {(number)} Start position
	 */
	startPos() {
		// Get scroll _start position depending on scroll direction
		if (this._options.direction === Direction.VERTICAL) {
			return this._options.scrollable.scrollTop;
		} else {
			return this._options.scrollable.scrollLeft;
		}
	}

	/**
	 * Get stop position
	 *
	 * @param {(DOMElement|Object|string|number)} target Scroll target
	 * @returns {number} Stop position in px
	 */
	stopPos(target) {
		if (typeof target === 'number') {
			// Just use the px position of the target
			return this._start + target;
		} else {
			// Get scroll _stop position depending on scroll direction
			if (this._options.direction === Direction.VERTICAL) {
				return this._element.origNode.getBoundingClientRect().top + this._start;
			} else {
				return this._element.origNode.getBoundingClientRect().left + this._start;
			}
		}
	}

	// noinspection JSMethodCanBeStatic
	/**
	 * Convert target to DOMElement.
	 *
	 * @param {(DOMElement|Object|string|number)} target Target element or position
	 * @returns {*} DOMElement
	 */
	element(target) {
		let element = null;
		switch (typeof target) {
			case 'DOMElement':
				// Just use the DOMElement
				element = target;
				break;
			case 'number':
				// Target position is directly used later on
				break;
			case 'object':
				// Convert _element into DOMElement
				element = new DOMElement(target);
				break;
			case 'string':
				// Query DOMElement by id or class
				element = DOM.queryUnique(target);
				break;
		}
		return element;
	}

	/**
	 * Run scroll animation.
	 *
	 * @param {number} timeCurrent Current time from in µs
	 */
	animate(timeCurrent) {

		// Remember time when scrolling started
		if (!this._timeStart) {
			this._timeStart = timeCurrent;
		}

		// Determine time spent for scrolling so far
		this._timeElapsed = timeCurrent - this._timeStart;

		// Calculate _next scroll position
		this._next = this._options.easing(this._timeElapsed, this._start, this._distance,
			this._options.duration);

		// Change scroll position
		this.scroll(this._next);

		// Check progress
		if (this._timeElapsed < this._options.duration) {
			// Continue scroll animation
			// Note: the arrow function sets context for usage of this in animate
			window.requestAnimationFrame((t) => this.animate(t));
		} else {
			// Finish scroll animation
			this.done();
		}
	}

	/**
	 * Scroll to position.
	 *
	 * @param {number} position Scroll position
	 */
	scroll(position) {
		if (this._options.direction === Direction.VERTICAL) {
			this._options.scrollable.scrollTop = position;
		} else {
			this._options.scrollable.scrollLeft = position;
		}
	}

	/**
	 * Finish scroll animation.
	 */
	done() {
		// Account for time rounding inaccuracies in requestAnimationFrame
		this.scroll(this._start + this._distance);

		// Reset time for _next animation
		this._timeStart = false;
	}
}