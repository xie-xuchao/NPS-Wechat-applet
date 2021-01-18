Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../common/component"), t = require("../mixins/link"), i = require("../mixins/button"), n = require("../mixins/open-type");

e.VantComponent({
    mixins: [ t.link, i.button, n.openType ],
    relation: {
        type: "ancestor",
        name: "goods-action",
        current: "goods-action-button"
    },
    props: {
        text: String,
        color: String,
        loading: Boolean,
        disabled: Boolean,
        plain: Boolean,
        type: {
            type: String,
            value: "danger"
        }
    },
    methods: {
        onClick: function(e) {
            this.$emit("click", e.detail), this.jumpLink();
        },
        updateStyle: function() {
            if (null != this.parent) {
                var e = this.parent.children, t = void 0 === e ? [] : e, i = t.length, n = t.indexOf(this);
                this.setData({
                    isFirst: 0 === n,
                    isLast: n === i - 1
                });
            }
        }
    }
});