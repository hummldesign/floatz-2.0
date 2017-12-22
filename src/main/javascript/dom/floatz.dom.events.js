/**
 * Event enum.
 *
 * @type {Object}
 */
export const EventType = Object.freeze({
	ANIMATION_END: Symbol("animationend"),
	ANIMATION_ITERATION : Symbol("animationiteration"),
	ANIMATION_START : Symbol("animationstart"),
	DOM_CONTENT_LOADED: Symbol("DOMContentLoaded"),
	CLICK: Symbol("click"),
	RESIZE: Symbol("resize"),
	SCROLL: Symbol("scroll")
});

