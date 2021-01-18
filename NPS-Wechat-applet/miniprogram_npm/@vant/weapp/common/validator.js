function t(t) {
    return "function" == typeof t;
}

function e(t) {
    return null !== t && "object" === (void 0 === t ? "undefined" : o(t)) && !Array.isArray(t);
}

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.isVideoUrl = exports.isImageUrl = exports.isBoolean = exports.isNumber = exports.isObj = exports.isDef = exports.isPromise = exports.isPlainObject = exports.isFunction = void 0, 
exports.isFunction = t, exports.isPlainObject = e, exports.isPromise = function(o) {
    return e(o) && t(o.then) && t(o.catch);
}, exports.isDef = function(t) {
    return void 0 !== t && null !== t;
}, exports.isObj = function(t) {
    var e = void 0 === t ? "undefined" : o(t);
    return null !== t && ("object" === e || "function" === e);
}, exports.isNumber = function(t) {
    return /^\d+(\.\d+)?$/.test(t);
}, exports.isBoolean = function(t) {
    return "boolean" == typeof t;
};

var r = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i, n = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i;

exports.isImageUrl = function(t) {
    return r.test(t);
}, exports.isVideoUrl = function(t) {
    return n.test(t);
};