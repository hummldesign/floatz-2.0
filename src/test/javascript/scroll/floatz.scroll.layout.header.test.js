import DOM from "../../../main/javascript/dom/floatz.dom.dom.js";
import {Scroller} from "../../../main/javascript/scroll/floatz.scroll.scroller.js";
import {ScrollHeaderPlugin} from "../../../main/javascript/scroll/plugin/floatz.scroll.plugin.header.js";
import {ScrollNavPlugin} from "../../../main/javascript/scroll/plugin/floatz.scroll.plugin.nav.js";

/*DOM.addEvent(window, "DOMContentLoaded", () => {

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
});*/

let scroller;

describe("> Test Suite for floatz.scroll.plugin.header.js and floatz.scroll.plugin.nav.js", () => {
	// Ensure that we always start at the top
	beforeAll((done) => {
		setTimeout(() => {
			scroller = new Scroller()
			scroller.plugin(new ScrollNavPlugin())
					.plugin(new ScrollHeaderPlugin());

			window.scrollTo(0,0);
			done();
		}, 200);
	});
	afterAll(() => {
		window.scrollTo(0,0);
	});
	describe("Given ...", () => {
		describe("When ...", () => {
			it("Then ...", () => {
				expect(null).toBe(null)
			});
		});
	});
});


