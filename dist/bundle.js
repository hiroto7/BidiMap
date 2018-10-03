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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvYmlkaW1hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL211bHRpYmlkaW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDN0VBLElBQWlCLGVBQWUsQ0FJL0I7QUFKRCxXQUFpQixlQUFlO0lBQzlCLFNBQWdCLGlCQUFpQixDQUFPLFFBQWdDO1FBQ3RFLE9BQU8sUUFBUSxZQUFZLGVBQWUsQ0FBQztJQUM3QyxDQUFDO0lBRmUsaUNBQWlCLG9CQUVo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QUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25HLENBQUM7Q0FDRjtBQW5DRCw0Q0FtQ0M7QUFFRCxNQUFNLG1CQUEwQixTQUFRLG9CQUEwQjtJQUNoRSxZQUNXLE9BQTJCLEVBQ2pCLE9BQXNCLEVBQ3RCLEtBQXFCLEVBQ3JCLEtBQXFCO1FBRXhDLEtBQUssRUFBRSxDQUFDO1FBTEMsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUN0QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtJQUcxQyxDQUFDO0NBQ0YiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZXhwb3J0IGludGVyZmFjZSBSZWFkb25seUJpZGlNYXA8SywgVj4gZXh0ZW5kcyBSZWFkb25seU1hcDxLLCBWPiB7XG4gIHJlYWRvbmx5IGludmVyc2U6IFJlYWRvbmx5QmlkaU1hcDxWLCBLPjtcbiAgZGVkdXBlKCk6IFJlYWRvbmx5QmlkaU1hcDxLLCBWPjtcbiAgZm9yRWFjaChjYWxsYmFja2ZuOiAodmFsdWU6IFYsIGtleTogSywgbWFwOiBSZWFkb25seUJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkO1xufVxuZXhwb3J0IG5hbWVzcGFjZSBSZWFkb25seUJpZGlNYXAge1xuICBleHBvcnQgZnVuY3Rpb24gaXNSZWFkb25seUJpZGlNYXA8SywgVj4oaXRlcmFibGU6IEl0ZXJhYmxlPFtLLCBWXT4gfCBhbnkpOiBpdGVyYWJsZSBpcyBSZWFkb25seUJpZGlNYXA8SywgVj4ge1xuICAgIHJldHVybiBpdGVyYWJsZSBpbnN0YW5jZW9mIEFic3RyYWN0QmlkaU1hcDtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJpZGlNYXA8SywgVj4gZXh0ZW5kcyBSZWFkb25seUJpZGlNYXA8SywgVj4sIE1hcDxLLCBWPiB7XG4gIHJlYWRvbmx5IGludmVyc2U6IEJpZGlNYXA8ViwgSz47XG4gIGRlZHVwZSgpOiBCaWRpTWFwPEssIFY+O1xuICBmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogViwga2V5OiBLLCBtYXA6IEJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkO1xufVxuZXhwb3J0IG5hbWVzcGFjZSBCaWRpTWFwIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIGlzQmlkaU1hcDxLLCBWPihpdGVyYWJsZTogSXRlcmFibGU8W0ssIFZdPiB8IGFueSk6IGl0ZXJhYmxlIGlzIEJpZGlNYXA8SywgVj4ge1xuICAgIHJldHVybiBpdGVyYWJsZSBpbnN0YW5jZW9mIEFic3RyYWN0QmlkaU1hcDtcbiAgfVxufVxuXG5hYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEJpZGlNYXA8SywgVj4gaW1wbGVtZW50cyBCaWRpTWFwPEssIFY+IHtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHJlYWRvbmx5IHhUb1k6IE1hcDxLLCBWPjtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHJlYWRvbmx5IHlUb1g6IE1hcDxWLCBLPjtcblxuICBhYnN0cmFjdCByZWFkb25seSBpbnZlcnNlOiBCaWRpTWFwPFYsIEs+O1xuICByZWFkb25seSBbU3ltYm9sLnRvU3RyaW5nVGFnXTogJ01hcCcgPSAnTWFwJztcblxuICBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnhUb1kuc2l6ZTtcbiAgfVxuXG4gIGRlZHVwZSgpOiBCaWRpTWFwPEssIFY+IHtcbiAgICBjb25zdCBpbnZlcnNlTGlrZTogQmlkaU1hcDxWLCBLPiA9IG5ldyBEdWFsQmlkaU1hcDxWLCBLPih0aGlzLmludmVyc2UpO1xuICAgIHJldHVybiBuZXcgRHVhbEJpZGlNYXA8SywgVj4oaW52ZXJzZUxpa2UuaW52ZXJzZSk7XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLnhUb1kuY2xlYXIoKTtcbiAgICB0aGlzLnlUb1guY2xlYXIoKTtcbiAgfVxuXG4gIGRlbGV0ZShrZXk6IEspOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy54VG9ZLmhhcyhrZXkpKSB7XG4gICAgICBjb25zdCB2YWx1ZTogViA9IHRoaXMueFRvWS5nZXQoa2V5KSE7XG4gICAgICBpZiAodGhpcy55VG9YLmhhcyh2YWx1ZSkgJiYgdGhpcy55VG9YLmdldCh2YWx1ZSkgPT09IGtleSkge1xuICAgICAgICB0aGlzLnlUb1guZGVsZXRlKHZhbHVlISk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnhUb1kuZGVsZXRlKGtleSk7XG4gIH1cblxuICBmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogViwga2V5OiBLLCBtYXA6IEJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyk7XG4gIH1cblxuICBnZXQoa2V5OiBLKTogViB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS5nZXQoa2V5KTtcbiAgfVxuXG4gIGhhcyhrZXk6IEspOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy54VG9ZLmhhcyhrZXkpO1xuICB9XG5cbiAgc2V0KGtleTogSywgdmFsdWU6IFYpOiB0aGlzIHtcbiAgICB0aGlzLnhUb1kuc2V0KGtleSwgdmFsdWUpO1xuICAgIHRoaXMueVRvWC5zZXQodmFsdWUsIGtleSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYWJsZUl0ZXJhdG9yPFtLLCBWXT4ge1xuICAgIHJldHVybiB0aGlzLnhUb1lbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAgZW50cmllcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFtLLCBWXT4ge1xuICAgIHJldHVybiB0aGlzLnhUb1kuZW50cmllcygpO1xuICB9XG5cbiAga2V5cygpOiBJdGVyYWJsZUl0ZXJhdG9yPEs+IHtcbiAgICByZXR1cm4gdGhpcy54VG9ZLmtleXMoKTtcbiAgfVxuXG4gIHZhbHVlcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFY+IHtcbiAgICByZXR1cm4gdGhpcy54VG9ZLnZhbHVlcygpO1xuICB9XG5cbiAgdG9KU09OKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS50b0pTT04oKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRHVhbEJpZGlNYXA8SywgVj4gZXh0ZW5kcyBBYnN0cmFjdEJpZGlNYXA8SywgVj4ge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgeFRvWTogTWFwPEssIFY+O1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgeVRvWDogTWFwPFYsIEs+O1xuICByZWFkb25seSBpbnZlcnNlOiBCaWRpTWFwPFYsIEs+O1xuXG4gIGNvbnN0cnVjdG9yKGVudHJpZXM/OiBJdGVyYWJsZTxbSywgVl0+IHwgbnVsbCk7XG4gIGNvbnN0cnVjdG9yKGJpZGltYXA6IFJlYWRvbmx5QmlkaU1hcDxLLCBWPik7XG4gIGNvbnN0cnVjdG9yKGVudHJpZXM/OiBJdGVyYWJsZTxbSywgVl0+IHwgUmVhZG9ubHlCaWRpTWFwPEssIFY+IHwgbnVsbCkge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKFJlYWRvbmx5QmlkaU1hcC5pc1JlYWRvbmx5QmlkaU1hcDxLLCBWPihlbnRyaWVzKSkge1xuICAgICAgY29uc3QgYmlkaW1hcDogUmVhZG9ubHlCaWRpTWFwPEssIFY+ID0gZW50cmllcztcbiAgICAgIHRoaXMueFRvWSA9IG5ldyBNYXA8SywgVj4oYmlkaW1hcCk7XG4gICAgICB0aGlzLnlUb1ggPSBuZXcgTWFwPFYsIEs+KGJpZGltYXAuaW52ZXJzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMueFRvWSA9IG5ldyBNYXA8SywgVj4oKTtcbiAgICAgIHRoaXMueVRvWCA9IG5ldyBNYXA8ViwgSz4oKTtcbiAgICAgIGlmIChlbnRyaWVzICE9PSBudWxsICYmIGVudHJpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pbnZlcnNlID0gbmV3IEludmVyc2VCaWRpTWFwPFYsIEs+KHRoaXMsIHRoaXMueVRvWCwgdGhpcy54VG9ZKTtcbiAgfVxufVxuXG5jbGFzcyBJbnZlcnNlQmlkaU1hcDxLLCBWPiBleHRlbmRzIEFic3RyYWN0QmlkaU1hcDxLLCBWPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlYWRvbmx5IGludmVyc2U6IEJpZGlNYXA8ViwgSz4sXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IHhUb1k6IE1hcDxLLCBWPixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgeVRvWDogTWFwPFYsIEs+XG4gICkge1xuICAgIHN1cGVyKCk7XG4gIH1cbn0iLCJleHBvcnQgeyBSZWFkb25seUJpZGlNYXAsIEJpZGlNYXAsIER1YWxCaWRpTWFwIH0gZnJvbSAnLi9iaWRpbWFwJztcbmV4cG9ydCB7IFJlYWRvbmx5TXVsdGlCaWRpTWFwLCBNdWx0aUJpZGlNYXAsIER1YWxNdWx0aUJpZGlNYXAgfSBmcm9tICcuL211bHRpYmlkaW1hcCc7IiwiaW1wb3J0IHsgUmVhZG9ubHlCaWRpTWFwLCBCaWRpTWFwLCBEdWFsQmlkaU1hcCB9IGZyb20gJy4vYmlkaW1hcCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj4gZXh0ZW5kcyBSZWFkb25seUJpZGlNYXA8SywgVj4ge1xuICBoYXNBbnkoa2V5OiBLKTogYm9vbGVhbjtcbiAgaGFzKGtleTogSywgdmFsdWU/OiBWKTogYm9vbGVhbjtcbiAgZ2V0QWxsKGtleTogSyk6IEl0ZXJhYmxlSXRlcmF0b3I8Vj47XG4gIHJlYWRvbmx5IGludmVyc2U6IFJlYWRvbmx5TXVsdGlCaWRpTWFwPFYsIEs+O1xuICBkZWR1cGUoKTogUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj47XG4gIGZvckVhY2goY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBrZXk6IEssIG1hcDogUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkO1xufVxuZXhwb3J0IG5hbWVzcGFjZSBSZWFkb25seU11bHRpQmlkaU1hcCB7XG4gIGV4cG9ydCBmdW5jdGlvbiBpc1JlYWRvbmx5TXVsdGlCaWRpTWFwPEssIFY+KGl0ZXJhYmxlOiBJdGVyYWJsZTxbSywgVl0+IHwgYW55KTogaXRlcmFibGUgaXMgUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj4ge1xuICAgIHJldHVybiBpdGVyYWJsZSBpbnN0YW5jZW9mIEFic3RyYWN0TXVsdGlCaWRpTWFwO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTXVsdGlCaWRpTWFwPEssIFY+IGV4dGVuZHMgUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj4sIEJpZGlNYXA8SywgVj4ge1xuICBkZWxldGUoa2V5OiBLLCB2YWx1ZT86IFYpOiBib29sZWFuO1xuICBoYXMoa2V5OiBLLCB2YWx1ZT86IFYpOiBib29sZWFuO1xuICByZWFkb25seSBpbnZlcnNlOiBNdWx0aUJpZGlNYXA8ViwgSz47XG4gIGRlZHVwZSgpOiBNdWx0aUJpZGlNYXA8SywgVj47XG4gIGZvckVhY2goY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBrZXk6IEssIG1hcDogTXVsdGlCaWRpTWFwPEssIFY+KSA9PiB2b2lkLCB0aGlzQXJnPzogYW55KTogdm9pZDtcbn1cbmV4cG9ydCBuYW1lc3BhY2UgTXVsdGlCaWRpTWFwIHtcbiAgZXhwb3J0IGZ1bmN0aW9uIGlzTXVsdGlCaWRpTWFwPEssIFY+KGl0ZXJhYmxlOiBJdGVyYWJsZTxbSywgVl0+IHwgYW55KTogaXRlcmFibGUgaXMgTXVsdGlCaWRpTWFwPEssIFY+IHtcbiAgICByZXR1cm4gaXRlcmFibGUgaW5zdGFuY2VvZiBBYnN0cmFjdE11bHRpQmlkaU1hcDtcbiAgfVxufVxuXG5hYnN0cmFjdCBjbGFzcyBBYnN0cmFjdE11bHRpQmlkaU1hcDxLLCBWPiBpbXBsZW1lbnRzIE11bHRpQmlkaU1hcDxLLCBWPiB7XG4gIHByb3RlY3RlZCBzdGF0aWMgcmVhZG9ubHkgcHJvdGVjdGVkRmxhZyA9IFN5bWJvbCgncHJvdGVjdGVkJyk7XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IHJlYWRvbmx5IGJpZGltYXA6IEJpZGlNYXA8SywgVj47XG4gIHByb3RlY3RlZCBhYnN0cmFjdCByZWFkb25seSB4VG9ZczogTWFwPEssIFNldDxWPj47XG4gIHByb3RlY3RlZCBhYnN0cmFjdCByZWFkb25seSB5VG9YczogTWFwPFYsIFNldDxLPj47XG5cbiAgYWJzdHJhY3QgcmVhZG9ubHkgaW52ZXJzZTogTXVsdGlCaWRpTWFwPFYsIEs+O1xuICByZWFkb25seSBbU3ltYm9sLnRvU3RyaW5nVGFnXTogJ01hcCcgPSAnTWFwJztcblxuICBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmJpZGltYXAuc2l6ZTtcbiAgfTtcblxuICBwcml2YXRlIHN0YXRpYyBkZWxldGVBTUFQPEssIFY+KG1hcDogTWFwPEssIFNldDxWPj4sIGtleTogSywgdmFsdWU6IFYsIHZhbHVlczA/OiBTZXQ8Vj4pIHtcbiAgICBpZiAobWFwLmhhcyhrZXkpKSB7XG4gICAgICBjb25zdCB2YWx1ZXM6IFNldDxWPiA9IHZhbHVlczAgfHwgbWFwLmdldChrZXkpITtcbiAgICAgIHZhbHVlcy5kZWxldGUodmFsdWUpO1xuICAgICAgaWYgKHZhbHVlcy5zaXplID09PSAwKSB7XG4gICAgICAgIG1hcC5kZWxldGUoa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkZWxldGUoa2V5OiBLLCB2YWx1ZT86IFYpOiBib29sZWFuO1xuICBkZWxldGUoLi4uYXJnczogW0ssIFY/XSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGtleTogSyA9IGFyZ3NbMF07XG5cbiAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGlmICh0aGlzLnhUb1lzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWVzOiBTZXQ8Vj4gPSB0aGlzLnhUb1lzLmdldChrZXkpITtcbiAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICAgICAgaWYgKHZhbHVlcy5oYXModmFsdWUpICYmIHRoaXMueVRvWHMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgICBEdWFsTXVsdGlCaWRpTWFwLmRlbGV0ZUFNQVAodGhpcy54VG9Zcywga2V5LCB2YWx1ZSwgdmFsdWVzKTtcbiAgICAgICAgICAgICAgRHVhbE11bHRpQmlkaU1hcC5kZWxldGVBTUFQKHRoaXMueVRvWHMsIHZhbHVlLCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5iaWRpbWFwLmRlbGV0ZShrZXkpO1xuXG4gICAgICBjYXNlIDI6XG4gICAgICAgIGNvbnN0IHZhbHVlOiBWID0gYXJnc1sxXSE7XG4gICAgICAgIGlmICh0aGlzLnhUb1lzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgaWYgKHRoaXMuYmlkaW1hcC5oYXMoa2V5KSAmJiB0aGlzLmJpZGltYXAuZ2V0KGtleSkgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmJpZGltYXAuZGVsZXRlKGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHZhbHVlczogU2V0PFY+ID0gdGhpcy54VG9Zcy5nZXQoa2V5KSE7XG4gICAgICAgICAgaWYgKHZhbHVlcy5oYXModmFsdWUpICYmIHRoaXMueVRvWHMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgRHVhbE11bHRpQmlkaU1hcC5kZWxldGVBTUFQKHRoaXMueFRvWXMsIGtleSwgdmFsdWUsIHZhbHVlcyk7XG4gICAgICAgICAgICBEdWFsTXVsdGlCaWRpTWFwLmRlbGV0ZUFNQVAodGhpcy55VG9YcywgdmFsdWUsIGtleSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXNBbnkoa2V5OiBLKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMueFRvWXMuaGFzKGtleSkgJiZcbiAgICAgIHRoaXMueFRvWXMuZ2V0KGtleSkhLnNpemUgPiAwO1xuICB9XG5cbiAgaGFzKGtleTogSywgdmFsdWU/OiBWKTogYm9vbGVhbjtcbiAgaGFzKC4uLmFyZ3M6IFtLLCBWP10pOiBib29sZWFuIHtcbiAgICBjb25zdCBrZXk6IEsgPSBhcmdzWzBdO1xuXG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gdGhpcy5iaWRpbWFwLmhhcyhrZXkpO1xuXG4gICAgICBjYXNlIDI6XG4gICAgICAgIGNvbnN0IHZhbHVlOiBWID0gYXJnc1sxXSE7XG4gICAgICAgIGlmICh0aGlzLnhUb1lzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWVzOiBTZXQ8Vj4gPSB0aGlzLnhUb1lzLmdldChrZXkpITtcbiAgICAgICAgICByZXR1cm4gdmFsdWVzLmhhcyh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0QWxsKGtleTogSyk6IEl0ZXJhYmxlSXRlcmF0b3I8Vj4ge1xuICAgIGlmICh0aGlzLnhUb1lzLmhhcyhrZXkpKSB7XG4gICAgICBjb25zdCB2YWx1ZXM6IFNldDxWPiA9IHRoaXMueFRvWXMuZ2V0KGtleSkhO1xuICAgICAgcmV0dXJuIHZhbHVlc1tTeW1ib2wuaXRlcmF0b3JdKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8Vj4oKTtcbiAgICAgIHJldHVybiBzZXRbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgIH1cbiAgfVxuXG4gIGRlZHVwZSgpOiBNdWx0aUJpZGlNYXA8SywgVj4ge1xuICAgIGNvbnN0IGJpZGltYXA6IEJpZGlNYXA8SywgVj4gPSB0aGlzLmJpZGltYXAuZGVkdXBlKCk7XG4gICAgcmV0dXJuIG5ldyBEdWFsTXVsdGlCaWRpTWFwKGJpZGltYXAsIHRoaXMueFRvWXMsIHRoaXMueVRvWHMsIEFic3RyYWN0TXVsdGlCaWRpTWFwLnByb3RlY3RlZEZsYWcpO1xuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5iaWRpbWFwLmNsZWFyKCk7XG4gICAgdGhpcy54VG9Zcy5jbGVhcigpO1xuICAgIHRoaXMueVRvWHMuY2xlYXIoKTtcbiAgfVxuXG4gIGZvckVhY2goY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBrZXk6IEssIG1hcDogTXVsdGlCaWRpTWFwPEssIFY+KSA9PiB2b2lkLCB0aGlzQXJnPzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5mb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcpO1xuICB9XG5cbiAgZ2V0KGtleTogSyk6IFYgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmJpZGltYXAuZ2V0KGtleSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBhZGRTYWZlbHk8SywgVj4obWFwOiBNYXA8SywgU2V0PFY+Piwga2V5OiBLLCB2YWx1ZTogVikge1xuICAgIGlmIChtYXAuaGFzKGtleSkpIHtcbiAgICAgIGNvbnN0IHZhbHVlczogU2V0PFY+ID0gbWFwLmdldChrZXkpITtcbiAgICAgIHZhbHVlcy5hZGQodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXAuc2V0KGtleSwgbmV3IFNldChbdmFsdWVdKSk7XG4gICAgfVxuICB9XG5cbiAgc2V0KGtleTogSywgdmFsdWU6IFYpOiB0aGlzIHtcbiAgICB0aGlzLmJpZGltYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgIER1YWxNdWx0aUJpZGlNYXAuYWRkU2FmZWx5KHRoaXMueFRvWXMsIGtleSwgdmFsdWUpO1xuICAgIER1YWxNdWx0aUJpZGlNYXAuYWRkU2FmZWx5KHRoaXMueVRvWHMsIHZhbHVlLCBrZXkpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYWJsZUl0ZXJhdG9yPFtLLCBWXT4ge1xuICAgIHJldHVybiB0aGlzLmJpZGltYXBbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAgZW50cmllcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFtLLCBWXT4ge1xuICAgIHJldHVybiB0aGlzLmJpZGltYXAuZW50cmllcygpO1xuICB9XG5cbiAga2V5cygpOiBJdGVyYWJsZUl0ZXJhdG9yPEs+IHtcbiAgICByZXR1cm4gdGhpcy5iaWRpbWFwLmtleXMoKTtcbiAgfVxuXG4gIHZhbHVlcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFY+IHtcbiAgICByZXR1cm4gdGhpcy5iaWRpbWFwLnZhbHVlcygpO1xuICB9XG5cbiAgdG9KU09OKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcC50b0pTT04oKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRHVhbE11bHRpQmlkaU1hcDxLLCBWPiBleHRlbmRzIEFic3RyYWN0TXVsdGlCaWRpTWFwPEssIFY+IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGJpZGltYXA6IEJpZGlNYXA8SywgVj47XG4gIHByb3RlY3RlZCByZWFkb25seSB4VG9ZczogTWFwPEssIFNldDxWPj47XG4gIHByb3RlY3RlZCByZWFkb25seSB5VG9YczogTWFwPFYsIFNldDxLPj47XG4gIHJlYWRvbmx5IGludmVyc2U6IE11bHRpQmlkaU1hcDxWLCBLPjtcblxuICBjb25zdHJ1Y3RvcihlbnRyaWVzPzogSXRlcmFibGU8W0ssIFZdPiB8IG51bGwpO1xuICBjb25zdHJ1Y3RvcihtdWx0aWJpZGltYXA6IFJlYWRvbmx5TXVsdGlCaWRpTWFwPEssIFY+KTtcbiAgY29uc3RydWN0b3IoYmlkaW1hcDogQmlkaU1hcDxLLCBWPiwgeFRvWXM6IE1hcDxLLCBTZXQ8Vj4+LCB5VG9YczogTWFwPFYsIFNldDxLPj4sIHByb3RlY3RlZEZsYWc6IHN5bWJvbCk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGVudHJpZXM/OiBJdGVyYWJsZTxbSywgVl0+IHwgUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj4gfCBudWxsLFxuICAgIHhUb1lzPzogTWFwPEssIFNldDxWPj4sIHlUb1hzPzogTWFwPFYsIFNldDxLPj4sIHByb3RlY3RlZEZsYWc/OiBzeW1ib2xcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAoXG4gICAgICBCaWRpTWFwLmlzQmlkaU1hcDxLLCBWPihlbnRyaWVzKSAmJiB4VG9ZcyBpbnN0YW5jZW9mIE1hcCAmJiB5VG9YcyBpbnN0YW5jZW9mIE1hcFxuICAgICAgJiYgcHJvdGVjdGVkRmxhZyA9PT0gQWJzdHJhY3RNdWx0aUJpZGlNYXAucHJvdGVjdGVkRmxhZ1xuICAgICkge1xuICAgICAgY29uc3QgYmlkaW1hcDogQmlkaU1hcDxLLCBWPiA9IGVudHJpZXM7XG4gICAgICB0aGlzLmJpZGltYXAgPSBiaWRpbWFwO1xuICAgICAgdGhpcy54VG9ZcyA9IHhUb1lzO1xuICAgICAgdGhpcy55VG9YcyA9IHlUb1hzO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYmlkaW1hcCA9IG5ldyBEdWFsQmlkaU1hcCgpO1xuICAgICAgdGhpcy54VG9ZcyA9IG5ldyBNYXA8SywgU2V0PFY+PigpO1xuICAgICAgdGhpcy55VG9YcyA9IG5ldyBNYXA8ViwgU2V0PEs+PigpO1xuICAgICAgaWYgKGVudHJpZXMgIT09IG51bGwgJiYgZW50cmllcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGVudHJpZXMpIHtcbiAgICAgICAgICB0aGlzLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmludmVyc2UgPSBuZXcgSW52ZXJzZU11bHRpQmlkaU1hcDxWLCBLPih0aGlzLCB0aGlzLmJpZGltYXAuaW52ZXJzZSwgdGhpcy55VG9YcywgdGhpcy54VG9Zcyk7XG4gIH1cbn1cblxuY2xhc3MgSW52ZXJzZU11bHRpQmlkaU1hcDxLLCBWPiBleHRlbmRzIEFic3RyYWN0TXVsdGlCaWRpTWFwPEssIFY+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcmVhZG9ubHkgaW52ZXJzZTogTXVsdGlCaWRpTWFwPFYsIEs+LFxuICAgIHByb3RlY3RlZCByZWFkb25seSBiaWRpbWFwOiBCaWRpTWFwPEssIFY+LFxuICAgIHByb3RlY3RlZCByZWFkb25seSB4VG9ZczogTWFwPEssIFNldDxWPj4sXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IHlUb1hzOiBNYXA8ViwgU2V0PEs+PlxuICApIHtcbiAgICBzdXBlcigpO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==