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
    /**
     * オブジェクトが`ReadonlyBidiMap`または`BidiMap`であるかどうかを判定します。
     * @param K マップのキーの型
     * @param V マップの値の型
     * @param iterable 判定するオブジェクト
     * @returns オブジェクトが`ReadonlyBidiMap`または`BidiMap`であれば`true`、そうでなければ`false`
     */
    function isReadonlyBidiMap(iterable) {
        return iterable instanceof AbstractBidiMap;
    }
    ReadonlyBidiMap.isReadonlyBidiMap = isReadonlyBidiMap;
})(ReadonlyBidiMap = exports.ReadonlyBidiMap || (exports.ReadonlyBidiMap = {}));
var BidiMap;
(function (BidiMap) {
    /**
     * オブジェクトが`BidiMap`であるかどうかを判定します。
     * @param K マップのキーの型
     * @param V マップの値の型
     * @param iterable 判定するオブジェクト
     * @returns オブジェクトが`BidiMap`であれば`true`
     */
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
    /**
     * このマップおよび`this.inverse`からすべてのマッピングを削除します。
     */
    clear() {
        this.xToY.clear();
        this.yToX.clear();
    }
    /**
     * 指定されたキーのマッピングが存在する場合、これを削除します。
     * 逆方向のマッピングが`this.inverse`に存在すれば、これも削除します。
     * @param key
     */
    delete(key) {
        if (this.xToY.has(key)) {
            const value = this.xToY.get(key);
            if (this.yToX.has(value) && this.yToX.get(value) === key) {
                this.yToX.delete(value);
            }
        }
        return this.xToY.delete(key);
    }
    /**
     * マップのすべてのキー・値に対して指定された関数を実行します。
     * @param callbackfn それぞれのキー・値に対して実行する関数
     * @param thisArg `callbackfn`を実行するとき、`this`として使うオブジェクト
     */
    forEach(callbackfn, thisArg) {
        this.forEach(callbackfn, thisArg);
    }
    /**
     * 指定されたキーがマッピングしている値を返します。
     * マッピングが存在しなければ`undefined`を返します。
     * @param key マッピングのキー
     * @returns マッピングの値、存在しなければ`undefined`
     */
    get(key) {
        return this.xToY.get(key);
    }
    /**
     * 指定されたキーのマッピングが存在するかどうかを判定します。
     * @param key マッピングのキー
     * @returns マッピングが存在すれば`true`、存在しなければ`false`
     */
    has(key) {
        return this.xToY.has(key);
    }
    /**
     * 指定されたキーから値への、新しいマッピングを追加します。
     * 同時に`this.inverse`には、値からキーへのマッピングが追加されます。
     * @param key マッピングのキー
     * @param value マッピングの値
     */
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
/**
 * @param K キーの型
 * @param V 値の型
 */
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
    delete(key, ...args) {
        switch (args.length) {
            case 0:
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
            case 1:
                const value = args[0];
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
    has(key, ...args) {
        switch (args.length) {
            case 0:
                return this.bidimap.has(key);
            case 1:
                const value = args[0];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvYmlkaW1hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL211bHRpYmlkaW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDOURBLElBQWlCLGVBQWUsQ0FXL0I7QUFYRCxXQUFpQixlQUFlO0lBQzlCOzs7Ozs7T0FNRztJQUNILFNBQWdCLGlCQUFpQixDQUFPLFFBQWdDO1FBQ3RFLE9BQU8sUUFBUSxZQUFZLGVBQWUsQ0FBQztJQUM3QyxDQUFDO0lB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Q2xDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUN0QjthQUNGO1NBQ0Y7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksbUJBQW1CLENBQU8sSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25HLENBQUM7Q0FDRjtBQS9DRCw0Q0ErQ0M7QUFFRCxNQUFNLG1CQUEwQixTQUFRLG9CQUEwQjtJQUNoRSxZQUNXLE9BQTJCLEVBQ2pCLE9BQXNCLEVBQ3RCLEtBQXFCLEVBQ3JCLEtBQXFCO1FBRXhDLEtBQUssRUFBRSxDQUFDO1FBTEMsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUN0QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtJQUcxQyxDQUFDO0NBQ0YiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiLyoqXG4gKiBAcGFyYW0gSyDjgq3jg7zjga7lnotcbiAqIEBwYXJhbSBWIOWApOOBruWei1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRvbmx5QmlkaU1hcDxLLCBWPiBleHRlbmRzIFJlYWRvbmx5TWFwPEssIFY+IHtcbiAgLyoqXG4gICAqIOmAhuaWueWQkeOBruODnuODg+ODl+OAgeOBmeOBquOCj+OBoeWApOOBi+OCieOCreODvOOBuOOBruODnuODg+ODl+OBp+OBmeOAglxuICAgKi9cbiAgcmVhZG9ubHkgaW52ZXJzZTogUmVhZG9ubHlCaWRpTWFwPFYsIEs+O1xuICAvKipcbiAgICog44Kt44O844O75YCk44Gu5Lih5pa544GL44KJ6YeN6KSH44KS5Y+W44KK6Zmk44GE44Gf44Oe44OD44OX44KS6L+U44GX44G+44GZ44CCXG4gICAqL1xuICBkZWR1cGUoKTogUmVhZG9ubHlCaWRpTWFwPEssIFY+O1xuICAvKipcbiAgICog44Oe44OD44OX44Gu44GZ44G544Gm44Gu44Kt44O844O75YCk44Gr5a++44GX44Gm5oyH5a6a44GV44KM44Gf6Zai5pWw44KS5a6f6KGM44GX44G+44GZ44CCXG4gICAqIEBwYXJhbSBjYWxsYmFja2ZuIOOBneOCjOOBnuOCjOOBruOCreODvOODu+WApOOBq+WvvuOBl+OBpuWun+ihjOOBmeOCi+mWouaVsFxuICAgKiBAcGFyYW0gdGhpc0FyZyBgY2FsbGJhY2tmbmDjgpLlrp/ooYzjgZnjgovjgajjgY3jgIFgdGhpc2DjgajjgZfjgabkvb/jgYbjgqrjg5bjgrjjgqfjgq/jg4hcbiAgICovXG4gIGZvckVhY2goY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBrZXk6IEssIG1hcDogUmVhZG9ubHlCaWRpTWFwPEssIFY+KSA9PiB2b2lkLCB0aGlzQXJnPzogYW55KTogdm9pZDtcbn1cbmV4cG9ydCBuYW1lc3BhY2UgUmVhZG9ubHlCaWRpTWFwIHtcbiAgLyoqXG4gICAqIOOCquODluOCuOOCp+OCr+ODiOOBjGBSZWFkb25seUJpZGlNYXBg44G+44Gf44GvYEJpZGlNYXBg44Gn44GC44KL44GL44Gp44GG44GL44KS5Yik5a6a44GX44G+44GZ44CCXG4gICAqIEBwYXJhbSBLIOODnuODg+ODl+OBruOCreODvOOBruWei1xuICAgKiBAcGFyYW0gViDjg57jg4Pjg5fjga7lgKTjga7lnotcbiAgICogQHBhcmFtIGl0ZXJhYmxlIOWIpOWumuOBmeOCi+OCquODluOCuOOCp+OCr+ODiFxuICAgKiBAcmV0dXJucyDjgqrjg5bjgrjjgqfjgq/jg4jjgYxgUmVhZG9ubHlCaWRpTWFwYOOBvuOBn+OBr2BCaWRpTWFwYOOBp+OBguOCjOOBsGB0cnVlYOOAgeOBneOBhuOBp+OBquOBkeOCjOOBsGBmYWxzZWBcbiAgICovXG4gIGV4cG9ydCBmdW5jdGlvbiBpc1JlYWRvbmx5QmlkaU1hcDxLLCBWPihpdGVyYWJsZTogSXRlcmFibGU8W0ssIFZdPiB8IGFueSk6IGl0ZXJhYmxlIGlzIFJlYWRvbmx5QmlkaU1hcDxLLCBWPiB7XG4gICAgcmV0dXJuIGl0ZXJhYmxlIGluc3RhbmNlb2YgQWJzdHJhY3RCaWRpTWFwO1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIEsg44Kt44O844Gu5Z6LXG4gKiBAcGFyYW0gViDlgKTjga7lnotcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBCaWRpTWFwPEssIFY+IGV4dGVuZHMgUmVhZG9ubHlCaWRpTWFwPEssIFY+LCBNYXA8SywgVj4ge1xuICAvKipcbiAgICog6YCG5pa55ZCR44Gu44Oe44OD44OX44CB44GZ44Gq44KP44Gh5YCk44GL44KJ44Kt44O844G444Gu44Oe44OD44OX44Gn44GZ44CCXG4gICAqL1xuICByZWFkb25seSBpbnZlcnNlOiBCaWRpTWFwPFYsIEs+O1xuICAvKipcbiAgICog44Kt44O844O75YCk44Gu5Lih5pa544GL44KJ6YeN6KSH44KS5Y+W44KK6Zmk44GE44Gf44Oe44OD44OX44KS6L+U44GX44G+44GZ44CCXG4gICAqL1xuICBkZWR1cGUoKTogQmlkaU1hcDxLLCBWPjtcbiAgLyoqXG4gICAqIOODnuODg+ODl+OBruOBmeOBueOBpuOBruOCreODvOODu+WApOOBq+WvvuOBl+OBpuaMh+WumuOBleOCjOOBn+mWouaVsOOCkuWun+ihjOOBl+OBvuOBmeOAglxuICAgKiBAcGFyYW0gY2FsbGJhY2tmbiDjgZ3jgozjgZ7jgozjga7jgq3jg7zjg7vlgKTjgavlr77jgZfjgablrp/ooYzjgZnjgovplqLmlbBcbiAgICogQHBhcmFtIHRoaXNBcmcgYGNhbGxiYWNrZm5g44KS5a6f6KGM44GZ44KL44Go44GN44CBYHRoaXNg44Go44GX44Gm5L2/44GG44Kq44OW44K444Kn44Kv44OIXG4gICAqL1xuICBmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogViwga2V5OiBLLCBtYXA6IEJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkO1xufVxuZXhwb3J0IG5hbWVzcGFjZSBCaWRpTWFwIHtcbiAgLyoqXG4gICAqIOOCquODluOCuOOCp+OCr+ODiOOBjGBCaWRpTWFwYOOBp+OBguOCi+OBi+OBqeOBhuOBi+OCkuWIpOWumuOBl+OBvuOBmeOAglxuICAgKiBAcGFyYW0gSyDjg57jg4Pjg5fjga7jgq3jg7zjga7lnotcbiAgICogQHBhcmFtIFYg44Oe44OD44OX44Gu5YCk44Gu5Z6LXG4gICAqIEBwYXJhbSBpdGVyYWJsZSDliKTlrprjgZnjgovjgqrjg5bjgrjjgqfjgq/jg4hcbiAgICogQHJldHVybnMg44Kq44OW44K444Kn44Kv44OI44GMYEJpZGlNYXBg44Gn44GC44KM44GwYHRydWVgXG4gICAqL1xuICBleHBvcnQgZnVuY3Rpb24gaXNCaWRpTWFwPEssIFY+KGl0ZXJhYmxlOiBJdGVyYWJsZTxbSywgVl0+IHwgYW55KTogaXRlcmFibGUgaXMgQmlkaU1hcDxLLCBWPiB7XG4gICAgcmV0dXJuIGl0ZXJhYmxlIGluc3RhbmNlb2YgQWJzdHJhY3RCaWRpTWFwO1xuICB9XG59XG5cbmFic3RyYWN0IGNsYXNzIEFic3RyYWN0QmlkaU1hcDxLLCBWPiBpbXBsZW1lbnRzIEJpZGlNYXA8SywgVj4ge1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVhZG9ubHkgeFRvWTogTWFwPEssIFY+O1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVhZG9ubHkgeVRvWDogTWFwPFYsIEs+O1xuXG4gIGFic3RyYWN0IHJlYWRvbmx5IGludmVyc2U6IEJpZGlNYXA8ViwgSz47XG4gIHJlYWRvbmx5IFtTeW1ib2wudG9TdHJpbmdUYWddOiAnTWFwJyA9ICdNYXAnO1xuXG4gIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS5zaXplO1xuICB9XG5cbiAgZGVkdXBlKCk6IEJpZGlNYXA8SywgVj4ge1xuICAgIGNvbnN0IGludmVyc2VMaWtlOiBCaWRpTWFwPFYsIEs+ID0gbmV3IER1YWxCaWRpTWFwPFYsIEs+KHRoaXMuaW52ZXJzZSk7XG4gICAgcmV0dXJuIG5ldyBEdWFsQmlkaU1hcDxLLCBWPihpbnZlcnNlTGlrZS5pbnZlcnNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgZPjga7jg57jg4Pjg5fjgYrjgojjgbNgdGhpcy5pbnZlcnNlYOOBi+OCieOBmeOBueOBpuOBruODnuODg+ODlOODs+OCsOOCkuWJiumZpOOBl+OBvuOBmeOAglxuICAgKi9cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy54VG9ZLmNsZWFyKCk7XG4gICAgdGhpcy55VG9YLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICog5oyH5a6a44GV44KM44Gf44Kt44O844Gu44Oe44OD44OU44Oz44Kw44GM5a2Y5Zyo44GZ44KL5aC05ZCI44CB44GT44KM44KS5YmK6Zmk44GX44G+44GZ44CCXG4gICAqIOmAhuaWueWQkeOBruODnuODg+ODlOODs+OCsOOBjGB0aGlzLmludmVyc2Vg44Gr5a2Y5Zyo44GZ44KM44Gw44CB44GT44KM44KC5YmK6Zmk44GX44G+44GZ44CCXG4gICAqIEBwYXJhbSBrZXkgXG4gICAqL1xuICBkZWxldGUoa2V5OiBLKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMueFRvWS5oYXMoa2V5KSkge1xuICAgICAgY29uc3QgdmFsdWU6IFYgPSB0aGlzLnhUb1kuZ2V0KGtleSkhO1xuICAgICAgaWYgKHRoaXMueVRvWC5oYXModmFsdWUpICYmIHRoaXMueVRvWC5nZXQodmFsdWUpID09PSBrZXkpIHtcbiAgICAgICAgdGhpcy55VG9YLmRlbGV0ZSh2YWx1ZSEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy54VG9ZLmRlbGV0ZShrZXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIOODnuODg+ODl+OBruOBmeOBueOBpuOBruOCreODvOODu+WApOOBq+WvvuOBl+OBpuaMh+WumuOBleOCjOOBn+mWouaVsOOCkuWun+ihjOOBl+OBvuOBmeOAglxuICAgKiBAcGFyYW0gY2FsbGJhY2tmbiDjgZ3jgozjgZ7jgozjga7jgq3jg7zjg7vlgKTjgavlr77jgZfjgablrp/ooYzjgZnjgovplqLmlbBcbiAgICogQHBhcmFtIHRoaXNBcmcgYGNhbGxiYWNrZm5g44KS5a6f6KGM44GZ44KL44Go44GN44CBYHRoaXNg44Go44GX44Gm5L2/44GG44Kq44OW44K444Kn44Kv44OIXG4gICAqL1xuICBmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogViwga2V5OiBLLCBtYXA6IEJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyk7XG4gIH1cblxuICAvKipcbiAgICog5oyH5a6a44GV44KM44Gf44Kt44O844GM44Oe44OD44OU44Oz44Kw44GX44Gm44GE44KL5YCk44KS6L+U44GX44G+44GZ44CCXG4gICAqIOODnuODg+ODlOODs+OCsOOBjOWtmOWcqOOBl+OBquOBkeOCjOOBsGB1bmRlZmluZWRg44KS6L+U44GX44G+44GZ44CCXG4gICAqIEBwYXJhbSBrZXkg44Oe44OD44OU44Oz44Kw44Gu44Kt44O8XG4gICAqIEByZXR1cm5zIOODnuODg+ODlOODs+OCsOOBruWApOOAgeWtmOWcqOOBl+OBquOBkeOCjOOBsGB1bmRlZmluZWRgXG4gICAqL1xuICBnZXQoa2V5OiBLKTogViB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS5nZXQoa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmjIflrprjgZXjgozjgZ/jgq3jg7zjga7jg57jg4Pjg5Tjg7PjgrDjgYzlrZjlnKjjgZnjgovjgYvjganjgYbjgYvjgpLliKTlrprjgZfjgb7jgZnjgIJcbiAgICogQHBhcmFtIGtleSDjg57jg4Pjg5Tjg7PjgrDjga7jgq3jg7xcbiAgICogQHJldHVybnMg44Oe44OD44OU44Oz44Kw44GM5a2Y5Zyo44GZ44KM44GwYHRydWVg44CB5a2Y5Zyo44GX44Gq44GR44KM44GwYGZhbHNlYFxuICAgKi9cbiAgaGFzKGtleTogSyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnhUb1kuaGFzKGtleSk7XG4gIH1cblxuICAvKipcbiAgICog5oyH5a6a44GV44KM44Gf44Kt44O844GL44KJ5YCk44G444Gu44CB5paw44GX44GE44Oe44OD44OU44Oz44Kw44KS6L+95Yqg44GX44G+44GZ44CCXG4gICAqIOWQjOaZguOBq2B0aGlzLmludmVyc2Vg44Gr44Gv44CB5YCk44GL44KJ44Kt44O844G444Gu44Oe44OD44OU44Oz44Kw44GM6L+95Yqg44GV44KM44G+44GZ44CCXG4gICAqIEBwYXJhbSBrZXkg44Oe44OD44OU44Oz44Kw44Gu44Kt44O8XG4gICAqIEBwYXJhbSB2YWx1ZSDjg57jg4Pjg5Tjg7PjgrDjga7lgKRcbiAgICovXG4gIHNldChrZXk6IEssIHZhbHVlOiBWKTogdGhpcyB7XG4gICAgdGhpcy54VG9ZLnNldChrZXksIHZhbHVlKTtcbiAgICB0aGlzLnlUb1guc2V0KHZhbHVlLCBrZXkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgW1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmFibGVJdGVyYXRvcjxbSywgVl0+IHtcbiAgICByZXR1cm4gdGhpcy54VG9ZW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgfVxuXG4gIGVudHJpZXMoKTogSXRlcmFibGVJdGVyYXRvcjxbSywgVl0+IHtcbiAgICByZXR1cm4gdGhpcy54VG9ZLmVudHJpZXMoKTtcbiAgfVxuXG4gIGtleXMoKTogSXRlcmFibGVJdGVyYXRvcjxLPiB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS5rZXlzKCk7XG4gIH1cblxuICB2YWx1ZXMoKTogSXRlcmFibGVJdGVyYXRvcjxWPiB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS52YWx1ZXMoKTtcbiAgfVxuXG4gIHRvSlNPTigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnhUb1kudG9KU09OKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0gSyDjgq3jg7zjga7lnotcbiAqIEBwYXJhbSBWIOWApOOBruWei1xuICovXG5leHBvcnQgY2xhc3MgRHVhbEJpZGlNYXA8SywgVj4gZXh0ZW5kcyBBYnN0cmFjdEJpZGlNYXA8SywgVj4ge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgeFRvWTogTWFwPEssIFY+O1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgeVRvWDogTWFwPFYsIEs+O1xuICByZWFkb25seSBpbnZlcnNlOiBCaWRpTWFwPFYsIEs+O1xuXG4gIGNvbnN0cnVjdG9yKGVudHJpZXM/OiBJdGVyYWJsZTxbSywgVl0+IHwgbnVsbCk7XG4gIGNvbnN0cnVjdG9yKGJpZGltYXA6IFJlYWRvbmx5QmlkaU1hcDxLLCBWPik7XG4gIGNvbnN0cnVjdG9yKGVudHJpZXM/OiBJdGVyYWJsZTxbSywgVl0+IHwgUmVhZG9ubHlCaWRpTWFwPEssIFY+IHwgbnVsbCkge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKFJlYWRvbmx5QmlkaU1hcC5pc1JlYWRvbmx5QmlkaU1hcDxLLCBWPihlbnRyaWVzKSkge1xuICAgICAgY29uc3QgYmlkaW1hcDogUmVhZG9ubHlCaWRpTWFwPEssIFY+ID0gZW50cmllcztcbiAgICAgIHRoaXMueFRvWSA9IG5ldyBNYXA8SywgVj4oYmlkaW1hcCk7XG4gICAgICB0aGlzLnlUb1ggPSBuZXcgTWFwPFYsIEs+KGJpZGltYXAuaW52ZXJzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMueFRvWSA9IG5ldyBNYXA8SywgVj4oKTtcbiAgICAgIHRoaXMueVRvWCA9IG5ldyBNYXA8ViwgSz4oKTtcbiAgICAgIGlmIChlbnRyaWVzICE9PSBudWxsICYmIGVudHJpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pbnZlcnNlID0gbmV3IEludmVyc2VCaWRpTWFwPFYsIEs+KHRoaXMsIHRoaXMueVRvWCwgdGhpcy54VG9ZKTtcbiAgfVxufVxuXG5jbGFzcyBJbnZlcnNlQmlkaU1hcDxLLCBWPiBleHRlbmRzIEFic3RyYWN0QmlkaU1hcDxLLCBWPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlYWRvbmx5IGludmVyc2U6IEJpZGlNYXA8ViwgSz4sXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IHhUb1k6IE1hcDxLLCBWPixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgeVRvWDogTWFwPFYsIEs+XG4gICkge1xuICAgIHN1cGVyKCk7XG4gIH1cbn0iLCJleHBvcnQgeyBSZWFkb25seUJpZGlNYXAsIEJpZGlNYXAsIER1YWxCaWRpTWFwIH0gZnJvbSAnLi9iaWRpbWFwJztcbmV4cG9ydCB7IFJlYWRvbmx5TXVsdGlCaWRpTWFwLCBNdWx0aUJpZGlNYXAsIER1YWxNdWx0aUJpZGlNYXAgfSBmcm9tICcuL211bHRpYmlkaW1hcCc7IiwiaW1wb3J0IHsgUmVhZG9ubHlCaWRpTWFwLCBCaWRpTWFwLCBEdWFsQmlkaU1hcCB9IGZyb20gJy4vYmlkaW1hcCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj4gZXh0ZW5kcyBSZWFkb25seUJpZGlNYXA8SywgVj4ge1xuICBoYXNBbnkoa2V5OiBLKTogYm9vbGVhbjtcbiAgaGFzKGtleTogSywgdmFsdWU/OiBWKTogYm9vbGVhbjtcbiAgZ2V0QWxsKGtleTogSyk6IEl0ZXJhYmxlSXRlcmF0b3I8Vj47XG4gIGVudHJpZXNBbGwoKTogSXRlcmFibGVJdGVyYXRvcjxbSywgSXRlcmFibGVJdGVyYXRvcjxWPl0+O1xuICBrZXlzQWxsKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Sz47XG4gIHZhbHVlc0FsbCgpOiBJdGVyYWJsZUl0ZXJhdG9yPFY+O1xuICByZWFkb25seSBpbnZlcnNlOiBSZWFkb25seU11bHRpQmlkaU1hcDxWLCBLPjtcbiAgZGVkdXBlKCk6IFJlYWRvbmx5TXVsdGlCaWRpTWFwPEssIFY+O1xuICBmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogViwga2V5OiBLLCBtYXA6IFJlYWRvbmx5TXVsdGlCaWRpTWFwPEssIFY+KSA9PiB2b2lkLCB0aGlzQXJnPzogYW55KTogdm9pZDtcbn1cbmV4cG9ydCBuYW1lc3BhY2UgUmVhZG9ubHlNdWx0aUJpZGlNYXAge1xuICBleHBvcnQgZnVuY3Rpb24gaXNSZWFkb25seU11bHRpQmlkaU1hcDxLLCBWPihpdGVyYWJsZTogSXRlcmFibGU8W0ssIFZdPiB8IGFueSk6IGl0ZXJhYmxlIGlzIFJlYWRvbmx5TXVsdGlCaWRpTWFwPEssIFY+IHtcbiAgICByZXR1cm4gaXRlcmFibGUgaW5zdGFuY2VvZiBBYnN0cmFjdE11bHRpQmlkaU1hcDtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE11bHRpQmlkaU1hcDxLLCBWPiBleHRlbmRzIFJlYWRvbmx5TXVsdGlCaWRpTWFwPEssIFY+LCBCaWRpTWFwPEssIFY+IHtcbiAgZGVsZXRlKGtleTogSywgdmFsdWU/OiBWKTogYm9vbGVhbjtcbiAgaGFzKGtleTogSywgdmFsdWU/OiBWKTogYm9vbGVhbjtcbiAgcmVhZG9ubHkgaW52ZXJzZTogTXVsdGlCaWRpTWFwPFYsIEs+O1xuICBkZWR1cGUoKTogTXVsdGlCaWRpTWFwPEssIFY+O1xuICBmb3JFYWNoKGNhbGxiYWNrZm46ICh2YWx1ZTogViwga2V5OiBLLCBtYXA6IE11bHRpQmlkaU1hcDxLLCBWPikgPT4gdm9pZCwgdGhpc0FyZz86IGFueSk6IHZvaWQ7XG59XG5leHBvcnQgbmFtZXNwYWNlIE11bHRpQmlkaU1hcCB7XG4gIGV4cG9ydCBmdW5jdGlvbiBpc011bHRpQmlkaU1hcDxLLCBWPihpdGVyYWJsZTogSXRlcmFibGU8W0ssIFZdPiB8IGFueSk6IGl0ZXJhYmxlIGlzIE11bHRpQmlkaU1hcDxLLCBWPiB7XG4gICAgcmV0dXJuIGl0ZXJhYmxlIGluc3RhbmNlb2YgQWJzdHJhY3RNdWx0aUJpZGlNYXA7XG4gIH1cbn1cblxuYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RNdWx0aUJpZGlNYXA8SywgVj4gaW1wbGVtZW50cyBNdWx0aUJpZGlNYXA8SywgVj4ge1xuICBwcm90ZWN0ZWQgc3RhdGljIHJlYWRvbmx5IHByb3RlY3RlZEZsYWcgPSBTeW1ib2woJ3Byb3RlY3RlZCcpO1xuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCByZWFkb25seSBiaWRpbWFwOiBCaWRpTWFwPEssIFY+O1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVhZG9ubHkgeFRvWXM6IE1hcDxLLCBTZXQ8Vj4+O1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVhZG9ubHkgeVRvWHM6IE1hcDxWLCBTZXQ8Sz4+O1xuXG4gIGFic3RyYWN0IHJlYWRvbmx5IGludmVyc2U6IE11bHRpQmlkaU1hcDxWLCBLPjtcbiAgcmVhZG9ubHkgW1N5bWJvbC50b1N0cmluZ1RhZ106ICdNYXAnID0gJ01hcCc7XG5cbiAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5iaWRpbWFwLnNpemU7XG4gIH07XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZGVsZXRlQU1BUDxLLCBWPihtYXA6IE1hcDxLLCBTZXQ8Vj4+LCBrZXk6IEssIHZhbHVlOiBWLCB2YWx1ZXMwPzogU2V0PFY+KSB7XG4gICAgaWYgKG1hcC5oYXMoa2V5KSkge1xuICAgICAgY29uc3QgdmFsdWVzOiBTZXQ8Vj4gPSB2YWx1ZXMwIHx8IG1hcC5nZXQoa2V5KSE7XG4gICAgICB2YWx1ZXMuZGVsZXRlKHZhbHVlKTtcbiAgICAgIGlmICh2YWx1ZXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICBtYXAuZGVsZXRlKGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlKGtleTogSywgdmFsdWU/OiBWKTogYm9vbGVhbjtcbiAgZGVsZXRlKGtleTogSywgLi4uYXJnczogW1Y/XSk6IGJvb2xlYW4ge1xuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgaWYgKHRoaXMueFRvWXMuaGFzKGtleSkpIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZXM6IFNldDxWPiA9IHRoaXMueFRvWXMuZ2V0KGtleSkhO1xuICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICAgICAgICBpZiAodmFsdWVzLmhhcyh2YWx1ZSkgJiYgdGhpcy55VG9Ycy5oYXModmFsdWUpKSB7XG4gICAgICAgICAgICAgIER1YWxNdWx0aUJpZGlNYXAuZGVsZXRlQU1BUCh0aGlzLnhUb1lzLCBrZXksIHZhbHVlLCB2YWx1ZXMpO1xuICAgICAgICAgICAgICBEdWFsTXVsdGlCaWRpTWFwLmRlbGV0ZUFNQVAodGhpcy55VG9YcywgdmFsdWUsIGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmJpZGltYXAuZGVsZXRlKGtleSk7XG5cbiAgICAgIGNhc2UgMTpcbiAgICAgICAgY29uc3QgdmFsdWU6IFYgPSBhcmdzWzBdITtcbiAgICAgICAgaWYgKHRoaXMueFRvWXMuaGFzKGtleSkpIHtcbiAgICAgICAgICBpZiAodGhpcy5iaWRpbWFwLmhhcyhrZXkpICYmIHRoaXMuYmlkaW1hcC5nZXQoa2V5KSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuYmlkaW1hcC5kZWxldGUoa2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdmFsdWVzOiBTZXQ8Vj4gPSB0aGlzLnhUb1lzLmdldChrZXkpITtcbiAgICAgICAgICBpZiAodmFsdWVzLmhhcyh2YWx1ZSkgJiYgdGhpcy55VG9Ycy5oYXModmFsdWUpKSB7XG4gICAgICAgICAgICBEdWFsTXVsdGlCaWRpTWFwLmRlbGV0ZUFNQVAodGhpcy54VG9Zcywga2V5LCB2YWx1ZSwgdmFsdWVzKTtcbiAgICAgICAgICAgIER1YWxNdWx0aUJpZGlNYXAuZGVsZXRlQU1BUCh0aGlzLnlUb1hzLCB2YWx1ZSwga2V5KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhc0FueShrZXk6IEspOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy54VG9Zcy5oYXMoa2V5KSAmJlxuICAgICAgdGhpcy54VG9Zcy5nZXQoa2V5KSEuc2l6ZSA+IDA7XG4gIH1cblxuICBoYXMoa2V5OiBLLCB2YWx1ZT86IFYpOiBib29sZWFuO1xuICBoYXMoa2V5OiBLLCAuLi5hcmdzOiBbVj9dKTogYm9vbGVhbiB7XG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gdGhpcy5iaWRpbWFwLmhhcyhrZXkpO1xuXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGNvbnN0IHZhbHVlOiBWID0gYXJnc1swXSE7XG4gICAgICAgIGlmICh0aGlzLnhUb1lzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWVzOiBTZXQ8Vj4gPSB0aGlzLnhUb1lzLmdldChrZXkpITtcbiAgICAgICAgICByZXR1cm4gdmFsdWVzLmhhcyh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0QWxsKGtleTogSyk6IEl0ZXJhYmxlSXRlcmF0b3I8Vj4ge1xuICAgIGlmICh0aGlzLnhUb1lzLmhhcyhrZXkpKSB7XG4gICAgICBjb25zdCB2YWx1ZXM6IFNldDxWPiA9IHRoaXMueFRvWXMuZ2V0KGtleSkhO1xuICAgICAgcmV0dXJuIHZhbHVlc1tTeW1ib2wuaXRlcmF0b3JdKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8Vj4oKTtcbiAgICAgIHJldHVybiBzZXRbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgIH1cbiAgfVxuXG4gIGVudHJpZXNBbGwoKTogSXRlcmFibGVJdGVyYXRvcjxbSywgSXRlcmFibGVJdGVyYXRvcjxWPl0+IHtcbiAgICBjb25zdCBzZXQgPSBuZXcgU2V0PFtLLCBJdGVyYWJsZUl0ZXJhdG9yPFY+XT4oKTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlc10gb2YgdGhpcy54VG9Zcykge1xuICAgICAgc2V0LmFkZChbXG4gICAgICAgIGtleSxcbiAgICAgICAgdmFsdWVzW1N5bWJvbC5pdGVyYXRvcl0oKVxuICAgICAgXSk7XG4gICAgfVxuICAgIHJldHVybiBzZXRbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAga2V5c0FsbCgpOiBJdGVyYWJsZUl0ZXJhdG9yPEs+IHtcbiAgICByZXR1cm4gdGhpcy54VG9Zcy5rZXlzKCk7XG4gIH1cblxuICB2YWx1ZXNBbGwoKTogSXRlcmFibGVJdGVyYXRvcjxWPiB7XG4gICAgcmV0dXJuIHRoaXMueVRvWHMua2V5cygpO1xuICB9XG5cbiAgZGVkdXBlKCk6IE11bHRpQmlkaU1hcDxLLCBWPiB7XG4gICAgY29uc3QgYmlkaW1hcDogQmlkaU1hcDxLLCBWPiA9IHRoaXMuYmlkaW1hcC5kZWR1cGUoKTtcbiAgICByZXR1cm4gbmV3IER1YWxNdWx0aUJpZGlNYXAoYmlkaW1hcCwgdGhpcy54VG9ZcywgdGhpcy55VG9YcywgQWJzdHJhY3RNdWx0aUJpZGlNYXAucHJvdGVjdGVkRmxhZyk7XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLmJpZGltYXAuY2xlYXIoKTtcbiAgICB0aGlzLnhUb1lzLmNsZWFyKCk7XG4gICAgdGhpcy55VG9Ycy5jbGVhcigpO1xuICB9XG5cbiAgZm9yRWFjaChjYWxsYmFja2ZuOiAodmFsdWU6IFYsIGtleTogSywgbWFwOiBNdWx0aUJpZGlNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyk7XG4gIH1cblxuICBnZXQoa2V5OiBLKTogViB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcC5nZXQoa2V5KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGFkZFNhZmVseTxLLCBWPihtYXA6IE1hcDxLLCBTZXQ8Vj4+LCBrZXk6IEssIHZhbHVlOiBWKSB7XG4gICAgaWYgKG1hcC5oYXMoa2V5KSkge1xuICAgICAgY29uc3QgdmFsdWVzOiBTZXQ8Vj4gPSBtYXAuZ2V0KGtleSkhO1xuICAgICAgdmFsdWVzLmFkZCh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hcC5zZXQoa2V5LCBuZXcgU2V0KFt2YWx1ZV0pKTtcbiAgICB9XG4gIH1cblxuICBzZXQoa2V5OiBLLCB2YWx1ZTogVik6IHRoaXMge1xuICAgIHRoaXMuYmlkaW1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgRHVhbE11bHRpQmlkaU1hcC5hZGRTYWZlbHkodGhpcy54VG9Zcywga2V5LCB2YWx1ZSk7XG4gICAgRHVhbE11bHRpQmlkaU1hcC5hZGRTYWZlbHkodGhpcy55VG9YcywgdmFsdWUsIGtleSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIFtTeW1ib2wuaXRlcmF0b3JdKCk6IEl0ZXJhYmxlSXRlcmF0b3I8W0ssIFZdPiB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcFtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIH1cblxuICBlbnRyaWVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8W0ssIFZdPiB7XG4gICAgcmV0dXJuIHRoaXMuYmlkaW1hcC5lbnRyaWVzKCk7XG4gIH1cblxuICBrZXlzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Sz4ge1xuICAgIHJldHVybiB0aGlzLmJpZGltYXAua2V5cygpO1xuICB9XG5cbiAgdmFsdWVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Vj4ge1xuICAgIHJldHVybiB0aGlzLmJpZGltYXAudmFsdWVzKCk7XG4gIH1cblxuICB0b0pTT04oKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5iaWRpbWFwLnRvSlNPTigpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEdWFsTXVsdGlCaWRpTWFwPEssIFY+IGV4dGVuZHMgQWJzdHJhY3RNdWx0aUJpZGlNYXA8SywgVj4ge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgYmlkaW1hcDogQmlkaU1hcDxLLCBWPjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHhUb1lzOiBNYXA8SywgU2V0PFY+PjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHlUb1hzOiBNYXA8ViwgU2V0PEs+PjtcbiAgcmVhZG9ubHkgaW52ZXJzZTogTXVsdGlCaWRpTWFwPFYsIEs+O1xuXG4gIGNvbnN0cnVjdG9yKGVudHJpZXM/OiBJdGVyYWJsZTxbSywgVl0+IHwgbnVsbCk7XG4gIGNvbnN0cnVjdG9yKG11bHRpYmlkaW1hcDogUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj4pO1xuICBjb25zdHJ1Y3RvcihiaWRpbWFwOiBCaWRpTWFwPEssIFY+LCB4VG9ZczogTWFwPEssIFNldDxWPj4sIHlUb1hzOiBNYXA8ViwgU2V0PEs+PiwgcHJvdGVjdGVkRmxhZzogc3ltYm9sKTtcbiAgY29uc3RydWN0b3IoXG4gICAgZW50cmllcz86IEl0ZXJhYmxlPFtLLCBWXT4gfCBSZWFkb25seU11bHRpQmlkaU1hcDxLLCBWPiB8IG51bGwsXG4gICAgeFRvWXM/OiBNYXA8SywgU2V0PFY+PiwgeVRvWHM/OiBNYXA8ViwgU2V0PEs+PiwgcHJvdGVjdGVkRmxhZz86IHN5bWJvbFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChcbiAgICAgIEJpZGlNYXAuaXNCaWRpTWFwPEssIFY+KGVudHJpZXMpICYmIHhUb1lzIGluc3RhbmNlb2YgTWFwICYmIHlUb1hzIGluc3RhbmNlb2YgTWFwXG4gICAgICAmJiBwcm90ZWN0ZWRGbGFnID09PSBBYnN0cmFjdE11bHRpQmlkaU1hcC5wcm90ZWN0ZWRGbGFnXG4gICAgKSB7XG4gICAgICBjb25zdCBiaWRpbWFwOiBCaWRpTWFwPEssIFY+ID0gZW50cmllcztcbiAgICAgIHRoaXMuYmlkaW1hcCA9IGJpZGltYXA7XG4gICAgICB0aGlzLnhUb1lzID0geFRvWXM7XG4gICAgICB0aGlzLnlUb1hzID0geVRvWHM7XG5cbiAgICB9IGVsc2UgaWYgKFJlYWRvbmx5TXVsdGlCaWRpTWFwLmlzUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj4oZW50cmllcykpIHtcbiAgICAgIGNvbnN0IG11bHRpYmlkaW1hcDogUmVhZG9ubHlNdWx0aUJpZGlNYXA8SywgVj4gPSBlbnRyaWVzO1xuICAgICAgdGhpcy5iaWRpbWFwID0gbmV3IER1YWxCaWRpTWFwPEssIFY+KG11bHRpYmlkaW1hcCk7XG4gICAgICB0aGlzLnhUb1lzID0gbmV3IE1hcDxLLCBTZXQ8Vj4+KCk7XG4gICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlc10gb2YgbXVsdGliaWRpbWFwLmVudHJpZXNBbGwoKSkge1xuICAgICAgICB0aGlzLnhUb1lzLnNldChrZXksIG5ldyBTZXQ8Vj4odmFsdWVzKSk7XG4gICAgICB9XG4gICAgICB0aGlzLnlUb1hzID0gbmV3IE1hcDxWLCBTZXQ8Sz4+KCk7XG4gICAgICBmb3IgKGNvbnN0IFt2YWx1ZSwga2V5c10gb2YgbXVsdGliaWRpbWFwLmludmVyc2UuZW50cmllc0FsbCgpKSB7XG4gICAgICAgIHRoaXMueVRvWHMuc2V0KHZhbHVlLCBuZXcgU2V0PEs+KGtleXMpKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJpZGltYXAgPSBuZXcgRHVhbEJpZGlNYXA8SywgVj4oKTtcbiAgICAgIHRoaXMueFRvWXMgPSBuZXcgTWFwPEssIFNldDxWPj4oKTtcbiAgICAgIHRoaXMueVRvWHMgPSBuZXcgTWFwPFYsIFNldDxLPj4oKTtcbiAgICAgIGlmIChlbnRyaWVzICE9PSBudWxsICYmIGVudHJpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBlbnRyaWVzKSB7XG4gICAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pbnZlcnNlID0gbmV3IEludmVyc2VNdWx0aUJpZGlNYXA8ViwgSz4odGhpcywgdGhpcy5iaWRpbWFwLmludmVyc2UsIHRoaXMueVRvWHMsIHRoaXMueFRvWXMpO1xuICB9XG59XG5cbmNsYXNzIEludmVyc2VNdWx0aUJpZGlNYXA8SywgVj4gZXh0ZW5kcyBBYnN0cmFjdE11bHRpQmlkaU1hcDxLLCBWPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlYWRvbmx5IGludmVyc2U6IE11bHRpQmlkaU1hcDxWLCBLPixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgYmlkaW1hcDogQmlkaU1hcDxLLCBWPixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgeFRvWXM6IE1hcDxLLCBTZXQ8Vj4+LFxuICAgIHByb3RlY3RlZCByZWFkb25seSB5VG9YczogTWFwPFYsIFNldDxLPj5cbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=