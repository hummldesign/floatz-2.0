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
	describe("Given an _element with an id", () => {
		describe("When the _element is queried by its id", () => {
			it("Then an object of type DOMElement should be returned", () => {
				expect(DOM.queryById("root") instanceof DOMElement).toBeTruthy()
			});
			it("And its id should be as expected", () => {
				expect(DOM.queryById("root").origNode.id).toBe("root");
			});
		});
		describe("When the _element is queried by an invalid id", () => {
			it("Then null should be returned", () => {
				expect(DOM.queryById("invalidId")).toBeNull();
			});
		});
	});
	describe("Given 3 elements at different positions in the DOM", () => {
		describe("When they are queried by their common CSS class", () => {
			it("Then 3 objects of type DOMElement should be returned", () => {
				expect(DOM.query(".child").length).toBe(3);
				expect(DOM.query(".child")[0] instanceof DOMElement).toBeTruthy()
				expect(DOM.query(".child")[1] instanceof DOMElement).toBeTruthy()
				expect(DOM.query(".child")[2] instanceof DOMElement).toBeTruthy()
			});
		});
	});
	describe("Given 2 elements with the same CSS class in the context of an _element with an id", () => {
		describe("When they are queried in the context of the parent id", () => {
			it("Then 2 objects of type DOMElement should be returned", () => {
				expect(DOM.query("#root > .child").length).toBe(2);
				expect(DOM.query("#root > .child")[0] instanceof DOMElement).toBeTruthy()
				expect(DOM.query("#root > .child")[1] instanceof DOMElement).toBeTruthy()
			});
		});
		describe("When they are queried in the context the parent DOMElement", () => {
			it("Then 2 elements should be returned", () => {
				expect(DOM.query(".child", DOM.queryById("root")).length).toBe(2);
			});
		});
		describe("When they are queried in the context of the native parent _element", () => {
			it("The 2 elements should be returned", () => {
				expect(DOM.query(".child", document.getElementById("root")).length).toBe(2);
			});
		});
		describe("When they are queried in the context a string instead of an _element", () => {
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
	describe("Given an _element with an id", () => {
		describe("When the _element is queried uniquely", () => {
			it("Then an object of type DOMElement should be returned", () => {
				expect(DOM.queryUnique("#root") instanceof DOMElement).toBeTruthy()
			});
			it("And its id should be as expected", () => {
				expect(DOM.queryUnique("#root").origNode.id).toBe("root");
			});
		});
	});
	describe("Given multiple elements with the same CSS class", () => {
		describe("When an _element is queried uniquely", () => {
			it("Then only one object of type DOMElement should be returned", () => {
				expect(DOM.queryUnique(".child") instanceof DOMElement).toBeTruthy()
			});
			it("And its class name should be as expected", () => {
				expect(DOM.queryUnique(".child").origNode.className).toBe("child");
			});
		});
	});
	describe("Given different elements", () => {
		describe("When an _element is queried uniquely using an invalid CSS class", () => {
			it("Then null is returned", () => {
				expect(DOM.queryUnique(".invalidChild")).toBeNull();
			});
		});
	});
	describe("Given a window object", () => {
		describe("When it is checked if its a window", () => {
			it("Then true is returned", () => {
				expect(DOM.isWindow(window)).toBeTruthy()
			});
		});
	});
	describe("Given a non-window DOMElement", () => {
		describe("When it is checked if its a window", () => {
			it("Then false is returned", () => {
				expect(DOM.isWindow(DOM.queryById("root"))).toBeFalsy()
			});
		});
	});
	describe("Given a non-window native _element", () => {
		describe("When it is checked if its a window", () => {
			it("Then false is returned", () => {
				expect(DOM.isWindow(document.getElementById("root"))).toBeFalsy()
			});
		});
	});
	describe("Given a _element with display: none", () => {
		describe("When it is checked if its hidden", () => {
			it("Then true is returned", () => {
				expect(DOM.queryUnique(".hidden").hidden()).toBeTruthy()
			});
		});
		describe("When it is checked if its visible", () => {
			it("Then false is returned", () => {
				expect(DOM.queryUnique(".hidden").visible()).toBeFalsy()
			});
		});
	});
	describe("Given a _element with visibility: hidden", () => {
		describe("When it is checked if its hidden", () => {
			it("Then true is returned", () => {
				expect(DOM.queryUnique(".invisible").hidden()).toBeTruthy()
			});
		});
		describe("When it is checked if its visible", () => {
			it("Then false is returned", () => {
				expect(DOM.queryUnique(".invisible").visible()).toBeFalsy()
			});
		});
	});
	describe("Given a _element with display other than none", () => {
		describe("When it is checked if its hidden", () => {
			it("Then false is returned", () => {
				expect(DOM.queryUnique(".shown").hidden()).toBeFalsy()
			});
		});
		describe("When it is checked if its visible", () => {
			it("Then true is returned", () => {
				expect(DOM.queryUnique(".shown").visible()).toBeTruthy()
			});
		});
	});
	describe("Given a _element with visibility:visible", () => {
		describe("When it is checked if its hidden", () => {
			it("Then false is returned", () => {
				expect(DOM.queryUnique(".visible").hidden()).toBeFalsy()
			});
		});
		describe("When it is checked if its visible", () => {
			it("Then true is returned", () => {
				expect(DOM.queryUnique(".visible").visible()).toBeTruthy()
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

	describe("Given a BODY _element", () => {
		describe("When its queried", () => {
			it("Then the returned DOMElement tag name should be body", () => {
				expect(DOM.queryUnique("body").tagName).toBe("body");
			});
		});
	});
	describe("Given a DIV _element with a CSS id", () => {
		describe("When the _element is queried by its id", () => {
			it("Then the returned DOMElement tag name should be div", () => {
				expect(DOM.queryById("root").tagName).toBe("div");
			});
		});
	});
	describe("Given a DIV _element with a CSS id", () => {
		describe("When the _element is queried by its id", () => {
			it("Then the returned DOMElement orig node should equal to the native _element", () => {
				expect(DOM.queryById("root").origNode).toBe(document.getElementById("root"));
			});
		});
	});
	describe("Given a DOM _element with only one CSS class", () => {
		describe("When the _element is queried", () => {
			it("Then the DOMElement should have the expected CSS class", () => {
				expect(DOM.queryUnique(".one").hasClass("one")).toBeTruthy()
				expect(DOM.queryUnique(".one").hasClass("two")).toBeFalsy()
			});
		});
	});
	describe("Given a DOM _element with multiple CSS classes", () => {
		describe("When the _element is queried", () => {
			it("Then the DOMElement should have all the expected CSS classes", () => {
				expect(DOM.queryUnique(".one.two.three").hasClass("one")).toBeTruthy()
				expect(DOM.queryUnique(".one.two.three").hasClass("two")).toBeTruthy()
				expect(DOM.queryUnique(".one.two.three").hasClass("three")).toBeTruthy()
				expect(DOM.queryUnique(".one.two.three").hasClass("four")).toBeFalsy()
			});
		});
	});
	describe("Given an _element with a height of 25px", () => {
		describe("When the _element is queried", () => {
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
	describe("Given a DOM _element", () => {
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
	describe("Given a DOM _element", () => {
		describe("When the class test is added", () => {
			it("Then the DOMElement should have the class test", () => {
				expect(DOM.queryById("root").addClass("test").hasClass("test")).toBeTruthy()
			});
		});
		describe("When the class test2 is added", () => {
			it("Then the DOMElement should have the classes test and test2", () => {
				expect(DOM.queryById("root").addClass("test").hasClass("test")).toBeTruthy()
				expect(DOM.queryById("root").addClass("test2").hasClass("test2")).toBeTruthy()
			});
		});
		describe("When the class test2 is removed", () => {
			it("Then the DOMElement should have the class test but not test2", () => {
				expect(DOM.queryById("root").removeClass("test2").hasClass("test2")).toBeFalsy()
				expect(DOM.queryById("root").hasClass("test")).toBeTruthy()
			});
		});
		describe("When the class test is removed", () => {
			it("Then the DOMElement should have neither class test nor test2", () => {
				expect(DOM.queryById("root").removeClass("test").hasClass("test")).toBeFalsy();
				expect(DOM.queryById("root").hasClass("test2")).toBeFalsy()
			});
			it("And the DOMElement should have no empty class attribute", () => {
				expect(DOM.queryById("root").attr("class")).toBeNull();
			});
		});
	});
	describe("Given a DOM _element without a style attribute", () => {
		describe("When the style display: block is added", () => {
			it("The the attribute style should be display: block;", () => {
				expect(DOM.queryUnique(".one").css("display", "block").attr("style")).toBe("display: block;");
			});
		});
		describe("When the style float: left is added", () => {
			it("The the attribute style should be display: block;", () => {
				expect(DOM.queryUnique(".one").css("float", "left").attr("style")).toBe("display: block; float: left;");
			});
		})
		describe("When the style display is removed", () => {
			it("Then the attribute style should be float: left;", () => {
				expect(DOM.queryUnique(".one").css("display", null).attr("style")).toBe("float: left;");
			});
		});
		describe("When the style float is removed", () => {
			it("Then the attribute style should be null", () => {
				expect(DOM.queryUnique(".one").css("float", null).attr("style")).toBeNull();
			});
		});
	});
	describe("Given a DOM _element with display: inline and without any inline styles", () => {
		describe("When the _element is hidden", () => {
			it("Then the _element should be invisible", () => {
				expect(DOM.queryUnique(".inline").hide().hidden()).toBeTruthy()
			});
			it("And should have the custom attribute flz-prev-display: inline", () => {
				expect(DOM.queryUnique(".inline").attr("flz-prev-display")).toBe("inline");
			});
			it("And should have the inline style display: none", () => {
				expect(DOM.queryUnique(".inline").attr("style")).toBe("display: none;");
			});
		});
		describe("When the _element is shown", () => {
			it("Then the _element should be visible", () => {
				expect(DOM.queryUnique(".inline").show().visible()).toBeTruthy();
			});
			it("And should be an inline _element", () => {
				expect(DOM.queryUnique(".inline").css("display")).toBe("inline");
			});
			it("And should have no custom attribute flz-prev-display", () => {
				expect(DOM.queryUnique(".inline").attr("flz-prev-display")).toBeNull();
			});
			it("And should have no inline style", () => {
				expect(DOM.queryUnique(".inline").attr("style")).toBeNull();
			});
		});
	});
	describe("Given a DOM _element with display: none and without any inline styles", () => {
		describe("When the _element is shown", () => {
			it("Then the _element should be visible", () => {
				expect(DOM.queryUnique(".hidden").show().visible()).toBeTruthy()
			});
			it("And should have the custom attribute flz-prev-display: none", () => {
				expect(DOM.queryUnique(".hidden").attr("flz-prev-display")).toBe("none");
			});
			it("And should have the inline style display: block", () => {
				expect(DOM.queryUnique(".hidden").attr("style")).toBe("display: block;");
			});
		});
		describe("When the _element is hidden", () => {
			it("Then the _element should be invisible", () => {
				expect(DOM.queryUnique(".hidden").hide().visible()).toBeFalsy();
			});
			it("And should have no custom attribute flz-prev-display", () => {
				expect(DOM.queryUnique(".hidden").attr("flz-prev-display")).toBeNull();
			});
			it("And should have no inline style", () => {
				expect(DOM.queryUnique(".hidden").attr("style")).toBeNull();
			});
		});
	});
	describe("Given a DOM _element with display: block as inline style", () => {
		describe("When the _element is hidden", () => {
			it("Then the _element should be invisible", () => {
				expect(DOM.queryUnique(".inlineShown").hide().hidden()).toBeTruthy()
			});
			it("And should have the custom attribute flz-prev-inline-display: inline", () => {
				expect(DOM.queryUnique(".inlineShown").attr("flz-prev-inline-display")).toBe("block");
			});
			it("And should have the inline style display: none", () => {
				expect(DOM.queryUnique(".inlineShown").attr("style")).toBe("display: none;");
			});
		});
		describe("When the _element is shown", () => {
			it("Then the _element should be visible", () => {
				expect(DOM.queryUnique(".inlineShown").show().visible()).toBeTruthy();
			});
			it("And should be an inline _element", () => {
				expect(DOM.queryUnique(".inlineShown").css("display")).toBe("block");
			});
			it("And should have no custom attribute flz-prev-inline-display", () => {
				expect(DOM.queryUnique(".inlineShown").attr("flz-prev-inline-display")).toBeNull();
			});
			it("And should have inline style display: block", () => {
				expect(DOM.queryUnique(".inlineShown").attr("style")).toBe("display: block;");
			});
		});
	});
	describe("Given a DOM _element with display: none as inline style", () => {
		describe("When the _element is shown", () => {
			it("Then the _element should be visible", () => {
				expect(DOM.queryUnique(".inlineHidden").show().visible()).toBeTruthy()
			});
			it("And should have the custom attribute flz-prev-inline-display: none", () => {
				expect(DOM.queryUnique(".inlineHidden").attr("flz-prev-inline-display")).toBe("none");
			});
			it("And should have the inline style display: block", () => {
				expect(DOM.queryUnique(".inlineHidden").attr("style")).toBe("display: block;");
			});
		});
		describe("When the _element is hidden", () => {
			it("Then the _element should be invisible", () => {
				expect(DOM.queryUnique(".inlineHidden").hide().visible()).toBeFalsy();
			});
			it("And should have no custom attribute flz-prev-inline-display", () => {
				expect(DOM.queryUnique(".inlineHidden").attr("flz-prev-inline-display")).toBeNull();
			});
			it("And should have inline style display: none", () => {
				expect(DOM.queryUnique(".inlineHidden").attr("style")).toBe("display: none;");
			});
		});
	});
	describe("Given a DOM _element with display: none as inline style", () => {
		describe("When the _element is hidden", () => {
			it("Then the _element should stay invisible", () => {
				expect(DOM.queryUnique(".inlineHidden").hide().hidden()).toBeTruthy()
			});
			it("And should have no custom attribute flz-prev-inline-display", () => {
				expect(DOM.queryUnique(".inlineHidden").attr("flz-prev-inline-display")).toBeNull();
			});
		});
	});
	describe("Given a DOM _element with display: block as inline style", () => {
		describe("When the _element is shown", () => {
			it("Then the _element should stay visible", () => {
				expect(DOM.queryUnique(".inlineShown").show().visible()).toBeTruthy()
			});
			it("And should have no custom attribute flz-prev-inline-display", () => {
				expect(DOM.queryUnique(".inlineShown").attr("flz-prev-inline-display")).toBeNull();
			});
		});
	});
});
