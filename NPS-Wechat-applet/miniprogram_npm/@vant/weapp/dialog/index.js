Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../common/component"), e = require("../mixins/button"), n = require("../mixins/open-type"), o = require("../common/color");

t.VantComponent({
    mixins: [ e.button, n.openType ],
    props: {
        show: {
            type: Boolean,
            observer: function(t) {
                !t && this.stopLoading();
            }
        },
        title: String,
        message: String,
        theme: {
            type: String,
            value: "default"
        },
        useSlot: Boolean,
        className: String,
        customStyle: String,
        asyncClose: Boolean,
        messageAlign: String,
        overlayStyle: String,
        useTitleSlot: Boolean,
        showCancelButton: Boolean,
        closeOnClickOverlay: Boolean,
        confirmButtonOpenType: String,
        width: null,
        zIndex: {
            type: Number,
            value: 2e3
        },
        confirmButtonText: {
            type: String,
            value: "确认"
        },
        cancelButtonText: {
            type: String,
            value: "取消"
        },
        confirmButtonColor: {
            type: String,
            value: o.RED
        },
        cancelButtonColor: {
            type: String,
            value: o.GRAY
        },
        showConfirmButton: {
            type: Boolean,
            value: !0
        },
        overlay: {
            type: Boolean,
            value: !0
        },
        transition: {
            type: String,
            value: "scale"
        }
    },
    data: {
        loading: {
            confirm: !1,
            cancel: !1
        }
    },
    methods: {
        onConfirm: function() {
            this.handleAction("confirm");
        },
        onCancel: function() {
            this.handleAction("cancel");
        },
        onClickOverlay: function() {
            this.onClose("overlay");
        },
        handleAction: function(t) {
            var e;
            this.data.asyncClose && this.setData((e = {}, e["loading." + t] = !0, e)), this.onClose(t);
        },
        close: function() {
            this.setData({
                show: !1
            });
        },
        stopLoading: function() {
            this.setData({
                loading: {
                    confirm: !1,
                    cancel: !1
                }
            });
        },
        onClose: function(t) {
            this.data.asyncClose || this.close(), this.$emit("close", t), this.$emit(t, {
                dialog: this
            });
            var e = this.data["confirm" === t ? "onConfirm" : "onCancel"];
            e && e(this);
        }
    }
});