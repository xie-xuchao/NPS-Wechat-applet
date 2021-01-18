function e(e) {
    return void 0 !== e && null !== e;
}

function t(e) {
    setTimeout(function() {
        e();
    }, 1e3 / 30);
}

function n() {
    return null == i && (i = wx.getSystemInfoSync()), i;
}

var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getAllRect = exports.getRect = exports.pickExclude = exports.requestAnimationFrame = exports.addUnit = exports.getSystemInfoSync = exports.nextTick = exports.range = exports.isObj = exports.isDef = void 0;

var o = require("./validator");

exports.isDef = e, exports.isObj = function(e) {
    var t = void 0 === e ? "undefined" : r(e);
    return null !== e && ("object" === t || "function" === t);
}, exports.range = function(e, t, n) {
    return Math.min(Math.max(e, t), n);
}, exports.nextTick = t;

var i;

exports.getSystemInfoSync = n, exports.addUnit = function(t) {
    if (e(t)) return t = String(t), o.isNumber(t) ? t + "px" : t;
}, exports.requestAnimationFrame = function(e) {
    return "devtools" === n().platform ? t(e) : wx.createSelectorQuery().selectViewport().boundingClientRect().exec(function() {
        e();
    });
}, exports.pickExclude = function(e, t) {
    return o.isPlainObject(e) ? Object.keys(e).reduce(function(n, r) {
        return t.includes(r) || (n[r] = e[r]), n;
    }, {}) : {};
}, exports.getRect = function(e) {
    var t = this;
    return new Promise(function(n) {
        wx.createSelectorQuery().in(t).select(e).boundingClientRect().exec(function(e) {
            return void 0 === e && (e = []), n(e[0]);
        });
    });
}, exports.getAllRect = function(e) {
    var t = this;
    return new Promise(function(n) {
        wx.createSelectorQuery().in(t).selectAll(e).boundingClientRect().exec(function(e) {
            return void 0 === e && (e = []), n(e[0]);
        });
    });
};