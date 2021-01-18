Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../common/component"), e = require("../common/utils");

t.VantComponent({
    classes: [ "title-class" ],
    props: {
        title: String,
        fixed: {
            type: Boolean,
            observer: "setHeight"
        },
        placeholder: {
            type: Boolean,
            observer: "setHeight"
        },
        leftText: String,
        rightText: String,
        customStyle: String,
        leftArrow: Boolean,
        border: {
            type: Boolean,
            value: !0
        },
        zIndex: {
            type: Number,
            value: 1
        },
        safeAreaInsetTop: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        height: 46
    },
    created: function() {
        var t = e.getSystemInfoSync().statusBarHeight;
        this.setData({
            statusBarHeight: t,
            height: 46 + t
        });
    },
    mounted: function() {
        this.setHeight();
    },
    methods: {
        onClickLeft: function() {
            this.$emit("click-left");
        },
        onClickRight: function() {
            this.$emit("click-right");
        },
        setHeight: function() {
            var t = this;
            this.data.fixed && this.data.placeholder && wx.nextTick(function() {
                e.getRect.call(t, ".van-nav-bar").then(function(e) {
                    t.setData({
                        height: e.height
                    });
                });
            });
        }
    }
});