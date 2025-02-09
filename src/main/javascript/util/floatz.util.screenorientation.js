import {MEDIA_LANDSCAPE} from "./floatz.util.mediaquery.js";

export const ORIENTATION_LANDSCAPE = "landscape";
export const ORIENTATION_PORTRAIT = "portrait";

/**
 * Utility to detect screen orientation changes.
 * Provides backwards compatibility in case screen.orientation is not supported.
 */
export default class ScreenOrientation {

    /**
     * Change event to listen to
     * @param fn Callback function
     */
    static change(fn) {
        if(screen.orientation) {
            screen.orientation.addEventListener("change", () => {
                // console.log(screen.orientation.type);
                fn({"orientation": screen.orientation.type.startsWith(ORIENTATION_LANDSCAPE) ? ORIENTATION_LANDSCAPE : ORIENTATION_PORTRAIT});
            });
        } else {
            let _mediaQuery = window.matchMedia(MEDIA_LANDSCAPE);
            _mediaQuery.addEventListener("change", (event) => {
                fn({"orientation": event.matches ? ORIENTATION_LANDSCAPE: ORIENTATION_PORTRAIT});
            });
        }
    }
}