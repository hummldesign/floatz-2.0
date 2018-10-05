import DOM from "../dom/floatz.dom.dom.js";
import {DOMElement} from "../dom/floatz.dom.dom.js";
import {EVENT_CLICK, EVENT_TOUCHSTART} from "../dom/floatz.dom.events.js";

// Constants for events
const DIALOG_CONTAINER = "flz-dialog-container"
const DIALOG = "flz-dialog";
const NO_SCROLL = "flz-noscroll";
const ANIMATE_GLASS_FADEIN = "flz-animate-glass-fadein"; // TODO make it customizable
const ANIMATE_GLASS_FADEOUT = "flz-animate-glass-fadeout"; // TODO make it customizable
const DIALOG_GLASS = "flz-dialog-glass";
const TAG_DIV = "div";

/**
 * Dialog.
 */
export class Dialog {
	/**
	 * Constructor.
	 */
	constructor() {
		this._body = DOM.body();
		this._dialogContainer = null;
		this._dialog = null;
		this._glass = null;
	}

	/**
	 * Open dialog.
	 *
	 * @param {string} url URL of HTML file to load.
	 * @param loadHandler Optional callback when loading has finished
	 */
	open(url, loadHandler) {
		if (!this._dialogContainer) {
			this._dialogContainer = DOM.createElement(TAG_DIV).addClass(DIALOG_CONTAINER);
			this._dialog = DOM.createElement(TAG_DIV);
			this._dialog.addClass(DIALOG)
				.load(url, (request) => {
					if (loadHandler) {
						loadHandler(request);
					}
				})
			;
			this._glass = new DialogGlass(this._dialogContainer);
			this._glass.show(() => {
				this.close();
			});

			this._dialogContainer.appendChild(this._dialog);
			this._body.appendChild(this._dialogContainer)
				.addClass(NO_SCROLL)
			;
		}
	}

	/**
	 * Close dialog.
	 */
	close() {
		if (this._dialogContainer) {
			this._glass.hide(() => {
				this._body.removeClass(NO_SCROLL);
				this._body.removeChild(this._dialogContainer);
				this._dialogContainer = null;
				this._dialog = null;
			});
		}
	}

	/**
	 * Get root element of dialog.
	 *
	 * @returns Root element
	 */
	root() {
		return this._dialog;
	}
}

/**
 * Dialog glass.
 * <p>
 *     Adds a glass effect for dialog backgrounds.
 * </p>
 */
export class DialogGlass {

	/**
	 * Constructor.
	 *
	 * @param {DOMElement=} parent Optional dialog container that handles glass clicks (default is the document body)
	 */
	constructor(parent) {
		this._body = DOM.body();
		this._parent = parent ? parent : this._body;
		this._clickHandler = null;
	}

	/**
	 * Show glass.
	 *
	 * @param clickHandler Handler executed when the user clicks / taps on the glass
	 */
	show(clickHandler) {
		this._clickHandler = clickHandler;
		this._body.addClass(DIALOG_GLASS, ANIMATE_GLASS_FADEIN);
		this._parent
			.addEvent(EVENT_CLICK, (event) => {
				_handleGlassClick(this, event);
			})
			.addEvent(EVENT_TOUCHSTART, (event) => {
				_handleGlassClick(this, event);
			})
		;
	}

	/**
	 * Hide glass.
	 *
	 * @param hideHandler Handler executed after the glass got hidden
	 */
	hide(hideHandler) {
		if (this._body.hasClass(ANIMATE_GLASS_FADEIN)) {
			this._body.animate()
				.end(() => {
					this._body.removeClass(ANIMATE_GLASS_FADEOUT, DIALOG_GLASS);
				})
				.trigger((event) => {
					this._body.replaceClass(ANIMATE_GLASS_FADEIN, ANIMATE_GLASS_FADEOUT);
					this._parent
						.removeEvent(EVENT_CLICK, _handleGlassClick(this, event))
						.removeEvent(EVENT_TOUCHSTART, _handleGlassClick(this, event));

					if (hideHandler) {
						hideHandler();
					}
				})
			;
		}
	}
}

///////////////////////////////////////
// Private member functions

/**
 * Glass click handler.
 *
 * @param glass Dialog glass
 * @param event Event
 * @private
 */
function _handleGlassClick(glass, event) {
	if (event && event.target === glass._parent.origNode()) {
		if (glass._clickHandler) {
			glass._clickHandler();
		}
	}
}