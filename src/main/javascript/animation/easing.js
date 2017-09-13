/**
 * Collection of easings for use with requestAnimationFrame.
 *
 * Inspired by:
 * http://easings.net/en#
 * http://robertpenner.com/easing/
 * https://github.com/jaxgeller/ez.js
 */
export default class Easing {

	/**
	 * http://easings.net/en#easeInSine
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInSine(time, start, distance, duration) {
		return -distance * Math.cos(time / duration * (Math.PI / 2)) + distance + start;
	}

	/**
	 * http://easings.net/en#easeOutSine
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeOutSine(time, start, distance, duration) {
		return distance * Math.sin(time / duration * (Math.PI / 2)) + start;
	}

	/**
	 * http://easings.net/en#easeInOutSine
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInOutSine(time, start, distance, duration) {
		return -distance / 2 * (Math.cos(Math.PI * time / duration) - 1) + start;
	}

	/**
	 * http://easings.net/en#easeInQuad
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInQuad(time, start, distance, duration) {
		return distance * (time /= duration) * time + start;
	}

	/**
	 * http://easings.net/en#easeOutQuad
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeOutQuad(time, start, distance, duration) {
		return -distance * (time /= duration) * (time - 2) + start;
	}

	/**
	 * http://easings.net/en#easeInOutQuad
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInOutQuad(time, start, distance, duration) {
		time /= duration / 2;
		if (time < 1) {
			return distance / 2 * time * time + start;
		}
		time--;
		return -distance / 2 * (time * (time - 2) - 1) + start;
	};

	/**
	 * http://easings.net/en#easeInCubic
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInCubic(time, start, distance, duration) {
		return distance * (time /= duration) * time * time + start;
	}

	/**
	 * http://easings.net/en#easeOutCubic
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeOutCubic(time, start, distance, duration) {
		return distance * ((time = time / duration - 1) * time * time + 1) + start;
	}

	/**
	 * http://easings.net/en#easeInOutCubic
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInOutCubic(time, start, distance, duration) {
		if ((time /= duration / 2) < 1) {
			return distance / 2 * time * time * time + start;
		}
		return distance / 2 * ((time -= 2) * time * time + 2) + start;
	}

	/**
	 * http://easings.net/en#easeInQuart
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInQuart(time, start, distance, duration) {
		return distance * (time /= duration) * time * time * time + start;
	}

	/**
	 * http://easings.net/en#easeOutQuart
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeOutQuart(time, start, distance, duration) {
		return -distance * ((time = time / duration - 1) * time * time * time - 1) + start;
	}

	/**
	 * http://easings.net/en#easeInOutQuart
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInOutQuart(time, start, distance, duration) {
		if ((time /= duration / 2) < 1) {
			return distance / 2 * time * time * time * time + start;
		}
		return -distance / 2 * ((time -= 2) * time * time * time - 2) + start;
	}

	/**
	 * http://easings.net/en#easeInQuint
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInQuint(time, start, distance, duration) {
		return distance * (time /= duration) * time * time * time * time + start;
	}

	/**
	 * http://easings.net/en#easeOutQuint
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeOutQuint(time, start, distance, duration) {
		return distance * ((time = time / duration - 1) * time * time * time * time + 1) + start;
	}

	/**
	 * http://easings.net/en#easeInOutQuint
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInOutQuint(time, start, distance, duration) {
		if ((time /= duration / 2) < 1) {
			return distance / 2 * time * time * time * time * time + start;
		}
		return distance / 2 * ((time -= 2) * time * time * time * time + 2) + start;
	}

	/**
	 * http://easings.net/en#easeInExpo
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInExpo(time, start, distance, duration) {
		if (time === 0) {
			return start;
		}
		return distance * Math.pow(2, 10 * (time / duration - 1)) + start;
	}

	/**
	 * http://easings.net/en#easeOutExpo
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeOutExpo(time, start, distance, duration) {
		if (time === duration) {
			return start + distance;
		}
		return distance * (-Math.pow(2, -10 * time / duration) + 1) + start;
	}

	/**
	 * http://easings.net/en#easeInOutExpo
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInOutExpo(time, start, distance, duration) {
		if (time === 0) {
			return start;
		}
		if (time === duration) {
			return start + distance;
		}
		if ((time /= duration / 2) < 1) {
			return distance / 2 * Math.pow(2, 10 * (time - 1)) + start;
		}
		return distance / 2 * (-Math.pow(2, -10 * --time) + 2) + start;
	}

	/**
	 * http://easings.net/en#easeInCirc
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInCirc(time, start, distance, duration) {
		return -distance * (Math.sqrt(1 - (time /= duration) * time) - 1) + start;
	}

	/**
	 * http://easings.net/en#easeOutCirc
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeOutCirc(time, start, distance, duration) {
		return distance * Math.sqrt(1 - (time = time / duration - 1) * time) + start;
	}

	/**
	 * http://easings.net/en#easeInOutCirc
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInOutCirc(time, start, distance, duration) {
		if ((time /= duration / 2) < 1) {
			return -distance / 2 * (Math.sqrt(1 - time * time) - 1) + start;
		}
		return distance / 2 * (Math.sqrt(1 - (time -= 2) * time) + 1) + start;
	}

	/**
	 * http://easings.net/en#easeInBack
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @param {number} overshoot Default is 1.70158 (which is 10%)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInBack(time, start, distance, duration, overshoot = 1.70158) {
		return distance * (time /= duration) * time * ((overshoot + 1) * time - overshoot) + start;
	}

	/**
	 * http://easings.net/en#easeOutBack
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @param {number} overshoot Default is 1.70158 (which is 10%)
	 * @returns {number} Next scroll position (px)
	 */
	static easeOutBack(time, start, distance, duration, overshoot = 1.70158) {
		return distance * ((time = time / duration - 1) * time * ((overshoot + 1) * time + overshoot) + 1) + start;
	}

