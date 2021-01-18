var e = function() {
    return (e = Object.assign || function(e) {
        for (var t, n = 1, r = arguments.length; n < r; n++) {
            t = arguments[n];
            for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
        }
        return e;
    }).apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../common/component"), n = require("../common/version");

t.VantComponent({
    field: !0,
    classes: [ "icon-class" ],
    props: {
        value: {
            type: Number,
            observer: function(e) {
                e !== this.data.innerValue && this.setData({
                    innerValue: e
                });
            }
        },
        readonly: Boolean,
        disabled: Boolean,
        allowHalf: Boolean,
        size: null,
        icon: {
            type: String,
            value: "star"
        },
        voidIcon: {
            type: String,
            value: "star-o"
        },
        color: {
            type: String,
            value: "#ffd21e"
        },
        voidColor: {
            type: String,
            value: "#c7c7c7"
        },
        disabledColor: {
            type: String,
            value: "#bdbdbd"
        },
        count: {
            type: Number,
            value: 5,
            observer: function(e) {
                this.setData({
                    innerCountArray: Array.from({
                        length: e
                    })
                });
            }
        },
        gutter: null,
        touchable: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        innerValue: 0,
        innerCountArray: Array.from({
            length: 5
        })
    },
    methods: {
        onSelect: function(e) {
            var t = this, r = this.data, a = e.currentTarget.dataset.score;
            r.disabled || r.readonly || (this.setData({
                innerValue: a + 1
            }), n.canIUseModel() && this.setData({
                value: a + 1
            }), wx.nextTick(function() {
                t.$emit("input", a + 1), t.$emit("change", a + 1);
            }));
        },
        onTouchMove: function(t) {
            var n = this;
            if (this.data.touchable) {
                var r = t.touches[0].clientX;
                this.getRect(".van-rate__icon", !0).then(function(a) {
                    var o = a.sort(function(e) {
                        return e.right - e.left;
                    }).find(function(e) {
                        return r >= e.left && r <= e.right;
                    });
                    null != o && n.onSelect(e(e({}, t), {
                        currentTarget: o
                    }));
                });
            }
        }
    }
});