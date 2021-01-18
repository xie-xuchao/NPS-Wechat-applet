function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../miniprogram_npm/@vant/weapp/toast/toast")), e = getApp();

Page({
    data: {
        clientData: "",
        showDialog: !1,
        config_conn_allow: "0",
        config_conn_allowStr: "",
        compress: "0",
        compressStr: "",
        crypt: "0",
        cryptStr: "",
        mode: "",
        isadmin: !1,
        option: [ {
            text: "否",
            value: "0"
        }, {
            text: "是",
            value: "1"
        } ]
    },
    onLoad: function(t) {
        var a = this;
        this.getOpenerEventChannel().on("client", function(t) {
            a.setData({
                clientData: t.client
            }), 0 == a.data.clientData.Cnf.Compress ? a.setData({
                compress: 0,
                compressStr: "否"
            }) : a.setData({
                compress: 1,
                compressStr: "是"
            }), 0 == a.data.clientData.Cnf.Crypt ? a.setData({
                crypt: 0,
                cryptStr: "否"
            }) : a.setData({
                crypt: 1,
                cryptStr: "是"
            }), 0 == a.data.clientData.ConfigConnAllow ? a.setData({
                config_conn_allow: 0,
                config_conn_allowStr: "否"
            }) : a.setData({
                config_conn_allow: 1,
                config_conn_allowStr: "是"
            }), console.log(a.data.clientData);
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
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
    onDialogConfirm: function(a) {
        var e, o = a.detail, n = (o.picker, o.value), i = (o.index, "");
        "压缩" == this.data.mode ? i = "compress" : "加密" == this.data.mode ? i = "crypt" : "允许配置文件连接" == this.data.mode && (i = "config_conn_allow");
        var l = i + "Str";
        this.setData((e = {
            showDialog: !1
        }, t(e, i, n.value), t(e, l, n.text), e));
    },
    formSubmit: function(t) {
        console.log("form发生了submit事件，携带数据为：", t.detail.value), this.editClient(t.detail.value);
    },
    onEditClientButtonClick: function(t) {
        this.editClient();
    },
    onPageCancel: function(t) {
        wx.navigateBack();
    },
    editClient: function(t) {
        var o = a.default.loading({
            duration: 0,
            forbidClick: !0,
            message: "正在处理",
            loadingType: "spinner",
            selector: "#van"
        });
        wx.request({
            url: e.globalData.serverUrl + "/client/edit",
            data: t,
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                cookie: e.globalData.cookies
            },
            success: function(t) {
                if (console.log(t.data), 1 == t.data.status) o.setData({
                    type: "success",
                    message: "修改成功!"
                }); else {
                    void 0 != t.data.msg && console.log(t.data.msg), o.setData({
                        type: "fail",
                        message: "修改失败"
                    });
                }
                setTimeout(function() {
                    a.default.clear(), wx.navigateBack();
                }, 1500);
            },
            fail: function(t) {
                console.log(t), o.setData({
                    type: "fail",
                    message: "操作异常!"
                }), setTimeout(function() {
                    a.default.clear();
                }, 1500);
            }
        });
    }
});