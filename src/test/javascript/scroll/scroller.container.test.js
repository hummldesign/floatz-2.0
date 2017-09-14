import DOM from "../../../main/javascript/dom/dom.js";
import Easing from "../../../main/javascript/animation/easing.js";
import {Scroller} from "../../../main/javascript/scroll/scroller.js";
import {Direction} from "../../../main/javascript/scroll/scroller.js";

// Startup
DOM.addEvent(document, "DOMContentLoaded", () => {
	window.setTimeout(() => {
		new Scroller("#col-1").onScroll(() => {
			console.info("scrolled in #col-1");
		}).scrollTo("#second");
		new Scroller("#col-2").onScroll(() => {
			console.info("scrolled in #col-2");
		}).scrollTo("#seventh");
	}, 1000);
});
