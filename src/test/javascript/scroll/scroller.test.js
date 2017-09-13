import DOM from "../../../main/javascript/dom/dom.js";
import Easing from "../../../main/javascript/animation/easing.js";
import {Scroller} from "../../../main/javascript/scroll/scoller.js";

// Startup
DOM.addEvent(document, "DOMContentLoaded", () => {
	window.setTimeout(() => {
		new Scroller().onScroll(() => {
			console.info("scrolled outside");
		}).scrollTo("#third", {
			easing: Easing.easeOutExpo
		});

		new Scroller("#_container").onScroll(() => {
			console.info("scrolled inside");
		});
	}, 1000);
});
