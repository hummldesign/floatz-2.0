import DOM from "../../main/javascript/dom/floatz.dom.dom.js";
import {EVENT_CLICK, EVENT_DOMCONTENTLOADED} from "../../main/javascript/dom/floatz.dom.events.js";
import {Dialog} from "../../main/javascript/dialog/floatz.dialog.dialog.js";

let _dialog;

DOM.addEvent(window, EVENT_DOMCONTENTLOADED, () => {
    DOM.queryUnique("#openDialog").addEvent(EVENT_CLICK, (e) => {
        _dialog = new Dialog();
        _dialog.open("dialog.html", (e) => {
            DOM.queryUnique("#dialogButtonClose").addEvent(EVENT_CLICK, (e) => {
                console.log("close");
                _dialog.close();
            });
        });
    });
});