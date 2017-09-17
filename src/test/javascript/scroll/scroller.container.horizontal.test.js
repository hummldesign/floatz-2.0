import DOM from "../../../main/javascript/dom/dom.js";
import {Scroller} from "../../../main/javascript/scroll/scroller.js";
import {Direction} from "../../../main/javascript/scroll/scroller.js";

// Startup
DOM.addEvent(document, "DOMContentLoaded", () => {
	window.setTimeout(() => {
		new Scroller("#row-1", {
			direction: Direction.HORIZONTAL
		}).onScroll(() => {
			console.info("scrolled in #container-1");
		}).scrollTo("#second");
		new Scroller("#row-2", {
			direction: Direction.HORIZONTAL
		}).onScroll(() => {
			console.info("scrolled in #container-2");
		}).scrollTo("#seventh");
	}, 1000);
});
