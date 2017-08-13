import DOM from "../../../main/javascript/dom/dom.js";
import {DOMElement} from "../../../main/javascript/dom/dom.js";

let eventCounter = {
	resize: 0
};

let handleLoad = () => {
	eventCounter.resize += 1;
};

let handleLoad2 = () => {
	eventCounter.resize += 1;
};

describe("> Test Suite for dom.js", () => {
	describe("> Test cases for DOM.query()", () => {
		describe("Query by id", () => {
			it("should return 1 DOMElement", () => {
				expect(DOM.queryById("root") instanceof DOMElement).toBe(true);
			});
		});
		describe("Query by invalid id", () => {
			it("should return null", () => {
				expect(DOM.queryById("invalidId")).toBeNull();
			});
		});
		describe("Global query for .child", () => {
			it("should return 3 children", () => {
				expect(DOM.query(".child").length).toBe(3);
			});
		});
		describe("Global query for #root > .child", () => {
			it("should return 2 children", () => {
				expect(DOM.query("#root > .child").length).toBe(2);
			});
		});
		describe("Local query for .child within .root using DOM.byId", () => {
			it("should return 2 children", () => {
				expect(DOM.query(".child", DOM.queryById("root")).length).toBe(2);
			});
		});
		describe("Local query for .child within .root using document.getElementById", () => {
			it("should return 2 children", () => {
				expect(DOM.query(".child", document.getElementById("root")).length).toBe(2);
			});
		});
		describe("Local query for .child within .root using a string instead of an element", () => {
			it("should return []", () => {
				expect(DOM.query(".child", "#root").length).toBe(0);
			});
		});

		describe("Query for an invalid element", () => {
			it("should return []", () => {
				expect(DOM.query(".invalidChild").length).toBe(0);
			});
		});
		describe("Query unique element", () => {
			it("should return 1 element", () => {
				expect(DOM.queryUnique("#root") instanceof DOMElement).toBe(true);
			});
		});
		describe("Query non-unique element", () => {
			it("should still return 1 element", () => {
				expect(DOM.queryUnique(".child") instanceof DOMElement).toBe(true);
			});
		});
		describe("Query unique invalid element", () => {
			it("should return null", () => {
				expect(DOM.queryUnique(".invalidChild")).toBeNull();
			});
		});
	});
	describe("> Test cases for DOM.isWindow()", () => {
		describe("window element ", ()=> {
			it("should be a window", () => {
				expect(DOM.isWindow(window)).toBe(true);
			});
		});
		describe("other native element", ()=> {
			it("should not be a window", () => {
				expect(DOM.isWindow(document.getElementById("root"))).toBe(false);
			});
		});
		describe("floatz DOMElement", ()=> {
			it("should not be a window", () => {
				expect(DOM.isWindow(document.getElementById("root"))).toBe(false);
			});
		});
	});
	describe("> Test cases for DOM.hidden() and DOM.visible()", () => {
		describe("Element with display:none", () => {
			it("should be hidden", () => {
				expect(DOM.queryUnique(".hidden").hidden()).toBe(true);
			});
			it("should not be visible", () => {
				expect(DOM.queryUnique(".hidden").visible()).toBe(false);
			});
		});
		describe("Element with visibility:hidden", () => {
			it("should be hidden", () => {
				expect(DOM.queryUnique(".invisible").hidden()).toBe(true);
			});
			it("should not be visible", () => {
				expect(DOM.queryUnique(".invisible").visible()).toBe(false);
			});
		});
		describe("Element with display other than none", () => {
			it("should not be hidden", () => {
				expect(DOM.queryUnique(".shown").hidden()).toBe(false);
			});
			it("should be visible", () => {
				expect(DOM.queryUnique(".shown").visible()).toBe(true);
			});
		});
		describe("Element with visibility:visible", () => {
			it("should not be hidden", () => {
				expect(DOM.queryUnique(".visible").hidden()).toBe(false);
			});
			it("should be visible", () => {
				expect(DOM.queryUnique(".visible").visible()).toBe(true);
			});
		});
	});
	describe("> Test cases for DOM.addEvent(), DOM.removeEvent(), DOM.triggerEvent()", () => {
		describe("Adding 2 resize events", () => {
			beforeEach(() => {
				DOM.addEvent(window, "resize", handleLoad);
				DOM.addEvent(window, "resize", handleLoad2);
				DOM.triggerEvent(window, "resize");
			});
			it("should result in 2 calls", () => {
				expect(eventCounter.resize).toBe(2);
			});
		});
		describe("Removing first resize event", () => {
			beforeEach(() => {
				DOM.removeEvent(window, "resize", handleLoad);
				DOM.triggerEvent(window, "resize");
			});
			it("should increase the counter only by 1", () => {
				expect(eventCounter.resize).toBe(3);
			});
		});
		describe("Removing second resize event", () => {
			beforeEach(() => {
				DOM.removeEvent(window, "resize", handleLoad2);
				DOM.triggerEvent(window, "resize");
			});
			it("should not increase the counter", () => {
				expect(eventCounter.resize).toBe(3);
			});
		});
	});
	describe("> Test cases for DOMElement.tagName", () => {
		describe("Getting the tagName of DOMElements", () => {
			it("should return the according tag name in upper case", () => {
				expect(DOM.queryUnique("body").tagName).toBe("BODY");
				expect(DOM.queryById("root").tagName).toBe("DIV");
			});
		});
	});
	describe("> Test cases for DOMElement.origNode", () => {
		describe("Getting the origNode from a DOMElement", () => {
			it("should equal to the original node", () => {
				expect(DOM.queryById("root").origNode).toBe(document.getElementById("root"));
				expect(DOM.queryById("root").origNode).not.toBe(document.querySelector("body"));
			});
		});
	});
	describe("> Test cases for DOMElement.height()", () => {
		describe("Retrieving the height from a 25px high element", () => {
			it("should return 25", () => {
				expect(DOM.queryUnique(".divWithHeight").height()).toBe(25);
			});
		});
		describe("Changing the height from 25px to 32px", () => {
			it("should return 32", () => {
				expect(DOM.queryUnique(".divWithHeight").height(32) instanceof DOMElement).toBe(true); // TODO Move to separate test case
				expect(DOM.queryUnique(".divWithHeight").height(32).height()).toBe(32);
			});
		});
	});
	describe("> Test cases for DOMElement.attr() and DOMElement.removeAttr()", () => {
		beforeEach(()=> {
			DOM.queryUnique(".divWithHeight").attr("test", "123");
		});
		describe("Adding the attribute test=123", () => {
			it("should return test=123", () => {
				expect(DOM.queryUnique(".divWithHeight").attr("test")).toBe("123");
			});
		});
		describe("Changing the attribute test from 123 to 456", () => {
			it("should return test=456", () => {
				expect(DOM.queryUnique(".divWithHeight").attr("test", "456").attr("test")).toBe("456");
			});
		});
		describe("Removing the attribute test", () => {
			it("should return null", () => {
				expect(DOM.queryUnique(".divWithHeight").removeAttr("test") instanceof DOMElement).toBe(true); // TODO Move to separate test case
				expect(DOM.queryUnique(".divWithHeight").removeAttr("test").attr("test")).toBeNull();
			});
		});
	});
});