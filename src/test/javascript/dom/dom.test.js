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
	describe("Given an element with an id", () => {
		describe("When the element is queried by its id", () => {
			it("Then an object of type DOMElement should be returned", () => {
				expect(DOM.queryById("root") instanceof DOMElement).toBe(true);
			});
			it("And its id should be as expected", () => {
				expect(DOM.queryById("root").origNode.id).toBe("root");
			});
		});
		describe("When the element is queried by an invalid id", () => {
			it("Then null should be returned", () => {
				expect(DOM.queryById("invalidId")).toBeNull();
			});
		});
	});
	describe("Given 3 elements at different positions in the DOM", () => {
		describe("When they are queried by their common CSS class", () => {
			it("Then 3 objects of type DOMElement should be returned", () => {
				expect(DOM.query(".child").length).toBe(3);
				expect(DOM.query(".child")[0] instanceof DOMElement).toBe(true);
				expect(DOM.query(".child")[1] instanceof DOMElement).toBe(true);
				expect(DOM.query(".child")[2] instanceof DOMElement).toBe(true);
			});
		});
	});
	describe("Given 2 elements with the same CSS class in the context of an element with an id", () => {
		describe("When they are queried in the context of the parent id", () => {
			it("Then 2 objects of type DOMElement should be returned", () => {
				expect(DOM.query("#root > .child").length).toBe(2);
				expect(DOM.query("#root > .child")[0] instanceof DOMElement).toBe(true);
				expect(DOM.query("#root > .child")[1] instanceof DOMElement).toBe(true);
			});
		});
		describe("When they are queried in the context the parent DOMElement", () => {
			it("Then 2 elements should be returned", () => {
				expect(DOM.query(".child", DOM.queryById("root")).length).toBe(2);
			});
		});
		describe("When they are queried in the context of the native parent element", () => {
			it("The 2 elements should be returned", () => {
				expect(DOM.query(".child", document.getElementById("root")).length).toBe(2);
			});
		});
		describe("When they are queried in the context a string instead of an element", () => {
			it("Then an empty array should be returned", () => {
				expect(DOM.query(".child", "#root").length).toBe(0);
			});
		});
	});
	describe("Given different elements", () => {
		describe("When they are queried using an invalid CSS class", () => {
			it("Then an empty array should be returned", () => {
				expect(DOM.query(".invalidChild").length).toBe(0);
			});
		});
	});
	describe("Given an element with an id", () => {
		describe("When the element is queried uniquely", () => {
			it("Then an object of type DOMElement should be returned", () => {
				expect(DOM.queryUnique("#root") instanceof DOMElement).toBe(true);
			});
			it("And its id should be as expected", () => {
				expect(DOM.queryUnique("#root").origNode.id).toBe("root");
			});
		});
	});
	describe("Given multiple elements with the same CSS class", () => {
		describe("When an element is queried uniquely", () => {
			it("Then only one object of type DOMElement should be returned", () => {
				expect(DOM.queryUnique(".child") instanceof DOMElement).toBe(true);
			});
			it("And its class name should be as expected", () => {
				expect(DOM.queryUnique(".child").origNode.className).toBe("child");
			});
		});
	});
	describe("Given different elements", () => {
		describe("When an element is queried uniquely using an invalid CSS class", () => {
			it("Then null is returned", () => {
				expect(DOM.queryUnique(".invalidChild")).toBeNull();
			});
		});
	});
	describe("Given a window object", () => {
		describe("When it is checked if its a window", () => {
			it("Then true is returned", () => {
				expect(DOM.isWindow(window)).toBe(true);
			});
		});
	});
	describe("Given a non-window DOMElement", () => {
		describe("When it is checked if its a window", () => {
			it("Then false is returned", () => {
				expect(DOM.isWindow(DOM.queryById("root"))).toBe(false);
			});
		});
	});
	describe("Given a non-window native element", () => {
		describe("When it is checked if its a window", () => {
			it("Then false is returned", () => {
				expect(DOM.isWindow(document.getElementById("root"))).toBe(false);
			});
		});
	});
	describe("Given a element with display: none", () => {
		describe("When it is checked if its hidden", () => {
			it("Then true is returned", () => {
				expect(DOM.queryUnique(".hidden").hidden()).toBe(true);
			});
		});
		describe("When it is checked if its visible", () => {
			it("Then false is returned", () => {
				expect(DOM.queryUnique(".hidden").visible()).toBe(false);
			});
		});
	});
	describe("Given a element with visibility: hidden", () => {
		describe("When it is checked if its hidden", () => {
			it("Then true is returned", () => {
				expect(DOM.queryUnique(".invisible").hidden()).toBe(true);
			});
		});
		describe("When it is checked if its visible", () => {
			it("Then false is returned", () => {
				expect(DOM.queryUnique(".invisible").visible()).toBe(false);
			});
		});
	});
	describe("Given a element with display other than none", () => {
		describe("When it is checked if its hidden", () => {
			it("Then false is returned", () => {
				expect(DOM.queryUnique(".shown").hidden()).toBe(false);
			});
		});
		describe("When it is checked if its visible", () => {
			it("Then true is returned", () => {
				expect(DOM.queryUnique(".shown").visible()).toBe(true);
			});
		});
	});
	describe("Given a element with visibility:visible", () => {
		describe("When it is checked if its hidden", () => {
			it("Then false is returned", () => {
				expect(DOM.queryUnique(".visible").hidden()).toBe(false);
			});
		});
		describe("When it is checked if its visible", () => {
			it("Then true is returned", () => {
				expect(DOM.queryUnique(".visible").visible()).toBe(true);
			});
		});
	});

	describe("Given a window object", () => {
		describe("When 2 resize handlers are added and the resize event is triggered", () => {
			beforeEach(() => {
				DOM.addEvent(window, "resize", handleLoad);
				DOM.addEvent(window, "resize", handleLoad2);
				DOM.triggerEvent(window, "resize");
			});
			it("Then 2 resize events should be fired", () => {
				expect(eventCounter.resize).toBe(2);
			});
		});
		describe("When the first resize event is removed and the resize event is triggered", () => {
			beforeEach(() => {
				DOM.removeEvent(window, "resize", handleLoad);
				DOM.triggerEvent(window, "resize");
			});
			it("The 1 resize event should be fired", () => {
				expect(eventCounter.resize).toBe(3);
			});

		})
		describe("When the second resize event is removed and the resize event is triggered", () => {
			beforeEach(() => {
				DOM.removeEvent(window, "resize", handleLoad2);
				DOM.triggerEvent(window, "resize");
			});
			it("The no resize event should be fired", () => {
				expect(eventCounter.resize).toBe(3);
			});

		})
	});

	describe("Given a BODY element", () => {
		describe("When its queried", () => {
			it("Then the returned DOMElement tag name should be BODY", () => {
				expect(DOM.queryUnique("body").tagName).toBe("BODY");
			});
		});
	});
	describe("Given a DIV element with a CSS id", () => {
		describe("When the element is queried by its id", () => {
			it("Then the returned DOMElement tag name should be DIV", () => {
				expect(DOM.queryById("root").tagName).toBe("DIV");
			});
		});
	});
	describe("Given a DIV element with a CSS id", () => {
		describe("When the element is queried by its id", () => {
			it("Then the returned DOMElement orig node should equal to the native element", () => {
				expect(DOM.queryById("root").origNode).toBe(document.getElementById("root"));
			});
		});
	});
	describe("Given a DOM element with only one CSS class", () => {
		describe("When the element is queried", () => {
			it("Then the DOMElement should have the expected CSS class", () => {
				expect(DOM.queryUnique(".one").hasClass("one")).toBe(true);
				expect(DOM.queryUnique(".one").hasClass("two")).toBe(false);
			});
		});
	});
	describe("Given a DOM element with multiple CSS classes", () => {
		describe("When the element is queried", () => {
			it("Then the DOMElement should have all the expected CSS classes", () => {
				expect(DOM.queryUnique(".one.two.three").hasClass("one")).toBe(true);
				expect(DOM.queryUnique(".one.two.three").hasClass("two")).toBe(true);
				expect(DOM.queryUnique(".one.two.three").hasClass("three")).toBe(true);
				expect(DOM.queryUnique(".one.two.three").hasClass("four")).toBe(false);
			});
		});
	});
	describe("Given an element with a height of 25px", () => {
		describe("When the element is queried", () => {
			it("Then the DOMElement should have a height of 25px", () => {
				expect(DOM.queryUnique(".divWithHeight").height()).toBe(25);
			});
		});
		describe("When the height is changed to 32px", () => {
			it("Then the DOMElement should have a height of 32px", () => {
				expect(DOM.queryUnique(".divWithHeight").height(32).height()).toBe(32);
			});
		});
	});
	describe("Given a DOM element", () => {
		describe("When the attribute test=123 is added", () => {
			beforeEach(()=> {
				DOM.queryUnique(".divWithHeight").attr("test", "123");
			});
			it("Then the DOMElement should have an attribute test with the value 123", () => {
				expect(DOM.queryUnique(".divWithHeight").attr("test")).toBe("123");
			});
		});
		describe("When the attribute is changed to value 456", () => {
			it("Then the DOMElement should have an attribute test with the value 456", () => {
				expect(DOM.queryUnique(".divWithHeight").attr("test", "456").attr("test")).toBe("456");
			});
		});
		describe("When the attribute is removed", () => {
			it("Then the DOMElement should have an no attribute test", () => {
				expect(DOM.queryUnique(".divWithHeight").removeAttr("test").attr("test")).toBeNull();
			});
		});
	});
});
