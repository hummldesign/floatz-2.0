import DOM from "../../dom/floatz.dom.dom.js";
import MediaQuery from "../../util/floatz.util.mediaquery.js";
import {MEDIA_SIZE_GTE_L} from "../../util/floatz.util.mediaquery.js";
import {DOMElement} from "../../dom/floatz.dom.dom.js";
import {ScrollPlugin} from "../floatz.scroll.scroller.js";
import {SCROLL_EVENT_BEFORENAVGIATE} from "../floatz.scroll.scroller.js";
import {EVENT_CLICK, EVENT_RESIZE, EVENT_TOUCHSTART} from "../../dom/floatz.dom.events.js";

/**
 * Constants
 */
const ANIMATE_GLASS_FADEIN = "flz-animate-glass-fadein";
const ANIMATE_GLASS_FADEOUT = "flz-animate-glass-fadeout";
const ANIMATE_SLIDEINLEFT = "flz-animate-slideinleft";
const ANIMATE_SLIDEOUTLEFT = "flz-animate-slideoutleft";
const DIALOG_GLASS = "flz-dialog-glass";
const TAG_BODY = "BODY";
const LOG_PREFIX = "floatz | ScrollPopupMenuPlugin | ";

/**
 * Responsive popup menu plugin.
 *
 * FIXME: Add new DialogGlass instead of custom implementation
 *
 */
export class ScrollPopupMenuPlugin extends ScrollPlugin {

    /**
     * Constructor.
     *
     * @param options Options
     */
    constructor(options = {}) {
        super(options);

        // Default options
        this.options().headerSelector = options.headerSelector || "#header"; // FIXME
        this.options().menuSelector = options.menuSelector || "#header .flz-nav-list"; // FIXME
        this.options().menuClass = options.menuClass || "flz-nav-list";
        this.options().responsiveMenuClass = options.responsiveMenuClass || "flz-nav-vmenu";
        this.options().menuIconSelector = options.menuIconSelector || ".flz-nav-menu-icon";
        this.options().closeMenuIcon = options.closeMenuIcon || ".flz-icon-menu-close";
        this.options().openMenuIcon = options.openMenuIcon || ".flz-icon-menu-open";
        this.options().slideInAnimation = options.slideInAnimation || ANIMATE_SLIDEINLEFT;
        this.options().slideOutAnimation = options.slideOutAnimation || ANIMATE_SLIDEOUTLEFT;
        this.options().fadeInGlassAnimation = options.fadeInGlassAnimation || ANIMATE_GLASS_FADEIN;
        this.options().fadeOutGlassAnimation = options.fadeOutGlassAnimation || ANIMATE_GLASS_FADEOUT;

        this._body = DOM.queryUnique(TAG_BODY);
        this._header = DOM.queryUnique(this.options().headerSelector);
        this._menu = DOM.queryUnique(this.options().menuSelector);
        this._menuIcon = DOM.queryUnique(this.options().menuIconSelector);
        this._header_z_index = null;
        this._resizeHandler = null;
        this._showHandlers = [];
        this._hideHandlers = [];

        // Open/close popup menu
        this._menuIcon.addEvent(EVENT_CLICK, (e) => {
            e.stopPropagation();
            if (this._menuIcon.hasClass(this.options().openMenuIcon)) {
                this._show();
            } else {
                this._hide();
            }
        });
    }

    /**
     * @override
     */
    scroller(scroller) {
        let _scroller = super.scroller(scroller);
        if (scroller) {
            // Add custom event handler
            DOM.addEvent(scroller.container(), SCROLL_EVENT_BEFORENAVGIATE, () => {
                this._hide();
            });
        }

        return _scroller;
    }

    /**
     * Get body.
     *
     * @returns {DOMElement}
     */
    body() {
        return this._body;
    }

    /**
     * Get menu.
     *
     * @returns {DOMElement|*}
     */
    menu() {
        return this._menu;
    }

    /**
     * Get menu icon.
     *
     * @returns {DOMElement|*}
     */
    menuIcon() {
        return this._menuIcon;
    }

    /**
     * Handler that will be called after the popup menu has been shown.
     *
     * @param handler Handler
     * @returns {ScrollPopupMenuPlugin} Plugin for chaining
     */
    onShow(handler) {
        this._showHandlers.push(() => {
            handler(this)
        });
        return this;
    }

