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
    constructor(entries, inverseFlag) {
        this[Symbol.toStringTag] = 'Map';
        if (entries instanceof DualBidiMap && inverseFlag === DualBidiMap.inverseFlag) {
            const inverse = entries;
            this.xToY = inverse.yToX;
            this.yToX = inverse.xToY;
            this.inverse = inverse;
        }
        else {
            this.xToY = new Map();
            this.yToX = new Map();
            if (entries !== null && entries !== undefined) {
                for (const [key, value] of entries) {
                    this.set(key, value);
                }
            }
            this.inverse = new DualBidiMap(this, DualBidiMap.inverseFlag);
        }
    }
    dedupe() {
        const inverseLike = new DualBidiMap(this.yToX);
        return new DualBidiMap(inverseLike.yToX);
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
DualBidiMap.inverseFlag = Symbol('inverse');
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
    constructor(entries, ...args) {
        this[Symbol.toStringTag] = 'Map';
        if (entries instanceof DualMultiBidiMap && args[0] === DualMultiBidiMap.inverseFlag) {
            const inverse = entries;
            this.bidimap = inverse.bidimap.inverse;
            this.xToYs = inverse.yToXs;
            this.yToXs = inverse.xToYs;
            this.inverse = inverse;
        }
        else if (entries instanceof bidimap_1.DualBidiMap &&
            args[0] instanceof Map && args[1] instanceof Map &&
            args[2] === DualMultiBidiMap.privateFlag) {
            const bidimap = entries;
            const xToYs = args[0];
            const yToXs = args[1];
            this.bidimap = bidimap;
            this.xToYs = xToYs;
            this.yToXs = yToXs;
            this.inverse = new DualMultiBidiMap(this, DualMultiBidiMap.inverseFlag);
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
            this.inverse = new DualMultiBidiMap(this, DualMultiBidiMap.inverseFlag);
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
DualMultiBidiMap.inverseFlag = Symbol('inverse');
DualMultiBidiMap.privateFlag = Symbol('private');
exports.DualMultiBidiMap = DualMultiBidiMap;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvYmlkaW1hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL211bHRpYmlkaW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdEVBLE1BQWEsV0FBVztJQVF0QixZQUFZLE9BQWlDLEVBQUUsV0FBb0I7UUE0RDFELEtBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFVLEtBQUssQ0FBQztRQTNEM0MsSUFBSSxPQUFPLFlBQVksV0FBVyxJQUFJLFdBQVcs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RSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFJO1FBQ0YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQy9CLENBQUM7O0FBdkx1Qiw0QkFBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNoQyw0QkFBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUYxRCw0Q0F5TEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZXhwb3J0IGludGVyZmFjZSBSZWFkb25seUJpZGlNYXA8SywgVj4gZXh0ZW5kcyBSZWFkb25seU1hcDxLLCBWPiB7XG4gIHJlYWRvbmx5IGludmVyc2U6IFJlYWRvbmx5QmlkaU1hcDxWLCBLPjtcbiAgZGVkdXBlKCk6IFJlYWRvbmx5QmlkaU1hcDxLLCBWPjtcbiAgZm9yRWFjaChjYWxsYmFja2ZuOiAodmFsdWU6IFYsIGtleTogSywgbWFwOiBSZWFkb25seUJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJpZGlNYXA8SywgVj4gZXh0ZW5kcyBSZWFkb25seUJpZGlNYXA8SywgVj4sIE1hcDxLLCBWPiB7XG4gIHJlYWRvbmx5IGludmVyc2U6IEJpZGlNYXA8ViwgSz47XG4gIGRlZHVwZSgpOiBCaWRpTWFwPEssIFY+O1xuICBmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogViwga2V5OiBLLCBtYXA6IEJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgRHVhbEJpZGlNYXA8SywgVj4gaW1wbGVtZW50cyBCaWRpTWFwPEssIFY+IHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgaW52ZXJzZUZsYWcgPSBTeW1ib2woJ2ludmVyc2UnKTtcbiAgcHJpdmF0ZSByZWFkb25seSB4VG9ZOiBNYXA8SywgVj47XG4gIHByaXZhdGUgcmVhZG9ubHkgeVRvWDogTWFwPFYsIEs+O1xuICByZWFkb25seSBpbnZlcnNlOiBCaWRpTWFwPFYsIEs+O1xuXG4gIGNvbnN0cnVjdG9yKGVudHJpZXM/OiBJdGVyYWJsZTxbSywgVl0+IHwgbnVsbCk7XG4gIGNvbnN0cnVjdG9yKGludmVyc2U6IER1YWxCaWRpTWFwPFYsIEs+LCBpbnZlcnNlRmxhZzogc3ltYm9sKTtcbiAgY29uc3RydWN0b3IoZW50cmllcz86IEl0ZXJhYmxlPFtLLCBWXT4gfCBudWxsLCBpbnZlcnNlRmxhZz86IHN5bWJvbCkge1xuICAgIGlmIChlbnRyaWVzIGluc3RhbmNlb2YgRHVhbEJpZGlNYXAgJiYgaW52ZXJzZUZsYWcgPT09IER1YWxCaWRpTWFwLmludmVyc2VGbGFnKSB7XG4gICAgICBjb25zdCBpbnZlcnNlOiBEdWFsQmlkaU1hcDxWLCBLPiA9IGVudHJpZXM7XG4gICAgICB0aGlzLnhUb1kgPSBpbnZlcnNlLnlUb1g7XG4gICAgICB0aGlzLnlUb1ggPSBpbnZlcnNlLnhUb1k7XG4gICAgICB0aGlzLmludmVyc2UgPSBpbnZlcnNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnhUb1kgPSBuZXcgTWFwPEssIFY+KCk7XG4gICAgICB0aGlzLnlUb1ggPSBuZXcgTWFwPFYsIEs+KCk7XG4gICAgICBpZiAoZW50cmllcyAhPT0gbnVsbCAmJiBlbnRyaWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZW50cmllcykge1xuICAgICAgICAgIHRoaXMuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmludmVyc2UgPSBuZXcgRHVhbEJpZGlNYXA8ViwgSz4odGhpcywgRHVhbEJpZGlNYXAuaW52ZXJzZUZsYWcpO1xuICAgIH1cbiAgfVxuXG4gIGRlZHVwZSgpOiBCaWRpTWFwPEssIFY+IHtcbiAgICBjb25zdCBpbnZlcnNlTGlrZTogRHVhbEJpZGlNYXA8ViwgSz4gPSBuZXcgRHVhbEJpZGlNYXA8ViwgSz4odGhpcy55VG9YKTtcbiAgICByZXR1cm4gbmV3IER1YWxCaWRpTWFwPEssIFY+KGludmVyc2VMaWtlLnlUb1gpO1xuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy54VG9ZLmNsZWFyKCk7XG4gICAgdGhpcy55VG9YLmNsZWFyKCk7XG4gIH1cblxuICBkZWxldGUoa2V5OiBLKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMueFRvWS5oYXMoa2V5KSkge1xuICAgICAgY29uc3QgdmFsdWU6IFYgPSB0aGlzLnhUb1kuZ2V0KGtleSkhO1xuICAgICAgaWYgKHRoaXMueVRvWC5oYXModmFsdWUpICYmIHRoaXMueVRvWC5nZXQodmFsdWUpID09PSBrZXkpIHtcbiAgICAgICAgdGhpcy55VG9YLmRlbGV0ZSh2YWx1ZSEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy54VG9ZLmRlbGV0ZShrZXkpO1xuICB9XG5cbiAgZm9yRWFjaChjYWxsYmFja2ZuOiAodmFsdWU6IFYsIGtleTogSywgbWFwOiBCaWRpTWFwPEssIFY+KSA9PiB2b2lkLCB0aGlzQXJnPzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5mb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcpO1xuICB9XG5cbiAgZ2V0KGtleTogSyk6IFYgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnhUb1kuZ2V0KGtleSk7XG4gIH1cblxuICBoYXMoa2V5OiBLKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS5oYXMoa2V5KTtcbiAgfVxuXG4gIHNldChrZXk6IEssIHZhbHVlOiBWKTogdGhpcyB7XG4gICAgdGhpcy54VG9ZLnNldChrZXksIHZhbHVlKTtcbiAgICB0aGlzLnlUb1guc2V0KHZhbHVlLCBrZXkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy54VG9ZLnNpemU7XG4gIH1cblxuICByZWFkb25seSBbU3ltYm9sLnRvU3RyaW5nVGFnXTogJ01hcCcgPSAnTWFwJztcblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYWJsZUl0ZXJhdG9yPFtLLCBWXT4ge1xuICAgIHJldHVybiB0aGlzLnhUb1lbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAgZW50cmllcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFtLLCBWXT4ge1xuICAgIHJldHVybiB0aGlzLnhUb1kuZW50cmllcygpO1xuICB9XG5cbiAga2V5cygpOiBJdGVyYWJsZUl0ZXJhdG9yPEs+IHtcbiAgICByZXR1cm4gdGhpcy54VG9ZLmtleXMoKTtcbiAgfVxuXG4gIHZhbHVlcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFY+IHtcbiAgICByZXR1cm4gdGhpcy54VG9ZLnZhbHVlcygpO1xuICB9XG5cbiAgdG9KU09OKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS50b0pTT04oKTtcbiAgfVxufVxuIiwiZXhwb3J0IHsgUmVhZG9ubHlCaWRpTWFwLCBCaWRpTWFwLCBEdWFsQmlkaU1hcCB9IGZyb20gJy4vYmlkaW1hcCc7XG5leHBvcnQgeyBSZWFkb25seU11bHRpQmlkaU1hcCwgTXVsdGlCaWRpTWFwLCBEdWFsTXVsdGlCaWRpTWFwIH0gZnJvbSAnLi9tdWx0aWJpZGltYXAnOyIsImltcG9ydCB7IFJlYWRvbmx5QmlkaU1hcCwgQmlkaU1hcCwgRHVhbEJpZGlNYXAgfSBmcm9tICcuL2JpZGltYXAnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRvbmx5TXVsdGlCaWRpTWFwPEssIFY+IGV4dGVuZHMgUmVhZG9ubHlCaWRpTWFwPEssIFY+IHtcbiAgaGFzQW55KGtleTogSyk6IGJvb2xlYW47XG4gIGhhcyhrZXk6IEssIHZhbHVlPzogVik6IGJvb2xlYW47XG4gIGdldEFsbChrZXk6IEspOiBJdGVyYWJsZUl0ZXJhdG9yPFY+O1xuICByZWFkb25seSBpbnZlcnNlOiBSZWFkb25seU11bHRpQmlkaU1hcDxWLCBLPjtcbiAgZGVkdXBlKCk6IFJlYWRvbmx5TXVsdGlCaWRpTWFwPEssIFY+O1xuICBmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogViwga2V5OiBLLCBtYXA6IFJlYWRvbmx5TXVsdGlCaWRpTWFwPEssIFY+KSA9PiB2b2lkLCB0aGlzQXJnPzogYW55KTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNdWx0aUJpZGlNYXA8SywgVj4gZXh0ZW5kcyBSZWFkb25seU11bHRpQmlkaU1hcDxLLCBWPiwgQmlkaU1hcDxLLCBWPiB7XG4gIGRlbGV0ZShrZXk6IEssIHZhbHVlPzogVik6IGJvb2xlYW47XG4gIGhhcyhrZXk6IEssIHZhbHVlPzogVik6IGJvb2xlYW47XG4gIHJlYWRvbmx5IGludmVyc2U6IE11bHRpQmlkaU1hcDxWLCBLPjtcbiAgZGVkdXBlKCk6IE11bHRpQmlkaU1hcDxLLCBWPjtcbiAgZm9yRWFjaChjYWxsYmFja2ZuOiAodmFsdWU6IFYsIGtleTogSywgbWFwOiBNdWx0aUJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgRHVhbE11bHRpQmlkaU1hcDxLLCBWPiBpbXBsZW1lbnRzIE11bHRpQmlkaU1hcDxLLCBWPiB7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGludmVyc2VGbGFnID0gU3ltYm9sKCdpbnZlcnNlJyk7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHByaXZhdGVGbGFnID0gU3ltYm9sKCdwcml2YXRlJyk7XG4gIHByaXZhdGUgcmVhZG9ubHkgYmlkaW1hcDogQmlkaU1hcDxLLCBWPjtcbiAgcHJpdmF0ZSByZWFkb25seSB4VG9ZczogTWFwPEssIFNldDxWPj47XG4gIHByaXZhdGUgcmVhZG9ubHkgeVRvWHM6IE1hcDxWLCBTZXQ8Sz4+O1xuICByZWFkb25seSBpbnZlcnNlOiBNdWx0aUJpZGlNYXA8ViwgSz47XG5cbiAgY29uc3RydWN0b3IoZW50cmllcz86IEl0ZXJhYmxlPFtLLCBWXT4gfCBudWxsKTtcbiAgY29uc3RydWN0b3IoYmlkaW1hcDogQmlkaU1hcDxLLCBWPiwgeFRvWXM6IE1hcDxLLCBTZXQ8Vj4+LCB5VG9YczogTWFwPFYsIFNldDxLPj4sIHByaXZhdGVGbGFnOiBzeW1ib2wpO1xuICBjb25zdHJ1Y3RvcihpbnZlcnNlOiBEdWFsTXVsdGlCaWRpTWFwPFYsIEs+LCBpbnZlcnNlRmxhZzogc3ltYm9sKTtcbiAgY29uc3RydWN0b3IoZW50cmllcz86IEl0ZXJhYmxlPFtLLCBWXT4gfCBudWxsLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgIGlmIChlbnRyaWVzIGluc3RhbmNlb2YgRHVhbE11bHRpQmlkaU1hcCAmJiBhcmdzWzBdID09PSBEdWFsTXVsdGlCaWRpTWFwLmludmVyc2VGbGFnKSB7XG4gICAgICBjb25zdCBpbnZlcnNlOiBEdWFsTXVsdGlCaWRpTWFwPFYsIEs+ID0gZW50cmllcztcbiAgICAgIHRoaXMuYmlkaW1hcCA9IGludmVyc2UuYmlkaW1hcC5pbnZlcnNlO1xuICAgICAgdGhpcy54VG9ZcyA9IGludmVyc2UueVRvWHM7XG4gICAgICB0aGlzLnlUb1hzID0gaW52ZXJzZS54VG9ZcztcbiAgICAgIHRoaXMuaW52ZXJzZSA9IGludmVyc2U7XG5cbiAgICB9IGVsc2UgaWYgKGVudHJpZXMgaW5zdGFuY2VvZiBEdWFsQmlkaU1hcCAmJlxuICAgICAgYXJnc1swXSBpbnN0YW5jZW9mIE1hcCAmJiBhcmdzWzFdIGluc3RhbmNlb2YgTWFwICYmXG4gICAgICBhcmdzWzJdID09PSBEdWFsTXVsdGlCaWRpTWFwLnByaXZhdGVGbGFnKSB7XG4gICAgICBjb25zdCBiaWRpbWFwOiBCaWRpTWFwPEssIFY+ID0gZW50cmllcztcbiAgICAgIGNvbnN0IHhUb1lzOiBNYXA8SywgU2V0PFY+PiA9IGFyZ3NbMF07XG4gICAgICBjb25zdCB5VG9YczogTWFwPFYsIFNldDxLPj4gPSBhcmdzWzFdO1xuICAgICAgdGhpcy5iaWRpbWFwID0gYmlkaW1hcDtcbiAgICAgIHRoaXMueFRvWXMgPSB4VG9ZcztcbiAgICAgIHRoaXMueVRvWHMgPSB5VG9YcztcbiAgICAgIHRoaXMuaW52ZXJzZSA9IG5ldyBEdWFsTXVsdGlCaWRpTWFwPFYsIEs+KHRoaXMsIER1YWxNdWx0aUJpZGlNYXAuaW52ZXJzZUZsYWcpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYmlkaW1hcCA9IG5ldyBEdWFsQmlkaU1hcCgpO1xuICAgICAgdGhpcy54VG9ZcyA9IG5ldyBNYXA8SywgU2V0PFY+PigpO1xuICAgICAgdGhpcy55VG9YcyA9IG5ldyBNYXA8ViwgU2V0PEs+PigpO1xuICAgICAgaWYgKGVudHJpZXMgIT09IG51bGwgJiYgZW50cmllcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGVudHJpZXMpIHtcbiAgICAgICAgICB0aGlzLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5pbnZlcnNlID0gbmV3IER1YWxNdWx0aUJpZGlNYXA8ViwgSz4odGhpcywgRHVhbE11bHRpQmlkaU1hcC5pbnZlcnNlRmxhZyk7XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlKGtleTogSywgdmFsdWU/OiBWKTogYm9vbGVhbjtcbiAgZGVsZXRlKC4uLmFyZ3M6IFtLLCBWP10pOiBib29sZWFuIHtcbiAgICBmdW5jdGlvbiBkZWxldGVBTUFQPEssIFY+KG1hcDogTWFwPEssIFNldDxWPj4sIGtleTogSywgdmFsdWU6IFYsIHZhbHVlczA/OiBTZXQ8Vj4pIHtcbiAgICAgIGlmIChtYXAuaGFzKGtleSkpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzOiBTZXQ8Vj4gPSB2YWx1ZXMwIHx8IG1hcC5nZXQoa2V5KSE7XG4gICAgICAgIHZhbHVlcy5kZWxldGUodmFsdWUpO1xuICAgICAgICBpZiAodmFsdWVzLnNpemUgPT09IDApIHtcbiAgICAgICAgICBtYXAuZGVsZXRlKGtleSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBrZXk6IEsgPSBhcmdzWzBdO1xuXG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICBpZiAodGhpcy54VG9Zcy5oYXMoa2V5KSkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlczogU2V0PFY+ID0gdGhpcy54VG9Zcy5nZXQoa2V5KSE7XG4gICAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZXMuaGFzKHZhbHVlKSAmJiB0aGlzLnlUb1hzLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgZGVsZXRlQU1BUCh0aGlzLnhUb1lzLCBrZXksIHZhbHVlLCB2YWx1ZXMpO1xuICAgICAgICAgICAgICBkZWxldGVBTUFQKHRoaXMueVRvWHMsIHZhbHVlLCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5iaWRpbWFwLmRlbGV0ZShrZXkpO1xuXG4gICAgICBjYXNlIDI6XG4gICAgICAgIGNvbnN0IHZhbHVlOiBWID0gYXJnc1sxXSE7XG4gICAgICAgIGlmICh0aGlzLnhUb1lzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgaWYgKHRoaXMuYmlkaW1hcC5oYXMoa2V5KSAmJiB0aGlzLmJpZGltYXAuZ2V0KGtleSkgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmJpZGltYXAuZGVsZXRlKGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHZhbHVlczogU2V0PFY+ID0gdGhpcy54VG9Zcy5nZXQoa2V5KSE7XG4gICAgICAgICAgaWYgKHZhbHVlcy5oYXModmFsdWUpICYmIHRoaXMueVRvWHMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgZGVsZXRlQU1BUCh0aGlzLnhUb1lzLCBrZXksIHZhbHVlLCB2YWx1ZXMpO1xuICAgICAgICAgICAgZGVsZXRlQU1BUCh0aGlzLnlUb1hzLCB2YWx1ZSwga2V5KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhc0FueShrZXk6IEspOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy54VG9Zcy5oYXMoa2V5KSAmJlxuICAgICAgdGhpcy54VG9Zcy5nZXQoa2V5KSEuc2l6ZSA+IDA7XG4gIH1cblxuICBoYXMoa2V5OiBLLCB2YWx1ZT86IFYpOiBib29sZWFuO1xuICBoYXMoLi4uYXJnczogW0ssIFY/XSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGtleTogSyA9IGFyZ3NbMF07XG5cbiAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiB0aGlzLmJpZGltYXAuaGFzKGtleSk7XG5cbiAgICAgIGNhc2UgMjpcbiAgICAgICAgY29uc3QgdmFsdWU6IFYgPSBhcmdzWzFdITtcbiAgICAgICAgaWYgKHRoaXMueFRvWXMuaGFzKGtleSkpIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZXM6IFNldDxWPiA9IHRoaXMueFRvWXMuZ2V0KGtleSkhO1xuICAgICAgICAgIHJldHVybiB2YWx1ZXMuaGFzKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRBbGwoa2V5OiBLKTogSXRlcmFibGVJdGVyYXRvcjxWPiB7XG4gICAgaWYgKHRoaXMueFRvWXMuaGFzKGtleSkpIHtcbiAgICAgIGNvbnN0IHZhbHVlczogU2V0PFY+ID0gdGhpcy54VG9Zcy5nZXQoa2V5KSE7XG4gICAgICByZXR1cm4gdmFsdWVzW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2V0ID0gbmV3IFNldDxWPigpO1xuICAgICAgcmV0dXJuIHNldFtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gICAgfVxuICB9XG5cbiAgZGVkdXBlKCk6IE11bHRpQmlkaU1hcDxLLCBWPiB7XG4gICAgY29uc3QgYmlkaW1hcDogQmlkaU1hcDxLLCBWPiA9IHRoaXMuYmlkaW1hcC5kZWR1cGUoKTtcbiAgICByZXR1cm4gbmV3IER1YWxNdWx0aUJpZGlNYXAoYmlkaW1hcCwgdGhpcy54VG9ZcywgdGhpcy55VG9YcywgRHVhbE11bHRpQmlkaU1hcC5wcml2YXRlRmxhZyk7XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLmJpZGltYXAuY2xlYXIoKTtcbiAgICB0aGlzLnhUb1lzLmNsZWFyKCk7XG4gICAgdGhpcy55VG9Ycy5jbGVhcigpO1xuICB9XG5cbiAgZm9yRWFjaChjYWxsYmFja2ZuOiAodmFsdWU6IFYsIGtleTogSywgbWFwOiBNdWx0aUJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyk7XG4gIH1cblxuICBnZXQoa2V5OiBLKTogViB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcC5nZXQoa2V5KTtcbiAgfVxuXG4gIHNldChrZXk6IEssIHZhbHVlOiBWKTogdGhpcyB7XG4gICAgZnVuY3Rpb24gYWRkU2FmZWx5PEssIFY+KG1hcDogTWFwPEssIFNldDxWPj4sIGtleTogSywgdmFsdWU6IFYpIHtcbiAgICAgIGlmIChtYXAuaGFzKGtleSkpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzOiBTZXQ8Vj4gPSBtYXAuZ2V0KGtleSkhO1xuICAgICAgICB2YWx1ZXMuYWRkKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcC5zZXQoa2V5LCBuZXcgU2V0KFt2YWx1ZV0pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmJpZGltYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgIGFkZFNhZmVseSh0aGlzLnhUb1lzLCBrZXksIHZhbHVlKTtcbiAgICBhZGRTYWZlbHkodGhpcy55VG9YcywgdmFsdWUsIGtleSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcC5zaXplO1xuICB9O1xuXG4gIHJlYWRvbmx5IFtTeW1ib2wudG9TdHJpbmdUYWddOiAnTWFwJyA9ICdNYXAnO1xuXG4gIFtTeW1ib2wuaXRlcmF0b3JdKCk6IEl0ZXJhYmxlSXRlcmF0b3I8W0ssIFZdPiB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcFtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIH1cblxuICBlbnRyaWVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8W0ssIFZdPiB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcC5lbnRyaWVzKCk7XG4gIH1cblxuICBrZXlzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Sz4ge1xuICAgIHJldHVybiB0aGlzLmJpZGltYXAua2V5cygpO1xuICB9XG5cbiAgdmFsdWVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Vj4ge1xuICAgIHJldHVybiB0aGlzLmJpZGltYXAudmFsdWVzKCk7XG4gIH1cblxuICB0b0pTT04oKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5iaWRpbWFwLnRvSlNPTigpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9