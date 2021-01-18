Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../common/component"), e = require("../mixins/touch"), n = require("../common/utils");

t.VantComponent({
    mixins: [ e.touch ],
    classes: [ "nav-class", "tab-class", "tab-active-class", "line-class" ],
    relation: {
        name: "tab",
        type: "descendant",
        current: "tabs",
        linked: function(t) {
            t.index = this.children.length - 1, this.updateTabs();
        },
        unlinked: function() {
            this.children = this.children.map(function(t, e) {
                return t.index = e, t;
            }), this.updateTabs();
        }
    },
    props: {
        sticky: Boolean,
        border: Boolean,
        swipeable: Boolean,
        titleActiveColor: String,
        titleInactiveColor: String,
        color: String,
        animated: {
            type: Boolean,
            observer: function() {
                var t = this;
                this.children.forEach(function(e, n) {
                    return e.updateRender(n === t.data.currentIndex, t);
                });
            }
        },
        lineWidth: {
            type: [ String, Number ],
            value: 40,
            observer: "setLine"
        },
        lineHeight: {
            type: [ String, Number ],
            value: -1
        },
        active: {
            type: [ String, Number ],
            value: 0,
            observer: function(t) {
                t !== this.getCurrentName() && this.setCurrentIndexByName(t);
            }
        },
        type: {
            type: String,
            value: "line"
        },
        ellipsis: {
            type: Boolean,
            value: !0
        },
        duration: {
            type: Number,
            value: .3
        },
        zIndex: {
            type: Number,
            value: 1
        },
        swipeThreshold: {
            type: Number,
            value: 5,
            observer: function(t) {
                this.setData({
                    scrollable: this.children.length > t || !this.data.ellipsis
                });
            }
        },
        offsetTop: {
            type: Number,
            value: 0
        },
        lazyRender: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        tabs: [],
        lineStyle: "",
        scrollLeft: 0,
        scrollable: !1,
        trackStyle: "",
        currentIndex: 0,
        container: null,
        skipTransition: !0,
        lineOffsetLeft: 0
    },
    mounted: function() {
        var t = this;
        wx.nextTick(function() {
            t.setLine(!0), t.scrollIntoView();
        });
    },
    methods: {
        updateContainer: function() {
            var t = this;
            this.setData({
                container: function() {
                    return t.createSelectorQuery().select(".van-tabs");
                }
            });
        },
        updateTabs: function() {
            var t = this, e = t.children, n = void 0 === e ? [] : e, i = t.data;
            this.setData({
                tabs: n.map(function(t) {
                    return t.data;
                }),
                scrollable: this.children.length > i.swipeThreshold || !i.ellipsis
            }), this.setCurrentIndexByName(this.getCurrentName() || i.active);
        },
        trigger: function(t, e) {
            var i = this.data.currentIndex, a = e || this.children[i];
            n.isDef(a) && this.$emit(t, {
                index: a.index,
                name: a.getComputedName(),
                title: a.data.title
            });
        },
        onTap: function(t) {
            var e = this, n = t.currentTarget.dataset.index, i = this.children[n];
            i.data.disabled ? this.trigger("disabled", i) : (this.setCurrentIndex(n), wx.nextTick(function() {
                e.trigger("click");
            }));
        },
        setCurrentIndexByName: function(t) {
            var e = this.children, n = (void 0 === e ? [] : e).filter(function(e) {
                return e.getComputedName() === t;
            });
            n.length && this.setCurrentIndex(n[0].index);
        },
        setCurrentIndex: function(t) {
            var e = this, i = this, a = i.data, r = i.children, s = void 0 === r ? [] : r;
            if (!(!n.isDef(t) || t >= s.length || t < 0) && (s.forEach(function(n, i) {
                var a = i === t;
                a === n.data.active && n.inited || n.updateRender(a, e);
            }), t !== a.currentIndex)) {
                var l = null !== a.currentIndex;
                this.setData({
                    currentIndex: t
                }), wx.nextTick(function() {
                    e.setLine(), e.scrollIntoView(), e.updateContainer(), e.trigger("input"), l && e.trigger("change");
                });
            }
        },
        getCurrentName: function() {
            var t = this.children[this.data.currentIndex];
            if (t) return t.getComputedName();
        },
        setLine: function(t) {
            var e = this;
            if (void 0 === t && (t = !1), "line" === this.data.type) {
                var i = this.data.currentIndex;
                Promise.all([ n.getAllRect.call(this, ".van-tab"), n.getRect.call(this, ".van-tabs__line") ]).then(function(n) {
                    var a = n[0], r = void 0 === a ? [] : a, s = n[1], l = r[i];
                    if (null != l) {
                        var o = r.slice(0, i).reduce(function(t, e) {
                            return t + e.width;
                        }, 0);
                        o += (l.width - s.width) / 2, e.setData({
                            lineOffsetLeft: o,
                            skipTransition: t
                        });
                    }
                });
            }
        },
        scrollIntoView: function() {
            var t = this, e = this.data, i = e.currentIndex;
            e.scrollable && Promise.all([ n.getAllRect.call(this, ".van-tab"), n.getRect.call(this, ".van-tabs__nav") ]).then(function(e) {
                var n = e[0], a = e[1], r = n[i], s = n.slice(0, i).reduce(function(t, e) {
                    return t + e.width;
                }, 0);
                t.setData({
                    scrollLeft: s - (a.width - r.width) / 2
                });
            });
        },
        onTouchScroll: function(t) {
            this.$emit("scroll", t.detail);
        },
        onTouchStart: function(t) {
            this.data.swipeable && this.touchStart(t);
        },
        onTouchMove: function(t) {
            this.data.swipeable && this.touchMove(t);
        },
        onTouchEnd: function() {
            if (this.data.swipeable) {
                var t = this, e = t.direction, n = t.deltaX, i = t.offsetX;
                if ("horizontal" === e && i >= 50) {
                    var a = this.getAvaiableTab(n);
                    -1 !== a && this.setCurrentIndex(a);
                }
            }
        },
        getAvaiableTab: function(t) {
            for (var e = this.data, n = e.tabs, i = e.currentIndex, a = t > 0 ? -1 : 1, r = a; i + r < n.length && i + r >= 0; r += a) {
                var s = i + r;
                if (s >= 0 && s < n.length && n[s] && !n[s].disabled) return s;
            }
            return -1;
        }
    }
});