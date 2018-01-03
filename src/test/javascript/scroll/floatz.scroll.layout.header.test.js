import DOM from "../../../main/javascript/dom/floatz.dom.dom.js";
import {EVENT_DOMCONTENTLOADED} from "../../../main/javascript/dom/floatz.dom.events.js";
import {Scroller} from "../../../main/javascript/scroll/floatz.scroll.scroller.js";
import {ScrollHeaderPlugin} from "../../../main/javascript/scroll/plugin/floatz.scroll.plugin.header.js";
import {ScrollNavPlugin} from "../../../main/javascript/scroll/plugin/floatz.scroll.plugin.nav.js";
import UserAgent from "../../../main/javascript/util/floatz.util.useragent.js";

DOM.addEvent(window, EVENT_DOMCONTENTLOADED, () => {

	// Detect IE and inject to html element
	UserAgent.ie().detect();

	let scroller = new Scroller();
	scroller
		.plugin(new ScrollNavPlugin())
		.plugin(new ScrollHeaderPlugin())
		.onScrollBackward((scroller) => {
			console.info("scrolled backward");
		})
		.onScrollForward((scroller) => {
			console.info("scrolled forward");
		});
});
