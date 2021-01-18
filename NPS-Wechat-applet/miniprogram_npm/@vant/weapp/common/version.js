function e(e, t) {
    e = e.split("."), t = t.split(".");
    for (var r = Math.max(e.length, t.length); e.length < r; ) e.push("0");
    for (;t.length < r; ) t.push("0");
    for (var n = 0; n < r; n++) {
        var o = parseInt(e[n], 10), s = parseInt(t[n], 10);
        if (o > s) return 1;
        if (o < s) return -1;
    }
    return 0;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.canIUseFormFieldButton = exports.canIUseModel = void 0;

var t = require("./utils");

exports.canIUseModel = function() {
    return e(t.getSystemInfoSync().SDKVersion, "2.9.3") >= 0;
}, exports.canIUseFormFieldButton = function() {
    return e(t.getSystemInfoSync().SDKVersion, "2.10.3") >= 0;
};