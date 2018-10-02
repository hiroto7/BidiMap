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
    constructor(entries, ...args) {
        this[Symbol.toStringTag] = 'Map';
        if (entries instanceof DualMultiBidiMap && args[0] === DualMultiBidiMap.inverseFlag) {
            const inverse = entries;
            this.bidimap = inverse.bidimap.inverse;
            this.xToYs = inverse.yToXs;
            this.yToXs = inverse.xToYs;
            this.inverse = inverse;
        }
        else {
            if (entries instanceof bidimap_1.DualBidiMap &&
                args[0] instanceof Map && args[1] instanceof Map &&
                args[2] === DualMultiBidiMap.privateFlag) {
                const bidimap = entries;
                const xToYs = args[0];
                const yToXs = args[1];
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
            this.inverse = new DualMultiBidiMap(this, DualMultiBidiMap.inverseFlag);
        }
    }
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
    dedupe() {
        const bidimap = this.bidimap.dedupe();
        return new DualMultiBidiMap(bidimap, this.xToYs, this.yToXs, DualMultiBidiMap.privateFlag);
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
DualMultiBidiMap.inverseFlag = Symbol('inverse');
DualMultiBidiMap.privateFlag = Symbol('private');
exports.DualMultiBidiMap = DualMultiBidiMap;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvYmlkaW1hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL211bHRpYmlkaW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDN0VBLElBQWlCLGVBQWUsQ0FJL0I7QUFKRCxXQUFpQixlQUFlO0lBQzlCLFNBQWdCLGlCQUFpQixDQUFPLFFBQWdDO1FBQ3RFLE9BQU8sUUFBUSxZQUFZLGVBQWUsQ0FBQztJQUM3QyxDQUFDO0lBRmUsaUNBQWlCLG9CQUVo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LENBQUMsQ0FBQztBQUNoQyw0QkFBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUYxRCw0Q0EyTEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZXhwb3J0IGludGVyZmFjZSBSZWFkb25seUJpZGlNYXA8SywgVj4gZXh0ZW5kcyBSZWFkb25seU1hcDxLLCBWPiB7XG4gIHJlYWRvbmx5IGludmVyc2U6IFJlYWRvbmx5QmlkaU1hcDxWLCBLPjtcbiAgZGVkdXBlKCk6IFJlYWRvbmx5QmlkaU1hcDxLLCBWPjtcbiAgZm9yRWFjaChjYWxsYmFja2ZuOiAodmFsdWU6IFYsIGtleTogSywgbWFwOiBSZWFkb25seUJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkO1xufVxuZXhwb3J0IG5hbWVzcGFjZSBSZWFkb25seUJpZGlNYXAge1xuICBleHBvcnQgZnVuY3Rpb24gaXNSZWFkb25seUJpZGlNYXA8SywgVj4oaXRlcmFibGU6IEl0ZXJhYmxlPFtLLCBWXT4gfCBhbnkpOiBpdGVyYWJsZSBpcyBSZWFkb25seUJpZGlNYXA8SywgVj4ge1xuICAgIHJldHVybiBpdGVyYWJsZSBpbnN0YW5jZW9mIEFic3RyYWN0QmlkaU1hcDtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJpZGlNYXA8SywgVj4gZXh0ZW5kcyBSZWFkb25seUJpZGlNYXA8SywgVj4sIE1hcDxLLCBWPiB7XG4gIHJlYWRvbmx5IGludmVyc2U6IEJpZGlNYXA8ViwgSz47XG4gIGRlZHVwZSgpOiBCaWRpTWFwPEssIFY+O1xuICBmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogViwga2V5OiBLLCBtYXA6IEJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkO1xufVxuZXhwb3J0IG5hbWVzcGFjZSBCaWRpTWFwIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIGlzQmlkaU1hcDxLLCBWPihpdGVyYWJsZTogSXRlcmFibGU8W0ssIFZdPiB8IGFueSk6IGl0ZXJhYmxlIGlzIEJpZGlNYXA8SywgVj4ge1xuICAgIHJldHVybiBpdGVyYWJsZSBpbnN0YW5jZW9mIEFic3RyYWN0QmlkaU1hcDtcbiAgfVxufVxuXG5hYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEJpZGlNYXA8SywgVj4gaW1wbGVtZW50cyBCaWRpTWFwPEssIFY+IHtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHJlYWRvbmx5IHhUb1k6IE1hcDxLLCBWPjtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHJlYWRvbmx5IHlUb1g6IE1hcDxWLCBLPjtcblxuICBhYnN0cmFjdCByZWFkb25seSBpbnZlcnNlOiBCaWRpTWFwPFYsIEs+O1xuICByZWFkb25seSBbU3ltYm9sLnRvU3RyaW5nVGFnXTogJ01hcCcgPSAnTWFwJztcblxuICBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnhUb1kuc2l6ZTtcbiAgfVxuXG4gIGRlZHVwZSgpOiBCaWRpTWFwPEssIFY+IHtcbiAgICBjb25zdCBpbnZlcnNlTGlrZTogQmlkaU1hcDxWLCBLPiA9IG5ldyBEdWFsQmlkaU1hcDxWLCBLPih0aGlzLmludmVyc2UpO1xuICAgIHJldHVybiBuZXcgRHVhbEJpZGlNYXA8SywgVj4oaW52ZXJzZUxpa2UuaW52ZXJzZSk7XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLnhUb1kuY2xlYXIoKTtcbiAgICB0aGlzLnlUb1guY2xlYXIoKTtcbiAgfVxuXG4gIGRlbGV0ZShrZXk6IEspOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy54VG9ZLmhhcyhrZXkpKSB7XG4gICAgICBjb25zdCB2YWx1ZTogViA9IHRoaXMueFRvWS5nZXQoa2V5KSE7XG4gICAgICBpZiAodGhpcy55VG9YLmhhcyh2YWx1ZSkgJiYgdGhpcy55VG9YLmdldCh2YWx1ZSkgPT09IGtleSkge1xuICAgICAgICB0aGlzLnlUb1guZGVsZXRlKHZhbHVlISk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnhUb1kuZGVsZXRlKGtleSk7XG4gIH1cblxuICBmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogViwga2V5OiBLLCBtYXA6IEJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyk7XG4gIH1cblxuICBnZXQoa2V5OiBLKTogViB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS5nZXQoa2V5KTtcbiAgfVxuXG4gIGhhcyhrZXk6IEspOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy54VG9ZLmhhcyhrZXkpO1xuICB9XG5cbiAgc2V0KGtleTogSywgdmFsdWU6IFYpOiB0aGlzIHtcbiAgICB0aGlzLnhUb1kuc2V0KGtleSwgdmFsdWUpO1xuICAgIHRoaXMueVRvWC5zZXQodmFsdWUsIGtleSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYWJsZUl0ZXJhdG9yPFtLLCBWXT4ge1xuICAgIHJldHVybiB0aGlzLnhUb1lbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAgZW50cmllcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFtLLCBWXT4ge1xuICAgIHJldHVybiB0aGlzLnhUb1kuZW50cmllcygpO1xuICB9XG5cbiAga2V5cygpOiBJdGVyYWJsZUl0ZXJhdG9yPEs+IHtcbiAgICByZXR1cm4gdGhpcy54VG9ZLmtleXMoKTtcbiAgfVxuXG4gIHZhbHVlcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFY+IHtcbiAgICByZXR1cm4gdGhpcy54VG9ZLnZhbHVlcygpO1xuICB9XG5cbiAgdG9KU09OKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS50b0pTT04oKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRHVhbEJpZGlNYXA8SywgVj4gZXh0ZW5kcyBBYnN0cmFjdEJpZGlNYXA8SywgVj4ge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgeFRvWTogTWFwPEssIFY+O1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgeVRvWDogTWFwPFYsIEs+O1xuICByZWFkb25seSBpbnZlcnNlOiBCaWRpTWFwPFYsIEs+O1xuXG4gIGNvbnN0cnVjdG9yKGVudHJpZXM/OiBJdGVyYWJsZTxbSywgVl0+IHwgbnVsbCk7XG4gIGNvbnN0cnVjdG9yKGJpZGltYXA6IFJlYWRvbmx5QmlkaU1hcDxLLCBWPik7XG4gIGNvbnN0cnVjdG9yKGVudHJpZXM/OiBJdGVyYWJsZTxbSywgVl0+IHwgUmVhZG9ubHlCaWRpTWFwPEssIFY+IHwgbnVsbCkge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKFJlYWRvbmx5QmlkaU1hcC5pc1JlYWRvbmx5QmlkaU1hcDxLLCBWPihlbnRyaWVzKSkge1xuICAgICAgY29uc3QgYmlkaW1hcDogUmVhZG9ubHlCaWRpTWFwPEssIFY+ID0gZW50cmllcztcbiAgICAgIHRoaXMueFRvWSA9IG5ldyBNYXA8SywgVj4oYmlkaW1hcCk7XG4gICAgICB0aGlzLnlUb1ggPSBuZXcgTWFwPFYsIEs+KGJpZGltYXAuaW52ZXJzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMueFRvWSA9IG5ldyBNYXA8SywgVj4oKTtcbiAgICAgIHRoaXMueVRvWCA9IG5ldyBNYXA8ViwgSz4oKTtcbiAgICAgIGlmIChlbnRyaWVzICE9PSBudWxsICYmIGVudHJpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pbnZlcnNlID0gbmV3IEludmVyc2VCaWRpTWFwPFYsIEs+KHRoaXMsIHRoaXMueVRvWCwgdGhpcy54VG9ZKTtcbiAgfVxufVxuXG5jbGFzcyBJbnZlcnNlQmlkaU1hcDxLLCBWPiBleHRlbmRzIEFic3RyYWN0QmlkaU1hcDxLLCBWPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlYWRvbmx5IGludmVyc2U6IEJpZGlNYXA8ViwgSz4sXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IHhUb1k6IE1hcDxLLCBWPixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgeVRvWDogTWFwPFYsIEs+XG4gICkge1xuICAgIHN1cGVyKCk7XG4gIH1cbn0iLCJleHBvcnQgeyBSZWFkb25seUJpZGlNYXAsIEJpZGlNYXAsIER1YWxCaWRpTWFwIH0gZnJvbSAnLi9iaWRpbWFwJztcbmV4cG9ydCB7IFJlYWRvbmx5TXVsdGlCaWRpTWFwLCBNdWx0aUJpZGlNYXAsIER1YWxNdWx0aUJpZGlNYXAgfSBmcm9tICcuL211bHRpYmlkaW1hcCc7IiwiaW1wb3J0IHsgUmVhZG9ubHlCaWRpTWFwLCBCaWRpTWFwLCBEdWFsQmlkaU1hcCB9IGZyb20gJy4vYmlkaW1hcCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj4gZXh0ZW5kcyBSZWFkb25seUJpZGlNYXA8SywgVj4ge1xuICBoYXNBbnkoa2V5OiBLKTogYm9vbGVhbjtcbiAgaGFzKGtleTogSywgdmFsdWU/OiBWKTogYm9vbGVhbjtcbiAgZ2V0QWxsKGtleTogSyk6IEl0ZXJhYmxlSXRlcmF0b3I8Vj47XG4gIHJlYWRvbmx5IGludmVyc2U6IFJlYWRvbmx5TXVsdGlCaWRpTWFwPFYsIEs+O1xuICBkZWR1cGUoKTogUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj47XG4gIGZvckVhY2goY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBrZXk6IEssIG1hcDogUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE11bHRpQmlkaU1hcDxLLCBWPiBleHRlbmRzIFJlYWRvbmx5TXVsdGlCaWRpTWFwPEssIFY+LCBCaWRpTWFwPEssIFY+IHtcbiAgZGVsZXRlKGtleTogSywgdmFsdWU/OiBWKTogYm9vbGVhbjtcbiAgaGFzKGtleTogSywgdmFsdWU/OiBWKTogYm9vbGVhbjtcbiAgcmVhZG9ubHkgaW52ZXJzZTogTXVsdGlCaWRpTWFwPFYsIEs+O1xuICBkZWR1cGUoKTogTXVsdGlCaWRpTWFwPEssIFY+O1xuICBmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogViwga2V5OiBLLCBtYXA6IE11bHRpQmlkaU1hcDxLLCBWPikgPT4gdm9pZCwgdGhpc0FyZz86IGFueSk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBEdWFsTXVsdGlCaWRpTWFwPEssIFY+IGltcGxlbWVudHMgTXVsdGlCaWRpTWFwPEssIFY+IHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgaW52ZXJzZUZsYWcgPSBTeW1ib2woJ2ludmVyc2UnKTtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgcHJpdmF0ZUZsYWcgPSBTeW1ib2woJ3ByaXZhdGUnKTtcbiAgcHJpdmF0ZSByZWFkb25seSBiaWRpbWFwOiBCaWRpTWFwPEssIFY+O1xuICBwcml2YXRlIHJlYWRvbmx5IHhUb1lzOiBNYXA8SywgU2V0PFY+PjtcbiAgcHJpdmF0ZSByZWFkb25seSB5VG9YczogTWFwPFYsIFNldDxLPj47XG4gIHJlYWRvbmx5IGludmVyc2U6IE11bHRpQmlkaU1hcDxWLCBLPjtcblxuICBjb25zdHJ1Y3RvcihlbnRyaWVzPzogSXRlcmFibGU8W0ssIFZdPiB8IG51bGwpO1xuICBjb25zdHJ1Y3RvcihiaWRpbWFwOiBCaWRpTWFwPEssIFY+LCB4VG9ZczogTWFwPEssIFNldDxWPj4sIHlUb1hzOiBNYXA8ViwgU2V0PEs+PiwgcHJpdmF0ZUZsYWc6IHN5bWJvbCk7XG4gIGNvbnN0cnVjdG9yKGludmVyc2U6IER1YWxNdWx0aUJpZGlNYXA8ViwgSz4sIGludmVyc2VGbGFnOiBzeW1ib2wpO1xuICBjb25zdHJ1Y3RvcihlbnRyaWVzPzogSXRlcmFibGU8W0ssIFZdPiB8IG51bGwsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgaWYgKGVudHJpZXMgaW5zdGFuY2VvZiBEdWFsTXVsdGlCaWRpTWFwICYmIGFyZ3NbMF0gPT09IER1YWxNdWx0aUJpZGlNYXAuaW52ZXJzZUZsYWcpIHtcbiAgICAgIGNvbnN0IGludmVyc2U6IER1YWxNdWx0aUJpZGlNYXA8ViwgSz4gPSBlbnRyaWVzO1xuICAgICAgdGhpcy5iaWRpbWFwID0gaW52ZXJzZS5iaWRpbWFwLmludmVyc2U7XG4gICAgICB0aGlzLnhUb1lzID0gaW52ZXJzZS55VG9YcztcbiAgICAgIHRoaXMueVRvWHMgPSBpbnZlcnNlLnhUb1lzO1xuICAgICAgdGhpcy5pbnZlcnNlID0gaW52ZXJzZTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZW50cmllcyBpbnN0YW5jZW9mIER1YWxCaWRpTWFwICYmXG4gICAgICAgIGFyZ3NbMF0gaW5zdGFuY2VvZiBNYXAgJiYgYXJnc1sxXSBpbnN0YW5jZW9mIE1hcCAmJlxuICAgICAgICBhcmdzWzJdID09PSBEdWFsTXVsdGlCaWRpTWFwLnByaXZhdGVGbGFnKSB7XG4gICAgICAgIGNvbnN0IGJpZGltYXA6IEJpZGlNYXA8SywgVj4gPSBlbnRyaWVzO1xuICAgICAgICBjb25zdCB4VG9ZczogTWFwPEssIFNldDxWPj4gPSBhcmdzWzBdO1xuICAgICAgICBjb25zdCB5VG9YczogTWFwPFYsIFNldDxLPj4gPSBhcmdzWzFdO1xuICAgICAgICB0aGlzLmJpZGltYXAgPSBiaWRpbWFwO1xuICAgICAgICB0aGlzLnhUb1lzID0geFRvWXM7XG4gICAgICAgIHRoaXMueVRvWHMgPSB5VG9YcztcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5iaWRpbWFwID0gbmV3IER1YWxCaWRpTWFwKCk7XG4gICAgICAgIHRoaXMueFRvWXMgPSBuZXcgTWFwPEssIFNldDxWPj4oKTtcbiAgICAgICAgdGhpcy55VG9YcyA9IG5ldyBNYXA8ViwgU2V0PEs+PigpO1xuICAgICAgICBpZiAoZW50cmllcyAhPT0gbnVsbCAmJiBlbnRyaWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgICB0aGlzLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5pbnZlcnNlID0gbmV3IER1YWxNdWx0aUJpZGlNYXA8ViwgSz4odGhpcywgRHVhbE11bHRpQmlkaU1hcC5pbnZlcnNlRmxhZyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZGVsZXRlQU1BUDxLLCBWPihtYXA6IE1hcDxLLCBTZXQ8Vj4+LCBrZXk6IEssIHZhbHVlOiBWLCB2YWx1ZXMwPzogU2V0PFY+KSB7XG4gICAgaWYgKG1hcC5oYXMoa2V5KSkge1xuICAgICAgY29uc3QgdmFsdWVzOiBTZXQ8Vj4gPSB2YWx1ZXMwIHx8IG1hcC5nZXQoa2V5KSE7XG4gICAgICB2YWx1ZXMuZGVsZXRlKHZhbHVlKTtcbiAgICAgIGlmICh2YWx1ZXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICBtYXAuZGVsZXRlKGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlKGtleTogSywgdmFsdWU/OiBWKTogYm9vbGVhbjtcbiAgZGVsZXRlKC4uLmFyZ3M6IFtLLCBWP10pOiBib29sZWFuIHtcbiAgICBjb25zdCBrZXk6IEsgPSBhcmdzWzBdO1xuXG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICBpZiAodGhpcy54VG9Zcy5oYXMoa2V5KSkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlczogU2V0PFY+ID0gdGhpcy54VG9Zcy5nZXQoa2V5KSE7XG4gICAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZXMuaGFzKHZhbHVlKSAmJiB0aGlzLnlUb1hzLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgRHVhbE11bHRpQmlkaU1hcC5kZWxldGVBTUFQKHRoaXMueFRvWXMsIGtleSwgdmFsdWUsIHZhbHVlcyk7XG4gICAgICAgICAgICAgIER1YWxNdWx0aUJpZGlNYXAuZGVsZXRlQU1BUCh0aGlzLnlUb1hzLCB2YWx1ZSwga2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYmlkaW1hcC5kZWxldGUoa2V5KTtcblxuICAgICAgY2FzZSAyOlxuICAgICAgICBjb25zdCB2YWx1ZTogViA9IGFyZ3NbMV0hO1xuICAgICAgICBpZiAodGhpcy54VG9Zcy5oYXMoa2V5KSkge1xuICAgICAgICAgIGlmICh0aGlzLmJpZGltYXAuaGFzKGtleSkgJiYgdGhpcy5iaWRpbWFwLmdldChrZXkpID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5iaWRpbWFwLmRlbGV0ZShrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB2YWx1ZXM6IFNldDxWPiA9IHRoaXMueFRvWXMuZ2V0KGtleSkhO1xuICAgICAgICAgIGlmICh2YWx1ZXMuaGFzKHZhbHVlKSAmJiB0aGlzLnlUb1hzLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIER1YWxNdWx0aUJpZGlNYXAuZGVsZXRlQU1BUCh0aGlzLnhUb1lzLCBrZXksIHZhbHVlLCB2YWx1ZXMpO1xuICAgICAgICAgICAgRHVhbE11bHRpQmlkaU1hcC5kZWxldGVBTUFQKHRoaXMueVRvWHMsIHZhbHVlLCBrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFzQW55KGtleTogSyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnhUb1lzLmhhcyhrZXkpICYmXG4gICAgICB0aGlzLnhUb1lzLmdldChrZXkpIS5zaXplID4gMDtcbiAgfVxuXG4gIGhhcyhrZXk6IEssIHZhbHVlPzogVik6IGJvb2xlYW47XG4gIGhhcyguLi5hcmdzOiBbSywgVj9dKTogYm9vbGVhbiB7XG4gICAgY29uc3Qga2V5OiBLID0gYXJnc1swXTtcblxuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIHRoaXMuYmlkaW1hcC5oYXMoa2V5KTtcblxuICAgICAgY2FzZSAyOlxuICAgICAgICBjb25zdCB2YWx1ZTogViA9IGFyZ3NbMV0hO1xuICAgICAgICBpZiAodGhpcy54VG9Zcy5oYXMoa2V5KSkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlczogU2V0PFY+ID0gdGhpcy54VG9Zcy5nZXQoa2V5KSE7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlcy5oYXModmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldEFsbChrZXk6IEspOiBJdGVyYWJsZUl0ZXJhdG9yPFY+IHtcbiAgICBpZiAodGhpcy54VG9Zcy5oYXMoa2V5KSkge1xuICAgICAgY29uc3QgdmFsdWVzOiBTZXQ8Vj4gPSB0aGlzLnhUb1lzLmdldChrZXkpITtcbiAgICAgIHJldHVybiB2YWx1ZXNbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzZXQgPSBuZXcgU2V0PFY+KCk7XG4gICAgICByZXR1cm4gc2V0W1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgICB9XG4gIH1cblxuICBkZWR1cGUoKTogTXVsdGlCaWRpTWFwPEssIFY+IHtcbiAgICBjb25zdCBiaWRpbWFwOiBCaWRpTWFwPEssIFY+ID0gdGhpcy5iaWRpbWFwLmRlZHVwZSgpO1xuICAgIHJldHVybiBuZXcgRHVhbE11bHRpQmlkaU1hcChiaWRpbWFwLCB0aGlzLnhUb1lzLCB0aGlzLnlUb1hzLCBEdWFsTXVsdGlCaWRpTWFwLnByaXZhdGVGbGFnKTtcbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuYmlkaW1hcC5jbGVhcigpO1xuICAgIHRoaXMueFRvWXMuY2xlYXIoKTtcbiAgICB0aGlzLnlUb1hzLmNsZWFyKCk7XG4gIH1cblxuICBmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogViwga2V5OiBLLCBtYXA6IE11bHRpQmlkaU1hcDxLLCBWPikgPT4gdm9pZCwgdGhpc0FyZz86IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnKTtcbiAgfVxuXG4gIGdldChrZXk6IEspOiBWIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5iaWRpbWFwLmdldChrZXkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgYWRkU2FmZWx5PEssIFY+KG1hcDogTWFwPEssIFNldDxWPj4sIGtleTogSywgdmFsdWU6IFYpIHtcbiAgICBpZiAobWFwLmhhcyhrZXkpKSB7XG4gICAgICBjb25zdCB2YWx1ZXM6IFNldDxWPiA9IG1hcC5nZXQoa2V5KSE7XG4gICAgICB2YWx1ZXMuYWRkKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWFwLnNldChrZXksIG5ldyBTZXQoW3ZhbHVlXSkpO1xuICAgIH1cbiAgfVxuXG4gIHNldChrZXk6IEssIHZhbHVlOiBWKTogdGhpcyB7XG4gICAgdGhpcy5iaWRpbWFwLnNldChrZXksIHZhbHVlKTtcbiAgICBEdWFsTXVsdGlCaWRpTWFwLmFkZFNhZmVseSh0aGlzLnhUb1lzLCBrZXksIHZhbHVlKTtcbiAgICBEdWFsTXVsdGlCaWRpTWFwLmFkZFNhZmVseSh0aGlzLnlUb1hzLCB2YWx1ZSwga2V5KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5iaWRpbWFwLnNpemU7XG4gIH07XG5cbiAgcmVhZG9ubHkgW1N5bWJvbC50b1N0cmluZ1RhZ106ICdNYXAnID0gJ01hcCc7XG5cbiAgW1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmFibGVJdGVyYXRvcjxbSywgVl0+IHtcbiAgICByZXR1cm4gdGhpcy5iaWRpbWFwW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgfVxuXG4gIGVudHJpZXMoKTogSXRlcmFibGVJdGVyYXRvcjxbSywgVl0+IHtcbiAgICByZXR1cm4gdGhpcy5iaWRpbWFwLmVudHJpZXMoKTtcbiAgfVxuXG4gIGtleXMoKTogSXRlcmFibGVJdGVyYXRvcjxLPiB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcC5rZXlzKCk7XG4gIH1cblxuICB2YWx1ZXMoKTogSXRlcmFibGVJdGVyYXRvcjxWPiB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcC52YWx1ZXMoKTtcbiAgfVxuXG4gIHRvSlNPTigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmJpZGltYXAudG9KU09OKCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=