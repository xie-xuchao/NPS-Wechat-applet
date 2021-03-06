Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../common/component"), a = require("../mixins/touch"), e = require("../common/version");

t.VantComponent({
    mixins: [ a.touch ],
    props: {
        disabled: Boolean,
        useButtonSlot: Boolean,
        activeColor: String,
        inactiveColor: String,
        max: {
            type: Number,
            value: 100
        },
        min: {
            type: Number,
            value: 0
        },
        step: {
            type: Number,
            value: 1
        },
        value: {
            type: Number,
            value: 0,
            observer: function(t) {
                t !== this.value && this.updateValue(t);
            }
        },
        barHeight: {
            type: null,
            value: 2
        }
    },
    created: function() {
        this.updateValue(this.data.value);
    },
    methods: {
        onTouchStart: function(t) {
            this.data.disabled || (this.touchStart(t), this.startValue = this.format(this.value), 
            this.dragStatus = "start");
        },
        onTouchMove: function(t) {
            var a = this;
            this.data.disabled || ("start" === this.dragStatus && this.$emit("drag-start"), 
            this.touchMove(t), this.dragStatus = "draging", this.getRect(".van-slider").then(function(t) {
                var e = a.deltaX / t.width * 100;
                a.newValue = a.startValue + e, a.updateValue(a.newValue, !1, !0);
            }));
        },
        onTouchEnd: function() {
            this.data.disabled || "draging" === this.dragStatus && (this.updateValue(this.newValue, !0), 
            this.$emit("drag-end"));
        },
        onClick: function(t) {
            var a = this;
            if (!this.data.disabled) {
                var e = this.data.min;
                this.getRect(".van-slider").then(function(i) {
                    var n = (t.detail.x - i.left) / i.width * a.getRange() + e;
                    a.updateValue(n, !0);
                });
            }
        },
        updateValue: function(t, a, i) {
            var n = 100 * ((t = this.format(t)) - this.data.min) / this.getRange() + "%";
            this.value = t, this.setData({
                barStyle: "\n          width: " + n + ";\n          " + (i ? "transition: none;" : "") + "\n        "
            }), i && this.$emit("drag", {
                value: t
            }), a && this.$emit("change", t), (i || a) && e.canIUseModel() && this.setData({
                value: t
            });
        },
        getRange: function() {
            var t = this.data;
            return t.max - t.min;
        },
        format: function(t) {
            var a = this.data, e = a.max, i = a.min, n = a.step;
            return Math.round(Math.max(i, Math.min(t, e)) / n) * n;
        }
    }
});