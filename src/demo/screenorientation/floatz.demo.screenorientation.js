import DOM from "../../main/javascript/dom/floatz.dom.dom.js";
import {EVENT_DOMCONTENTLOADED} from "../../main/javascript/dom/floatz.dom.events.js";
import MediaQuery, {MEDIA_LANDSCAPE} from "../../main/javascript/util/floatz.util.mediaquery.js";
import ScreenOrientation, {ORIENTATION_LANDSCAPE, ORIENTATION_PORTRAIT} from "../../main/javascript/util/floatz.util.screenorientation.js";

DOM.addEvent(window, EVENT_DOMCONTENTLOADED, () => {
    let landscape = MediaQuery.match(MEDIA_LANDSCAPE);
    _adjustToOrientation(landscape ? ORIENTATION_LANDSCAPE : ORIENTATION_PORTRAIT);
});

ScreenOrientation.change((e) => {
    _adjustToOrientation(e.orientation)
});

function _adjustToOrientation(orientation) {
    DOM.queryUnique("h1").text(orientation);
    if(orientation === ORIENTATION_LANDSCAPE) {
        DOM.body().css("background-color", "yellow");
    } else {
        DOM.body().css("background-color", "orange");
    }
}