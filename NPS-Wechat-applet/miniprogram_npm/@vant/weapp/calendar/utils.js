function e(e, t) {
    e instanceof Date || (e = new Date(e)), t instanceof Date || (t = new Date(t));
    var n = e.getFullYear(), r = t.getFullYear(), o = e.getMonth(), a = t.getMonth();
    return n === r ? o === a ? 0 : o > a ? 1 : -1 : n > r ? 1 : -1;
}

function t(e, t) {
    return (e = new Date(e)).setDate(e.getDate() + t), e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getMonths = exports.getMonthEndDay = exports.copyDates = exports.calcDateNum = exports.getNextDay = exports.getPrevDay = exports.getDayByOffset = exports.compareDay = exports.compareMonth = exports.formatMonthTitle = exports.ROW_HEIGHT = void 0, 
exports.ROW_HEIGHT = 64, exports.formatMonthTitle = function(e) {
    return e instanceof Date || (e = new Date(e)), e.getFullYear() + "年" + (e.getMonth() + 1) + "月";
}, exports.compareMonth = e, exports.compareDay = function(t, n) {
    t instanceof Date || (t = new Date(t)), n instanceof Date || (n = new Date(n));
    var r = e(t, n);
    if (0 === r) {
        var o = t.getDate(), a = n.getDate();
        return o === a ? 0 : o > a ? 1 : -1;
    }
    return r;
}, exports.getDayByOffset = t, exports.getPrevDay = function(e) {
    return t(e, -1);
}, exports.getNextDay = function(e) {
    return t(e, 1);
}, exports.calcDateNum = function(e) {
    var t = new Date(e[0]).getTime();
    return (new Date(e[1]).getTime() - t) / 864e5 + 1;
}, exports.copyDates = function(e) {
    return Array.isArray(e) ? e.map(function(e) {
        return null === e ? e : new Date(e);
    }) : new Date(e);
}, exports.getMonthEndDay = function(e, t) {
    return 32 - new Date(e, t - 1, 32).getDate();
}, exports.getMonths = function(t, n) {
    var r = [], o = new Date(t);
    o.setDate(1);
    do {
        r.push(o.getTime()), o.setMonth(o.getMonth() + 1);
    } while (1 !== e(o, n));
    return r;
};