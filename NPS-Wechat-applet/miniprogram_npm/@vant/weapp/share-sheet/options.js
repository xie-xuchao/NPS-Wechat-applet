var e = function() {
    return (e = Object.assign || function(e) {
        for (var t, o = 1, r = arguments.length; o < r; o++) {
            t = arguments[o];
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        }
        return e;
    }).apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), require("../common/component").VantComponent({
    props: {
        options: Array,
        showBorder: Boolean
    },
    methods: {
        onSelect: function(t) {
            var o = t.currentTarget.dataset.index, r = this.data.options[o];
            this.$emit("select", e(e({}, r), {
                index: o
            }));
        }
    }
});