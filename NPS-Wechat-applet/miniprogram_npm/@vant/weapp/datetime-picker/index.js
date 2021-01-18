function e(e) {
    return l.isDef(e) && !isNaN(new Date(e).getTime());
}

function t(e, t, n) {
    return Math.min(Math.max(e, t), n);
}

function n(e) {
    return ("00" + e).slice(-2);
}

function a(e, t) {
    for (var n = -1, a = Array(e < 0 ? 0 : e); ++n < e; ) a[n] = t(n);
    return a;
}

function r(e) {
    for (;isNaN(parseInt(e, 10)); ) e = e.slice(1);
    return parseInt(e, 10);
}

function u(e, t) {
    return 32 - new Date(e, t - 1, 32).getDate();
}

var i = function() {
    return (i = Object.assign || function(e) {
        for (var t, n = 1, a = arguments.length; n < a; n++) {
            t = arguments[n];
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        }
        return e;
    }).apply(this, arguments);
}, o = function() {
    for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
    for (var a = Array(e), r = 0, t = 0; t < n; t++) for (var u = arguments[t], i = 0, o = u.length; i < o; i++, 
    r++) a[r] = u[i];
    return a;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var s = require("../common/component"), l = require("../common/utils"), m = require("../picker/shared"), p = new Date().getFullYear(), c = function(e, t) {
    return t;
};

s.VantComponent({
    classes: [ "active-class", "toolbar-class", "column-class" ],
    props: i(i({}, m.pickerProps), {
        value: {
            type: null,
            observer: "updateValue"
        },
        filter: null,
        type: {
            type: String,
            value: "datetime",
            observer: "updateValue"
        },
        showToolbar: {
            type: Boolean,
            value: !0
        },
        formatter: {
            type: null,
            value: c
        },
        minDate: {
            type: Number,
            value: new Date(p - 10, 0, 1).getTime(),
            observer: "updateValue"
        },
        maxDate: {
            type: Number,
            value: new Date(p + 10, 11, 31).getTime(),
            observer: "updateValue"
        },
        minHour: {
            type: Number,
            value: 0,
            observer: "updateValue"
        },
        maxHour: {
            type: Number,
            value: 23,
            observer: "updateValue"
        },
        minMinute: {
            type: Number,
            value: 0,
            observer: "updateValue"
        },
        maxMinute: {
            type: Number,
            value: 59,
            observer: "updateValue"
        }
    }),
    data: {
        innerValue: Date.now(),
        columns: []
    },
    methods: {
        updateValue: function() {
            var e = this, t = this.data, n = this.correctValue(t.value);
            n === t.innerValue ? this.updateColumns() : this.updateColumnValue(n).then(function() {
                e.$emit("input", n);
            });
        },
        getPicker: function() {
            if (null == this.picker) {
                this.picker = this.selectComponent(".van-datetime-picker");
                var e = this.picker, t = e.setColumnValues;
                e.setColumnValues = function() {
                    for (var n = [], a = 0; a < arguments.length; a++) n[a] = arguments[a];
                    return t.apply(e, o(n, [ !1 ]));
                };
            }
            return this.picker;
        },
        updateColumns: function() {
            var e = this.data.formatter, t = void 0 === e ? c : e, n = this.getOriginColumns().map(function(e) {
                return {
                    values: e.values.map(function(n) {
                        return t(e.type, n);
                    })
                };
            });
            return this.set({
                columns: n
            });
        },
        getOriginColumns: function() {
            var e = this.data.filter;
            return this.getRanges().map(function(t) {
                var r = t.type, u = t.range, i = a(u[1] - u[0] + 1, function(e) {
                    var t = u[0] + e;
                    return t = "year" === r ? "" + t : n(t);
                });
                return e && (i = e(r, i)), {
                    type: r,
                    values: i
                };
            });
        },
        getRanges: function() {
            var e = this.data;
            if ("time" === e.type) return [ {
                type: "hour",
                range: [ e.minHour, e.maxHour ]
            }, {
                type: "minute",
                range: [ e.minMinute, e.maxMinute ]
            } ];
            var t = this.getBoundary("max", e.innerValue), n = t.maxYear, a = t.maxDate, r = t.maxMonth, u = t.maxHour, i = t.maxMinute, o = this.getBoundary("min", e.innerValue), s = o.minYear, l = o.minDate, m = [ {
                type: "year",
                range: [ s, n ]
            }, {
                type: "month",
                range: [ o.minMonth, r ]
            }, {
                type: "day",
                range: [ l, a ]
            }, {
                type: "hour",
                range: [ o.minHour, u ]
            }, {
                type: "minute",
                range: [ o.minMinute, i ]
            } ];
            return "date" === e.type && m.splice(3, 2), "year-month" === e.type && m.splice(2, 3), 
            m;
        },
        correctValue: function(a) {
            var r = this.data, u = "time" !== r.type;
            if (u && !e(a) ? a = r.minDate : u || a || (a = n(r.minHour) + ":00"), !u) {
                var i = a.split(":"), o = i[0], s = i[1];
                return o = n(t(o, r.minHour, r.maxHour)), s = n(t(s, r.minMinute, r.maxMinute)), 
                o + ":" + s;
            }
            return a = Math.max(a, r.minDate), a = Math.min(a, r.maxDate);
        },
        getBoundary: function(e, t) {
            var n, a = new Date(t), r = new Date(this.data[e + "Date"]), i = r.getFullYear(), o = 1, s = 1, l = 0, m = 0;
            return "max" === e && (o = 12, s = u(a.getFullYear(), a.getMonth() + 1), l = 23, 
            m = 59), a.getFullYear() === i && (o = r.getMonth() + 1, a.getMonth() + 1 === o && (s = r.getDate(), 
            a.getDate() === s && (l = r.getHours(), a.getHours() === l && (m = r.getMinutes())))), 
            n = {}, n[e + "Year"] = i, n[e + "Month"] = o, n[e + "Date"] = s, n[e + "Hour"] = l, 
            n[e + "Minute"] = m, n;
        },
        onCancel: function() {
            this.$emit("cancel");
        },
        onConfirm: function() {
            this.$emit("confirm", this.data.innerValue);
        },
        onChange: function() {
            var e, t = this, n = this.data, a = this.getPicker(), i = this.getOriginColumns();
            if ("time" === n.type) {
                var o = a.getIndexes();
                e = +i[0].values[o[0]] + ":" + +i[1].values[o[1]];
            } else {
                var s = (o = a.getIndexes()).map(function(e, t) {
                    return i[t].values[e];
                }), l = r(s[0]), m = r(s[1]), p = u(l, m), c = r(s[2]);
                "year-month" === n.type && (c = 1), c = c > p ? p : c;
                var h = 0, v = 0;
                "datetime" === n.type && (h = r(s[3]), v = r(s[4])), e = new Date(l, m - 1, c, h, v);
            }
            e = this.correctValue(e), this.updateColumnValue(e).then(function() {
                t.$emit("input", e), t.$emit("change", a);
            });
        },
        updateColumnValue: function(e) {
            var t = this, a = [], r = this.data.type, u = this.data.formatter || c, i = this.getPicker();
            if ("time" === r) {
                var o = e.split(":");
                a = [ u("hour", o[0]), u("minute", o[1]) ];
            } else {
                var s = new Date(e);
                a = [ u("year", "" + s.getFullYear()), u("month", n(s.getMonth() + 1)) ], "date" === r && a.push(u("day", n(s.getDate()))), 
                "datetime" === r && a.push(u("day", n(s.getDate())), u("hour", n(s.getHours())), u("minute", n(s.getMinutes())));
            }
            return this.set({
                innerValue: e
            }).then(function() {
                return t.updateColumns();
            }).then(function() {
                return i.setValues(a);
            });
        }
    },
    created: function() {
        var e = this, t = this.correctValue(this.data.value);
        this.updateColumnValue(t).then(function() {
            e.$emit("input", t);
        });
    }
});