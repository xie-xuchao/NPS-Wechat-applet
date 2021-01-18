var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

module.exports = function(t) {
    function r(e) {
        if (o[e]) return o[e].exports;
        var n = o[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(n.exports, n, n.exports, r), n.l = !0, n.exports;
    }
    var o = {};
    return r.m = t, r.c = o, r.d = function(e, t, o) {
        r.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: o
        });
    }, r.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, r.t = function(t, o) {
        if (1 & o && (t = r(t)), 8 & o) return t;
        if (4 & o && "object" === (void 0 === t ? "undefined" : e(t)) && t && t.__esModule) return t;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: t
        }), 2 & o && "string" != typeof t) for (var u in t) r.d(n, u, function(e) {
            return t[e];
        }.bind(null, u));
        return n;
    }, r.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return r.d(t, "a", t), t;
    }, r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, r.p = "", r(r.s = 0);
}([ function(e, t, r) {
    Component({
        externalClasses: [ "header-row-class-name", "row-class-name", "cell-class-name" ],
        options: {
            styleIsolation: "isolated",
            multipleSlots: !0
        },
        properties: {
            data: {
                type: Array,
                value: []
            },
            headers: {
                type: Array,
                value: []
            },
            height: {
                type: String,
                value: "auto"
            },
            width: {
                type: Number || String,
                value: "100%"
            },
            tdWidth: {
                type: Number,
                value: 35
            },
            offsetTop: {
                type: Number,
                value: 150
            },
            stripe: {
                type: Boolean,
                value: !1
            },
            border: {
                type: Boolean,
                value: !1
            },
            msg: {
                type: String,
                value: "暂无数据~"
            }
        },
        data: {
            scrolWidth: "100%"
        },
        observers: {
            headers: function(e) {
                var t = e.reduce(function(e, t) {
                    return e + Number(t.width);
                }, 0);
                this.setData({
                    scrolWidth: t
                });
            }
        },
        methods: {
            onRowClick: function(e) {
                this.triggerEvent("rowClick", e, e.currentTarget.dataset.it);
            }
        }
    });
} ]);