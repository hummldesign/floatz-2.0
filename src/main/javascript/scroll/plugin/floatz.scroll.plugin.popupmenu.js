import DOM from "../../dom/floatz.dom.dom.js";
import {ScrollPlugin} from "../floatz.scroll.scroller.js";
import {ScrollEvent} from "../floatz.scroll.scroller.js";

/**
 * Constants
 */
const EVENT_CLICK = "click";
const EVENT_ANIMATION_END = "animationend";
const ANIMATE_GLASS_FADEIN = "flz-animate-glass-fadein"; // TODO make it customizable
const ANIMATE_GLASS_FADEOUT = "flz-animate-glass-fadeout"; // TODO make it customizable
const ANIMATE_SLIDEINLEFT = "flz-animate-slideinleft"; // TODO make it customizable
const ANIMATE_SLIDEOUTLEFT = "flz-animate-slideoutleft"; // TODO make it customizable
const DIALOG_GLASS = "flz-dialog-glass";

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

		this._body = DOM.queryUnique("body");
		this._menu = DOM.queryUnique(this.options().menuSelector);
		this._menuIcon = DOM.queryUnique(this.options().menuIconSelector);

		this._menuIcon.addEvent(EVENT_CLICK, () => {
			if (this._menuIcon.hasClass("icon-menu")) { // FIXME
				this.showGlass();
				this.openMenu();
			} else {
				this.closeMenu();
				this.hideGlass();
			}
		});

		this._body.addEvent(EVENT_ANIMATION_END, () => {
			if (this._body.hasClass(ANIMATE_GLASS_FADEOUT)) {
				this.removeGlass();
			}
		});

		this._menu.addEvent(EVENT_ANIMATION_END, () => {
			if (this._menu.hasClass(ANIMATE_SLIDEOUTLEFT)) {
				this.removeMenu();
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
			DOM.addEvent(scroller.container(), ScrollEvent.BEFORE_NAVGIATE, () => {
				_handleBeforeNavigate(this);
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
	}

    /**
	 * Show glass overlay.
     */
	showGlass() {
		this.body().addClass(DIALOG_GLASS, ANIMATE_GLASS_FADEIN);
	}

    /**
	 * Hide glass overlay.
     */
	hideGlass() {
		this.body().replaceClass(ANIMATE_GLASS_FADEIN, ANIMATE_GLASS_FADEOUT);
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
}

// /**
//  * Open menu.
//  *
//  * @param plugin Scroll menu plugin
//  * @private
//  */
// function _openMenu(plugin) {
// 	plugin._menuIcon
// 		.replaceClass("icon-menu", "icon-x") // FIXME
// 	;
// 	plugin._menu
// 		.replaceClass(plugin.options().menuClass, plugin.options().responsiveMenuClass)
// 		.addClass(ANIMATE_SLIDEINLEFT)
// 	;
// 	plugin._body
// 		.addClass(DIALOG_GLASS, ANIMATE_GLASS_FADEIN)
// 	;
// }
//
// /**
//  * Close menu.
//  *
//  * @param plugin Scroll menu plugin
//  * @private
//  */
// function _closeMenu(plugin) {
// 	plugin._menu
// 		.replaceClass(ANIMATE_SLIDEINLEFT, ANIMATE_SLIDEOUTLEFT)
// 	;
// 	plugin._menuIcon
// 		.replaceClass("icon-x", "icon-menu") // FIXME
// 	;
// 	plugin._body
// 		.replaceClass(ANIMATE_GLASS_FADEIN, ANIMATE_GLASS_FADEOUT)
// 	;
// }
//
// /**
//  * Remove glass.
//  *
//  * @param plugin Scroll menu plugin
//  * @private
//  */
// function _removeGlass(plugin) {
// 	plugin._body
// 		.removeClass(ANIMATE_GLASS_FADEOUT, DIALOG_GLASS)
// 	;
// }
//
// /**
//  * Switch from responsive menu to normal menu.
//  *
//  * @param plugin Scroll menu plugin
//  * @private
//  */
// function _removeReponsiveMenu(plugin) {
// 	plugin._menu
// 		.removeClass(ANIMATE_SLIDEOUTLEFT)
// 		.replaceClass(plugin.options().responsiveMenuClass, plugin.options().menuClass)
// 	;
// }
//
// /**
//  * Before navigation handler.
//  *
//  * @param plugin Scroll menu plugin
//  */
// function _handleBeforeNavigate(plugin) {
// 	_closeMenu(plugin);
// }
