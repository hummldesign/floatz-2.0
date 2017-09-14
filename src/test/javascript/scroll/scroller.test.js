import DOM from "../../../main/javascript/dom/dom.js";
import {Scroller} from "../../../main/javascript/scroll/scroller.js";

// Startup
DOM.addEvent(document, "DOMContentLoaded", () => {
	window.setTimeout(() => {
		new Scroller().onScroll(() => {
			console.info("scrolled");
		}).scrollTo("#third");
	}, 1000);
});
