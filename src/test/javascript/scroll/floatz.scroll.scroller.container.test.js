/**
 * Please note:
 * ------------------------------------------------------------------------------------------------------
 * In order to make this test run successfully the screen size has to be 1440 x 900 px (Laptop with HDPI)
 * ------------------------------------------------------------------------------------------------------
 */

import DOM from "../../../main/javascript/dom/floatz.dom.dom.js";
import {Scroller} from "../../../main/javascript/scroll/floatz.scroll.scroller.js";

let scroller1;
let scroller2;

describe("> Test Suite for floatz.scroll.scroller.js", () => {
	// Ensure that we always start at the top
	beforeAll((done) => {
		setTimeout(() => {
			scroller1 = new Scroller("#col-1");
			scroller2 = new Scroller(DOM.queryUnique("#col-2"));
			window.scrollTo(0, 0);
			done();
		}, 200);
	});
	afterAll(() => {
		window.scrollTo(0, 0);
	});
	describe("Given a nested scroll container with 4 scroll sections each with a height of 500px", () => {
		describe("When the page is loaded", () => {
			it("Then the containers viewport height is 900", () => {
				expect(scroller1.viewportSize()).toBe(900)
			});
			it("And the containers scroll height should be 2000", () => {
				expect(scroller1.scrollSize()).toBe(2000);
			});
			it("And the containers vertical scroll position is 0", () => {
				expect(scroller1.scrollPos()).toBe(0)
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
				scroller1.scrollTo("#second", {
					duration: 100
				});
			});
			// Wait until scroll easing is finished
			beforeAll(function (done) {
				setTimeout(done, 200);
			});
			it("Then the containers vertical scroll position should be 500", () => {
				expect(scroller1.scrollPos()).toBe(500)
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
				scroller1.scrollTo("#third", {
					duration: 100
				});
			});
			// Wait until scroll easing is finished
			beforeAll(function (done) {
				setTimeout(done, 200);
			});
			it("Then the containers vertical scroll position should be 1000", () => {
				expect(scroller1.scrollPos()).toBe(1000)
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

	describe("Given a nested scroll container with 4 scroll sections each with a height of 500px", () => {
		describe("When the page is loaded", () => {
			it("Then the containers viewport height is 900", () => {
				expect(scroller2.viewportSize()).toBe(900)
			});
			it("And the containers scroll height should be 2000", () => {
				expect(scroller2.scrollSize()).toBe(2000);
			});
			it("And the containers vertical scroll position is 0", () => {
				expect(scroller2.scrollPos()).toBe(0)
			});
			it("And the 1st sections vertical top scroll position is 0", () => {
				expect(DOM.queryUnique("#fifth").offset().top).toBe(0);
			});
			it("And the 2nd sections vertical top scroll position is 500", () => {
				expect(DOM.queryUnique("#sixth").offset().top).toBe(500);
			});
			it("And the 3rd sections vertical top scroll position is 1000", () => {
				expect(DOM.queryUnique("#seventh").offset().top).toBe(1000);
			});
			it("And the 4th sections vertical top scroll position is 1500", () => {
				expect(DOM.queryUnique("#eighth").offset().top).toBe(1500);
			});
			it("And the 1st sections vertical bottom scroll position is 500", () => {
				expect(DOM.queryUnique("#fifth").offset().bottom).toBe(500);
			});
			it("And the 2nd sections vertical bottom scroll position is 1000", () => {
				expect(DOM.queryUnique("#sixth").offset().bottom).toBe(1000);
			});
			it("And the 3rd sections vertical bottom scroll position is 1500", () => {
				expect(DOM.queryUnique("#seventh").offset().bottom).toBe(1500);
			});
			it("And the 4th sections vertical bottom scroll position is 2000", () => {
				expect(DOM.queryUnique("#eighth").offset().bottom).toBe(2000);
			});
		});
		describe("When we scroll to the 2nd scroll section", () => {
			beforeAll(() => {
				scroller2.scrollTo("#sixth", {
					duration: 100
				});
			});
			// Wait until scroll easing is finished
			beforeAll(function (done) {
				setTimeout(done, 200);
			});
			it("Then the containers vertical scroll position should be 500", () => {
				expect(scroller2.scrollPos()).toBe(500)
			});
			it("And the 1st sections vertical top scroll position should be -500", () => {
				expect(DOM.queryUnique("#fifth").offset().top).toBe(-500)
			});
			it("And the 2nd sections vertical top scroll position should be 0", () => {
				expect(DOM.queryUnique("#sixth").offset().top).toBe(0)
			});
			it("And the 3rd sections vertical top scroll position should be 500", () => {
				expect(DOM.queryUnique("#seventh").offset().top).toBe(500)
			});
			it("And the 4th sections vertical top scroll position should be 1000", () => {
				expect(DOM.queryUnique("#eighth").offset().top).toBe(1000)
			});
			it("And the 1st sections vertical bottom scroll position should be 0", () => {
				expect(DOM.queryUnique("#fifth").offset().bottom).toBe(0)
			});
			it("And the 2nd sections vertical bottom scroll position should be 500", () => {
				expect(DOM.queryUnique("#sixth").offset().bottom).toBe(500)
			});
			it("And the 3rd sections vertical bottom scroll position should be 1000", () => {
				expect(DOM.queryUnique("#seventh").offset().bottom).toBe(1000)
			});
			it("And the 4th sections vertical bottom scroll position should be 1500", () => {
				expect(DOM.queryUnique("#eighth").offset().bottom).toBe(1500)
			});
			it("And the 1st sections vertical top position should be 0", () => {
				expect(DOM.queryUnique("#fifth").position().top).toBe(0)
			});
			it("And the 2nd sections vertical top position should be 500", () => {
				expect(DOM.queryUnique("#sixth").position().top).toBe(500)
			});
			it("And the 3rd sections vertical top position should be 1000", () => {
				expect(DOM.queryUnique("#seventh").position().top).toBe(1000)
			});
			it("And the 4th sections vertical top position should be 1500", () => {
				expect(DOM.queryUnique("#eighth").position().top).toBe(1500)
			});
			it("And the 1st sections vertical bottom position should be 500", () => {
				expect(DOM.queryUnique("#fifth").position().bottom).toBe(500)
			});
			it("And the 2nd sections vertical bottom position should be 1000", () => {
				expect(DOM.queryUnique("#sixth").position().bottom).toBe(1000)
			});
			it("And the 3rd sections vertical bottom position should be 1500", () => {
				expect(DOM.queryUnique("#seventh").position().bottom).toBe(1500)
			});
			it("And the 4th sections vertical bottom position should be 2000", () => {
				expect(DOM.queryUnique("#eighth").position().bottom).toBe(2000)
			});
		});
		describe("When we scroll to the 3rd scroll section", () => {
			beforeAll(() => {
				scroller2.scrollTo("#seventh", {
					duration: 100
				});
			});
			// Wait until scroll easing is finished
			beforeAll(function (done) {
				setTimeout(done, 200);
			});
			it("Then the containers vertical scroll position should be 1000", () => {
				expect(scroller2.scrollPos()).toBe(1000)
			});
			it("And the 1st sections vertical top scroll position should be -1000", () => {
				expect(DOM.queryUnique("#fifth").offset().top).toBe(-1000)
			});
			it("And the 2nd sections vertical top scroll position should be -500", () => {
				expect(DOM.queryUnique("#sixth").offset().top).toBe(-500)
			});
			it("And the 3rd sections vertical top scroll position should be 0", () => {
				expect(DOM.queryUnique("#seventh").offset().top).toBe(0)
			});
			it("And the 4th sections vertical top scroll position should be 500", () => {
				expect(DOM.queryUnique("#eighth").offset().top).toBe(500)
			});
			it("And the 1st sections vertical bottom scroll position should be -500", () => {
				expect(DOM.queryUnique("#fifth").offset().bottom).toBe(-500)
			});
			it("And the 2nd sections vertical bottom scroll position should be 0", () => {
				expect(DOM.queryUnique("#sixth").offset().bottom).toBe(0)
			});
			it("And the 3rd sections vertical bottom scroll position should be 500", () => {
				expect(DOM.queryUnique("#seventh").offset().bottom).toBe(500)
			});
			it("And the 4th sections vertical bottom scroll position should be 1000", () => {
				expect(DOM.queryUnique("#eighth").offset().bottom).toBe(1000)
			});
			it("And the 1st sections vertical top position should be 0", () => {
				expect(DOM.queryUnique("#fifth").position().top).toBe(0)
			});
			it("And the 2nd sections vertical top position should be 500", () => {
				expect(DOM.queryUnique("#sixth").position().top).toBe(500)
			});
			it("And the 3rd sections vertical top position should be 1000", () => {
				expect(DOM.queryUnique("#seventh").position().top).toBe(1000)
			});
			it("And the 4th sections vertical top position should be 1500", () => {
				expect(DOM.queryUnique("#eighth").position().top).toBe(1500)
			});
			it("And the 1st sections vertical bottom position should be 500", () => {
				expect(DOM.queryUnique("#fifth").position().bottom).toBe(500)
			});
			it("And the 2nd sections vertical bottom position should be 1000", () => {
				expect(DOM.queryUnique("#sixth").position().bottom).toBe(1000)
			});
			it("And the 3rd sections vertical bottom position should be 1500", () => {
				expect(DOM.queryUnique("#seventh").position().bottom).toBe(1500)
			});
			it("And the 4th sections vertical bottom position should be 2000", () => {
				expect(DOM.queryUnique("#eighth").position().bottom).toBe(2000)
			});
		});
	});
});
