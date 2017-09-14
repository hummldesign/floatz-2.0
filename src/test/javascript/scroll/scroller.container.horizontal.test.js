import DOM from "../../../main/javascript/dom/dom.js";
import Easing from "../../../main/javascript/animation/easing.js";
import {Scroller} from "../../../main/javascript/scroll/scroller.js";
import {Direction} from "../../../main/javascript/scroll/scroller.js";

// Startup
DOM.addEvent(document, "DOMContentLoaded", () => {
	window.setTimeout(() => {
		new Scroller("#row-1").onScroll(() => {
			console.info("scrolled in #container-1");
		}).scrollTo("#second", {
			direction: Direction.HORIZONTAL
		});
		new Scroller("#row-2").onScroll(() => {
			console.info("scrolled in #container-2");
		}).scrollTo("#seventh", {
			direction: Direction.HORIZONTAL
		});
	}, 1000);
});