    /**
     * Handler that will be called after the popup menu has been closed.
     *
     * @param handler Handler
     * @returns {ScrollPopupMenuPlugin} Plugin for chaining
     */
    onHide(handler) {
        this._hideHandlers.push(() => {
            handler(this)
        });
        return this;
    }

    /**
     * Open menu.
     *
     * @param finishHandler Handler called when menu animation is finished
     */
    openMenu(finishHandler) {
        this._resizeHandler = () => {
            // Remove menu and glass in case that viewpoint gets larger
            if (MediaQuery.match(MEDIA_SIZE_GTE_L)) { // FIXME
                if (this._menuIcon.hasClass(this.options().closeMenuIcon)) {
                    this._hide();
                }
            }
        };
        DOM.addEvent(window, EVENT_RESIZE, this._resizeHandler);

        // console.debug(LOG_PREFIX + "Opening menu");
        this.menuIcon().replaceClass(this.options().openMenuIcon, this.options().closeMenuIcon);
        this.menu()
            .replaceClass(this.options().menuClass, this.options().responsiveMenuClass)
            .animate()
            .end(() => {
                finishHandler();
            })
        ;
        this.menu().addClass(this.options().slideInAnimation);
    }

    /**
     * Close menu.
     */
    closeMenu() {
        if (this.menu().hasClass(this.options().slideInAnimation)) {
            this.menu().animate()
                .end(() => {
                    this.menu()
                        .removeClass(this.options().slideOutAnimation)
                        .replaceClass(this.options().responsiveMenuClass, this.options().menuClass)
                    ;
                    this._header.css("z-index", this._header_z_index);
                    this._header_z_index = null;
                })
                .trigger(() => {
                    // console.debug(LOG_PREFIX + "Closing menu");
                    this.menu().replaceClass(this.options().slideInAnimation, this.options().slideOutAnimation);
                    this.menuIcon().replaceClass(this.options().closeMenuIcon, this.options().openMenuIcon);
                })
            ;
        }
    }

    /**
     * Show glass overlay.
     */
    showGlass() {
        // console.debug(LOG_PREFIX + "Showing glass");
        this.body()
            .addClass(DIALOG_GLASS, this.options().fadeInGlassAnimation)
            .addEvent(EVENT_CLICK, (e) => {
                this._handleGlassClick(e)
            })
            .addEvent(EVENT_TOUCHSTART, (e) => {
                this._handleGlassClick(e)
            })
        ;
    }

    /**
     * Hide glass overlay.
     */
    hideGlass() {
        if (this.body().hasClass(this.options().fadeInGlassAnimation)) {
            this.body().animate()
                .end(() => {
                    this.body().removeClass(this.options().fadeOutGlassAnimation, DIALOG_GLASS);
                    DOM.removeEvent(window, EVENT_RESIZE, this._resizeHandler);
                })
                .trigger(() => {
                    // console.debug(LOG_PREFIX + "Hiding glass");
                    this.body()
                        .replaceClass(this.options().fadeInGlassAnimation, this.options().fadeOutGlassAnimation)
                        .removeEvent(EVENT_CLICK, this._handleGlassClick)
                        .removeEvent(EVENT_TOUCHSTART, this._handleGlassClick)

                })
            ;
        }
    }

    /**
     * Show glass and open menu.
     * @private
     */
    _show() {
        this.body().animate()
            .end(() => {
                this.openMenu(() => {
                    this._showHandlers.forEach((handler) => {
                        handler(this);
                    });
                });
            })
        ;

        // Switch z-index of header before glass fades in (to avoid flipping logo in case header is fixed)
        this._header_z_index = this._header.css("z-index");
        this._header.css("z-index", "2");

        // Show glass
        this.showGlass(); // Trigger animation
    }

    /**
     * Close menu and hide glass.
     * @private
     */
    _hide() {
        this.closeMenu();
        this.hideGlass();
        this._hideHandlers.forEach((handler) => {
            handler(this);
        });
    }

    /**
     * Handle click on glass.
     *
     * @param e Event
     * @private
     */
    _handleGlassClick(e) {
        if (e.target.tagName.toUpperCase() === TAG_BODY) {
            this._hide();
        }
    }
}
