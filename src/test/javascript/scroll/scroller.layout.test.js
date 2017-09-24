import DOM from "../../../main/javascript/dom/dom.js";
import {Scroller} from "../../../main/javascript/scroll/scroller.js";
import {ScrollHeaderPlugin} from "../../../main/javascript/scroll/plugin/scrollHeaderPlugin.js";
import {ScrollNavPlugin} from "../../../main/javascript/scroll/plugin/scrollNavPlugin.js";

DOM.addEvent(window, "DOMContentLoaded", () => {

	let scroller = new Scroller();
	scroller
		.plugin(new ScrollNavPlugin(scroller))
		.plugin(new ScrollHeaderPlugin(scroller, {
			hideOnScrollForward: true
		}))
		.onScrollBackward((scroller) => {
			console.info("scrolled backward");
		})
		.onScrollForward((scroller) => {
			console.info("scrolled forward");
		})
	;
});


