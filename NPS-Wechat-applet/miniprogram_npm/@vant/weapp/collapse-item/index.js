Object.defineProperty(exports, "__esModule", {
    value: !0
}), require("../common/component").VantComponent({
    classes: [ "title-class", "content-class" ],
    relation: {
        name: "collapse",
        type: "ancestor",
        current: "collapse-item"
    },
    props: {
        name: null,
        title: null,
        value: null,
        icon: String,
        label: String,
        disabled: Boolean,
        clickable: Boolean,
        border: {
            type: Boolean,
            value: !0
        },
        isLink: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        expanded: !1
    },
    created: function() {
        this.animation = wx.createAnimation({
            duration: 0,
            timingFunction: "ease-in-out"
        });
    },
    mounted: function() {
        this.updateExpanded(), this.inited = !0;
    },
    methods: {
        updateExpanded: function() {
            if (!this.parent) return Promise.resolve();
            var t = this.parent.data, e = t.value, n = t.accordion, i = this.parent.children, a = void 0 === i ? [] : i, o = this.data.name, s = a.indexOf(this), d = null == o ? s : o, r = n ? e === d : (e || []).some(function(t) {
                return t === d;
            });
            r !== this.data.expanded && this.updateStyle(r), this.setData({
                index: s,
                expanded: r
            });
        },
        updateStyle: function(t) {
            var e = this, n = this.inited;
            this.getRect(".van-collapse-item__content").then(function(t) {
                return t.height;
            }).then(function(i) {
                var a = e.animation;
                if (t) return 0 === i ? a.height("auto").top(1).step() : a.height(i).top(1).step({
                    duration: n ? 300 : 1
                }).height("auto").step(), void e.setData({
                    animation: a.export()
                });
                a.height(i).top(0).step({
                    duration: 1
                }).height(0).step({
                    duration: 300
                }), e.setData({
                    animation: a.export()
                });
            });
        },
        onClick: function() {
            if (!this.data.disabled) {
                var t = this.data, e = t.name, n = t.expanded, i = this.parent.children.indexOf(this), a = null == e ? i : e;
                this.parent.switch(a, !n);
            }
        }
    }
});