Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../common/component"), o = require("../mixins/button"), n = require("../mixins/open-type"), t = require("../common/version"), i = [ o.button, n.openType ];

t.canIUseFormFieldButton() && i.push("wx://form-field-button"), e.VantComponent({
    mixins: i,
    classes: [ "hover-class", "loading-class" ],
    data: {
        baseStyle: ""
    },
    props: {
        formType: String,
        icon: String,
        classPrefix: {
            type: String,
            value: "van-icon"
        },
        plain: Boolean,
        block: Boolean,
        round: Boolean,
        square: Boolean,
        loading: Boolean,
        hairline: Boolean,
        disabled: Boolean,
        loadingText: String,
        customStyle: String,
        loadingType: {
            type: String,
            value: "circular"
        },
        type: {
            type: String,
            value: "default"
        },
        dataset: null,
        size: {
            type: String,
            value: "normal"
        },
        loadingSize: {
            type: String,
            value: "20px"
        },
        color: {
            type: String,
            observer: function(e) {
                var o = "";
                e && (o += "color: " + (this.data.plain ? e : "white") + ";", this.data.plain || (o += "background: " + e + ";"), 
                -1 !== e.indexOf("gradient") ? o += "border: 0;" : o += "border-color: " + e + ";"), 
                o !== this.data.baseStyle && this.setData({
                    baseStyle: o
                });
            }
        }
    },
    methods: {
        onClick: function() {
            this.data.loading || this.$emit("click");
        },
        noop: function() {}
    }
});