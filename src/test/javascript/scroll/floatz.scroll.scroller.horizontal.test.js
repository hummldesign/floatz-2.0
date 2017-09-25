import DOM from "../../../main/javascript/dom/floatz.dom.dom.js";
import Easing from "../../../main/javascript/animation/floatz.animation.easing.js";
import {Scroller} from "../../../main/javascript/scroll/floatz.scroll.scroller.js";
import {Direction} from "../../../main/javascript/scroll/floatz.scroll.scroller.js";

let scroller;

describe("> Test Suite for floatz.scroll.scroller.js", () => {
	// Ensure that we always start at the top
	beforeAll((done) => {
		setTimeout(() => {
			scroller = new Scroller(window, {
				direction: Direction.HORIZONTAL
			});
			window.scrollTo(0,0);
			done();
		}, 200);
	});
	afterAll(() => {
		window.scrollTo(0,0);
	});
	describe("Given a horizontal scroll container with 4 scroll sections each with a width of 750px", () => {
		describe("When the page is loaded", () => {
			it("Then the containers viewport width is 1440", () => {
				expect(scroller.viewportSize()).toBe(1440)
			});
			it("And the containers scroll width should be 3000", () => {
				expect(scroller.scrollSize()).toBe(3000);
			});
			it("And the containers horizontal scroll position is 0", () => {
				expect(scroller.scrollPos()).toBe(0)
			});
			it("And the 1st sections horizontal left scroll position is 0", () => {
				expect(DOM.queryUnique("#first").offset().left).toBe(0);
			});
			it("And the 2nd sections horizontal left scroll position is 500", () => {
				expect(DOM.queryUnique("#second").offset().left).toBe(750);
			});
			it("And the 3rd sections horizontal left scroll position is 1000", () => {
				expect(DOM.queryUnique("#third").offset().left).toBe(1500);
			});
			it("And the 4th sections horizontal left scroll position is 2250", () => {
				expect(DOM.queryUnique("#fourth").offset().left).toBe(2250);
			});
			it("And the 1st sections horizontal right scroll position is 750", () => {
				expect(DOM.queryUnique("#first").offset().right).toBe(750);
			});
			it("And the 2nd sections horizontal right scroll position is 1500", () => {
				expect(DOM.queryUnique("#second").offset().right).toBe(1500);
			});
			it("And the 3rd sections horizontal right scroll position is 2250", () => {
				expect(DOM.queryUnique("#third").offset().right).toBe(2250);
			});
			it("And the 4th sections horizontal right scroll position is 3000", () => {
				expect(DOM.queryUnique("#fourth").offset().right).toBe(3000);
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
			it("Then the containers horizontal scroll position should be 750", () => {
				expect(scroller.scrollPos()).toBe(750)
			});
			it("And the 1st sections horizontal left scroll position should be -750", () => {
				expect(DOM.queryUnique("#first").offset().left).toBe(-750)
			});
			it("And the 2nd sections horizontal left scroll position should be 0", () => {
				expect(DOM.queryUnique("#second").offset().left).toBe(0)
			});
			it("And the 3rd sections horizontal left scroll position should be 750", () => {
				expect(DOM.queryUnique("#third").offset().left).toBe(750)
			});
			it("And the 4th sections horizontal left scroll position should be 1500", () => {
				expect(DOM.queryUnique("#fourth").offset().left).toBe(1500)
			});
			it("And the 1st sections horizontal right scroll position should be 0", () => {
				expect(DOM.queryUnique("#first").offset().right).toBe(0)
			});
			it("And the 2nd sections horizontal right scroll position should be 750", () => {
				expect(DOM.queryUnique("#second").offset().right).toBe(750)
			});
			it("And the 3rd sections horizontal right scroll position should be 1500", () => {
				expect(DOM.queryUnique("#third").offset().right).toBe(1500)
			});
			it("And the 4th sections horizontal right scroll position should be 2250", () => {
				expect(DOM.queryUnique("#fourth").offset().right).toBe(2250)
			});
			it("And the 1st sections horizontal left position should be 0", () => {
				expect(DOM.queryUnique("#first").position().left).toBe(0)
			});
			it("And the 2nd sections horizontal left position should be 750", () => {
				expect(DOM.queryUnique("#second").position().left).toBe(750)
			});
			it("And the 3rd sections horizontal left position should be 1500", () => {
				expect(DOM.queryUnique("#third").position().left).toBe(1500)
			});
			it("And the 4th sections horizontal left position should be 2250", () => {
				expect(DOM.queryUnique("#fourth").position().left).toBe(2250)
			});
			it("And the 1st sections horizontal right position should be 750", () => {
				expect(DOM.queryUnique("#first").position().right).toBe(750)
			});
			it("And the 2nd sections horizontal right position should be 1500", () => {
				expect(DOM.queryUnique("#second").position().right).toBe(1500)
			});
			it("And the 3rd sections horizontal right position should be 2250", () => {
				expect(DOM.queryUnique("#third").position().right).toBe(2250)
			});
			it("And the 4th sections horizontal right position should be 3000", () => {
				expect(DOM.queryUnique("#fourth").position().right).toBe(3000)
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
			it("Then the containers horizontal scroll position should be 1500", () => {
				expect(scroller.scrollPos()).toBe(1500)
			});
			it("And the 1st sections horizontal left scroll position should be -1500", () => {
				expect(DOM.queryUnique("#first").offset().left).toBe(-1500)
			});
			it("And the 2nd sections horizontal left scroll position should be -750", () => {
				expect(DOM.queryUnique("#second").offset().left).toBe(-750)
			});
			it("And the 3rd sections horizontal left scroll position should be 0", () => {
				expect(DOM.queryUnique("#third").offset().left).toBe(0)
			});
			it("And the 4th sections horizontal left scroll position should be 750", () => {
				expect(DOM.queryUnique("#fourth").offset().left).toBe(750)
			});
			it("And the 1st sections horizontal right scroll position should be -750", () => {
				expect(DOM.queryUnique("#first").offset().right).toBe(-750)
			});
			it("And the 2nd sections horizontal right scroll position should be 0", () => {
				expect(DOM.queryUnique("#second").offset().right).toBe(0)
			});
			it("And the 3rd sections horizontal right scroll position should be 750", () => {
				expect(DOM.queryUnique("#third").offset().right).toBe(750)
			});
			it("And the 4th sections horizontal right scroll position should be 1500", () => {
				expect(DOM.queryUnique("#fourth").offset().right).toBe(1500)
			});
			it("And the 1st sections horizontal left position should be 0", () => {
				expect(DOM.queryUnique("#first").position().left).toBe(0)
			});
			it("And the 2nd sections horizontal left position should be 750", () => {
				expect(DOM.queryUnique("#second").position().left).toBe(750)
			});
			it("And the 3rd sections horizontal left position should be 1500", () => {
				expect(DOM.queryUnique("#third").position().left).toBe(1500)
			});
			it("And the 4th sections horizontal left position should be 2250", () => {
				expect(DOM.queryUnique("#fourth").position().left).toBe(2250)
			});
			it("And the 1st sections horizontal right position should be 700", () => {
				expect(DOM.queryUnique("#first").position().right).toBe(750)
			});
			it("And the 2nd sections horizontal right position should be 1500", () => {
				expect(DOM.queryUnique("#second").position().right).toBe(1500)
			});
			it("And the 3rd sections horizontal right position should be 2250", () => {
				expect(DOM.queryUnique("#third").position().right).toBe(2250)
			});
			it("And the 4th sections horizontal right position should be 3000", () => {
				expect(DOM.queryUnique("#fourth").position().right).toBe(3000)
			});
		});
	});
});
