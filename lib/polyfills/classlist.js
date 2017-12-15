/**
 * Element.prototype.classList for IE8/9, Safari.
 * @author    Kerem Güneş <k-gun@mail.com>
 * @copyright Released under the MIT License <https://opensource.org/licenses/MIT>
 * @version   1.2
 * @see       https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 */
;(function() {
	// Helpers.
	var trim = function(s) {
			return s.replace(/^\s+|\s+$/g, '');
		},
		regExp = function(name) {
			return new RegExp('(^|\\s+)'+ name +'(\\s+|$)');
		},
		forEach = function(list, fn, scope) {
			for (var i = 0; i < list.length; i++) {
				fn.call(scope, list[i]);
			}
		};

	/**
	 * Class list object with basic methods.
	 * @constructor
	 */
	function ClassList(element) {
		this.element = element;
	}

	ClassList.prototype = {
		/**
		 * @param {...String} names
		 */
		add: function(...names) {
			forEach(names, function(name) {
				if (!this.contains(name)) {
					this.element.className = trim(this.element.className +' '+ name);
				}
			}, this);
		},
		/**
		 * @param {...String} names
		 */
		remove: function(...names) {
			forEach(names, function(name) {
				this.element.className = trim(this.element.className.replace(regExp(name), ' '));
			}, this);
		},
		/**
		 * @param {String} name
		 */
		toggle: function(name) {
			return this.contains(name) ? (this.remove(name), false) : (this.add(name), true);
		},
		/**
		 * @param {String} name
		 */
		contains: function(name) {
			return regExp(name).test(this.element.className);
		},
		/**
		 * @param {number} index
		 */
		item: function(index) {
			return this.element.className.split(/\s+/)[index] || null;
		},
		/**
		 * @param {String} oldName
		 * @param {String} newName
		 */
		replace: function(oldName, newName) {
			this.remove(oldName), this.add(newName);
		}
	};

	// IE8/9, Safari
	// Remove this if statements to override native classList.
	if (!('classList' in Element.prototype)) {
		// Use this if statement to override native classList that does not have for example replace() method.
		// See browser compatibility: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#Browser_compatibility.
		// if (!('classList' in Element.prototype) ||
		//     !('classList' in Element.prototype && Element.prototype.classList.replace)) {
		Object.defineProperty(Element.prototype, 'classList', {
			get: function() {
				return new ClassList(this);
			}
		});
	}

	// For others replace() support.
	if (window.DOMTokenList && !DOMTokenList.prototype.replace) {
		DOMTokenList.prototype.replace = ClassList.prototype.replace;
	}
})();