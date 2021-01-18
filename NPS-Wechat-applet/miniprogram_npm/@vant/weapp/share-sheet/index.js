Object.defineProperty(exports, "__esModule", {
    value: !0
}), require("../common/component").VantComponent({
    props: {
        show: Boolean,
        overlayStyle: Object,
        zIndex: {
            type: Number,
            value: 100
        },
        title: String,
        cancelText: {
            type: String,
            value: "取消"
        },
        description: String,
        options: {
            type: Array,
            value: []
        },
        overlay: {
            type: Boolean,
            value: !0
        },
        safeAreaInsetBottom: {
            type: Boolean,
            value: !0
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: !0
        },
        duration: {
            type: null,
            value: 300
        }
    },
    methods: {
        onClickOverlay: function() {
            this.$emit("click-overlay");
        },
        onCancel: function() {
            this.onClose(), this.$emit("cancel");
        },
        onSelect: function(e) {
            this.$emit("select", e.detail);
        },
        onClose: function() {
            this.$emit("close");
        }
    }
});