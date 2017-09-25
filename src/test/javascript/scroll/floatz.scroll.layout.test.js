import DOM from "../../../main/javascript/dom/floatz.dom.dom.js";
import {Scroller} from "../../../main/javascript/scroll/floatz.scroll.scroller.js";
import {ScrollHeaderPlugin} from "../../../main/javascript/scroll/plugin/floatz.scroll.plugin.header.js";
import {ScrollNavPlugin} from "../../../main/javascript/scroll/plugin/floatz.scroll.plugin.nav.js";

DOM.addEvent(window, "DOMContentLoaded", () => {

	let scroller = new Scroller();
	scroller
		.plugin(new ScrollNavPlugin(scroller))
		.plugin(new ScrollHeaderPlugin(scroller))
		.onScrollBackward((scroller) => {
			console.info("scrolled backward");
		})
		.onScrollForward((scroller) => {
			console.info("scrolled forward");
		})
	;
});


