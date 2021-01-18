Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../common/component"), i = require("../common/utils");

t.VantComponent({
    props: {
        text: {
            type: String,
            value: "",
            observer: function() {
                var t = this;
                wx.nextTick(function() {
                    t.init();
                });
            }
        },
        mode: {
            type: String,
            value: ""
        },
        url: {
            type: String,
            value: ""
        },
        openType: {
            type: String,
            value: "navigate"
        },
        delay: {
            type: Number,
            value: 1
        },
        speed: {
            type: Number,
            value: 50,
            observer: function() {
                var t = this;
                wx.nextTick(function() {
                    t.init();
                });
            }
        },
        scrollable: {
            type: Boolean,
            value: !0
        },
        leftIcon: {
            type: String,
            value: ""
        },
        color: String,
        backgroundColor: String,
        background: String,
        wrapable: Boolean
    },
    data: {
        show: !0
    },
    created: function() {
        this.resetAnimation = wx.createAnimation({
            duration: 0,
            timingFunction: "linear"
        });
    },
    destroyed: function() {
        this.timer && clearTimeout(this.timer);
    },
    methods: {
        init: function() {
            var t = this;
            Promise.all([ i.getRect.call(this, ".van-notice-bar__content"), i.getRect.call(this, ".van-notice-bar__wrap") ]).then(function(i) {
                var e = i[0], n = i[1];
                if (null != e && null != n && e.width && n.width) {
                    var a = t.data, o = a.speed, r = a.scrollable, l = a.delay;
                    if (r || n.width < e.width) {
                        var s = e.width / o * 1e3;
                        t.wrapWidth = n.width, t.contentWidth = e.width, t.duration = s, t.animation = wx.createAnimation({
                            duration: s,
                            timingFunction: "linear",
                            delay: l
                        }), t.scroll();
                    }
                }
            });
        },
        scroll: function() {
            var t = this;
            this.timer && clearTimeout(this.timer), this.timer = null, this.setData({
                animationData: this.resetAnimation.translateX(this.wrapWidth).step().export()
            }), i.requestAnimationFrame(function() {
                t.setData({
                    animationData: t.animation.translateX(-t.contentWidth).step().export()
                });
            }), this.timer = setTimeout(function() {
                t.scroll();
            }, this.duration);
        },
        onClickIcon: function(t) {
            "closeable" === this.data.mode && (this.timer && clearTimeout(this.timer), this.timer = null, 
            this.setData({
                show: !1
            }), this.$emit("close", t.detail));
        },
        onClick: function(t) {
            this.$emit("click", t);
        }
    }
});