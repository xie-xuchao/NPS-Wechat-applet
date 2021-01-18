Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../common/component"), e = require("../mixins/page-scroll");

t.VantComponent({
    props: {
        zIndex: {
            type: Number,
            value: 99
        },
        offsetTop: {
            type: Number,
            value: 0,
            observer: "onScroll"
        },
        disabled: {
            type: Boolean,
            observer: "onScroll"
        },
        container: {
            type: null,
            observer: "onScroll"
        },
        scrollTop: {
            type: null,
            observer: function(t) {
                this.onScroll({
                    scrollTop: t
                });
            }
        }
    },
    mixins: [ e.pageScrollMixin(function(t) {
        null == this.data.scrollTop && this.onScroll(t);
    }) ],
    data: {
        height: 0,
        fixed: !1,
        transform: 0
    },
    mounted: function() {
        this.onScroll();
    },
    methods: {
        onScroll: function(t) {
            var e = this, o = (void 0 === t ? {} : t).scrollTop, i = this.data, r = i.container, n = i.offsetTop;
            i.disabled ? this.setDataAfterDiff({
                fixed: !1,
                transform: 0
            }) : (this.scrollTop = o || this.scrollTop, "function" != typeof r ? this.getRect(".van-sticky").then(function(t) {
                n >= t.top ? (e.setDataAfterDiff({
                    fixed: !0,
                    height: t.height
                }), e.transform = 0) : e.setDataAfterDiff({
                    fixed: !1
                });
            }) : Promise.all([ this.getRect(".van-sticky"), this.getContainerRect() ]).then(function(t) {
                var o = t[0], i = t[1];
                n + o.height > i.height + i.top ? e.setDataAfterDiff({
                    fixed: !1,
                    transform: i.height - o.height
                }) : n >= o.top ? e.setDataAfterDiff({
                    fixed: !0,
                    height: o.height,
                    transform: 0
                }) : e.setDataAfterDiff({
                    fixed: !1,
                    transform: 0
                });
            }));
        },
        setDataAfterDiff: function(t) {
            var e = this;
            wx.nextTick(function() {
                var o = Object.keys(t).reduce(function(o, i) {
                    return t[i] !== e.data[i] && (o[i] = t[i]), o;
                }, {});
                e.setData(o), e.$emit("scroll", {
                    scrollTop: e.scrollTop,
                    isFixed: t.fixed || e.data.fixed
                });
            });
        },
        getContainerRect: function() {
            var t = this.data.container();
            return new Promise(function(e) {
                return t.boundingClientRect(e).exec();
            });
        }
    }
});