import StringUtils from "../util/floatz.util.strings.js";
import {Animation} from "../animation/floatz.animation.animation.js";

// Test

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
const LOG_PREFIX = "floatz | DOM | ";

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
     * @param {Node|DOMElement|Object=} context Context native element or DOMElement (optional, default is window)
     * @returns {!Array} Array of DOMElement items
     */
    static query(selectors, context = window) {
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
     * Query a unique element.
     *
     * @param selector Selector
     * @param {Node|DOMElement|Object=} context Context native element or DOMElement (optional, default is window)
     * @returns {DOMElement} DOMElement or null if not found
     */
    static queryUnique(selector, context = window) {
        let root = DOM.isWindow(context) ? window.document.documentElement : context;
        if (root instanceof DOMElement) {
            root = root.origNode();
        }
        let element = root.querySelector(selector);
        return element ? new DOMElement(element) : null;
    }

    /**
     * Create event.
     *
     * @param {string} eventName Event name
     * @param {boolean} bubbles Event bubbles up (optional)
     * @param {boolean} cancelable Event can be canceled (optional)
     * @param {Object} data Event data (optional)
     * @returns {Event} Event
     */
    static createEvent(eventName, bubbles = false, cancelable = false, data = null) {
        if (data !== null) {
            // console.debug(LOG_PREFIX + "Creating custom event " + eventName);
            if (typeof window.CustomEvent === "function") {
                return new CustomEvent(eventName, {
                    "bubbles": bubbles, "cancelable": cancelable, "detail": data
                });

            } else {
                let event = document.createEvent('CustomEvent');
                event.initCustomEvent(eventName, bubbles, cancelable, data);
                return event;
            }
        } else {
            // console.debug(LOG_PREFIX + "Creating event " + eventName);
            if (typeof window.Event === "function") {
                return new Event(eventName, {
                    "bubbles": bubbles, "cancelable": cancelable
                });

            } else {
                let event = document.createEvent('Event');
                event.initEvent(eventName, bubbles, cancelable);
                return event;
            }
        }
    }

    /**
     * Add event listener.
     *
     * @param element Element
     * @param {string|Event|CustomEvent} event Event name or event
     * @param handler Event handler
     * @param capture true for capture phase, false for bubbling phase
     */
    static addEvent(element, event, handler, capture = false) {
        let eventName = event instanceof Event ? event.type : event;
        // console.debug(LOG_PREFIX + "Adding event " + eventName);
        if (element.addEventListener) {
            element.addEventListener(eventName, handler, capture);
        } else if (element.attachEvent) {
            element.attachEvent(eventName, handler);
        }
    }

    /**
     * Remove event listener.
     *
     * @param element Element
     * @param {string|Event|CustomEvent} event Event name or event
     * @param handler Event handler
     * @param capture true for capture phase, false for bubbling phase
     */
    static removeEvent(element, event, handler, capture = false) {
        let eventName = event instanceof Event ? event.type : event;
        console.debug(LOG_PREFIX + "Removing event " + eventName);
        if (element.removeEventListener) {
            element.removeEventListener(eventName, handler, capture);
        } else if (element.detachEvent) {
            element.detachEvent(eventName, handler);
        } else {
            console.warn(LOG_PREFIX + "Event " + eventName + " can not be removed");
        }
    }

    /**
     * Trigger event.
     *
     * @param element Element
     * @param event Event name or event
     * @return {boolean} true for canceled, false if event has not been cancelled
     */
    static dispatchEvent(element, event) {
        let eventName = event instanceof Event ? event.type : event;
        // console.debug(LOG_PREFIX + "Dispatching event " + eventName);
        return element.dispatchEvent(event instanceof Event ? event : DOM.createEvent(event));
    }

    /**
     * Create an element.
     *
     * @param tag Tag name of the element
     * @returns {DOMElement} DOMElement for chaining
     */
    static createElement(tag) {
        return new DOMElement(document.createElement(tag));
    }

    /**
     * Get body.
     *
     * @returns {DOMElement} Body element
     */
    static body() {
        return new DOMElement(document.body);
    }

    /**
     * Get html.
     *
     * @returns {DOMElement} Html element
     */
    static html() {
        return new DOMElement(window.document.documentElement);
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
        this._origNode = node;
        this._tagName = node.tagName.toLowerCase();
        this._parent = null;
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
     * @param {string=} id Optional id
     * @return {string|DOMElement} Element id or DOMElement for chaining when used as setter
     */
    id(id) {
        if (id) {
            this._origNode.id = id;
            return this;
        } else {
            return this._origNode.id;
        }
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
     * @returns {number|DOMElement} Height in px or DOMElement for chaining when used as setter
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
     * @returns {number|DOMElement} Width in px or DOMElement for chaining when used as setter
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
     * @returns {{top: number, left: number, bottom: number, right: number}}
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
     * @returns {{top: number, left: number, bottom: number, right: number}}
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
            console.error("classList not available");
            return false;
        }
    }

    /**
     * Add class.
     *
     * @param {...string} classNames Class names
     * @returns {DOMElement} DOMElement for chaining
     */
    addClass(...classNames) {
        if (this._origNode.classList) {
            this._origNode.classList.add(...classNames);
            if (classNames.length > 1) {
                // Workaround for browser that do not support multiple class names
                if (!this.hasClass(classNames[1])) {
                    classNames
                        .filter((className) => !this.hasClass(className))
                        .forEach((className) => this.addClass(className))
                    ;
                }
            }
        } else {
            console.error("classList not available");
        }
        return this;
    }

    /**
     * Replace class.
     *
     * @param className Class name to be replaced
     * @param otherClassName Class name to be set
     *
     * @returns {DOMElement} DOMElement for chaining
     */
    replaceClass(className, otherClassName) {
        if (this._origNode.classList) {
            if (this._origNode.classList.replace) {
                if (this.hasClass(className)) {
                    this._origNode.classList.replace(className, otherClassName);
                } else {
                    this.addClass(otherClassName);
                }
            } else {
                this.removeClass(className).addClass(otherClassName);
            }
        } else {
            console.error("classList not available");
        }
        return this;
    }

    /**
     * Remove class.
     *
     * @param {...string} classNames Class names
     * @returns {DOMElement} DOMElement for chaining
     */
    removeClass(...classNames) {
        if (this._origNode.classList) {
            this._origNode.classList.remove(...classNames);
            if (classNames.length > 1) {
                // Workaround for browser that do not support multiple class names
                if (this.hasClass(classNames[1])) {
                    classNames
                        .filter((className) => this.hasClass(className))
                        .forEach((className) => this.removeClass(className))
                    ;
                }
            }
        } else {
            console.error("classList not available");
        }

        // Remove class attribute if we have no more class set
        if (this.attr("class") === "") {
            this.removeAttr("class");
        }

        return this;
    }

    /**
     * Toggle class.
     *
     * @param {string} className Class name
     * @param {boolean=} force Force add or remove (optional)
     * @returns {DOMElement}
     */
    toggleClass(className, force) {
        if (this._origNode.classList) {
            this._origNode.classList.toggle(className, force)
        } else {
            console.error("classList not available");
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
     * Check if element has a specific attribute.
     *
     * @param attrName Attribute name
     * @returns {boolean} true if available false if not
     */
    hasAttr(attrName) {
        return this.attr(attrName) != null;
    }

    /**
     * Get / set css style.
     *
     * If the last style is removed the attribute style is removed as well.
     * Style can be removed if value is null.
     *
     * @param style Style name
     * @param {?*=} value Style value (optional)
     * @returns {*} Style value or DOMElement for chaining when used as setter
     */
    css(style, value) {
        if (value === undefined) {
            return window.getComputedStyle(this._origNode)[style];
        } else {
            this._origNode.style[style] = value ? value : "";
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
        if (!this._parent) {
            this._parent = new DOMElement(this._origNode.parentNode);
        }
        return this._parent;
    }

    /**
     * Return nearest parent which is not static.
     *
     * @returns {DOMElement} Offset parent element or null
     */
    offsetParent() {
        let parent =  this._origNode.offsetParent;
        return parent != null ? new DOMElement(this._origNode.offsetParent) : null;
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
     * @param {string|Event|CustomEvent} event Event name or event
     * @param handler Event handler
     * @param capture true for capture phase, false for bubbling phase
     * return {DOMElement} DOMElement for chaining
     */
    addEvent(event, handler, capture = false) {
        DOM.addEvent(this._origNode, event, handler, capture);
        return this;
    }

    /**
     * Remove event listener.
     *
     * @param {string|Event|CustomEvent} event Event name or event
     * @param handler Event handler
     * @param capture true for capture phase, false for bubbling phase
     * return {DOMElement} DOMElement for chaining
     */
    removeEvent(event, handler, capture = false) {
        DOM.removeEvent(this._origNode, event, handler, capture);
        return this;
    }

    /**
     * Trigger event.
     *
     * @param {string|Event|CustomEvent} event Event name or event
     * @returns {boolean} true if cancelled, false if event has not been cancelled
     */
    dispatchEvent(event) {
        return DOM.dispatchEvent(this._origNode, event);
    }

    /**
     * Animate element.
     *
     * @param {string} type Animation type "transition" or "animation" (default).
     * @returns {Animation} Animation
     */
    animate(type = "animation") {
        return new Animation(this, type);
    }

    /**
     * Append child element.
     *
     * @param  {DOMElement} element Child element
     * @returns {DOMElement} DOMElement for chaining
     */
    appendChild(element) {
        this._origNode.appendChild(element.origNode());
        return this;
    }

    /**
     * Remove child element.
     *
     * @param  {DOMElement} element Child element
     * return {DOMElement} DOMElement for chaining
     */
    removeChild(element) {
        this._origNode.removeChild(element.origNode());
        return this;
    }

    /**
     * Get a specific child item.
     *
     * @param index Index of the child item
     */
    child(index) {
        return new DOMElement(this._origNode.children[index]);
    }

    /**
     * Insert element before other element.
     *
     * @param element Inserted (moved) element
     * @param reference Reference element
     * @returns {DOMElement} Inserted element
     */
    insertBefore(element, reference) {
        return new DOMElement(this._origNode.insertBefore(element._origNode, reference._origNode));
    }

    /**
     * Get/set inner HTML.
     *
     * @param {?string=} data HTML data (optional)
     * @returns {*} Inner HTML or DOMElement for chaining when used as setter
     */
    html(data) {
        if (!data) {
            return this._origNode.innerHTML;
        } else {
            this._origNode.innerHTML = data;
            return this;
        }
    }

    /**
     * Get/set inner text.
     *
     * @param {?*=} text Text
     * @returns {*} Inner text or DOMElement for chaining when used as setter
     */
    text(text) {
        if (!text) {
            return this._origNode.innerText;
        } else {
            this._origNode.innerText = text;
            return this;
        }
    }

    /**
     * Load external HTML into element
     *
     * @param url Location of HTML file
     * @param {Function=} handler Optional handler that is executed after loading is finished
     * @returns {DOMElement} DOMElement for chaining
     */
    load(url, handler) {
        let request = new XMLHttpRequest();
        request.onload = () => {
            this.html(request.responseXML.body ? request.responseXML.body.innerHTML : request.responseText /* Fix: IE9 */);
            if (handler) {
                handler(request);
            }
        };

        request.open("GET", url);
        request.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
        request.responseType = "document"; // FIX: must be set AFTER open otherwise InvalidStateError in IE
        request.send();
        return this;
    }

    /**
     * Query elements in the context of the current element.
     *
     * Syntax: DOM.query(<selectors>[,<context>]);
     *
     * @param {string} selectors String with selectors
     * @returns {!Array} Array of DOMElement items
     */
    query(selectors) {
        return DOM.query(selectors, this);
    }

    /**
     * Query a unique element in the context of the current element.
     *
     * @param selector Selector
     * @returns {DOMElement} DOMElement or null if not found
     */
    queryUnique(selector) {
        return DOM.queryUnique(selector, this);
    }

    /**
     * Get last child.
     *
     * @param {boolean} elementsOnly Consider all nodes (false) or only elements true). Default is false.
     * @returns {?DOMElement} DOMElement or null if not an element
     */
    lastChild(elementsOnly = false) {
        let child = elementsOnly ? this.origNode().lastElementChild : this.origNode().lastChild;
        if (child instanceof Element) {
            return new DOMElement(child);
        }
        // TODO Support DOMText as well
        return null;
    }

    /**
     * Get first child.
     *
     * @param {boolean} elementsOnly Consider all nodes (false) or only elements true). Default is false.
     * @returns {DOMElement} DOMElement or null if not an element
     */
    firstChild(elementsOnly = false) {
        let child = elementsOnly ? this.origNode().firstElementChild : this.origNode().firstChild;
        if (child instanceof Element) {
            return new DOMElement(child);
        }
        // TODO Support DOMText as well
        return null;
    }

    /**
     * Get next sibling element.
     *
     * @param {boolean} elementsOnly Consider all nodes (false) or only elements true). Default is false.
     * @returns {DOMElement} DOMElement or null if not an element
     */
    nextSibling(elementsOnly = false) {
        let sibling = elementsOnly ? this.origNode().nextElementSibling : this.origNode().nextSibling;
        if(sibling instanceof Element) {
            return new DOMElement(sibling);
        }
        // TODO Support DOMText as well
        return null;
    }

    /**
     * Get previous sibling element.
     *
     * @param {boolean} elementsOnly Consider all nodes (false) or only elements true). Default is false.
     * @returns {DOMElement} DOMElement or null if not an element
     */
    previousSibling(elementsOnly = false) {
        let sibling = elementsOnly ? this.origNode().previousElementSibling : this.origNode().previousSibling;
        if(sibling instanceof Element) {
            return new DOMElement(sibling);
        }
        // TODO Support DOMText as well
        return null;
    }

    /**
     * Get or set a data attribute value.
     * @param property Name of the property in camel case (e.g. alternateLabel instead of data-alternate-label)
     * @param {?string=} value New value (optional)
     * @returns {string | undefined | DOMElement}
     */
    data(property, value) {
        if (!value) {
            return this.origNode().dataset[property];
        } else {
            this.origNode().dataset[property] = value;
            return this;
        }
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
 * @returns {DOMElement} DOMElement
 * @private
 */
function _showOrHide(domElement, handle, value) {
    if (handle) {
        let prevInlineDisplay = domElement.attr(PREV_INLINE_DISPLAY);
        if (prevInlineDisplay === null) {
            if (domElement.attr(PREV_DISPLAY) === null) {
                _rememberDisplayValue(domElement);
                domElement.css(DISPLAY, value);
            } else {
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
