import DOM from "../../../main/javascript/dom/floatz.dom.dom.js";
import {EVENT_DOMCONTENTLOADED} from "../../../main/javascript/dom/floatz.dom.events.js";
import {Scroller} from "../../../main/javascript/scroll/floatz.scroll.scroller.js";
import UserAgent from "../../../main/javascript/util/floatz.util.useragent.js";

DOM.addEvent(window, EVENT_DOMCONTENTLOADED, () => {

	// Detect IE and inject to html element
	UserAgent.ie().detect();

	let scroller1 = new Scroller("#col-1");
	scroller1
		.onScrollIn(DOM.query("#first, #second, #third, #fourth"), (entry, entries) => {
			console.log(`>>> scroller1 | ${entry.target.id} scrolled in (ratio: ${entry.intersectionRatio}, isIntersecting: ${entry.isIntersecting})`);
		})
		.onScrollOut(DOM.query("#first, #second, #third, #fourth"), (entry, entries) => {
			console.log(`<<< scroller1 | ${entry.target.id} scrolled out (ratio: ${entry.intersectionRatio}, isIntersecting: ${entry.isIntersecting})`);
		})
	;

	let scroller2 = new Scroller(DOM.queryUnique("#col-2"));
	scroller2
		.onScrollIn(DOM.query("#fifth, #sixth, #seventh, #eight"), (entry, entries) => {
			console.log(`>>> scroller2 | ${entry.target.id} scrolled in (ratio: ${entry.intersectionRatio}, isIntersecting: ${entry.isIntersecting})`);
		})
		.onScrollOut(DOM.query("#fifth, #sixth, #seventh, #eight"), (entry, entries) => {
			console.log(`<<< scroller2 | ${entry.target.id} scrolled out (ratio: ${entry.intersectionRatio}, isIntersecting: ${entry.isIntersecting})`);
		})
	;
});
