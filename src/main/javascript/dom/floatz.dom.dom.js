import StringUtils from "../util/floatz.util.strings.js";

/**
 * Constants
 */
const BLOCK = "block";
const DISPLAY = "display";
const HIDDEN = "hidden";
const NONE = "none";
const PREV_DISPLAY = "flz-prev-display";
const PREV_INLINE_DISPLAY = "flz-prev-inline-display";
const PX = "px";
const STYLE = "style";

/**
 * DOM utilities.
 */
export default class DOM {

	/**
	 * Check if element is the window.
	 *
	 * @param element Element
	 * @returns {boolean} true if window, false if not
	 */
	static isWindow(element) {
		return !!(element.document && element.location);
	}

	/**
	 * Query elements.
	 *
	 * Syntax: DOM.query(<selectors>[,<context>]);
	 *
	 * @param {string} selectors String with selectors
	 * @param {(Node|DOMElement|Object)=} context Context native element or DOMElement (optional, default is window)
	 * @returns {!Array} Array of DOMElement items
	 */
	static query(selectors, context = window) {
		// TODO: Support class or id as context?
		let root = DOM.isWindow(context) ? window.document.documentElement : context;
		if (root instanceof DOMElement) {
			root = root.origNode();
		}
		let nodes = [];
		try {
			nodes = root.querySelectorAll(selectors);
		} catch (err) {
			// Nothing to do
		}
		let elements = [];
		for (let node of nodes) {
			elements.push(new DOMElement(node));
		}
		return elements;
	}

	/**
	 * Query element by id.
	 *
	 * @param id Element id
	 * @returns {DOMElement} DOMElement or null if not found
	 */
	static queryById(id) {
		let element = document.getElementById(id);
		return element ? new DOMElement(element) : null;
	}

	/**
	 * Query only unique element.
	 *
	 * @param selector Selector
	 * @returns {DOMElement} DOMElement or null if not found
	 */
	static queryUnique(selector) {
		let element = document.querySelector(selector);
		return element ? new DOMElement(element) : null;
	}

	/**
	 * Add event listener.
	 *
	 * @param element Element
	 * @param eventName Event name
	 * @param handler Event handler
	 * @param capture true for capture phase, false for bubbling phase
	 */
	static addEvent(element, eventName, handler, capture = false) {
		if (element.addEventListener) {
			element.addEventListener(eventName, handler, capture);
		} else if (element.attachEvent) {
			element.attachEvent(eventName, handler);
		}
	}

	/**
	 * Remove event listener.
	 * @param element Element
	 * @param eventName Event name
	 * @param handler Event handler
	 * @param capture true for capture phase, false for bubbling phase
	 */
	static removeEvent(element, eventName, handler, capture = false) {
		if (element.removeEventListener) {
			element.removeEventListener(eventName, handler, capture);
		} else if (element.detachEvent) {
			element.detachEvent(eventName, handler);
		}
	}

	/**
	 * Trigger event.
	 * @param element Element
	 * @param eventName Event name
	 */
	static triggerEvent(element, eventName) {
		element.dispatchEvent(new Event(eventName));
	}
}

/**
 * DOM Element returned from queries in DOM utilities.
 */
export class DOMElement {

	/**
	 * Constructor.
	 * @param node Original node
	 */
	constructor(node) {
		// TODO Refactor to private members and provide public getters
		this._origNode = node;
		this._tagName = node.tagName.toLowerCase();
	}

	/**
	 * Get original node.
	 *
	 * @returns Original node
	 */
	origNode() {
		return this._origNode;
	}

	/**
	 * Get id.
	 *
	 * @return Element id or null
	 */
	id() {
		return this._origNode.id;
	}

	/**
	 * Get tag name.
	 *
	 * @returns {string|*}
	 */
	tag() {
		return this._tagName;
	}

	/**
	 * Get / set height.
	 * @param {number=} value Value to set (optional)
	 * @returns Height in px or DOMElement for chaining when used as setter
	 */
	height(value) {
		if (value === undefined) {
			return this._origNode.getBoundingClientRect().height;
		} else {
			this._origNode.style.height = `${value}${PX}`;
			return this;
		}
	}

