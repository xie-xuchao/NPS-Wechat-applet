Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../mixins/link"), e = require("../common/component"), i = require("../common/utils");

e.VantComponent({
    relation: {
        name: "grid",
        type: "ancestor",
        current: "grid-item"
    },
    classes: [ "content-class", "icon-class", "text-class" ],
    mixins: [ t.link ],
    props: {
        icon: String,
        iconColor: String,
        dot: Boolean,
        info: null,
        badge: null,
        text: String,
        useSlot: Boolean
    },
    data: {
        viewStyle: ""
    },
    mounted: function() {
        this.updateStyle();
    },
    methods: {
        updateStyle: function() {
            if (this.parent) {
                var t = this.parent, e = t.data, n = t.children, o = e.columnNum, r = e.border, a = e.square, c = e.gutter, s = e.clickable, l = e.center, u = e.direction, d = e.iconSize, p = 100 / o + "%", h = [];
                if (h.push("width: " + p), a && h.push("padding-top: " + p), c) {
                    var m = i.addUnit(c);
                    h.push("padding-right: " + m), n.indexOf(this) >= o && !a && h.push("margin-top: " + m);
                }
                var g = "";
                a && c && (g = "\n          right: " + (m = i.addUnit(c)) + ";\n          bottom: " + m + ";\n          height: auto;\n        "), 
                this.setData({
                    viewStyle: h.join("; "),
                    contentStyle: g,
                    center: l,
                    border: r,
                    square: a,
                    gutter: c,
                    clickable: s,
                    direction: u,
                    iconSize: d
                });
            }
        },
        onClick: function() {
            this.$emit("click"), this.jumpLink();
        }
    }
});