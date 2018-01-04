import DOM from "../../dom/floatz.dom.dom.js";
import UserAgent from "../../util/floatz.util.useragent.js";
import MediaQuery from "../../util/floatz.util.mediaquery.js";
import {MEDIA_SIZE_GTE_L} from "../../util/floatz.util.mediaquery.js";
import {DOMElement} from "../../dom/floatz.dom.dom.js";
import {ScrollPlugin} from "../floatz.scroll.scroller.js";
import {SCROLL_EVENT_BEFORENAVGIATE} from "../floatz.scroll.scroller.js";
import {EVENT_ANIMATIONEND, EVENT_CLICK, EVENT_RESIZE, EVENT_TOUCHSTART} from "../../dom/floatz.dom.events.js";

/**
 * Constants
 */
const ANIMATE_GLASS_FADEIN = "flz-animate-glass-fadein"; // TODO make it customizable
const ANIMATE_GLASS_FADEOUT = "flz-animate-glass-fadeout"; // TODO make it customizable
const ANIMATE_SLIDEINLEFT = "flz-animate-slideinleft"; // TODO make it customizable
const ANIMATE_SLIDEOUTLEFT = "flz-animate-slideoutleft"; // TODO make it customizable
const DIALOG_GLASS = "flz-dialog-glass";
const TAG_BODY = "BODY";

/**
 * Responsive popup menu plugin.
 */
export class ScrollPopupMenuPlugin extends ScrollPlugin {

	/**
	 * Constructor.
	 *
	 * @param options Options
	 */
	constructor(options = {}) {
		super(options);

		// Default options
		this.options().menuSelector = options.menuSelector || "#header .flz-nav-list"; // FIXME
		this.options().menuClass = options.menuClass || "flz-nav-list";
		this.options().responsiveMenuClass = options.responsiveMenuClass || "flz-nav-vmenu";
		this.options().menuIconSelector = options.menuIconSelector || ".flz-nav-menu-icon";

		this._body = DOM.queryUnique(TAG_BODY);
		this._menu = DOM.queryUnique(this.options().menuSelector);
		this._menuIcon = DOM.queryUnique(this.options().menuIconSelector);

		// Open/close popup menu
		this._menuIcon.addEvent(EVENT_CLICK, (e) => {
			e.stopPropagation();
			if (this._menuIcon.hasClass("icon-menu")) { // FIXME
				this.showGlass();
				this.openMenu();
			} else {
				this.closeMenu();
				this.hideGlass();
			}
		});

		// Remove glass styles after glass hide animation finishes
		this._body.addEvent(EVENT_ANIMATIONEND, () => {
			this._handleBodyAnimationEnd();
		});

		// Remove menu styles after menu close animation finishes
		this._menu.addEvent(EVENT_ANIMATIONEND, () => {
			this._handleMenuAnimationEnd();
		});

		// Remove menu and glass in case that viewpoint gets larger
		DOM.addEvent(window, EVENT_RESIZE, () => {
			if (MediaQuery.match(MEDIA_SIZE_GTE_L)) { // FIXME
				if (this._menuIcon.hasClass("icon-x")) {  // FIXME
					this.closeMenu();
					this.hideGlass();
				}
			}
		});
	}

	/**
	 * @override
	 */
	scroller(scroller) {
		let _scroller = super.scroller(scroller);
		if (scroller) {
			// Add custom event handler
			DOM.addEvent(scroller.container(), SCROLL_EVENT_BEFORENAVGIATE, () => {
				this.closeMenu();
				this.hideGlass();
			});
		}

		return _scroller;
	}

	/**
	 * Get body.
	 *
	 * @returns {DOMElement|*}
	 */
	body() {
		return this._body;
	}

	/**
	 * Get menu.
	 *
	 * @returns {DOMElement|*}
	 */
	menu() {
		return this._menu;
	}

	/**
	 * Get menu icon.
	 *
	 * @returns {DOMElement|*}
	 */
	menuIcon() {
		return this._menuIcon;
	}

	/**
	 * Open menu.
	 */
	openMenu() {
		this.menuIcon().replaceClass("icon-menu", "icon-x"); // FIXME
		this.menu()
			.replaceClass(this.options().menuClass, this.options().responsiveMenuClass)
			.addClass(ANIMATE_SLIDEINLEFT)
		;
	}

	/**
	 * Close menu.
	 */
	closeMenu() {
		this.menu().replaceClass(ANIMATE_SLIDEINLEFT, ANIMATE_SLIDEOUTLEFT);
		this.menuIcon().replaceClass("icon-x", "icon-menu"); // FIXME

		// Workaround for older IE browsers that do not support animation end event
		if (UserAgent.ie().version() <= 9) {
			this._handleMenuAnimationEnd();
		}
	}

	/**
	 * Show glass overlay.
	 */
	showGlass() {
		this.body()
			.addClass(DIALOG_GLASS, ANIMATE_GLASS_FADEIN)
			.addEvent(EVENT_CLICK, (e) => {
				this._handleGlassClick(e)
			})
			.addEvent(EVENT_TOUCHSTART, (e) => {
				this._handleGlassClick(e)
			})
		;
	}

	/**
	 * Hide glass overlay.
	 */
	hideGlass() {
		this.body()
			.replaceClass(ANIMATE_GLASS_FADEIN, ANIMATE_GLASS_FADEOUT)
			.removeEvent(EVENT_CLICK, this._handleGlassClick)
			.removeEvent(EVENT_TOUCHSTART, this._handleGlassClick)
		;

		// Workaround for older IE browsers that do not support animation end event
		if (UserAgent.ie().version() <= 9) {
			this._handleBodyAnimationEnd();
		}
	}

	/**
	 * Remove and cleanup glass related styles.
	 */
	removeGlass() {
		this.body().removeClass(ANIMATE_GLASS_FADEOUT, DIALOG_GLASS);
	}

	/**
	 * Remove and cleanup menu related styles.
	 */
	removeMenu() {
		this.menu()
			.removeClass(ANIMATE_SLIDEOUTLEFT)
			.replaceClass(this.options().responsiveMenuClass, this.options().menuClass)
		;
	}

	/**
	 * Handle click on glass.
	 *
	 * @param e Event
	 * @private
	 */
	_handleGlassClick(e) {
		if (e.target.tagName.toUpperCase() === TAG_BODY) {
			this.closeMenu();
			this.hideGlass();
		}
	}

	/**
	 * Handle animation end event on body.
	 *
	 * @private
	 */
	_handleBodyAnimationEnd() {
		if (this._body.hasClass(ANIMATE_GLASS_FADEOUT)) { // FIXME
			this.removeGlass();
		}
	}

	/**
	 * Handle animation end event on menu.
	 *
	 * @private
	 */
	_handleMenuAnimationEnd() {
		if (this._menu.hasClass(ANIMATE_SLIDEOUTLEFT)) { // FIXME
			this.removeMenu();
		}
	}
}