	/**
	 * Get / set width.
	 *
	 * @param {number=} value Value to set (optional)
	 * @returns Width in px or DOMElement for chaining when used as setter
	 */
	width(value) {
		if (value === undefined) {
			return this._origNode.getBoundingClientRect().width;
		} else {
			this._origNode.style.width = `${value}${PX}`;
			return this;
		}
	}

	/**
	 * Get fixed position relative to scroll container.
	 *
	 * @returns {{top: (Number|number), left: (Number|number), bottom: *, right: *}}
	 */
	position() {
		return {
			top: this._origNode.offsetTop,
			left: this._origNode.offsetLeft,
			bottom: this._origNode.offsetTop + this._origNode.offsetHeight,
			right: this._origNode.offsetLeft + this._origNode.offsetWidth

		}
	}

	/**
	 * Get scroll position relative to visible viewport.
	 *
	 * @returns {{top: Number, left: Number, bottom: Number, right: Number}}
	 */
	offset() {
		return {
			top: this._origNode.getBoundingClientRect().top,
			left: this._origNode.getBoundingClientRect().left,
			bottom: this._origNode.getBoundingClientRect().bottom,
			right: this._origNode.getBoundingClientRect().right
		}
	}

	/**
	 * Check if class is set.
	 *
	 * @param className Class name
	 * @returns {boolean} true if set, false if not
	 */
	hasClass(className) {
		if (this._origNode.classList) {
			return this._origNode.classList.contains(className);
		} else {
			// TODO;
			return false;
		}
	}

	/**
	 * Add class.
	 *
	 * @param className Class name
	 * @returns {DOMElement} DOMElement for chaining
	 */
	addClass(className) {
		if (this._origNode.classList) {
			this._origNode.classList.add(className);
		} else {
			// TODO
		}
		return this;
	}

	/**
	 * Remove class.
	 *
	 * @param className Class name
	 * @returns {DOMElement} DOMElement for chaining
	 */
	removeClass(className) {
		if (this._origNode.classList) {
			this._origNode.classList.remove(className);
		} else {
			// TODO
		}

		// Remove class attribute if we have no more class set
		if (this.attr("class") === "") {
			this.removeAttr("class");
		}

		return this;
	}

	/**
	 * Check if element is hidden.
	 *
	 * @returns {boolean} true if hidden, false if visible
	 */
	hidden() {
		let computedStyles = window.getComputedStyle(this._origNode);
		return computedStyles.display.toLowerCase() === NONE || computedStyles.visibility.toLowerCase() === HIDDEN;
	}

	/**
	 * Check if element is visible.
	 *
	 * @returns {boolean} true if visible, false if hidden
	 */
	visible() {
		return !this.hidden();
	}

	/**
	 * Get / set attribute value.
	 *
	 * @param name Attribute name
	 * @param {string=} value Attribute value (optional)
	 * @returns {*} Attribute value or DOMElement for chaining when used as setter
	 */
	attr(name, value) {
		if (value === undefined) {
			return this._origNode.getAttribute(name);
		} else {
			this._origNode.setAttribute(name, value);
			return this;
		}
	}

	/**
	 * Remove attribute.
	 *
	 * @param attrName Attribute name
	 * @returns {DOMElement} DOMElement for chaining
	 */
	removeAttr(attrName) {
		this._origNode.removeAttribute(attrName);
		return this;
	}

	/**
	 * Get / set css style.
	 *
	 * If the last style is removed the attribute style is removed as well.
	 * Style can be removed if value is null.
	 *
	 * @param style Style name
	 * @param {?string=} value Style value (optional)
	 * @returns {*} Style value or DOMElement for chaining when used as setter
	 */
	css(style, value) {
		if (value === undefined) {
			return window.getComputedStyle(this._origNode)[style];
		} else {
			this._origNode.style[style] = value;
			if (this.attr(STYLE) === "") {
				this.removeAttr(STYLE);
			}
			return this;
		}
	}

