function t(t, o, e) {
    return o in t ? Object.defineProperty(t, o, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[o] = e, t;
}

var o = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../miniprogram_npm/@vant/weapp/toast/toast")), e = getApp();
//@vant/weapp/toast/toast
Page({
    data: {
        max_tunnel: "5",
        showDialog: !1,
        mode: "",
        compress: "0",
        compressStr: "否",
        crypt: "0",
        cryptStr: "否",
        config_conn_allow: "1",
        config_conn_allowStr: "是",
        option: [ {
            text: "否",
            value: "0"
        }, {
            text: "是",
            value: "1"
        } ]
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onPageCancel: function(t) {
        wx.navigateBack();
    },
    config_conn_allow_input: function(t) {
        this.setData({
            mode: "允许配置文件连接",
            showDialog: !0
        });
    },
    compress_input: function(t) {
        this.setData({
            mode: "压缩",
            showDialog: !0
        });
    },
    crypt_input: function(t) {
        this.setData({
            mode: "加密",
            showDialog: !0
        });
    },
    onDialogClose: function(t) {
        this.setData({
            showDialog: !1
        });
    },
    onDialogConfirm: function(o) {
        var e, a = o.detail, n = (a.picker, a.value), i = (a.index, "");
        "压缩" == this.data.mode ? i = "compress" : "加密" == this.data.mode ? i = "crypt" : "允许配置文件连接" == this.data.mode && (i = "config_conn_allow");
        var s = i + "Str";
        this.setData((e = {
            showDialog: !1
        }, t(e, i, n.value), t(e, s, n.text), e));
    },
    formSubmit: function(t) {
        console.log("form发生了submit事件，携带数据为：", t.detail.value), this.addClient(t.detail.value);
    },
    addClient: function(t) {
        var a = o.default.loading({
            duration: 0,
            forbidClick: !0,
            message: "正在处理",
            loadingType: "spinner",
            selector: "#van"
        }), n = e.globalData.serverUrl;
        wx.request({
            url: e.globalData.serverUrl + "/client/add",
            data: t,
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                cookie: e.globalData.cookies
            },
            success: function(t) {
                if (console.log(t.data), 1 == t.data.status) a.setData({
                    type: "success",
                    message: "添加成功!"
                }); else {
                    void 0 != t.data.msg && console.log(t.data.msg), a.setData({
                        type: "fail",
                        message: "添加失败"
                    });
                }
                setTimeout(function() {
                    o.default.clear(), wx.navigateBack();
                }, 1500);
            },
            fail: function(t) {
                console.log(t), a.setData({
                    type: "fail",
                    message: "操作异常!"
                }), setTimeout(function() {
                    o.default.clear();
                }, 1500);
            }
        });
    }
});