!function(t){var e={};function r(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(o,n,function(e){return t[e]}.bind(null,n));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);var o=function(t){var e="function"==typeof Symbol&&t[Symbol.iterator],r=0;return e?e.call(t):{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}}},n=function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var o,n,i=r.call(t),u=[];try{for(;(void 0===e||e-- >0)&&!(o=i.next()).done;)u.push(o.value)}catch(t){n={error:t}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}return u},i=function(){function t(t){var e,r;if(this[Symbol.toStringTag]="Map",this.xToY=new Map,this.yToX=new Map,null!==t&&void 0!==t)try{for(var i=o(t),u=i.next();!u.done;u=i.next()){var f=n(u.value,2),l=f[0],a=f[1];this.set(l,a)}}catch(t){e={error:t}}finally{try{u&&!u.done&&(r=i.return)&&r.call(i)}finally{if(e)throw e.error}}}return t.prototype.inverse=function(){return new t(this.yToX)},t.prototype.clear=function(){this.xToY.clear(),this.yToX.clear()},t.prototype.delete=function(t){return!1},t.prototype.forEach=function(t,e){this.forEach(t,e)},t.prototype.get=function(t){return this.xToY.get(t)},t.prototype.has=function(t){return this.xToY.has(t)},t.prototype.set=function(t,e){return this.xToY.set(t,e),this.yToX.set(e,t),this},Object.defineProperty(t.prototype,"size",{get:function(){return this.xToY.size},enumerable:!0,configurable:!0}),t.prototype[Symbol.iterator]=function(){return this.xToY[Symbol.iterator]()},t.prototype.entries=function(){return this.xToY.entries()},t.prototype.keys=function(){return this.xToY.keys()},t.prototype.values=function(){return this.xToY.values()},t.prototype.toJSON=function(){return this.xToY.toJSON()},t}();r.d(e,"BidiMap",function(){return i})}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpZGltYXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJleHBvcnRzIiwibW9kdWxlIiwiaSIsImwiLCJtb2R1bGVzIiwiY2FsbCIsIm0iLCJjIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJ0IiwibW9kZSIsIl9fZXNNb2R1bGUiLCJucyIsImNyZWF0ZSIsImtleSIsImJpbmQiLCJuIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiQmlkaU1hcCIsImVudHJpZXMiLCJ0aGlzIiwieFRvWSIsIk1hcCIsInlUb1giLCJ1bmRlZmluZWQiLCJlbnRyaWVzXzEiLCJfX3ZhbHVlcyIsImVudHJpZXNfMV8xIiwibmV4dCIsImRvbmUiLCJfYiIsIl9fcmVhZCIsInNldCIsImludmVyc2UiLCJjbGVhciIsImRlbGV0ZSIsImZvckVhY2giLCJjYWxsYmFja2ZuIiwidGhpc0FyZyIsImhhcyIsInNpemUiLCJpdGVyYXRvciIsImtleXMiLCJ2YWx1ZXMiLCJ0b0pTT04iLCJfX3dlYnBhY2tfZXhwb3J0c19fIl0sIm1hcHBpbmdzIjoiYUFDQSxJQUFBQSxLQUdBLFNBQUFDLEVBQUFDLEdBR0EsR0FBQUYsRUFBQUUsR0FDQSxPQUFBRixFQUFBRSxHQUFBQyxRQUdBLElBQUFDLEVBQUFKLEVBQUFFLElBQ0FHLEVBQUFILEVBQ0FJLEdBQUEsRUFDQUgsWUFVQSxPQU5BSSxFQUFBTCxHQUFBTSxLQUFBSixFQUFBRCxRQUFBQyxJQUFBRCxRQUFBRixHQUdBRyxFQUFB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QUFKLFVBQUFLLFFBQUEsV0FDRSxPQUFPQyxLQUFLQyxLQUFLRixXQUduQkQsRUFBQUosVUFBQTRCLEtBQUEsV0FDRSxPQUFPdEIsS0FBS0MsS0FBS3FCLFFBR25CeEIsRUFBQUosVUFBQTZCLE9BQUEsV0FDRSxPQUFPdkIsS0FBS0MsS0FBS3NCLFVBR25CekIsRUFBQUosVUFBQThCLE9BQUEsV0FDRSxPQUFPeEIsS0FBS0MsS0FBS3VCLFVBRXJCMUIsRUF0RUEsR0NKQXBDLEVBQUFVLEVBQUFxRCxFQUFBLDRCQUFBM0IiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiZXhwb3J0IGludGVyZmFjZSBSZWFkb25seUJpZGlNYXA8SywgVj4gZXh0ZW5kcyBSZWFkb25seU1hcDxLLCBWPiB7XG4gIGludmVyc2UoKTogUmVhZG9ubHlNYXA8ViwgSz47XG59XG5cbmV4cG9ydCBjbGFzcyBCaWRpTWFwPEssIFY+IGltcGxlbWVudHMgUmVhZG9ubHlCaWRpTWFwPEssIFY+LCBNYXA8SywgVj4ge1xuICBwcml2YXRlIHhUb1k6IE1hcDxLLCBWPjtcbiAgcHJpdmF0ZSB5VG9YOiBNYXA8ViwgSz47XG5cbiAgY29uc3RydWN0b3IoZW50cmllcz86IEl0ZXJhYmxlPFtLLCBWXT4gfCBudWxsKSB7XG4gICAgdGhpcy54VG9ZID0gbmV3IE1hcDxLLCBWPigpO1xuICAgIHRoaXMueVRvWCA9IG5ldyBNYXA8ViwgSz4oKTtcbiAgICBpZiAoZW50cmllcyAhPT0gbnVsbCAmJiBlbnRyaWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGVudHJpZXMpIHtcbiAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbnZlcnNlKCk6IEJpZGlNYXA8ViwgSz4ge1xuICAgIHJldHVybiBuZXcgQmlkaU1hcDxWLCBLPih0aGlzLnlUb1gpO1xuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy54VG9ZLmNsZWFyKCk7XG4gICAgdGhpcy55VG9YLmNsZWFyKCk7XG4gIH1cblxuICBkZWxldGUoa2V5OiBLKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZm9yRWFjaChjYWxsYmFja2ZuOiAodmFsdWU6IFYsIGtleTogSywgbWFwOiBNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyk7XG4gIH1cblxuICBnZXQoa2V5OiBLKTogViB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS5nZXQoa2V5KTtcbiAgfVxuXG4gIGhhcyhrZXk6IEspOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy54VG9ZLmhhcyhrZXkpO1xuICB9XG5cbiAgc2V0KGtleTogSywgdmFsdWU6IFYpOiB0aGlzIHtcbiAgICB0aGlzLnhUb1kuc2V0KGtleSwgdmFsdWUpO1xuICAgIHRoaXMueVRvWC5zZXQodmFsdWUsIGtleSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnhUb1kuc2l6ZTtcbiAgfTtcblxuICByZWFkb25seSBbU3ltYm9sLnRvU3RyaW5nVGFnXTogJ01hcCcgPSAnTWFwJztcblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYWJsZUl0ZXJhdG9yPFtLLCBWXT4ge1xuICAgIHJldHVybiB0aGlzLnhUb1lbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAgZW50cmllcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFtLLCBWXT4ge1xuICAgIHJldHVybiB0aGlzLnhUb1kuZW50cmllcygpO1xuICB9XG5cbiAga2V5cygpOiBJdGVyYWJsZUl0ZXJhdG9yPEs+IHtcbiAgICByZXR1cm4gdGhpcy54VG9ZLmtleXMoKTtcbiAgfVxuXG4gIHZhbHVlcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFY+IHtcbiAgICByZXR1cm4gdGhpcy54VG9ZLnZhbHVlcygpO1xuICB9XG5cbiAgdG9KU09OKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMueFRvWS50b0pTT04oKTtcbiAgfVxufVxuIiwiZXhwb3J0IHsgUmVhZG9ubHlCaWRpTWFwLCBCaWRpTWFwIH0gZnJvbSAnLi9iaWRpbWFwJzsiXSwic291cmNlUm9vdCI6IiJ9