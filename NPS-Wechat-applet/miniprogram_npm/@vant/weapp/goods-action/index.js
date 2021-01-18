Object.defineProperty(exports, "__esModule", {
    value: !0
}), require("../common/component").VantComponent({
    relation: {
        type: "descendant",
        name: "goods-action-button",
        current: "goods-action",
        linked: function() {
            this.updateStyle();
        },
        unlinked: function() {
            this.updateStyle();
        },
        linkChanged: function() {
            this.updateStyle();
        }
    },
    props: {
        safeAreaInsetBottom: {
            type: Boolean,
            value: !0
        }
    },
    methods: {
        updateStyle: function() {
            var t = this;
            wx.nextTick(function() {
                t.children.forEach(function(t) {
                    t.updateStyle();
                });
            });
        }
    }
});