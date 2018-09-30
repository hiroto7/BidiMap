(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bidimap.ts":
/*!************************!*\
  !*** ./src/bidimap.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class DualBidiMap {
    constructor(entries) {
        this[Symbol.toStringTag] = 'Map';
        this.xToY = new Map();
        this.yToX = new Map();
        if (entries !== null && entries !== undefined) {
            for (const [key, value] of entries) {
                this.set(key, value);
            }
        }
    }
    inverse() {
        return new DualBidiMap(this.yToX);
    }
    dedupe() {
        return this.inverse().inverse();
    }
    clear() {
        this.xToY.clear();
        this.yToX.clear();
    }
    delete(key) {
        if (this.xToY.has(key)) {
            const value = this.xToY.get(key);
            if (this.yToX.has(value) && this.yToX.get(value) === key) {
                this.yToX.delete(value);
            }
        }
        return this.xToY.delete(key);
    }
    forEach(callbackfn, thisArg) {
        this.forEach(callbackfn, thisArg);
    }
    get(key) {
        return this.xToY.get(key);
    }
    has(key) {
        return this.xToY.has(key);
    }
    set(key, value) {
        this.xToY.set(key, value);
        this.yToX.set(value, key);
        return this;
    }
    get size() {
        return this.xToY.size;
    }
    [Symbol.iterator]() {
        return this.xToY[Symbol.iterator]();
    }
    entries() {
        return this.xToY.entries();
    }
    keys() {
        return this.xToY.keys();
    }
    values() {
        return this.xToY.values();
    }
    toJSON() {
        return this.xToY.toJSON();
    }
}
exports.DualBidiMap = DualBidiMap;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var bidimap_1 = __webpack_require__(/*! ./bidimap */ "./src/bidimap.ts");
exports.DualBidiMap = bidimap_1.DualBidiMap;
var multibidimap_1 = __webpack_require__(/*! ./multibidimap */ "./src/multibidimap.ts");
exports.DualMultiBidiMap = multibidimap_1.DualMultiBidiMap;


/***/ }),

/***/ "./src/multibidimap.ts":
/*!*****************************!*\
  !*** ./src/multibidimap.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const bidimap_1 = __webpack_require__(/*! ./bidimap */ "./src/bidimap.ts");
