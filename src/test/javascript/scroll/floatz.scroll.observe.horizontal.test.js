import DOM from "../../../main/javascript/dom/floatz.dom.dom.js";
import {EVENT_DOMCONTENTLOADED} from "../../../main/javascript/dom/floatz.dom.events.js";
import {Scroller} from "../../../main/javascript/scroll/floatz.scroll.scroller.js";
import UserAgent from "../../../main/javascript/util/floatz.util.useragent.js";

DOM.addEvent(window, EVENT_DOMCONTENTLOADED, () => {

	// Detect IE and inject to html element
	UserAgent.ie().detect();

	let scroller = new Scroller();
	scroller
		.onScrollIn(DOM.query("#first, #second, #third, #fourth"), (entry, entries) => {
			console.log(`>>> ${entry.target.id} scrolled in (ratio: ${entry.intersectionRatio}, isIntersecting: ${entry.isIntersecting})`);
		})
		.onScrollOut(DOM.query("#first, #second, #third, #fourth"), (entry, entries) => {
			console.log(`<<< ${entry.target.id} scrolled out (ratio: ${entry.intersectionRatio}, isIntersecting: ${entry.isIntersecting})`);
		})
	;
});
