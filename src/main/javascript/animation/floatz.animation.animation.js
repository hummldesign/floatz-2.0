import {DOMElement} from "../dom/floatz.dom.dom.js";
import UserAgent from "../util/floatz.util.useragent.js";

const LOG_PREFIX = "floatz | Animation | ";

/**
 * Animation event helper.
 *
 * Allows to add animation / transition handlers for animating DOM elements. Takes care that the handlers
 * are detached as soon as they are not needed anymore. Adds workaround for browsers that do not support
 * animation / transition handlers.
 */
export class Animation {

	/**
	 * Constructor.
	 *
	 * @param {DOMElement|Node} element DOM Element or node
	 * @param {string} type Animation type. Can be "animation" (default) or "transition".
	 */
	constructor(element, type = "animation") {
		this._element = element instanceof DOMElement ? element : new DOMElement(element);
		// FIXME Allow multiple handlers
		this._startHandler = null;
		this._iterateHandler = null;
		this._endHandler = null;
		this._iterateCapture = false;
		this._type = type;
	}

	/**
	 * Trigger the CSS animation.
	 *
	 * @param handler Trigger handler
	 */
	trigger(handler) {
		console.debug(LOG_PREFIX + this._type + " triggered");
		handler();
		// FIXME Find more generic way also for non-ie browsers
		// Workaround if animation handlers are not supported
		if (UserAgent.ie().detect() && UserAgent.ie().version() <= 9) {
			console.warn(LOG_PREFIX + "Manually triggering " + this._type + " handlers for IE <= 9");
			if (this._startHandler !== null) {
				this._startHandler();
			}
			if (this._iterateHandler !== null) {
				this._iterateHandler();
			}
			if (this._endHandler !== null) {
				this._endHandler();
			}
		}
	}

	/**
	 * Add handler when animation starts.
	 *
	 * @param handler Start handler
	 * @param capture true for capture phase, false for bubbling phase
	 * @returns {Animation} Animation
	 */
	start(handler, capture = false) {
		this._startHandler = (e) => {
			console.debug(LOG_PREFIX + "Event " + this._type + "start fired for " + this._element.tag());
			handler(e);
			this._element.removeEvent(this._type + "start", this._startHandler, capture);
		};
		this._element.addEvent(this._type + "start", this._startHandler, capture);
		return this;
	}

	/**
	 * Add handler when animation iterates.
	 *
	 * @param handler Iterate handler
	 * @param capture true for capture phase, false for bubbling phase
	 * @returns {Animation} Animation
	 */
	iterate(handler, capture = false) {
		this._iterateCapture = capture;
		this._iterateHandler = (e) => {
			console.debug(LOG_PREFIX + "Event " + this._type + "iteration fired for " + this._element.tag());
			handler(e);
		};
		this._element.addEvent(this._type + "iteration", this._iterateHandler, capture);
		return this;
	}

	/**
	 * Add handler when animation ends.
	 *
	 * @param handler End handler
	 * @param capture true for capture phase, false for bubbling phase
	 * @returns {Animation} Animation
	 */
	end(handler, capture = false) {
		this._endHandler = (e) => {
			console.debug(LOG_PREFIX + "Event " + this._type + "end fired for " + this._element.tag());
			handler(e);
			this._element.removeEvent(this._type + "end", this._endHandler, capture);
			if (this._iterateHandler !== null) {
				this._element.removeEvent(this._type + "iteration", this._iterateHandler,
					this._iterateCapture);
			}
		};
		this._element.addEvent(this._type + "end", this._endHandler, capture);
		return this;
	}
}