class DualMultiBidiMap {
    constructor(entries) {
        this[Symbol.toStringTag] = 'Map';
        this.bidimap = new bidimap_1.DualBidiMap();
        this.xToYs = new Map();
        this.yToXs = new Map();
        if (entries !== null && entries !== undefined) {
            for (const [key, value] of entries) {
                this.set(key, value);
            }
        }
    }
    delete(...args) {
        function deleteAMAP(map, key, value, values0) {
            if (map.has(key)) {
                const values = values0 || map.get(key);
                values.delete(value);
                if (values.size === 0) {
                    map.delete(key);
                }
            }
        }
        const key = args[0];
        switch (args.length) {
            case 1:
                if (this.xToYs.has(key)) {
                    const values = this.xToYs.get(key);
                    for (const value of values) {
                        if (values.has(value) && this.yToXs.has(value)) {
                            deleteAMAP(this.xToYs, key, value, values);
                            deleteAMAP(this.yToXs, value, key);
                        }
                    }
                }
                return this.bidimap.delete(key);
            case 2:
                const value = args[1];
                if (this.xToYs.has(key)) {
                    if (this.bidimap.has(key) && this.bidimap.get(key) === value) {
                        this.bidimap.delete(key);
                    }
                    const values = this.xToYs.get(key);
                    if (values.has(value) && this.yToXs.has(value)) {
                        deleteAMAP(this.xToYs, key, value, values);
                        deleteAMAP(this.yToXs, value, key);
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
        }
    }
    hasAny(key) {
        return this.xToYs.has(key) &&
            this.xToYs.get(key).size > 0;
    }
    has(...args) {
        const key = args[0];
        switch (args.length) {
            case 1:
                return this.bidimap.has(key);
            case 2:
                const value = args[1];
                if (this.xToYs.has(key)) {
                    const values = this.xToYs.get(key);
                    return values.has(value);
                }
                else {
                    return false;
                }
        }
    }
    getAll(key) {
        if (this.xToYs.has(key)) {
            const values = this.xToYs.get(key);
            return values[Symbol.iterator]();
        }
        else {
            const set = new Set();
            return set[Symbol.iterator]();
        }
    }
    inverse() {
        const multibidimap = new DualMultiBidiMap();
        multibidimap.bidimap = this.bidimap.inverse();
        multibidimap.xToYs = this.yToXs;
        multibidimap.yToXs = this.xToYs;
        return multibidimap;
    }
    dedupe() {
        const multibidimap = new DualMultiBidiMap();
        multibidimap.bidimap = this.bidimap.inverse().inverse();
        multibidimap.xToYs = this.xToYs;
        multibidimap.yToXs = this.yToXs;
        return multibidimap;
    }
    clear() {
        this.bidimap.clear();
        this.xToYs.clear();
        this.yToXs.clear();
    }
    forEach(callbackfn, thisArg) {
        this.forEach(callbackfn, thisArg);
    }
    get(key) {
        return this.bidimap.get(key);
    }
    set(key, value) {
        function addSafely(map, key, value) {
            if (map.has(key)) {
                const values = map.get(key);
                values.add(value);
            }
            else {
                map.set(key, new Set([value]));
            }
        }
        this.bidimap.set(key, value);
        addSafely(this.xToYs, key, value);
        addSafely(this.yToXs, value, key);
        return this;
    }
    get size() {
        return this.bidimap.size;
    }
    ;
    [Symbol.iterator]() {
        return this.bidimap[Symbol.iterator]();
    }
    entries() {
        return this.bidimap.entries();
    }
    keys() {
        return this.bidimap.keys();
    }
    values() {
        return this.bidimap.values();
    }
    toJSON() {
        return this.bidimap.toJSON();
    }
}
exports.DualMultiBidiMap = DualMultiBidiMap;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvYmlkaW1hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL211bHRpYmlkaW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdEVBLE1BQWEsV0FBVztJQUl0QixZQUFZLE9BQWlDO1FBdURwQyxLQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBVSxLQUFLLENBQUM7UUF0RDNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQVEsQ0FBQztR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TztRQUNMLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMvQixDQUFDO0NBQ0Y7QUF6S0QsNENBeUtDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImV4cG9ydCBpbnRlcmZhY2UgUmVhZG9ubHlCaWRpTWFwPEssIFY+IGV4dGVuZHMgUmVhZG9ubHlNYXA8SywgVj4ge1xuICBpbnZlcnNlKCk6IFJlYWRvbmx5QmlkaU1hcDxWLCBLPjtcbiAgZGVkdXBlKCk6IFJlYWRvbmx5QmlkaU1hcDxLLCBWPjtcbiAgZm9yRWFjaChjYWxsYmFja2ZuOiAodmFsdWU6IFYsIGtleTogSywgbWFwOiBSZWFkb25seUJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJpZGlNYXA8SywgVj4gZXh0ZW5kcyBSZWFkb25seUJpZGlNYXA8SywgVj4sIE1hcDxLLCBWPiB7XG4gIGludmVyc2UoKTogQmlkaU1hcDxWLCBLPjtcbiAgZGVkdXBlKCk6IEJpZGlNYXA8SywgVj47XG4gIGZvckVhY2goY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBrZXk6IEssIG1hcDogQmlkaU1hcDxLLCBWPikgPT4gdm9pZCwgdGhpc0FyZz86IGFueSk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBEdWFsQmlkaU1hcDxLLCBWPiBpbXBsZW1lbnRzIEJpZGlNYXA8SywgVj4ge1xuICBwcml2YXRlIHhUb1k6IE1hcDxLLCBWPjtcbiAgcHJpdmF0ZSB5VG9YOiBNYXA8ViwgSz47XG5cbiAgY29uc3RydWN0b3IoZW50cmllcz86IEl0ZXJhYmxlPFtLLCBWXT4gfCBudWxsKSB7XG4gICAgdGhpcy54VG9ZID0gbmV3IE1hcDxLLCBWPigpO1xuICAgIHRoaXMueVRvWCA9IG5ldyBNYXA8ViwgSz4oKTtcbiAgICBpZiAoZW50cmllcyAhPT0gbnVsbCAmJiBlbnRyaWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGVudHJpZXMpIHtcbiAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW52ZXJzZSgpOiBCaWRpTWFwPFYsIEs+IHtcbiAgICByZXR1cm4gbmV3IER1YWxCaWRpTWFwPFYsIEs+KHRoaXMueVRvWCk7XG4gIH1cblxuICBkZWR1cGUoKTogQmlkaU1hcDxLLCBWPiB7XG4gICAgcmV0dXJuIHRoaXMuaW52ZXJzZSgpLmludmVyc2UoKTtcbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMueFRvWS5jbGVhcigpO1xuICAgIHRoaXMueVRvWC5jbGVhcigpO1xuICB9XG5cbiAgZGVsZXRlKGtleTogSyk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnhUb1kuaGFzKGtleSkpIHtcbiAgICAgIGNvbnN0IHZhbHVlOiBWID0gdGhpcy54VG9ZLmdldChrZXkpITtcbiAgICAgIGlmICh0aGlzLnlUb1guaGFzKHZhbHVlKSAmJiB0aGlzLnlUb1guZ2V0KHZhbHVlKSA9PT0ga2V5KSB7XG4gICAgICAgIHRoaXMueVRvWC5kZWxldGUodmFsdWUhKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMueFRvWS5kZWxldGUoa2V5KTtcbiAgfVxuXG4gIGZvckVhY2goY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBrZXk6IEssIG1hcDogQmlkaU1hcDxLLCBWPikgPT4gdm9pZCwgdGhpc0FyZz86IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnKTtcbiAgfVxuXG4gIGdldChrZXk6IEspOiBWIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy54VG9ZLmdldChrZXkpO1xuICB9XG5cbiAgaGFzKGtleTogSyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnhUb1kuaGFzKGtleSk7XG4gIH1cblxuICBzZXQoa2V5OiBLLCB2YWx1ZTogVik6IHRoaXMge1xuICAgIHRoaXMueFRvWS5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgdGhpcy55VG9YLnNldCh2YWx1ZSwga2V5KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS5zaXplO1xuICB9XG5cbiAgcmVhZG9ubHkgW1N5bWJvbC50b1N0cmluZ1RhZ106ICdNYXAnID0gJ01hcCc7XG5cbiAgW1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmFibGVJdGVyYXRvcjxbSywgVl0+IHtcbiAgICByZXR1cm4gdGhpcy54VG9ZW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgfVxuXG4gIGVudHJpZXMoKTogSXRlcmFibGVJdGVyYXRvcjxbSywgVl0+IHtcbiAgICByZXR1cm4gdGhpcy54VG9ZLmVudHJpZXMoKTtcbiAgfVxuXG4gIGtleXMoKTogSXRlcmFibGVJdGVyYXRvcjxLPiB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS5rZXlzKCk7XG4gIH1cblxuICB2YWx1ZXMoKTogSXRlcmFibGVJdGVyYXRvcjxWPiB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS52YWx1ZXMoKTtcbiAgfVxuXG4gIHRvSlNPTigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnhUb1kudG9KU09OKCk7XG4gIH1cbn1cbiIsImV4cG9ydCB7IFJlYWRvbmx5QmlkaU1hcCwgQmlkaU1hcCwgRHVhbEJpZGlNYXAgfSBmcm9tICcuL2JpZGltYXAnO1xuZXhwb3J0IHsgUmVhZG9ubHlNdWx0aUJpZGlNYXAsIE11bHRpQmlkaU1hcCwgRHVhbE11bHRpQmlkaU1hcCB9IGZyb20gJy4vbXVsdGliaWRpbWFwJzsiLCJpbXBvcnQgeyBSZWFkb25seUJpZGlNYXAsIEJpZGlNYXAsIER1YWxCaWRpTWFwIH0gZnJvbSAnLi9iaWRpbWFwJztcblxuZXhwb3J0IGludGVyZmFjZSBSZWFkb25seU11bHRpQmlkaU1hcDxLLCBWPiBleHRlbmRzIFJlYWRvbmx5QmlkaU1hcDxLLCBWPiB7XG4gIGhhc0FueShrZXk6IEspOiBib29sZWFuO1xuICBoYXMoa2V5OiBLLCB2YWx1ZT86IFYpOiBib29sZWFuO1xuICBnZXRBbGwoa2V5OiBLKTogSXRlcmFibGVJdGVyYXRvcjxWPjtcbiAgaW52ZXJzZSgpOiBSZWFkb25seU11bHRpQmlkaU1hcDxWLCBLPjtcbiAgZGVkdXBlKCk6IFJlYWRvbmx5TXVsdGlCaWRpTWFwPEssIFY+O1xuICBmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogViwga2V5OiBLLCBtYXA6IFJlYWRvbmx5TXVsdGlCaWRpTWFwPEssIFY+KSA9PiB2b2lkLCB0aGlzQXJnPzogYW55KTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNdWx0aUJpZGlNYXA8SywgVj4gZXh0ZW5kcyBSZWFkb25seU11bHRpQmlkaU1hcDxLLCBWPiwgQmlkaU1hcDxLLCBWPiB7XG4gIGRlbGV0ZShrZXk6IEssIHZhbHVlPzogVik6IGJvb2xlYW47XG4gIGhhcyhrZXk6IEssIHZhbHVlPzogVik6IGJvb2xlYW47XG4gIGludmVyc2UoKTogTXVsdGlCaWRpTWFwPFYsIEs+O1xuICBkZWR1cGUoKTogTXVsdGlCaWRpTWFwPEssIFY+O1xuICBmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogViwga2V5OiBLLCBtYXA6IE11bHRpQmlkaU1hcDxLLCBWPikgPT4gdm9pZCwgdGhpc0FyZz86IGFueSk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBEdWFsTXVsdGlCaWRpTWFwPEssIFY+IGltcGxlbWVudHMgTXVsdGlCaWRpTWFwPEssIFY+IHtcbiAgcHJpdmF0ZSBiaWRpbWFwOiBCaWRpTWFwPEssIFY+O1xuICBwcml2YXRlIHhUb1lzOiBNYXA8SywgU2V0PFY+PjtcbiAgcHJpdmF0ZSB5VG9YczogTWFwPFYsIFNldDxLPj47XG5cbiAgY29uc3RydWN0b3IoZW50cmllcz86IEl0ZXJhYmxlPFtLLCBWXT4gfCBudWxsKSB7XG4gICAgdGhpcy5iaWRpbWFwID0gbmV3IER1YWxCaWRpTWFwKCk7XG4gICAgdGhpcy54VG9ZcyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLnlUb1hzID0gbmV3IE1hcCgpO1xuICAgIGlmIChlbnRyaWVzICE9PSBudWxsICYmIGVudHJpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZW50cmllcykge1xuICAgICAgICB0aGlzLnNldChrZXksIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkZWxldGUoa2V5OiBLLCB2YWx1ZT86IFYpOiBib29sZWFuO1xuICBkZWxldGUoLi4uYXJnczogW0ssIFY/XSk6IGJvb2xlYW4ge1xuICAgIGZ1bmN0aW9uIGRlbGV0ZUFNQVA8SywgVj4obWFwOiBNYXA8SywgU2V0PFY+Piwga2V5OiBLLCB2YWx1ZTogViwgdmFsdWVzMD86IFNldDxWPikge1xuICAgICAgaWYgKG1hcC5oYXMoa2V5KSkge1xuICAgICAgICBjb25zdCB2YWx1ZXM6IFNldDxWPiA9IHZhbHVlczAgfHwgbWFwLmdldChrZXkpITtcbiAgICAgICAgdmFsdWVzLmRlbGV0ZSh2YWx1ZSk7XG4gICAgICAgIGlmICh2YWx1ZXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgIG1hcC5kZWxldGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGtleTogSyA9IGFyZ3NbMF07XG5cbiAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGlmICh0aGlzLnhUb1lzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWVzOiBTZXQ8Vj4gPSB0aGlzLnhUb1lzLmdldChrZXkpITtcbiAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICAgICAgaWYgKHZhbHVlcy5oYXModmFsdWUpICYmIHRoaXMueVRvWHMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgICBkZWxldGVBTUFQKHRoaXMueFRvWXMsIGtleSwgdmFsdWUsIHZhbHVlcyk7XG4gICAgICAgICAgICAgIGRlbGV0ZUFNQVAodGhpcy55VG9YcywgdmFsdWUsIGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmJpZGltYXAuZGVsZXRlKGtleSk7XG5cbiAgICAgIGNhc2UgMjpcbiAgICAgICAgY29uc3QgdmFsdWU6IFYgPSBhcmdzWzFdITtcbiAgICAgICAgaWYgKHRoaXMueFRvWXMuaGFzKGtleSkpIHtcbiAgICAgICAgICBpZiAodGhpcy5iaWRpbWFwLmhhcyhrZXkpICYmIHRoaXMuYmlkaW1hcC5nZXQoa2V5KSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuYmlkaW1hcC5kZWxldGUoa2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdmFsdWVzOiBTZXQ8Vj4gPSB0aGlzLnhUb1lzLmdldChrZXkpITtcbiAgICAgICAgICBpZiAodmFsdWVzLmhhcyh2YWx1ZSkgJiYgdGhpcy55VG9Ycy5oYXModmFsdWUpKSB7XG4gICAgICAgICAgICBkZWxldGVBTUFQKHRoaXMueFRvWXMsIGtleSwgdmFsdWUsIHZhbHVlcyk7XG4gICAgICAgICAgICBkZWxldGVBTUFQKHRoaXMueVRvWHMsIHZhbHVlLCBrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFzQW55KGtleTogSyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnhUb1lzLmhhcyhrZXkpICYmXG4gICAgICB0aGlzLnhUb1lzLmdldChrZXkpIS5zaXplID4gMDtcbiAgfVxuXG4gIGhhcyhrZXk6IEssIHZhbHVlPzogVik6IGJvb2xlYW47XG4gIGhhcyguLi5hcmdzOiBbSywgVj9dKTogYm9vbGVhbiB7XG4gICAgY29uc3Qga2V5OiBLID0gYXJnc1swXTtcblxuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIHRoaXMuYmlkaW1hcC5oYXMoa2V5KTtcblxuICAgICAgY2FzZSAyOlxuICAgICAgICBjb25zdCB2YWx1ZTogViA9IGFyZ3NbMV0hO1xuICAgICAgICBpZiAodGhpcy54VG9Zcy5oYXMoa2V5KSkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlczogU2V0PFY+ID0gdGhpcy54VG9Zcy5nZXQoa2V5KSE7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlcy5oYXModmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldEFsbChrZXk6IEspOiBJdGVyYWJsZUl0ZXJhdG9yPFY+IHtcbiAgICBpZiAodGhpcy54VG9Zcy5oYXMoa2V5KSkge1xuICAgICAgY29uc3QgdmFsdWVzOiBTZXQ8Vj4gPSB0aGlzLnhUb1lzLmdldChrZXkpITtcbiAgICAgIHJldHVybiB2YWx1ZXNbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzZXQgPSBuZXcgU2V0PFY+KCk7XG4gICAgICByZXR1cm4gc2V0W1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgICB9XG4gIH1cblxuICBpbnZlcnNlKCk6IE11bHRpQmlkaU1hcDxWLCBLPiB7XG4gICAgY29uc3QgbXVsdGliaWRpbWFwID0gbmV3IER1YWxNdWx0aUJpZGlNYXA8ViwgSz4oKTtcbiAgICBtdWx0aWJpZGltYXAuYmlkaW1hcCA9IHRoaXMuYmlkaW1hcC5pbnZlcnNlKCk7XG4gICAgbXVsdGliaWRpbWFwLnhUb1lzID0gdGhpcy55VG9YcztcbiAgICBtdWx0aWJpZGltYXAueVRvWHMgPSB0aGlzLnhUb1lzO1xuICAgIHJldHVybiBtdWx0aWJpZGltYXA7XG4gIH1cblxuICBkZWR1cGUoKTogTXVsdGlCaWRpTWFwPEssIFY+IHtcbiAgICBjb25zdCBtdWx0aWJpZGltYXAgPSBuZXcgRHVhbE11bHRpQmlkaU1hcDxLLCBWPigpO1xuICAgIG11bHRpYmlkaW1hcC5iaWRpbWFwID0gdGhpcy5iaWRpbWFwLmludmVyc2UoKS5pbnZlcnNlKCk7XG4gICAgbXVsdGliaWRpbWFwLnhUb1lzID0gdGhpcy54VG9ZcztcbiAgICBtdWx0aWJpZGltYXAueVRvWHMgPSB0aGlzLnlUb1hzO1xuICAgIHJldHVybiBtdWx0aWJpZGltYXA7XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLmJpZGltYXAuY2xlYXIoKTtcbiAgICB0aGlzLnhUb1lzLmNsZWFyKCk7XG4gICAgdGhpcy55VG9Ycy5jbGVhcigpO1xuICB9XG5cbiAgZm9yRWFjaChjYWxsYmFja2ZuOiAodmFsdWU6IFYsIGtleTogSywgbWFwOiBNdWx0aUJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyk7XG4gIH1cblxuICBnZXQoa2V5OiBLKTogViB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcC5nZXQoa2V5KTtcbiAgfVxuXG4gIHNldChrZXk6IEssIHZhbHVlOiBWKTogdGhpcyB7XG4gICAgZnVuY3Rpb24gYWRkU2FmZWx5PEssIFY+KG1hcDogTWFwPEssIFNldDxWPj4sIGtleTogSywgdmFsdWU6IFYpIHtcbiAgICAgIGlmIChtYXAuaGFzKGtleSkpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzOiBTZXQ8Vj4gPSBtYXAuZ2V0KGtleSkhO1xuICAgICAgICB2YWx1ZXMuYWRkKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcC5zZXQoa2V5LCBuZXcgU2V0KFt2YWx1ZV0pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmJpZGltYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgIGFkZFNhZmVseSh0aGlzLnhUb1lzLCBrZXksIHZhbHVlKTtcbiAgICBhZGRTYWZlbHkodGhpcy55VG9YcywgdmFsdWUsIGtleSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcC5zaXplO1xuICB9O1xuXG4gIHJlYWRvbmx5IFtTeW1ib2wudG9TdHJpbmdUYWddOiAnTWFwJyA9ICdNYXAnO1xuXG4gIFtTeW1ib2wuaXRlcmF0b3JdKCk6IEl0ZXJhYmxlSXRlcmF0b3I8W0ssIFZdPiB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcFtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIH1cblxuICBlbnRyaWVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8W0ssIFZdPiB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcC5lbnRyaWVzKCk7XG4gIH1cblxuICBrZXlzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Sz4ge1xuICAgIHJldHVybiB0aGlzLmJpZGltYXAua2V5cygpO1xuICB9XG5cbiAgdmFsdWVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Vj4ge1xuICAgIHJldHVybiB0aGlzLmJpZGltYXAudmFsdWVzKCk7XG4gIH1cblxuICB0b0pTT04oKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5iaWRpbWFwLnRvSlNPTigpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9