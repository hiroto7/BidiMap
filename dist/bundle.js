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
var ReadonlyBidiMap;
(function (ReadonlyBidiMap) {
    function isReadonlyBidiMap(iterable) {
        return iterable instanceof AbstractBidiMap;
    }
    ReadonlyBidiMap.isReadonlyBidiMap = isReadonlyBidiMap;
})(ReadonlyBidiMap = exports.ReadonlyBidiMap || (exports.ReadonlyBidiMap = {}));
var BidiMap;
(function (BidiMap) {
    function isBidiMap(iterable) {
        return iterable instanceof AbstractBidiMap;
    }
    BidiMap.isBidiMap = isBidiMap;
})(BidiMap = exports.BidiMap || (exports.BidiMap = {}));
class AbstractBidiMap {
    constructor() {
        this[Symbol.toStringTag] = 'Map';
    }
    get size() {
        return this.xToY.size;
    }
    dedupe() {
        const inverseLike = new DualBidiMap(this.inverse);
        return new DualBidiMap(inverseLike.inverse);
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
class DualBidiMap extends AbstractBidiMap {
    constructor(entries) {
        super();
        if (ReadonlyBidiMap.isReadonlyBidiMap(entries)) {
            const bidimap = entries;
            this.xToY = new Map(bidimap);
            this.yToX = new Map(bidimap.inverse);
        }
        else {
            this.xToY = new Map();
            this.yToX = new Map();
            if (entries !== null && entries !== undefined) {
                for (const [key, value] of entries) {
                    this.set(key, value);
                }
            }
        }
        this.inverse = new InverseBidiMap(this, this.yToX, this.xToY);
    }
}
exports.DualBidiMap = DualBidiMap;
class InverseBidiMap extends AbstractBidiMap {
    constructor(inverse, xToY, yToX) {
        super();
        this.inverse = inverse;
        this.xToY = xToY;
        this.yToX = yToX;
    }
}


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
exports.ReadonlyBidiMap = bidimap_1.ReadonlyBidiMap;
exports.BidiMap = bidimap_1.BidiMap;
exports.DualBidiMap = bidimap_1.DualBidiMap;
var multibidimap_1 = __webpack_require__(/*! ./multibidimap */ "./src/multibidimap.ts");
exports.ReadonlyMultiBidiMap = multibidimap_1.ReadonlyMultiBidiMap;
exports.MultiBidiMap = multibidimap_1.MultiBidiMap;
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
var ReadonlyMultiBidiMap;
(function (ReadonlyMultiBidiMap) {
    function isReadonlyMultiBidiMap(iterable) {
        return iterable instanceof AbstractMultiBidiMap;
    }
    ReadonlyMultiBidiMap.isReadonlyMultiBidiMap = isReadonlyMultiBidiMap;
})(ReadonlyMultiBidiMap = exports.ReadonlyMultiBidiMap || (exports.ReadonlyMultiBidiMap = {}));
var MultiBidiMap;
(function (MultiBidiMap) {
    function isMultiBidiMap(iterable) {
        return iterable instanceof AbstractMultiBidiMap;
    }
    MultiBidiMap.isMultiBidiMap = isMultiBidiMap;
})(MultiBidiMap = exports.MultiBidiMap || (exports.MultiBidiMap = {}));
class AbstractMultiBidiMap {
    constructor() {
        this[Symbol.toStringTag] = 'Map';
    }
    get size() {
        return this.bidimap.size;
    }
    ;
    static deleteAMAP(map, key, value, values0) {
        if (map.has(key)) {
            const values = values0 || map.get(key);
            values.delete(value);
            if (values.size === 0) {
                map.delete(key);
            }
        }
    }
    delete(...args) {
        const key = args[0];
        switch (args.length) {
            case 1:
                if (this.xToYs.has(key)) {
                    const values = this.xToYs.get(key);
                    for (const value of values) {
                        if (values.has(value) && this.yToXs.has(value)) {
                            DualMultiBidiMap.deleteAMAP(this.xToYs, key, value, values);
                            DualMultiBidiMap.deleteAMAP(this.yToXs, value, key);
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
                        DualMultiBidiMap.deleteAMAP(this.xToYs, key, value, values);
                        DualMultiBidiMap.deleteAMAP(this.yToXs, value, key);
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
    entriesAll() {
        const set = new Set();
        for (const [key, values] of this.xToYs) {
            set.add([
                key,
                values[Symbol.iterator]()
            ]);
        }
        return set[Symbol.iterator]();
    }
    keysAll() {
        return this.xToYs.keys();
    }
    valuesAll() {
        return this.yToXs.keys();
    }
    dedupe() {
        const bidimap = this.bidimap.dedupe();
        return new DualMultiBidiMap(bidimap, this.xToYs, this.yToXs, AbstractMultiBidiMap.protectedFlag);
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
    static addSafely(map, key, value) {
        if (map.has(key)) {
            const values = map.get(key);
            values.add(value);
        }
        else {
            map.set(key, new Set([value]));
        }
    }
    set(key, value) {
        this.bidimap.set(key, value);
        DualMultiBidiMap.addSafely(this.xToYs, key, value);
        DualMultiBidiMap.addSafely(this.yToXs, value, key);
        return this;
    }
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
AbstractMultiBidiMap.protectedFlag = Symbol('protected');
class DualMultiBidiMap extends AbstractMultiBidiMap {
    constructor(entries, xToYs, yToXs, protectedFlag) {
        super();
        if (bidimap_1.BidiMap.isBidiMap(entries) && xToYs instanceof Map && yToXs instanceof Map
            && protectedFlag === AbstractMultiBidiMap.protectedFlag) {
            const bidimap = entries;
            this.bidimap = bidimap;
            this.xToYs = xToYs;
            this.yToXs = yToXs;
        }
        else {
            this.bidimap = new bidimap_1.DualBidiMap();
            this.xToYs = new Map();
            this.yToXs = new Map();
            if (entries !== null && entries !== undefined) {
                for (const [key, value] of entries) {
                    this.set(key, value);
                }
            }
        }
        this.inverse = new InverseMultiBidiMap(this, this.bidimap.inverse, this.yToXs, this.xToYs);
    }
}
exports.DualMultiBidiMap = DualMultiBidiMap;
class InverseMultiBidiMap extends AbstractMultiBidiMap {
    constructor(inverse, bidimap, xToYs, yToXs) {
        super();
        this.inverse = inverse;
        this.bidimap = bidimap;
        this.xToYs = xToYs;
        this.yToXs = yToXs;
    }
}


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvYmlkaW1hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL211bHRpYmlkaW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDN0VBLElBQWlCLGVBQWUsQ0FJL0I7QUFKRCxXQUFpQixlQUFlO0lBQzlCLFNBQWdCLGlCQUFpQixDQUFPLFFBQWdDO1FBQ3RFLE9BQU8sUUFBUSxZQUFZLGVBQWUsQ0FBQztJQUM3QyxDQUFDO0lBRmUsaUNBQWlCLG9CQUVo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QUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUVwQjthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHFCQUFXLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFhLENBQUM7WUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsRUFBYSxDQUFDO1lBQ2xDLElBQUksT0FBTyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO2dCQUM3QyxLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksT0FBTyxFQUFFO29CQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDdEI7YUFDRjtTQUNGO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLG1CQUFtQixDQUFPLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRyxDQUFDO0NBQ0Y7QUFuQ0QsNENBbUNDO0FBRUQsTUFBTSxtQkFBMEIsU0FBUSxvQkFBMEI7SUFDaEUsWUFDVyxPQUEyQixFQUNqQixPQUFzQixFQUN0QixLQUFxQixFQUNyQixLQUFxQjtRQUV4QyxLQUFLLEVBQUUsQ0FBQztRQUxDLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQ2pCLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFDdEIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7SUFHMUMsQ0FBQztDQUNGIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImV4cG9ydCBpbnRlcmZhY2UgUmVhZG9ubHlCaWRpTWFwPEssIFY+IGV4dGVuZHMgUmVhZG9ubHlNYXA8SywgVj4ge1xuICByZWFkb25seSBpbnZlcnNlOiBSZWFkb25seUJpZGlNYXA8ViwgSz47XG4gIGRlZHVwZSgpOiBSZWFkb25seUJpZGlNYXA8SywgVj47XG4gIGZvckVhY2goY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBrZXk6IEssIG1hcDogUmVhZG9ubHlCaWRpTWFwPEssIFY+KSA9PiB2b2lkLCB0aGlzQXJnPzogYW55KTogdm9pZDtcbn1cbmV4cG9ydCBuYW1lc3BhY2UgUmVhZG9ubHlCaWRpTWFwIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIGlzUmVhZG9ubHlCaWRpTWFwPEssIFY+KGl0ZXJhYmxlOiBJdGVyYWJsZTxbSywgVl0+IHwgYW55KTogaXRlcmFibGUgaXMgUmVhZG9ubHlCaWRpTWFwPEssIFY+IHtcbiAgICByZXR1cm4gaXRlcmFibGUgaW5zdGFuY2VvZiBBYnN0cmFjdEJpZGlNYXA7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBCaWRpTWFwPEssIFY+IGV4dGVuZHMgUmVhZG9ubHlCaWRpTWFwPEssIFY+LCBNYXA8SywgVj4ge1xuICByZWFkb25seSBpbnZlcnNlOiBCaWRpTWFwPFYsIEs+O1xuICBkZWR1cGUoKTogQmlkaU1hcDxLLCBWPjtcbiAgZm9yRWFjaChjYWxsYmFja2ZuOiAodmFsdWU6IFYsIGtleTogSywgbWFwOiBCaWRpTWFwPEssIFY+KSA9PiB2b2lkLCB0aGlzQXJnPzogYW55KTogdm9pZDtcbn1cbmV4cG9ydCBuYW1lc3BhY2UgQmlkaU1hcCB7XG4gIGV4cG9ydCBmdW5jdGlvbiBpc0JpZGlNYXA8SywgVj4oaXRlcmFibGU6IEl0ZXJhYmxlPFtLLCBWXT4gfCBhbnkpOiBpdGVyYWJsZSBpcyBCaWRpTWFwPEssIFY+IHtcbiAgICByZXR1cm4gaXRlcmFibGUgaW5zdGFuY2VvZiBBYnN0cmFjdEJpZGlNYXA7XG4gIH1cbn1cblxuYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RCaWRpTWFwPEssIFY+IGltcGxlbWVudHMgQmlkaU1hcDxLLCBWPiB7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCByZWFkb25seSB4VG9ZOiBNYXA8SywgVj47XG4gIHByb3RlY3RlZCBhYnN0cmFjdCByZWFkb25seSB5VG9YOiBNYXA8ViwgSz47XG5cbiAgYWJzdHJhY3QgcmVhZG9ubHkgaW52ZXJzZTogQmlkaU1hcDxWLCBLPjtcbiAgcmVhZG9ubHkgW1N5bWJvbC50b1N0cmluZ1RhZ106ICdNYXAnID0gJ01hcCc7XG5cbiAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy54VG9ZLnNpemU7XG4gIH1cblxuICBkZWR1cGUoKTogQmlkaU1hcDxLLCBWPiB7XG4gICAgY29uc3QgaW52ZXJzZUxpa2U6IEJpZGlNYXA8ViwgSz4gPSBuZXcgRHVhbEJpZGlNYXA8ViwgSz4odGhpcy5pbnZlcnNlKTtcbiAgICByZXR1cm4gbmV3IER1YWxCaWRpTWFwPEssIFY+KGludmVyc2VMaWtlLmludmVyc2UpO1xuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy54VG9ZLmNsZWFyKCk7XG4gICAgdGhpcy55VG9YLmNsZWFyKCk7XG4gIH1cblxuICBkZWxldGUoa2V5OiBLKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMueFRvWS5oYXMoa2V5KSkge1xuICAgICAgY29uc3QgdmFsdWU6IFYgPSB0aGlzLnhUb1kuZ2V0KGtleSkhO1xuICAgICAgaWYgKHRoaXMueVRvWC5oYXModmFsdWUpICYmIHRoaXMueVRvWC5nZXQodmFsdWUpID09PSBrZXkpIHtcbiAgICAgICAgdGhpcy55VG9YLmRlbGV0ZSh2YWx1ZSEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy54VG9ZLmRlbGV0ZShrZXkpO1xuICB9XG5cbiAgZm9yRWFjaChjYWxsYmFja2ZuOiAodmFsdWU6IFYsIGtleTogSywgbWFwOiBCaWRpTWFwPEssIFY+KSA9PiB2b2lkLCB0aGlzQXJnPzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5mb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcpO1xuICB9XG5cbiAgZ2V0KGtleTogSyk6IFYgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnhUb1kuZ2V0KGtleSk7XG4gIH1cblxuICBoYXMoa2V5OiBLKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS5oYXMoa2V5KTtcbiAgfVxuXG4gIHNldChrZXk6IEssIHZhbHVlOiBWKTogdGhpcyB7XG4gICAgdGhpcy54VG9ZLnNldChrZXksIHZhbHVlKTtcbiAgICB0aGlzLnlUb1guc2V0KHZhbHVlLCBrZXkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgW1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmFibGVJdGVyYXRvcjxbSywgVl0+IHtcbiAgICByZXR1cm4gdGhpcy54VG9ZW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgfVxuXG4gIGVudHJpZXMoKTogSXRlcmFibGVJdGVyYXRvcjxbSywgVl0+IHtcbiAgICByZXR1cm4gdGhpcy54VG9ZLmVudHJpZXMoKTtcbiAgfVxuXG4gIGtleXMoKTogSXRlcmFibGVJdGVyYXRvcjxLPiB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS5rZXlzKCk7XG4gIH1cblxuICB2YWx1ZXMoKTogSXRlcmFibGVJdGVyYXRvcjxWPiB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS52YWx1ZXMoKTtcbiAgfVxuXG4gIHRvSlNPTigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnhUb1kudG9KU09OKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIER1YWxCaWRpTWFwPEssIFY+IGV4dGVuZHMgQWJzdHJhY3RCaWRpTWFwPEssIFY+IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHhUb1k6IE1hcDxLLCBWPjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHlUb1g6IE1hcDxWLCBLPjtcbiAgcmVhZG9ubHkgaW52ZXJzZTogQmlkaU1hcDxWLCBLPjtcblxuICBjb25zdHJ1Y3RvcihlbnRyaWVzPzogSXRlcmFibGU8W0ssIFZdPiB8IG51bGwpO1xuICBjb25zdHJ1Y3RvcihiaWRpbWFwOiBSZWFkb25seUJpZGlNYXA8SywgVj4pO1xuICBjb25zdHJ1Y3RvcihlbnRyaWVzPzogSXRlcmFibGU8W0ssIFZdPiB8IFJlYWRvbmx5QmlkaU1hcDxLLCBWPiB8IG51bGwpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChSZWFkb25seUJpZGlNYXAuaXNSZWFkb25seUJpZGlNYXA8SywgVj4oZW50cmllcykpIHtcbiAgICAgIGNvbnN0IGJpZGltYXA6IFJlYWRvbmx5QmlkaU1hcDxLLCBWPiA9IGVudHJpZXM7XG4gICAgICB0aGlzLnhUb1kgPSBuZXcgTWFwPEssIFY+KGJpZGltYXApO1xuICAgICAgdGhpcy55VG9YID0gbmV3IE1hcDxWLCBLPihiaWRpbWFwLmludmVyc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnhUb1kgPSBuZXcgTWFwPEssIFY+KCk7XG4gICAgICB0aGlzLnlUb1ggPSBuZXcgTWFwPFYsIEs+KCk7XG4gICAgICBpZiAoZW50cmllcyAhPT0gbnVsbCAmJiBlbnRyaWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZW50cmllcykge1xuICAgICAgICAgIHRoaXMuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaW52ZXJzZSA9IG5ldyBJbnZlcnNlQmlkaU1hcDxWLCBLPih0aGlzLCB0aGlzLnlUb1gsIHRoaXMueFRvWSk7XG4gIH1cbn1cblxuY2xhc3MgSW52ZXJzZUJpZGlNYXA8SywgVj4gZXh0ZW5kcyBBYnN0cmFjdEJpZGlNYXA8SywgVj4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICByZWFkb25seSBpbnZlcnNlOiBCaWRpTWFwPFYsIEs+LFxuICAgIHByb3RlY3RlZCByZWFkb25seSB4VG9ZOiBNYXA8SywgVj4sXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IHlUb1g6IE1hcDxWLCBLPlxuICApIHtcbiAgICBzdXBlcigpO1xuICB9XG59IiwiZXhwb3J0IHsgUmVhZG9ubHlCaWRpTWFwLCBCaWRpTWFwLCBEdWFsQmlkaU1hcCB9IGZyb20gJy4vYmlkaW1hcCc7XG5leHBvcnQgeyBSZWFkb25seU11bHRpQmlkaU1hcCwgTXVsdGlCaWRpTWFwLCBEdWFsTXVsdGlCaWRpTWFwIH0gZnJvbSAnLi9tdWx0aWJpZGltYXAnOyIsImltcG9ydCB7IFJlYWRvbmx5QmlkaU1hcCwgQmlkaU1hcCwgRHVhbEJpZGlNYXAgfSBmcm9tICcuL2JpZGltYXAnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRvbmx5TXVsdGlCaWRpTWFwPEssIFY+IGV4dGVuZHMgUmVhZG9ubHlCaWRpTWFwPEssIFY+IHtcbiAgaGFzQW55KGtleTogSyk6IGJvb2xlYW47XG4gIGhhcyhrZXk6IEssIHZhbHVlPzogVik6IGJvb2xlYW47XG4gIGdldEFsbChrZXk6IEspOiBJdGVyYWJsZUl0ZXJhdG9yPFY+O1xuICBlbnRyaWVzQWxsKCk6IEl0ZXJhYmxlSXRlcmF0b3I8W0ssIEl0ZXJhYmxlSXRlcmF0b3I8Vj5dPjtcbiAga2V5c0FsbCgpOiBJdGVyYWJsZUl0ZXJhdG9yPEs+O1xuICB2YWx1ZXNBbGwoKTogSXRlcmFibGVJdGVyYXRvcjxWPjtcbiAgcmVhZG9ubHkgaW52ZXJzZTogUmVhZG9ubHlNdWx0aUJpZGlNYXA8ViwgSz47XG4gIGRlZHVwZSgpOiBSZWFkb25seU11bHRpQmlkaU1hcDxLLCBWPjtcbiAgZm9yRWFjaChjYWxsYmFja2ZuOiAodmFsdWU6IFYsIGtleTogSywgbWFwOiBSZWFkb25seU11bHRpQmlkaU1hcDxLLCBWPikgPT4gdm9pZCwgdGhpc0FyZz86IGFueSk6IHZvaWQ7XG59XG5leHBvcnQgbmFtZXNwYWNlIFJlYWRvbmx5TXVsdGlCaWRpTWFwIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIGlzUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj4oaXRlcmFibGU6IEl0ZXJhYmxlPFtLLCBWXT4gfCBhbnkpOiBpdGVyYWJsZSBpcyBSZWFkb25seU11bHRpQmlkaU1hcDxLLCBWPiB7XG4gICAgcmV0dXJuIGl0ZXJhYmxlIGluc3RhbmNlb2YgQWJzdHJhY3RNdWx0aUJpZGlNYXA7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNdWx0aUJpZGlNYXA8SywgVj4gZXh0ZW5kcyBSZWFkb25seU11bHRpQmlkaU1hcDxLLCBWPiwgQmlkaU1hcDxLLCBWPiB7XG4gIGRlbGV0ZShrZXk6IEssIHZhbHVlPzogVik6IGJvb2xlYW47XG4gIGhhcyhrZXk6IEssIHZhbHVlPzogVik6IGJvb2xlYW47XG4gIHJlYWRvbmx5IGludmVyc2U6IE11bHRpQmlkaU1hcDxWLCBLPjtcbiAgZGVkdXBlKCk6IE11bHRpQmlkaU1hcDxLLCBWPjtcbiAgZm9yRWFjaChjYWxsYmFja2ZuOiAodmFsdWU6IFYsIGtleTogSywgbWFwOiBNdWx0aUJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkO1xufVxuZXhwb3J0IG5hbWVzcGFjZSBNdWx0aUJpZGlNYXAge1xuICBleHBvcnQgZnVuY3Rpb24gaXNNdWx0aUJpZGlNYXA8SywgVj4oaXRlcmFibGU6IEl0ZXJhYmxlPFtLLCBWXT4gfCBhbnkpOiBpdGVyYWJsZSBpcyBNdWx0aUJpZGlNYXA8SywgVj4ge1xuICAgIHJldHVybiBpdGVyYWJsZSBpbnN0YW5jZW9mIEFic3RyYWN0TXVsdGlCaWRpTWFwO1xuICB9XG59XG5cbmFic3RyYWN0IGNsYXNzIEFic3RyYWN0TXVsdGlCaWRpTWFwPEssIFY+IGltcGxlbWVudHMgTXVsdGlCaWRpTWFwPEssIFY+IHtcbiAgcHJvdGVjdGVkIHN0YXRpYyByZWFkb25seSBwcm90ZWN0ZWRGbGFnID0gU3ltYm9sKCdwcm90ZWN0ZWQnKTtcblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVhZG9ubHkgYmlkaW1hcDogQmlkaU1hcDxLLCBWPjtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHJlYWRvbmx5IHhUb1lzOiBNYXA8SywgU2V0PFY+PjtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHJlYWRvbmx5IHlUb1hzOiBNYXA8ViwgU2V0PEs+PjtcblxuICBhYnN0cmFjdCByZWFkb25seSBpbnZlcnNlOiBNdWx0aUJpZGlNYXA8ViwgSz47XG4gIHJlYWRvbmx5IFtTeW1ib2wudG9TdHJpbmdUYWddOiAnTWFwJyA9ICdNYXAnO1xuXG4gIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcC5zaXplO1xuICB9O1xuXG4gIHByaXZhdGUgc3RhdGljIGRlbGV0ZUFNQVA8SywgVj4obWFwOiBNYXA8SywgU2V0PFY+Piwga2V5OiBLLCB2YWx1ZTogViwgdmFsdWVzMD86IFNldDxWPikge1xuICAgIGlmIChtYXAuaGFzKGtleSkpIHtcbiAgICAgIGNvbnN0IHZhbHVlczogU2V0PFY+ID0gdmFsdWVzMCB8fCBtYXAuZ2V0KGtleSkhO1xuICAgICAgdmFsdWVzLmRlbGV0ZSh2YWx1ZSk7XG4gICAgICBpZiAodmFsdWVzLnNpemUgPT09IDApIHtcbiAgICAgICAgbWFwLmRlbGV0ZShrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZShrZXk6IEssIHZhbHVlPzogVik6IGJvb2xlYW47XG4gIGRlbGV0ZSguLi5hcmdzOiBbSywgVj9dKTogYm9vbGVhbiB7XG4gICAgY29uc3Qga2V5OiBLID0gYXJnc1swXTtcblxuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaWYgKHRoaXMueFRvWXMuaGFzKGtleSkpIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZXM6IFNldDxWPiA9IHRoaXMueFRvWXMuZ2V0KGtleSkhO1xuICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICAgICAgICBpZiAodmFsdWVzLmhhcyh2YWx1ZSkgJiYgdGhpcy55VG9Ycy5oYXModmFsdWUpKSB7XG4gICAgICAgICAgICAgIER1YWxNdWx0aUJpZGlNYXAuZGVsZXRlQU1BUCh0aGlzLnhUb1lzLCBrZXksIHZhbHVlLCB2YWx1ZXMpO1xuICAgICAgICAgICAgICBEdWFsTXVsdGlCaWRpTWFwLmRlbGV0ZUFNQVAodGhpcy55VG9YcywgdmFsdWUsIGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmJpZGltYXAuZGVsZXRlKGtleSk7XG5cbiAgICAgIGNhc2UgMjpcbiAgICAgICAgY29uc3QgdmFsdWU6IFYgPSBhcmdzWzFdITtcbiAgICAgICAgaWYgKHRoaXMueFRvWXMuaGFzKGtleSkpIHtcbiAgICAgICAgICBpZiAodGhpcy5iaWRpbWFwLmhhcyhrZXkpICYmIHRoaXMuYmlkaW1hcC5nZXQoa2V5KSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuYmlkaW1hcC5kZWxldGUoa2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdmFsdWVzOiBTZXQ8Vj4gPSB0aGlzLnhUb1lzLmdldChrZXkpITtcbiAgICAgICAgICBpZiAodmFsdWVzLmhhcyh2YWx1ZSkgJiYgdGhpcy55VG9Ycy5oYXModmFsdWUpKSB7XG4gICAgICAgICAgICBEdWFsTXVsdGlCaWRpTWFwLmRlbGV0ZUFNQVAodGhpcy54VG9Zcywga2V5LCB2YWx1ZSwgdmFsdWVzKTtcbiAgICAgICAgICAgIER1YWxNdWx0aUJpZGlNYXAuZGVsZXRlQU1BUCh0aGlzLnlUb1hzLCB2YWx1ZSwga2V5KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhc0FueShrZXk6IEspOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy54VG9Zcy5oYXMoa2V5KSAmJlxuICAgICAgdGhpcy54VG9Zcy5nZXQoa2V5KSEuc2l6ZSA+IDA7XG4gIH1cblxuICBoYXMoa2V5OiBLLCB2YWx1ZT86IFYpOiBib29sZWFuO1xuICBoYXMoLi4uYXJnczogW0ssIFY/XSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGtleTogSyA9IGFyZ3NbMF07XG5cbiAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiB0aGlzLmJpZGltYXAuaGFzKGtleSk7XG5cbiAgICAgIGNhc2UgMjpcbiAgICAgICAgY29uc3QgdmFsdWU6IFYgPSBhcmdzWzFdITtcbiAgICAgICAgaWYgKHRoaXMueFRvWXMuaGFzKGtleSkpIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZXM6IFNldDxWPiA9IHRoaXMueFRvWXMuZ2V0KGtleSkhO1xuICAgICAgICAgIHJldHVybiB2YWx1ZXMuaGFzKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRBbGwoa2V5OiBLKTogSXRlcmFibGVJdGVyYXRvcjxWPiB7XG4gICAgaWYgKHRoaXMueFRvWXMuaGFzKGtleSkpIHtcbiAgICAgIGNvbnN0IHZhbHVlczogU2V0PFY+ID0gdGhpcy54VG9Zcy5nZXQoa2V5KSE7XG4gICAgICByZXR1cm4gdmFsdWVzW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2V0ID0gbmV3IFNldDxWPigpO1xuICAgICAgcmV0dXJuIHNldFtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gICAgfVxuICB9XG5cbiAgZW50cmllc0FsbCgpOiBJdGVyYWJsZUl0ZXJhdG9yPFtLLCBJdGVyYWJsZUl0ZXJhdG9yPFY+XT4ge1xuICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8W0ssIEl0ZXJhYmxlSXRlcmF0b3I8Vj5dPigpO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVzXSBvZiB0aGlzLnhUb1lzKSB7XG4gICAgICBzZXQuYWRkKFtcbiAgICAgICAga2V5LFxuICAgICAgICB2YWx1ZXNbU3ltYm9sLml0ZXJhdG9yXSgpXG4gICAgICBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHNldFtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIH1cblxuICBrZXlzQWxsKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Sz4ge1xuICAgIHJldHVybiB0aGlzLnhUb1lzLmtleXMoKTtcbiAgfVxuXG4gIHZhbHVlc0FsbCgpOiBJdGVyYWJsZUl0ZXJhdG9yPFY+IHtcbiAgICByZXR1cm4gdGhpcy55VG9Ycy5rZXlzKCk7XG4gIH1cblxuICBkZWR1cGUoKTogTXVsdGlCaWRpTWFwPEssIFY+IHtcbiAgICBjb25zdCBiaWRpbWFwOiBCaWRpTWFwPEssIFY+ID0gdGhpcy5iaWRpbWFwLmRlZHVwZSgpO1xuICAgIHJldHVybiBuZXcgRHVhbE11bHRpQmlkaU1hcChiaWRpbWFwLCB0aGlzLnhUb1lzLCB0aGlzLnlUb1hzLCBBYnN0cmFjdE11bHRpQmlkaU1hcC5wcm90ZWN0ZWRGbGFnKTtcbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuYmlkaW1hcC5jbGVhcigpO1xuICAgIHRoaXMueFRvWXMuY2xlYXIoKTtcbiAgICB0aGlzLnlUb1hzLmNsZWFyKCk7XG4gIH1cblxuICBmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogViwga2V5OiBLLCBtYXA6IE11bHRpQmlkaU1hcDxLLCBWPikgPT4gdm9pZCwgdGhpc0FyZz86IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnKTtcbiAgfVxuXG4gIGdldChrZXk6IEspOiBWIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5iaWRpbWFwLmdldChrZXkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgYWRkU2FmZWx5PEssIFY+KG1hcDogTWFwPEssIFNldDxWPj4sIGtleTogSywgdmFsdWU6IFYpIHtcbiAgICBpZiAobWFwLmhhcyhrZXkpKSB7XG4gICAgICBjb25zdCB2YWx1ZXM6IFNldDxWPiA9IG1hcC5nZXQoa2V5KSE7XG4gICAgICB2YWx1ZXMuYWRkKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWFwLnNldChrZXksIG5ldyBTZXQoW3ZhbHVlXSkpO1xuICAgIH1cbiAgfVxuXG4gIHNldChrZXk6IEssIHZhbHVlOiBWKTogdGhpcyB7XG4gICAgdGhpcy5iaWRpbWFwLnNldChrZXksIHZhbHVlKTtcbiAgICBEdWFsTXVsdGlCaWRpTWFwLmFkZFNhZmVseSh0aGlzLnhUb1lzLCBrZXksIHZhbHVlKTtcbiAgICBEdWFsTXVsdGlCaWRpTWFwLmFkZFNhZmVseSh0aGlzLnlUb1hzLCB2YWx1ZSwga2V5KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgW1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmFibGVJdGVyYXRvcjxbSywgVl0+IHtcbiAgICByZXR1cm4gdGhpcy5iaWRpbWFwW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgfVxuXG4gIGVudHJpZXMoKTogSXRlcmFibGVJdGVyYXRvcjxbSywgVl0+IHtcbiAgICByZXR1cm4gdGhpcy5iaWRpbWFwLmVudHJpZXMoKTtcbiAgfVxuXG4gIGtleXMoKTogSXRlcmFibGVJdGVyYXRvcjxLPiB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcC5rZXlzKCk7XG4gIH1cblxuICB2YWx1ZXMoKTogSXRlcmFibGVJdGVyYXRvcjxWPiB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcC52YWx1ZXMoKTtcbiAgfVxuXG4gIHRvSlNPTigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmJpZGltYXAudG9KU09OKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIER1YWxNdWx0aUJpZGlNYXA8SywgVj4gZXh0ZW5kcyBBYnN0cmFjdE11bHRpQmlkaU1hcDxLLCBWPiB7XG4gIHByb3RlY3RlZCByZWFkb25seSBiaWRpbWFwOiBCaWRpTWFwPEssIFY+O1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgeFRvWXM6IE1hcDxLLCBTZXQ8Vj4+O1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgeVRvWHM6IE1hcDxWLCBTZXQ8Sz4+O1xuICByZWFkb25seSBpbnZlcnNlOiBNdWx0aUJpZGlNYXA8ViwgSz47XG5cbiAgY29uc3RydWN0b3IoZW50cmllcz86IEl0ZXJhYmxlPFtLLCBWXT4gfCBudWxsKTtcbiAgY29uc3RydWN0b3IobXVsdGliaWRpbWFwOiBSZWFkb25seU11bHRpQmlkaU1hcDxLLCBWPik7XG4gIGNvbnN0cnVjdG9yKGJpZGltYXA6IEJpZGlNYXA8SywgVj4sIHhUb1lzOiBNYXA8SywgU2V0PFY+PiwgeVRvWHM6IE1hcDxWLCBTZXQ8Sz4+LCBwcm90ZWN0ZWRGbGFnOiBzeW1ib2wpO1xuICBjb25zdHJ1Y3RvcihcbiAgICBlbnRyaWVzPzogSXRlcmFibGU8W0ssIFZdPiB8IFJlYWRvbmx5TXVsdGlCaWRpTWFwPEssIFY+IHwgbnVsbCxcbiAgICB4VG9Zcz86IE1hcDxLLCBTZXQ8Vj4+LCB5VG9Ycz86IE1hcDxWLCBTZXQ8Sz4+LCBwcm90ZWN0ZWRGbGFnPzogc3ltYm9sXG4gICkge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKFxuICAgICAgQmlkaU1hcC5pc0JpZGlNYXA8SywgVj4oZW50cmllcykgJiYgeFRvWXMgaW5zdGFuY2VvZiBNYXAgJiYgeVRvWHMgaW5zdGFuY2VvZiBNYXBcbiAgICAgICYmIHByb3RlY3RlZEZsYWcgPT09IEFic3RyYWN0TXVsdGlCaWRpTWFwLnByb3RlY3RlZEZsYWdcbiAgICApIHtcbiAgICAgIGNvbnN0IGJpZGltYXA6IEJpZGlNYXA8SywgVj4gPSBlbnRyaWVzO1xuICAgICAgdGhpcy5iaWRpbWFwID0gYmlkaW1hcDtcbiAgICAgIHRoaXMueFRvWXMgPSB4VG9ZcztcbiAgICAgIHRoaXMueVRvWHMgPSB5VG9YcztcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJpZGltYXAgPSBuZXcgRHVhbEJpZGlNYXAoKTtcbiAgICAgIHRoaXMueFRvWXMgPSBuZXcgTWFwPEssIFNldDxWPj4oKTtcbiAgICAgIHRoaXMueVRvWHMgPSBuZXcgTWFwPFYsIFNldDxLPj4oKTtcbiAgICAgIGlmIChlbnRyaWVzICE9PSBudWxsICYmIGVudHJpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pbnZlcnNlID0gbmV3IEludmVyc2VNdWx0aUJpZGlNYXA8ViwgSz4odGhpcywgdGhpcy5iaWRpbWFwLmludmVyc2UsIHRoaXMueVRvWHMsIHRoaXMueFRvWXMpO1xuICB9XG59XG5cbmNsYXNzIEludmVyc2VNdWx0aUJpZGlNYXA8SywgVj4gZXh0ZW5kcyBBYnN0cmFjdE11bHRpQmlkaU1hcDxLLCBWPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlYWRvbmx5IGludmVyc2U6IE11bHRpQmlkaU1hcDxWLCBLPixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgYmlkaW1hcDogQmlkaU1hcDxLLCBWPixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgeFRvWXM6IE1hcDxLLCBTZXQ8Vj4+LFxuICAgIHByb3RlY3RlZCByZWFkb25seSB5VG9YczogTWFwPFYsIFNldDxLPj5cbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=