	/**
	 * http://easings.net/en#easeInOutBack
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @param {number} overshoot Default is 1.70158 (which is 10%)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInOutBack(time, start, distance, duration, overshoot = 1.70158) {
		if ((time /= duration / 2) < 1) {
			return distance / 2 * (time * time * (((overshoot *= (1.525)) + 1) * time - overshoot)) + start;
		}
		return distance / 2 * ((time -= 2) * time * (((overshoot *= (1.525)) + 1) * time + overshoot) + 2) + start;
	}

	/**
	 * http://easings.net/en#easeInElastic
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInElastic(time, start, distance, duration) {
		let overshoot = 1.70158;
		let period = 0;
		let amplitude = distance;
		if (time === 0) {
			return start;
		}
		if ((time /= duration) === 1) {
			return start + distance;
		}
		if (!period) {
			period = duration * .3;
		}

		if (amplitude < Math.abs(distance)) {
			amplitude = distance;
			overshoot = period / 4;
		}
		else {
			overshoot = period / (2 * Math.PI) * Math.asin(distance / amplitude);
		}
		return -(amplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin((time * duration - overshoot) *
			(2 * Math.PI) / period)) + start;
	}

	/**
	 * http://easings.net/en#easeOutElastic
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeOutElastic(time, start, distance, duration) {
		let overshoot = 1.70158;
		let period = 0;
		let amplitude = distance;
		if (time === 0) {
			return start;
		}
		if ((time /= duration) === 1) {
			return start + distance;
		}
		if (!period) {
			period = duration * .3;
		}

		if (amplitude < Math.abs(distance)) {
			amplitude = distance;
			overshoot = period / 4;
		}
		else {
			overshoot = period / (2 * Math.PI) * Math.asin(distance / amplitude);
		}
		return amplitude * Math.pow(2, -10 * time) * Math.sin((time * duration - overshoot) *
			(2 * Math.PI) / period) + distance + start;
	}

	/**
	 * http://easings.net/en#easeInOutElastic
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInOutElastic(time, start, distance, duration) {
		let overshoot = 1.70158;
		let period = 0;
		let amplitude = distance;
		if (time === 0) {
			return start;
		}
		if ((time /= duration / 2) === 2) {
			return start + distance;
		}
		if (!period) {
			period = duration * (.3 * 1.5);
		}

		if (amplitude < Math.abs(distance)) {
			amplitude = distance;
			overshoot = period / 4;
		}
		else {
			overshoot = period / (2 * Math.PI) * Math.asin(distance / amplitude);
		}
		if (time < 1) {
			return -.5 * (amplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin((time * duration - overshoot) *
				(2 * Math.PI) / period)) + start;
		}
		return amplitude * Math.pow(2, -10 * (time -= 1)) * Math.sin((time * duration - overshoot) *
			(2 * Math.PI) / period) * .5 + distance + start;
	}

	/**
	 * http://easings.net/en#easeInBounce
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInBounce(time, start, distance, duration) {
		return distance - Easing.easeOutBounce(duration - time, 0, distance, duration) + start;
	}

	/**
	 * http://easings.net/en#easeOutBounce
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeOutBounce(time, start, distance, duration) {
		if ((time /= duration) < (1 / 2.75)) {
			return distance * (7.5625 * time * time) + start;

		} else if (time < (2 / 2.75)) {
			return distance * (7.5625 * (time -= (1.5 / 2.75)) * time + .75) + start;

		} else if (time < (2.5 / 2.75)) {
			return distance * (7.5625 * (time -= (2.25 / 2.75)) * time + .9375) + start;

		} else {
			return distance * (7.5625 * (time -= (2.625 / 2.75)) * time + .984375) + start;
		}
	}

	/**
	 * http://easings.net/en#easeInOutBounce
	 *
	 * @param {number} time Time elapsed (ms)
	 * @param {number} start Start position (px)
	 * @param {number} distance Distance of scroll (px)
	 * @param {number} duration Scroll _duration (ms)
	 * @returns {number} Next scroll position (px)
	 */
	static easeInOutBounce(time, start, distance, duration) {
		if (time < duration / 2) {
			return Easing.easeInBounce(time * 2, 0, distance, duration) * .5 + start;
		}
		return Easing.easeOutBounce(time * 2 - duration, 0, distance, duration) * .5 + distance * .5 + start;
	}
}
