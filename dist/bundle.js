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
        else if (ReadonlyMultiBidiMap.isReadonlyMultiBidiMap(entries)) {
            const multibidimap = entries;
            this.bidimap = new bidimap_1.DualBidiMap(multibidimap);
            this.xToYs = new Map();
            for (const [key, values] of multibidimap.entriesAll()) {
                this.xToYs.set(key, new Set(values));
            }
            this.yToXs = new Map();
            for (const [value, keys] of multibidimap.inverse.entriesAll()) {
                this.yToXs.set(value, new Set(keys));
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvYmlkaW1hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL211bHRpYmlkaW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDN0VBLElBQWlCLGVBQWUsQ0FJL0I7QUFKRCxXQUFpQixlQUFlO0lBQzlCLFNBQWdCLGlCQUFpQixDQUFPLFFBQWdDO1FBQ3RFLE9BQU8sUUFBUSxZQUFZLGVBQWUsQ0FBQztJQUM3QyxDQUFDO0lBRmUsaUNBQWlCLG9CQUVo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aUJBQ3RCO2FBQ0Y7U0FDRjtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxtQkFBbUIsQ0FBTyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkcsQ0FBQztDQUNGO0FBOUNELDRDQThDQztBQUVELE1BQU0sbUJBQTBCLFNBQVEsb0JBQTBCO0lBQ2hFLFlBQ1csT0FBMkIsRUFDakIsT0FBc0IsRUFDdEIsS0FBcUIsRUFDckIsS0FBcUI7UUFFeEMsS0FBSyxFQUFFLENBQUM7UUFMQyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUNqQixZQUFPLEdBQVAsT0FBTyxDQUFlO1FBQ3RCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFVBQUssR0FBTCxLQUFLLENBQWdCO0lBRzFDLENBQUM7Q0FDRiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJleHBvcnQgaW50ZXJmYWNlIFJlYWRvbmx5QmlkaU1hcDxLLCBWPiBleHRlbmRzIFJlYWRvbmx5TWFwPEssIFY+IHtcbiAgcmVhZG9ubHkgaW52ZXJzZTogUmVhZG9ubHlCaWRpTWFwPFYsIEs+O1xuICBkZWR1cGUoKTogUmVhZG9ubHlCaWRpTWFwPEssIFY+O1xuICBmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogViwga2V5OiBLLCBtYXA6IFJlYWRvbmx5QmlkaU1hcDxLLCBWPikgPT4gdm9pZCwgdGhpc0FyZz86IGFueSk6IHZvaWQ7XG59XG5leHBvcnQgbmFtZXNwYWNlIFJlYWRvbmx5QmlkaU1hcCB7XG4gIGV4cG9ydCBmdW5jdGlvbiBpc1JlYWRvbmx5QmlkaU1hcDxLLCBWPihpdGVyYWJsZTogSXRlcmFibGU8W0ssIFZdPiB8IGFueSk6IGl0ZXJhYmxlIGlzIFJlYWRvbmx5QmlkaU1hcDxLLCBWPiB7XG4gICAgcmV0dXJuIGl0ZXJhYmxlIGluc3RhbmNlb2YgQWJzdHJhY3RCaWRpTWFwO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmlkaU1hcDxLLCBWPiBleHRlbmRzIFJlYWRvbmx5QmlkaU1hcDxLLCBWPiwgTWFwPEssIFY+IHtcbiAgcmVhZG9ubHkgaW52ZXJzZTogQmlkaU1hcDxWLCBLPjtcbiAgZGVkdXBlKCk6IEJpZGlNYXA8SywgVj47XG4gIGZvckVhY2goY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBrZXk6IEssIG1hcDogQmlkaU1hcDxLLCBWPikgPT4gdm9pZCwgdGhpc0FyZz86IGFueSk6IHZvaWQ7XG59XG5leHBvcnQgbmFtZXNwYWNlIEJpZGlNYXAge1xuICBleHBvcnQgZnVuY3Rpb24gaXNCaWRpTWFwPEssIFY+KGl0ZXJhYmxlOiBJdGVyYWJsZTxbSywgVl0+IHwgYW55KTogaXRlcmFibGUgaXMgQmlkaU1hcDxLLCBWPiB7XG4gICAgcmV0dXJuIGl0ZXJhYmxlIGluc3RhbmNlb2YgQWJzdHJhY3RCaWRpTWFwO1xuICB9XG59XG5cbmFic3RyYWN0IGNsYXNzIEFic3RyYWN0QmlkaU1hcDxLLCBWPiBpbXBsZW1lbnRzIEJpZGlNYXA8SywgVj4ge1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVhZG9ubHkgeFRvWTogTWFwPEssIFY+O1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVhZG9ubHkgeVRvWDogTWFwPFYsIEs+O1xuXG4gIGFic3RyYWN0IHJlYWRvbmx5IGludmVyc2U6IEJpZGlNYXA8ViwgSz47XG4gIHJlYWRvbmx5IFtTeW1ib2wudG9TdHJpbmdUYWddOiAnTWFwJyA9ICdNYXAnO1xuXG4gIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS5zaXplO1xuICB9XG5cbiAgZGVkdXBlKCk6IEJpZGlNYXA8SywgVj4ge1xuICAgIGNvbnN0IGludmVyc2VMaWtlOiBCaWRpTWFwPFYsIEs+ID0gbmV3IER1YWxCaWRpTWFwPFYsIEs+KHRoaXMuaW52ZXJzZSk7XG4gICAgcmV0dXJuIG5ldyBEdWFsQmlkaU1hcDxLLCBWPihpbnZlcnNlTGlrZS5pbnZlcnNlKTtcbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMueFRvWS5jbGVhcigpO1xuICAgIHRoaXMueVRvWC5jbGVhcigpO1xuICB9XG5cbiAgZGVsZXRlKGtleTogSyk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnhUb1kuaGFzKGtleSkpIHtcbiAgICAgIGNvbnN0IHZhbHVlOiBWID0gdGhpcy54VG9ZLmdldChrZXkpITtcbiAgICAgIGlmICh0aGlzLnlUb1guaGFzKHZhbHVlKSAmJiB0aGlzLnlUb1guZ2V0KHZhbHVlKSA9PT0ga2V5KSB7XG4gICAgICAgIHRoaXMueVRvWC5kZWxldGUodmFsdWUhKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMueFRvWS5kZWxldGUoa2V5KTtcbiAgfVxuXG4gIGZvckVhY2goY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBrZXk6IEssIG1hcDogQmlkaU1hcDxLLCBWPikgPT4gdm9pZCwgdGhpc0FyZz86IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnKTtcbiAgfVxuXG4gIGdldChrZXk6IEspOiBWIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy54VG9ZLmdldChrZXkpO1xuICB9XG5cbiAgaGFzKGtleTogSyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnhUb1kuaGFzKGtleSk7XG4gIH1cblxuICBzZXQoa2V5OiBLLCB2YWx1ZTogVik6IHRoaXMge1xuICAgIHRoaXMueFRvWS5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgdGhpcy55VG9YLnNldCh2YWx1ZSwga2V5KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIFtTeW1ib2wuaXRlcmF0b3JdKCk6IEl0ZXJhYmxlSXRlcmF0b3I8W0ssIFZdPiB7XG4gICAgcmV0dXJuIHRoaXMueFRvWVtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIH1cblxuICBlbnRyaWVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8W0ssIFZdPiB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS5lbnRyaWVzKCk7XG4gIH1cblxuICBrZXlzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Sz4ge1xuICAgIHJldHVybiB0aGlzLnhUb1kua2V5cygpO1xuICB9XG5cbiAgdmFsdWVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Vj4ge1xuICAgIHJldHVybiB0aGlzLnhUb1kudmFsdWVzKCk7XG4gIH1cblxuICB0b0pTT04oKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy54VG9ZLnRvSlNPTigpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEdWFsQmlkaU1hcDxLLCBWPiBleHRlbmRzIEFic3RyYWN0QmlkaU1hcDxLLCBWPiB7XG4gIHByb3RlY3RlZCByZWFkb25seSB4VG9ZOiBNYXA8SywgVj47XG4gIHByb3RlY3RlZCByZWFkb25seSB5VG9YOiBNYXA8ViwgSz47XG4gIHJlYWRvbmx5IGludmVyc2U6IEJpZGlNYXA8ViwgSz47XG5cbiAgY29uc3RydWN0b3IoZW50cmllcz86IEl0ZXJhYmxlPFtLLCBWXT4gfCBudWxsKTtcbiAgY29uc3RydWN0b3IoYmlkaW1hcDogUmVhZG9ubHlCaWRpTWFwPEssIFY+KTtcbiAgY29uc3RydWN0b3IoZW50cmllcz86IEl0ZXJhYmxlPFtLLCBWXT4gfCBSZWFkb25seUJpZGlNYXA8SywgVj4gfCBudWxsKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAoUmVhZG9ubHlCaWRpTWFwLmlzUmVhZG9ubHlCaWRpTWFwPEssIFY+KGVudHJpZXMpKSB7XG4gICAgICBjb25zdCBiaWRpbWFwOiBSZWFkb25seUJpZGlNYXA8SywgVj4gPSBlbnRyaWVzO1xuICAgICAgdGhpcy54VG9ZID0gbmV3IE1hcDxLLCBWPihiaWRpbWFwKTtcbiAgICAgIHRoaXMueVRvWCA9IG5ldyBNYXA8ViwgSz4oYmlkaW1hcC5pbnZlcnNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy54VG9ZID0gbmV3IE1hcDxLLCBWPigpO1xuICAgICAgdGhpcy55VG9YID0gbmV3IE1hcDxWLCBLPigpO1xuICAgICAgaWYgKGVudHJpZXMgIT09IG51bGwgJiYgZW50cmllcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGVudHJpZXMpIHtcbiAgICAgICAgICB0aGlzLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmludmVyc2UgPSBuZXcgSW52ZXJzZUJpZGlNYXA8ViwgSz4odGhpcywgdGhpcy55VG9YLCB0aGlzLnhUb1kpO1xuICB9XG59XG5cbmNsYXNzIEludmVyc2VCaWRpTWFwPEssIFY+IGV4dGVuZHMgQWJzdHJhY3RCaWRpTWFwPEssIFY+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcmVhZG9ubHkgaW52ZXJzZTogQmlkaU1hcDxWLCBLPixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgeFRvWTogTWFwPEssIFY+LFxuICAgIHByb3RlY3RlZCByZWFkb25seSB5VG9YOiBNYXA8ViwgSz5cbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufSIsImV4cG9ydCB7IFJlYWRvbmx5QmlkaU1hcCwgQmlkaU1hcCwgRHVhbEJpZGlNYXAgfSBmcm9tICcuL2JpZGltYXAnO1xuZXhwb3J0IHsgUmVhZG9ubHlNdWx0aUJpZGlNYXAsIE11bHRpQmlkaU1hcCwgRHVhbE11bHRpQmlkaU1hcCB9IGZyb20gJy4vbXVsdGliaWRpbWFwJzsiLCJpbXBvcnQgeyBSZWFkb25seUJpZGlNYXAsIEJpZGlNYXAsIER1YWxCaWRpTWFwIH0gZnJvbSAnLi9iaWRpbWFwJztcblxuZXhwb3J0IGludGVyZmFjZSBSZWFkb25seU11bHRpQmlkaU1hcDxLLCBWPiBleHRlbmRzIFJlYWRvbmx5QmlkaU1hcDxLLCBWPiB7XG4gIGhhc0FueShrZXk6IEspOiBib29sZWFuO1xuICBoYXMoa2V5OiBLLCB2YWx1ZT86IFYpOiBib29sZWFuO1xuICBnZXRBbGwoa2V5OiBLKTogSXRlcmFibGVJdGVyYXRvcjxWPjtcbiAgZW50cmllc0FsbCgpOiBJdGVyYWJsZUl0ZXJhdG9yPFtLLCBJdGVyYWJsZUl0ZXJhdG9yPFY+XT47XG4gIGtleXNBbGwoKTogSXRlcmFibGVJdGVyYXRvcjxLPjtcbiAgdmFsdWVzQWxsKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Vj47XG4gIHJlYWRvbmx5IGludmVyc2U6IFJlYWRvbmx5TXVsdGlCaWRpTWFwPFYsIEs+O1xuICBkZWR1cGUoKTogUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj47XG4gIGZvckVhY2goY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBrZXk6IEssIG1hcDogUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkO1xufVxuZXhwb3J0IG5hbWVzcGFjZSBSZWFkb25seU11bHRpQmlkaU1hcCB7XG4gIGV4cG9ydCBmdW5jdGlvbiBpc1JlYWRvbmx5TXVsdGlCaWRpTWFwPEssIFY+KGl0ZXJhYmxlOiBJdGVyYWJsZTxbSywgVl0+IHwgYW55KTogaXRlcmFibGUgaXMgUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj4ge1xuICAgIHJldHVybiBpdGVyYWJsZSBpbnN0YW5jZW9mIEFic3RyYWN0TXVsdGlCaWRpTWFwO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTXVsdGlCaWRpTWFwPEssIFY+IGV4dGVuZHMgUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj4sIEJpZGlNYXA8SywgVj4ge1xuICBkZWxldGUoa2V5OiBLLCB2YWx1ZT86IFYpOiBib29sZWFuO1xuICBoYXMoa2V5OiBLLCB2YWx1ZT86IFYpOiBib29sZWFuO1xuICByZWFkb25seSBpbnZlcnNlOiBNdWx0aUJpZGlNYXA8ViwgSz47XG4gIGRlZHVwZSgpOiBNdWx0aUJpZGlNYXA8SywgVj47XG4gIGZvckVhY2goY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBrZXk6IEssIG1hcDogTXVsdGlCaWRpTWFwPEssIFY+KSA9PiB2b2lkLCB0aGlzQXJnPzogYW55KTogdm9pZDtcbn1cbmV4cG9ydCBuYW1lc3BhY2UgTXVsdGlCaWRpTWFwIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIGlzTXVsdGlCaWRpTWFwPEssIFY+KGl0ZXJhYmxlOiBJdGVyYWJsZTxbSywgVl0+IHwgYW55KTogaXRlcmFibGUgaXMgTXVsdGlCaWRpTWFwPEssIFY+IHtcbiAgICByZXR1cm4gaXRlcmFibGUgaW5zdGFuY2VvZiBBYnN0cmFjdE11bHRpQmlkaU1hcDtcbiAgfVxufVxuXG5hYnN0cmFjdCBjbGFzcyBBYnN0cmFjdE11bHRpQmlkaU1hcDxLLCBWPiBpbXBsZW1lbnRzIE11bHRpQmlkaU1hcDxLLCBWPiB7XG4gIHByb3RlY3RlZCBzdGF0aWMgcmVhZG9ubHkgcHJvdGVjdGVkRmxhZyA9IFN5bWJvbCgncHJvdGVjdGVkJyk7XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IHJlYWRvbmx5IGJpZGltYXA6IEJpZGlNYXA8SywgVj47XG4gIHByb3RlY3RlZCBhYnN0cmFjdCByZWFkb25seSB4VG9ZczogTWFwPEssIFNldDxWPj47XG4gIHByb3RlY3RlZCBhYnN0cmFjdCByZWFkb25seSB5VG9YczogTWFwPFYsIFNldDxLPj47XG5cbiAgYWJzdHJhY3QgcmVhZG9ubHkgaW52ZXJzZTogTXVsdGlCaWRpTWFwPFYsIEs+O1xuICByZWFkb25seSBbU3ltYm9sLnRvU3RyaW5nVGFnXTogJ01hcCcgPSAnTWFwJztcblxuICBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmJpZGltYXAuc2l6ZTtcbiAgfTtcblxuICBwcml2YXRlIHN0YXRpYyBkZWxldGVBTUFQPEssIFY+KG1hcDogTWFwPEssIFNldDxWPj4sIGtleTogSywgdmFsdWU6IFYsIHZhbHVlczA/OiBTZXQ8Vj4pIHtcbiAgICBpZiAobWFwLmhhcyhrZXkpKSB7XG4gICAgICBjb25zdCB2YWx1ZXM6IFNldDxWPiA9IHZhbHVlczAgfHwgbWFwLmdldChrZXkpITtcbiAgICAgIHZhbHVlcy5kZWxldGUodmFsdWUpO1xuICAgICAgaWYgKHZhbHVlcy5zaXplID09PSAwKSB7XG4gICAgICAgIG1hcC5kZWxldGUoa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkZWxldGUoa2V5OiBLLCB2YWx1ZT86IFYpOiBib29sZWFuO1xuICBkZWxldGUoLi4uYXJnczogW0ssIFY/XSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGtleTogSyA9IGFyZ3NbMF07XG5cbiAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGlmICh0aGlzLnhUb1lzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWVzOiBTZXQ8Vj4gPSB0aGlzLnhUb1lzLmdldChrZXkpITtcbiAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICAgICAgaWYgKHZhbHVlcy5oYXModmFsdWUpICYmIHRoaXMueVRvWHMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgICBEdWFsTXVsdGlCaWRpTWFwLmRlbGV0ZUFNQVAodGhpcy54VG9Zcywga2V5LCB2YWx1ZSwgdmFsdWVzKTtcbiAgICAgICAgICAgICAgRHVhbE11bHRpQmlkaU1hcC5kZWxldGVBTUFQKHRoaXMueVRvWHMsIHZhbHVlLCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5iaWRpbWFwLmRlbGV0ZShrZXkpO1xuXG4gICAgICBjYXNlIDI6XG4gICAgICAgIGNvbnN0IHZhbHVlOiBWID0gYXJnc1sxXSE7XG4gICAgICAgIGlmICh0aGlzLnhUb1lzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgaWYgKHRoaXMuYmlkaW1hcC5oYXMoa2V5KSAmJiB0aGlzLmJpZGltYXAuZ2V0KGtleSkgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmJpZGltYXAuZGVsZXRlKGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHZhbHVlczogU2V0PFY+ID0gdGhpcy54VG9Zcy5nZXQoa2V5KSE7XG4gICAgICAgICAgaWYgKHZhbHVlcy5oYXModmFsdWUpICYmIHRoaXMueVRvWHMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgRHVhbE11bHRpQmlkaU1hcC5kZWxldGVBTUFQKHRoaXMueFRvWXMsIGtleSwgdmFsdWUsIHZhbHVlcyk7XG4gICAgICAgICAgICBEdWFsTXVsdGlCaWRpTWFwLmRlbGV0ZUFNQVAodGhpcy55VG9YcywgdmFsdWUsIGtleSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXNBbnkoa2V5OiBLKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMueFRvWXMuaGFzKGtleSkgJiZcbiAgICAgIHRoaXMueFRvWXMuZ2V0KGtleSkhLnNpemUgPiAwO1xuICB9XG5cbiAgaGFzKGtleTogSywgdmFsdWU/OiBWKTogYm9vbGVhbjtcbiAgaGFzKC4uLmFyZ3M6IFtLLCBWP10pOiBib29sZWFuIHtcbiAgICBjb25zdCBrZXk6IEsgPSBhcmdzWzBdO1xuXG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gdGhpcy5iaWRpbWFwLmhhcyhrZXkpO1xuXG4gICAgICBjYXNlIDI6XG4gICAgICAgIGNvbnN0IHZhbHVlOiBWID0gYXJnc1sxXSE7XG4gICAgICAgIGlmICh0aGlzLnhUb1lzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWVzOiBTZXQ8Vj4gPSB0aGlzLnhUb1lzLmdldChrZXkpITtcbiAgICAgICAgICByZXR1cm4gdmFsdWVzLmhhcyh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0QWxsKGtleTogSyk6IEl0ZXJhYmxlSXRlcmF0b3I8Vj4ge1xuICAgIGlmICh0aGlzLnhUb1lzLmhhcyhrZXkpKSB7XG4gICAgICBjb25zdCB2YWx1ZXM6IFNldDxWPiA9IHRoaXMueFRvWXMuZ2V0KGtleSkhO1xuICAgICAgcmV0dXJuIHZhbHVlc1tTeW1ib2wuaXRlcmF0b3JdKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8Vj4oKTtcbiAgICAgIHJldHVybiBzZXRbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgIH1cbiAgfVxuXG4gIGVudHJpZXNBbGwoKTogSXRlcmFibGVJdGVyYXRvcjxbSywgSXRlcmFibGVJdGVyYXRvcjxWPl0+IHtcbiAgICBjb25zdCBzZXQgPSBuZXcgU2V0PFtLLCBJdGVyYWJsZUl0ZXJhdG9yPFY+XT4oKTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlc10gb2YgdGhpcy54VG9Zcykge1xuICAgICAgc2V0LmFkZChbXG4gICAgICAgIGtleSxcbiAgICAgICAgdmFsdWVzW1N5bWJvbC5pdGVyYXRvcl0oKVxuICAgICAgXSk7XG4gICAgfVxuICAgIHJldHVybiBzZXRbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAga2V5c0FsbCgpOiBJdGVyYWJsZUl0ZXJhdG9yPEs+IHtcbiAgICByZXR1cm4gdGhpcy54VG9Zcy5rZXlzKCk7XG4gIH1cblxuICB2YWx1ZXNBbGwoKTogSXRlcmFibGVJdGVyYXRvcjxWPiB7XG4gICAgcmV0dXJuIHRoaXMueVRvWHMua2V5cygpO1xuICB9XG5cbiAgZGVkdXBlKCk6IE11bHRpQmlkaU1hcDxLLCBWPiB7XG4gICAgY29uc3QgYmlkaW1hcDogQmlkaU1hcDxLLCBWPiA9IHRoaXMuYmlkaW1hcC5kZWR1cGUoKTtcbiAgICByZXR1cm4gbmV3IER1YWxNdWx0aUJpZGlNYXAoYmlkaW1hcCwgdGhpcy54VG9ZcywgdGhpcy55VG9YcywgQWJzdHJhY3RNdWx0aUJpZGlNYXAucHJvdGVjdGVkRmxhZyk7XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLmJpZGltYXAuY2xlYXIoKTtcbiAgICB0aGlzLnhUb1lzLmNsZWFyKCk7XG4gICAgdGhpcy55VG9Ycy5jbGVhcigpO1xuICB9XG5cbiAgZm9yRWFjaChjYWxsYmFja2ZuOiAodmFsdWU6IFYsIGtleTogSywgbWFwOiBNdWx0aUJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyk7XG4gIH1cblxuICBnZXQoa2V5OiBLKTogViB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcC5nZXQoa2V5KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGFkZFNhZmVseTxLLCBWPihtYXA6IE1hcDxLLCBTZXQ8Vj4+LCBrZXk6IEssIHZhbHVlOiBWKSB7XG4gICAgaWYgKG1hcC5oYXMoa2V5KSkge1xuICAgICAgY29uc3QgdmFsdWVzOiBTZXQ8Vj4gPSBtYXAuZ2V0KGtleSkhO1xuICAgICAgdmFsdWVzLmFkZCh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hcC5zZXQoa2V5LCBuZXcgU2V0KFt2YWx1ZV0pKTtcbiAgICB9XG4gIH1cblxuICBzZXQoa2V5OiBLLCB2YWx1ZTogVik6IHRoaXMge1xuICAgIHRoaXMuYmlkaW1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgRHVhbE11bHRpQmlkaU1hcC5hZGRTYWZlbHkodGhpcy54VG9Zcywga2V5LCB2YWx1ZSk7XG4gICAgRHVhbE11bHRpQmlkaU1hcC5hZGRTYWZlbHkodGhpcy55VG9YcywgdmFsdWUsIGtleSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIFtTeW1ib2wuaXRlcmF0b3JdKCk6IEl0ZXJhYmxlSXRlcmF0b3I8W0ssIFZdPiB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcFtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIH1cblxuICBlbnRyaWVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8W0ssIFZdPiB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcC5lbnRyaWVzKCk7XG4gIH1cblxuICBrZXlzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Sz4ge1xuICAgIHJldHVybiB0aGlzLmJpZGltYXAua2V5cygpO1xuICB9XG5cbiAgdmFsdWVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Vj4ge1xuICAgIHJldHVybiB0aGlzLmJpZGltYXAudmFsdWVzKCk7XG4gIH1cblxuICB0b0pTT04oKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5iaWRpbWFwLnRvSlNPTigpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEdWFsTXVsdGlCaWRpTWFwPEssIFY+IGV4dGVuZHMgQWJzdHJhY3RNdWx0aUJpZGlNYXA8SywgVj4ge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgYmlkaW1hcDogQmlkaU1hcDxLLCBWPjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHhUb1lzOiBNYXA8SywgU2V0PFY+PjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHlUb1hzOiBNYXA8ViwgU2V0PEs+PjtcbiAgcmVhZG9ubHkgaW52ZXJzZTogTXVsdGlCaWRpTWFwPFYsIEs+O1xuXG4gIGNvbnN0cnVjdG9yKGVudHJpZXM/OiBJdGVyYWJsZTxbSywgVl0+IHwgbnVsbCk7XG4gIGNvbnN0cnVjdG9yKG11bHRpYmlkaW1hcDogUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj4pO1xuICBjb25zdHJ1Y3RvcihiaWRpbWFwOiBCaWRpTWFwPEssIFY+LCB4VG9ZczogTWFwPEssIFNldDxWPj4sIHlUb1hzOiBNYXA8ViwgU2V0PEs+PiwgcHJvdGVjdGVkRmxhZzogc3ltYm9sKTtcbiAgY29uc3RydWN0b3IoXG4gICAgZW50cmllcz86IEl0ZXJhYmxlPFtLLCBWXT4gfCBSZWFkb25seU11bHRpQmlkaU1hcDxLLCBWPiB8IG51bGwsXG4gICAgeFRvWXM/OiBNYXA8SywgU2V0PFY+PiwgeVRvWHM/OiBNYXA8ViwgU2V0PEs+PiwgcHJvdGVjdGVkRmxhZz86IHN5bWJvbFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChcbiAgICAgIEJpZGlNYXAuaXNCaWRpTWFwPEssIFY+KGVudHJpZXMpICYmIHhUb1lzIGluc3RhbmNlb2YgTWFwICYmIHlUb1hzIGluc3RhbmNlb2YgTWFwXG4gICAgICAmJiBwcm90ZWN0ZWRGbGFnID09PSBBYnN0cmFjdE11bHRpQmlkaU1hcC5wcm90ZWN0ZWRGbGFnXG4gICAgKSB7XG4gICAgICBjb25zdCBiaWRpbWFwOiBCaWRpTWFwPEssIFY+ID0gZW50cmllcztcbiAgICAgIHRoaXMuYmlkaW1hcCA9IGJpZGltYXA7XG4gICAgICB0aGlzLnhUb1lzID0geFRvWXM7XG4gICAgICB0aGlzLnlUb1hzID0geVRvWHM7XG5cbiAgICB9IGVsc2UgaWYgKFJlYWRvbmx5TXVsdGlCaWRpTWFwLmlzUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj4oZW50cmllcykpIHtcbiAgICAgIGNvbnN0IG11bHRpYmlkaW1hcDogUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj4gPSBlbnRyaWVzO1xuICAgICAgdGhpcy5iaWRpbWFwID0gbmV3IER1YWxCaWRpTWFwPEssIFY+KG11bHRpYmlkaW1hcCk7XG4gICAgICB0aGlzLnhUb1lzID0gbmV3IE1hcDxLLCBTZXQ8Vj4+KCk7XG4gICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlc10gb2YgbXVsdGliaWRpbWFwLmVudHJpZXNBbGwoKSkge1xuICAgICAgICB0aGlzLnhUb1lzLnNldChrZXksIG5ldyBTZXQ8Vj4odmFsdWVzKSk7XG4gICAgICB9XG4gICAgICB0aGlzLnlUb1hzID0gbmV3IE1hcDxWLCBTZXQ8Sz4+KCk7XG4gICAgICBmb3IgKGNvbnN0IFt2YWx1ZSwga2V5c10gb2YgbXVsdGliaWRpbWFwLmludmVyc2UuZW50cmllc0FsbCgpKSB7XG4gICAgICAgIHRoaXMueVRvWHMuc2V0KHZhbHVlLCBuZXcgU2V0PEs+KGtleXMpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5iaWRpbWFwID0gbmV3IER1YWxCaWRpTWFwPEssIFY+KCk7XG4gICAgICB0aGlzLnhUb1lzID0gbmV3IE1hcDxLLCBTZXQ8Vj4+KCk7XG4gICAgICB0aGlzLnlUb1hzID0gbmV3IE1hcDxWLCBTZXQ8Sz4+KCk7XG4gICAgICBpZiAoZW50cmllcyAhPT0gbnVsbCAmJiBlbnRyaWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZW50cmllcykge1xuICAgICAgICAgIHRoaXMuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaW52ZXJzZSA9IG5ldyBJbnZlcnNlTXVsdGlCaWRpTWFwPFYsIEs+KHRoaXMsIHRoaXMuYmlkaW1hcC5pbnZlcnNlLCB0aGlzLnlUb1hzLCB0aGlzLnhUb1lzKTtcbiAgfVxufVxuXG5jbGFzcyBJbnZlcnNlTXVsdGlCaWRpTWFwPEssIFY+IGV4dGVuZHMgQWJzdHJhY3RNdWx0aUJpZGlNYXA8SywgVj4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICByZWFkb25seSBpbnZlcnNlOiBNdWx0aUJpZGlNYXA8ViwgSz4sXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGJpZGltYXA6IEJpZGlNYXA8SywgVj4sXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IHhUb1lzOiBNYXA8SywgU2V0PFY+PixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgeVRvWHM6IE1hcDxWLCBTZXQ8Sz4+XG4gICkge1xuICAgIHN1cGVyKCk7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9