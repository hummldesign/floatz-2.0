import DOM from "../dom/dom.js";
import Easing from "../animation/easing.js"
import {DOMElement} from "../dom/dom.js";
// import jump from "../../../../lib/jump-1.0.2/jump-1.0.2.js";

/**
 * Notes:
 * ------
 * document.body.scrollTop / scrollLeft
 * containerElement.scrollTop / scrollLeft
 * childelement.offsetTop / offsetLeft => Position relative to document (fixed)
 * childelement.getClientBoundingRect.top / left => Position relative to _container (variable)
 */

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
	 * @param container Scroll _container (default is window)
	 */
	constructor(container = window) {
		this._container = container;
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
	 * @param {(number|Object|string)} target Target _element or position
	 * @param {Object=} options Scroll _options
	 * @returns {Scroller} Scroller for chaining
	 */
	scrollTo(target, options = {}) {
		options.direction = options.direction || Direction.VERTICAL;
		options.duration = options.duration || 600;
		options.easing = options.easing || Easing.easeInOutQuad;
		options.offset = options.offset || 0;
		new ScrollAnimation(this._container, target, options);
		return this;
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
	 * @param container Scroll _container
	 * @param {(number|string|Object)} target Target _element or position
	 * @param {Object} options Scroll _options
	 */
	constructor(container, target, options) {
		this._container = null;       // Scroll _container
		this._options = null;         // Scroll configuration
		this._element = null;        // Scroll target DOMElement
		this._start = null;          // Scroll _start position in px
		this._stop = null;           // Scroll _stop position in px
		this._distance = null;       // Scroll _distance in px
		this._timeStart = null;      // Scroll _start time in ms
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
		// Note: the arrow function sets context for usage of this in animate)
		window.requestAnimationFrame((t) => this.animate(t));
	}

	/**
	 * Get _start position.
	 *
	 * @returns {(number|null)} Start position
	 */
	startPos() {
		// Get scroll _start position depending on scroll direction
		if (this._options.direction === Direction.VERTICAL) {
			return this._container.scrollY || this._container.pageYOffset;
		} else {
			return this._container.scrollX || this._container.pageXOffset;
		}
	}

	/**
	 * Get _stop position
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

	/**
	 * Convert target to DOMElement.
	 *
	 * @param {(DOMElement|Object|string|number)} target Target _element or position
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
		this._next = this._options.easing(this._timeElapsed, this._start, this._distance, this._options.duration);

		// Change scroll position
		this._container.scrollTo(0, this._next);

		// Check progress
		if (this._timeElapsed < this._options.duration) {
			// Continue scroll animation
			// Note: the arrow function sets context for usage of this in animate)
			window.requestAnimationFrame((t) => this.animate(t));
		} else {
			// Finish scroll animation
			this.done();
		}
	}

	/**
	 * Finish scroll animation.
	 */
	done() {
		// Account for time rounding inaccuracies in requestAnimationFrame
		this._container.scrollTo(0, this._start + this._distance);

		// Reset time for _next animation
		this._timeStart = false;
	}
}
