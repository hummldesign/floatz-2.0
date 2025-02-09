import DOM from "../../main/javascript/dom/floatz.dom.dom.js";
import {EVENT_CLICK, EVENT_DOMCONTENTLOADED} from "../../main/javascript/dom/floatz.dom.events.js";
import MediaQuery, {MEDIA_LANDSCAPE} from "../../main/javascript/util/floatz.util.mediaquery.js";
import ScreenOrientation, {ORIENTATION_LANDSCAPE, ORIENTATION_PORTRAIT} from "../../main/javascript/util/floatz.util.screenorientation.js";
import {Dialog} from "../../main/javascript/dialog/floatz.dialog.dialog.js";

let _dialog;

DOM.addEvent(window, EVENT_DOMCONTENTLOADED, () => {
    DOM.queryUnique("#openDialog").addEvent(EVENT_CLICK, (e) => {
        _dialog = new Dialog();
        _dialog.open("dialog.html", (e) => {
        });
    });
});