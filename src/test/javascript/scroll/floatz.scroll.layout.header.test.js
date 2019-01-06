/**
 * Please note:
 * ------------------------------------------------------------------------------------------------------
 * In order to make this test run successfully the screen size has to be 1440 x 900 px (Laptop with HDPI)
 * ------------------------------------------------------------------------------------------------------
 */

import DOM from "../../../main/javascript/dom/floatz.dom.dom.js";
import {EVENT_DOMCONTENTLOADED} from "../../../main/javascript/dom/floatz.dom.events.js";
import {Scroller} from "../../../main/javascript/scroll/floatz.scroll.scroller.js";
import {ScrollHeaderPlugin} from "../../../main/javascript/scroll/plugin/floatz.scroll.plugin.header.js";
import {ScrollAnchorPlugin} from "../../../main/javascript/scroll/plugin/floatz.scroll.plugin.anchor.js";
import UserAgent from "../../../main/javascript/util/floatz.util.useragent.js";

DOM.addEvent(window, EVENT_DOMCONTENTLOADED, () => {

	// Detect IE and inject to html element
	UserAgent.ie().detect();

	let scroller = new Scroller();
	scroller
		.plugin(new ScrollAnchorPlugin())
		.plugin(new ScrollHeaderPlugin())
		.onScrollBackward((scroller) => {
			// console.info("scrolled backward");
		})
		.onScrollForward((scroller) => {
			// console.info("scrolled forward");
		});
});
