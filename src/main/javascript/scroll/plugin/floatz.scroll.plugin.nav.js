import DOM from "../../dom/floatz.dom.dom.js";
import {DOMElement} from "../../dom/floatz.dom.dom.js";
import {ScrollPlugin} from "../floatz.scroll.scroller.js";

/**
 * Scroll navigation plugin.
 * <p>
 *    Adds scroll-to navigation to all navigation items.
 * </p>
 */
export class ScrollNavPlugin extends ScrollPlugin {

	constructor(options = {}) {
		super(options);

		// Default options
		this.options().headerSelector = options.headerSelector || "header";
		this.options().navItemsSelector = options.navItemsSelector || "header li > a";

		// Add click handlers to navigation items
		this._navItems = _prepareNavItems(this);
	}

	navItems() {
		return this._navItems;
	}
}

/**
 * Prepare navigation items.
 *
 * @param plugin Reference to plugin
 * @return {Array} Navigation items
 * @private
 */
function _prepareNavItems(plugin) {
	let navItems = DOM.query(plugin.options().navItemsSelector);
	let header = DOM.queryUnique(plugin.options().headerSelector);
	navItems.forEach((navItem) => {
		navItem.addEvent("click", (event) => {
			_handleClick(plugin, header, navItem, event);
		});
	});

	return navItems;
}

/**
 * Handle click on navigation item.
 * 
 * @param plugin Reference to plugin
 * @param header Reference to header
 * @param navItem Reference to navigation item that has been clicked
 * @param event Click event
 * @private
 */
function _handleClick(plugin, header, navItem, event) {
	// Use scroll navigation only when href contains an id
	if (navItem.attr("href").startsWith("#")) {
		event.preventDefault();

		// Remove header offset for slideout header
		if (header.hasClass("flz-page-header-fixed-slided")) {
			plugin.scroller().options().offset = 0;
		}

		// Scroll to section the menu navigation item points to
		plugin.scroller().scrollTo(navItem.attr("href"), {
			complete: () => {
				_handleScrollComplete(plugin, navItem);
			},
		});
	}
}

/**
 * Scroll complete handler.
 *
 * @param plugin Reference to plugin
 * @param {DOMElement} navItem Navigation item
 * @private
 */
function _handleScrollComplete(plugin, navItem) {
	// Unselect previous navigation item
	let navItems = plugin.navItems();
	navItems.forEach((item) => {
		if (item.parent().hasClass("flz-nav-selected")) {
			item.parent().removeClass("flz-nav-selected");
		}
	});

	// Select current navigation item
	navItem.parent().addClass("flz-nav-selected");
}
