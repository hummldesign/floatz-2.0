/**
 * Please note:
 * ------------------------------------------------------------------------------------------------------
 * In order to make this test run successfully the screen size has to be 1440 x 900 px (Laptop with HDPI)
 * ------------------------------------------------------------------------------------------------------
 */

import DOM from "../../../main/javascript/dom/floatz.dom.dom.js";
import {Scroller} from "../../../main/javascript/scroll/floatz.scroll.scroller.js";

let scroller;

describe("> Test Suite for floatz.scroll.scroller.js", () => {
	// Ensure that we always start at the top
	beforeAll((done) => {
		setTimeout(() => {
			scroller = new Scroller();
			window.scrollTo(0,0);
			done();
		}, 200);
	});
	afterAll(() => {
		window.scrollTo(0,0);
	});
	describe("Given a scroll container with 4 scroll sections each with a height of 500px", () => {
		describe("When the page is loaded", () => {
			it("Then the containers viewport height is 900", () => {
				expect(scroller.viewportSize()).toBe(900)
			});
			it("And the containers scroll height should be 2000", () => {
				expect(scroller.scrollSize()).toBe(2000);
			});
			it("And the containers vertical scroll position is 0", () => {
				expect(scroller.scrollPos()).toBe(0)
			});
			it("And the 1st sections vertical top scroll position is 0", () => {
				expect(DOM.queryUnique("#first").offset().top).toBe(0);
			});
			it("And the 2nd sections vertical top scroll position is 500", () => {
				expect(DOM.queryUnique("#second").offset().top).toBe(500);
			});
			it("And the 3rd sections vertical top scroll position is 1000", () => {
				expect(DOM.queryUnique("#third").offset().top).toBe(1000);
			});
			it("And the 4th sections vertical top scroll position is 1500", () => {
				expect(DOM.queryUnique("#fourth").offset().top).toBe(1500);
			});
			it("And the 1st sections vertical bottom scroll position is 500", () => {
				expect(DOM.queryUnique("#first").offset().bottom).toBe(500);
			});
			it("And the 2nd sections vertical bottom scroll position is 1000", () => {
				expect(DOM.queryUnique("#second").offset().bottom).toBe(1000);
			});
			it("And the 3rd sections vertical bottom scroll position is 1500", () => {
				expect(DOM.queryUnique("#third").offset().bottom).toBe(1500);
			});
			it("And the 4th sections vertical bottom scroll position is 2000", () => {
				expect(DOM.queryUnique("#fourth").offset().bottom).toBe(2000);
			});
		});
		describe("When we scroll to the 2nd scroll section", () => {
			beforeAll(() => {
				scroller.scrollTo("#second", {
					duration: 100
				});
			});
			// Wait until scroll easing is finished
			beforeAll(function (done) {
				setTimeout(done, 200);
			});
			it("Then the containers vertical scroll position should be 500", () => {
				expect(scroller.scrollPos()).toBe(500)
			});
			it("And the 1st sections vertical top scroll position should be -500", () => {
				expect(DOM.queryUnique("#first").offset().top).toBe(-500)
			});
			it("And the 2nd sections vertical top scroll position should be 0", () => {
				expect(DOM.queryUnique("#second").offset().top).toBe(0)
			});
			it("And the 3rd sections vertical top scroll position should be 500", () => {
				expect(DOM.queryUnique("#third").offset().top).toBe(500)
			});
			it("And the 4th sections vertical top scroll position should be 1000", () => {
				expect(DOM.queryUnique("#fourth").offset().top).toBe(1000)
			});
			it("And the 1st sections vertical bottom scroll position should be 0", () => {
				expect(DOM.queryUnique("#first").offset().bottom).toBe(0)
			});
			it("And the 2nd sections vertical bottom scroll position should be 500", () => {
				expect(DOM.queryUnique("#second").offset().bottom).toBe(500)
			});
			it("And the 3rd sections vertical bottom scroll position should be 1000", () => {
				expect(DOM.queryUnique("#third").offset().bottom).toBe(1000)
			});
			it("And the 4th sections vertical bottom scroll position should be 1500", () => {
				expect(DOM.queryUnique("#fourth").offset().bottom).toBe(1500)
			});
			it("And the 1st sections vertical top position should be 0", () => {
				expect(DOM.queryUnique("#first").position().top).toBe(0)
			});
			it("And the 2nd sections vertical top position should be 500", () => {
				expect(DOM.queryUnique("#second").position().top).toBe(500)
			});
			it("And the 3rd sections vertical top position should be 1000", () => {
				expect(DOM.queryUnique("#third").position().top).toBe(1000)
			});
			it("And the 4th sections vertical top position should be 1500", () => {
				expect(DOM.queryUnique("#fourth").position().top).toBe(1500)
			});
			it("And the 1st sections vertical bottom position should be 500", () => {
				expect(DOM.queryUnique("#first").position().bottom).toBe(500)
			});
			it("And the 2nd sections vertical bottom position should be 1000", () => {
				expect(DOM.queryUnique("#second").position().bottom).toBe(1000)
			});
			it("And the 3rd sections vertical bottom position should be 1500", () => {
				expect(DOM.queryUnique("#third").position().bottom).toBe(1500)
			});
			it("And the 4th sections vertical bottom position should be 2000", () => {
				expect(DOM.queryUnique("#fourth").position().bottom).toBe(2000)
			});
		});
		describe("When we scroll to the 3rd scroll section", () => {
			beforeAll(() => {
				scroller.scrollTo("#third", {
					duration: 100
				});
			});
			// Wait until scroll easing is finished
			beforeAll(function (done) {
				setTimeout(done, 200);
			});
			it("Then the containers vertical scroll position should be 1000", () => {
				expect(scroller.scrollPos()).toBe(1000)
			});
			it("And the 1st sections vertical top scroll position should be -1000", () => {
				expect(DOM.queryUnique("#first").offset().top).toBe(-1000)
			});
			it("And the 2nd sections vertical top scroll position should be -500", () => {
				expect(DOM.queryUnique("#second").offset().top).toBe(-500)
			});
			it("And the 3rd sections vertical top scroll position should be 0", () => {
				expect(DOM.queryUnique("#third").offset().top).toBe(0)
			});
			it("And the 4th sections vertical top scroll position should be 500", () => {
				expect(DOM.queryUnique("#fourth").offset().top).toBe(500)
			});
			it("And the 1st sections vertical bottom scroll position should be -500", () => {
				expect(DOM.queryUnique("#first").offset().bottom).toBe(-500)
			});
			it("And the 2nd sections vertical bottom scroll position should be 0", () => {
				expect(DOM.queryUnique("#second").offset().bottom).toBe(0)
			});
			it("And the 3rd sections vertical bottom scroll position should be 500", () => {
				expect(DOM.queryUnique("#third").offset().bottom).toBe(500)
			});
			it("And the 4th sections vertical bottom scroll position should be 1000", () => {
				expect(DOM.queryUnique("#fourth").offset().bottom).toBe(1000)
			});
			it("And the 1st sections vertical top position should be 0", () => {
				expect(DOM.queryUnique("#first").position().top).toBe(0)
			});
			it("And the 2nd sections vertical top position should be 500", () => {
				expect(DOM.queryUnique("#second").position().top).toBe(500)
			});
			it("And the 3rd sections vertical top position should be 1000", () => {
				expect(DOM.queryUnique("#third").position().top).toBe(1000)
			});
			it("And the 4th sections vertical top position should be 1500", () => {
				expect(DOM.queryUnique("#fourth").position().top).toBe(1500)
			});
			it("And the 1st sections vertical bottom position should be 500", () => {
				expect(DOM.queryUnique("#first").position().bottom).toBe(500)
			});
			it("And the 2nd sections vertical bottom position should be 1000", () => {
				expect(DOM.queryUnique("#second").position().bottom).toBe(1000)
			});
			it("And the 3rd sections vertical bottom position should be 1500", () => {
				expect(DOM.queryUnique("#third").position().bottom).toBe(1500)
			});
			it("And the 4th sections vertical bottom position should be 2000", () => {
				expect(DOM.queryUnique("#fourth").position().bottom).toBe(2000)
			});
		});
	});
});
