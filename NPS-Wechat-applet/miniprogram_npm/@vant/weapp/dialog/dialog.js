function t() {
    var t = getCurrentPages();
    return t[t.length - 1];
}

var e = function() {
    return (e = Object.assign || function(t) {
        for (var e, n = 1, o = arguments.length; n < o; n++) {
            e = arguments[n];
            for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        }
        return t;
    }).apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = [], o = {
    show: !1,
    title: "",
    width: null,
    theme: "default",
    message: "",
    zIndex: 100,
    overlay: !0,
    selector: "#van-dialog",
    className: "",
    asyncClose: !1,
    transition: "scale",
    customStyle: "",
    messageAlign: "",
    overlayStyle: "",
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    showConfirmButton: !0,
    showCancelButton: !1,
    closeOnClickOverlay: !1,
    confirmButtonOpenType: ""
}, r = e({}, o), s = function(o) {
    return o = e(e({}, r), o), new Promise(function(r, s) {
        var c = (o.context || t()).selectComponent(o.selector);
        delete o.context, delete o.selector, c ? (c.setData(e({
            onCancel: s,
            onConfirm: r
        }, o)), wx.nextTick(function() {
            c.setData({
                show: !0
            });
        }), n.push(c)) : console.warn("未找到 van-dialog 节点，请确认 selector 及 context 是否正确");
    });
};

s.alert = function(t) {
    return s(t);
}, s.confirm = function(t) {
    return s(e({
        showCancelButton: !0
    }, t));
}, s.close = function() {
    n.forEach(function(t) {
        t.close();
    }), n = [];
}, s.stopLoading = function() {
    n.forEach(function(t) {
        t.stopLoading();
    });
}, s.currentOptions = r, s.defaultOptions = o, s.setDefaultOptions = function(t) {
    r = e(e({}, r), t), s.currentOptions = r;
}, s.resetDefaultOptions = function() {
    r = e({}, o), s.currentOptions = r;
}, s.resetDefaultOptions(), exports.default = s;