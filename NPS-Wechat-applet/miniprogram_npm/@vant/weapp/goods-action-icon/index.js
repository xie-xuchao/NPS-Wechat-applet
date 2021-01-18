Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../common/component"), i = require("../mixins/button"), n = require("../mixins/link"), o = require("../mixins/open-type");

e.VantComponent({
    classes: [ "icon-class", "text-class" ],
    mixins: [ n.link, i.button, o.openType ],
    props: {
        text: String,
        dot: Boolean,
        info: String,
        icon: String,
        disabled: Boolean,
        loading: Boolean
    },
    methods: {
        onClick: function(e) {
            this.$emit("click", e.detail), this.jumpLink();
        }
    }
});