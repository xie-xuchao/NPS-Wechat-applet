function e(e) {
    return Math.min(Math.max(e, 0), 100);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../common/component"), r = require("../common/utils"), n = require("../common/color"), i = require("./canvas"), a = 2 * Math.PI, o = -Math.PI / 2;

t.VantComponent({
    props: {
        text: String,
        lineCap: {
            type: String,
            value: "round"
        },
        value: {
            type: Number,
            value: 0,
            observer: "reRender"
        },
        speed: {
            type: Number,
            value: 50
        },
        size: {
            type: Number,
            value: 100,
            observer: function() {
                this.drawCircle(this.currentValue);
            }
        },
        fill: String,
        layerColor: {
            type: String,
            value: n.WHITE
        },
        color: {
            type: [ String, Object ],
            value: n.BLUE,
            observer: function() {
                var e = this;
                this.setHoverColor().then(function() {
                    e.drawCircle(e.currentValue);
                });
            }
        },
        type: {
            type: String,
            value: ""
        },
        strokeWidth: {
            type: Number,
            value: 4
        },
        clockwise: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        hoverColor: n.BLUE
    },
    methods: {
        getContext: function() {
            var e = this, t = this.data, r = t.type, n = t.size;
            if ("" === r) {
                var a = wx.createCanvasContext("van-circle", this);
                return Promise.resolve(a);
            }
            var o = wx.getSystemInfoSync().pixelRatio;
            return new Promise(function(t) {
                wx.createSelectorQuery().in(e).select("#van-circle").node().exec(function(a) {
                    var l = a[0].node, s = l.getContext(r);
                    e.inited || (e.inited = !0, l.width = n * o, l.height = n * o, s.scale(o, o)), t(i.adaptor(s));
                });
            });
        },
        setHoverColor: function() {
            var e = this, t = this.data, n = t.color, i = t.size;
            return r.isObj(n) ? this.getContext().then(function(t) {
                var r = t.createLinearGradient(i, 0, 0, 0);
                Object.keys(n).sort(function(e, t) {
                    return parseFloat(e) - parseFloat(t);
                }).map(function(e) {
                    return r.addColorStop(parseFloat(e) / 100, n[e]);
                }), e.hoverColor = r;
            }) : (this.hoverColor = n, Promise.resolve());
        },
        presetCanvas: function(e, t, r, n, i) {
            var a = this.data, o = a.strokeWidth, l = a.lineCap, s = a.clockwise, c = a.size / 2, u = c - o / 2;
            e.setStrokeStyle(t), e.setLineWidth(o), e.setLineCap(l), e.beginPath(), e.arc(c, c, u, r, n, !s), 
            e.stroke(), i && (e.setFillStyle(i), e.fill());
        },
        renderLayerCircle: function(e) {
            var t = this.data, r = t.layerColor, n = t.fill;
            this.presetCanvas(e, r, 0, a, n);
        },
        renderHoverCircle: function(e, t) {
            var r = this.data.clockwise, n = a * (t / 100), i = r ? o + n : 3 * Math.PI - (o + n);
            this.presetCanvas(e, this.hoverColor, o, i);
        },
        drawCircle: function(t) {
            var r = this, n = this.data.size;
            this.getContext().then(function(i) {
                i.clearRect(0, 0, n, n), r.renderLayerCircle(i);
                var a = e(t);
                0 !== a && r.renderHoverCircle(i, a), i.draw();
            });
        },
        reRender: function() {
            var e = this, t = this.data, r = t.value, n = t.speed;
            n <= 0 || n > 1e3 ? this.drawCircle(r) : (this.clearInterval(), this.currentValue = this.currentValue || 0, 
            this.interval = setInterval(function() {
                e.currentValue !== r ? (e.currentValue < r ? e.currentValue += 1 : e.currentValue -= 1, 
                e.drawCircle(e.currentValue)) : e.clearInterval();
            }, 1e3 / n));
        },
        clearInterval: function(e) {
            function t() {
                return e.apply(this, arguments);
            }
            return t.toString = function() {
                return e.toString();
            }, t;
        }(function() {
            this.interval && (clearInterval(this.interval), this.interval = null);
        })
    },
    mounted: function() {
        var e = this;
        this.currentValue = this.data.value, this.setHoverColor().then(function() {
            e.drawCircle(e.currentValue);
        });
    },
    destroyed: function() {
        this.clearInterval();
    }
});