	/**
	 * Get parent.
	 *
	 * @returns {DOMElement} Parent element
	 */
	parent() {
		// TODO Cache parent?
		return new DOMElement(this._origNode.parentNode);
	}

	/**
	 * Show element.
	 *
	 * Is able to save/restore the initial display value even if its an inline style.
	 *
	 * TODO Add easing
	 */
	show() {
		// TODO Add easing
		return _showOrHide(this, this.hidden(), BLOCK);
	}

	/**
	 * Hide element.
	 *
	 * Is able to save/restore the initial display value even if its an inline style.
	 */
	hide() {
		// TODO Add easing
		return _showOrHide(this, this.visible(), NONE);
	}

	/**
	 * Add event listener.
	 *
	 * @param eventName Event name
	 * @param handler Event handler
	 * @param capture true for capture phase, false for bubbling phase
	 * return {DOMElement} DOMElement for chaining
	 */
	addEvent(eventName, handler, capture = false) {
		DOM.addEvent(this._origNode, eventName, handler, capture);
		return this;
	}

	/**
	 * Remove event listener.
	 *
	 * @param eventName Event name
	 * @param handler Event handler
	 * @param capture true for capture phase, false for bubbling phase
	 * return {DOMElement} DOMElement for chaining
	 */
	removeEvent(eventName, handler, capture = false) {
		DOM.removeEvent(this._origNode, eventName, handler, capture);
		return this;
	}

	/**
	 * Trigger event.
	 *
	 * @param eventName Event name
	 * @returns {DOMElement} DOMElement for chaining
	 */
	triggerEvent(eventName) {
		DOM.triggerEvent(this._origNode, eventName);
		return this;
	}
}

///////////////////////////////////////
// Private member functions

/**
 * Check if inline style is set.
 *
 * Info: Potential spaces are ignored.
 *
 * @param domElement {DOMElement}
 * @param style Style
 * @returns {boolean} State of inline style
 * @private
 */
function _hasInlineStyle(domElement, style) {
	if (domElement.attr(STYLE) !== null) {
		return StringUtils.nospace(domElement.attr(STYLE)).includes(StringUtils.nospace(style));
	}
	return false;
}

/**
 * Show / hide _element.
 *
 * @param domElement {DOMElement}
 * @param handle Condition if _element visibility should be changed
 * @param value Display value (BLOCK or NONE)
 * @returns {DOMElement} DOM Element
 * @private
 */
function _showOrHide(domElement, handle, value) {
	if (handle) {
		let prevInlineDisplay = domElement.attr(PREV_INLINE_DISPLAY);
		if (prevInlineDisplay === null) {
			if (domElement.attr(PREV_DISPLAY) === null) {
				_rememberDisplayValue(domElement);
				domElement.css(DISPLAY, value);
			}
			else {
				_restoreDisplayValue(domElement, PREV_DISPLAY, null);
			}
		} else {
			_restoreDisplayValue(domElement, PREV_INLINE_DISPLAY, prevInlineDisplay);
		}
	}
	return domElement;
}

/**
 * Remember display value.
 *
 * @param domElement {DOMElement}
 * @private
 */
function _rememberDisplayValue(domElement) {
	if (_hasInlineStyle(domElement, DISPLAY)) {
		// Remember old inline display value
		domElement.attr(PREV_INLINE_DISPLAY, domElement.css(DISPLAY));
	} else {
		// Remember old display value
		domElement.attr(PREV_DISPLAY, domElement.css(DISPLAY));
	}
}

/**
 * Restore previous display value.
 *
 * @param domElement {DOMElement}
 * @param prevValueAttr Attribute for previous value
 * @param preValue Previous Value
 * @private
 */
function _restoreDisplayValue(domElement, prevValueAttr, preValue) {
	domElement.css(DISPLAY, preValue);
	domElement.removeAttr(prevValueAttr);
}
