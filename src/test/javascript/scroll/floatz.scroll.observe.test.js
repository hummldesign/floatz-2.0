/**
 * Please note:
 * ------------------------------------------------------------------------------------------------------
 * In order to make this test run successfully the screen size has to be 1440 x 900 px (Laptop with HDPI)
 * ------------------------------------------------------------------------------------------------------
 */

import DOM from "../../../main/javascript/dom/floatz.dom.dom.js";
import {EVENT_DOMCONTENTLOADED} from "../../../main/javascript/dom/floatz.dom.events.js";
import {Scroller} from "../../../main/javascript/scroll/floatz.scroll.scroller.js";
import UserAgent from "../../../main/javascript/util/floatz.util.useragent.js";

DOM.addEvent(window, EVENT_DOMCONTENTLOADED, () => {

	// Detect IE and inject to html element
	UserAgent.ie().detect();

	let scroller = new Scroller();
	scroller
		.onScrollIn(DOM.queryUnique("#first"), (entry) => {
			console.log(`>>> ${entry.target.id} scrolled in`);
		})
		.onScrollIn(DOM.queryUnique("#third"), (entry) => {
			console.log(`>>> ${entry.target.id} scrolled in`);
		})
		.onScrollOut(DOM.queryUnique("#first"), (entry) => {
			console.log(`<<< ${entry.target.id} scrolled out`);
		})
		.onScrollOut(DOM.queryUnique("#third"), (entry) => {
			console.log(`<<< ${entry.target.id} scrolled out`);
		})
	;
});
