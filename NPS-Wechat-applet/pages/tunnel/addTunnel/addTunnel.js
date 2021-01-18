var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../miniprogram_npm/@vant/weapp/toast/toast")), a = getApp();

Page({
    data: {
        showDialog: !1,
        modeColumns: [ "TCP隧道", "UDP隧道", "HTTP代理", "SOCKS代理", "私密代理", "P2P连接" ],
        typeColumns: [ "tcp", "udp", "httpProxy", "socks5", "secret", "p2p" ],
        showPassword: !1,
        showPort: !0,
        showTarget: !0,
        client_id: "",
        mode: "TCP隧道",
        type: "tcp",
        remark: "",
        port: "",
        target: "",
        password: ""
    },
    onLoad: function(t) {
        this.setData({
            client_id: t.detail
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onModeClick: function(t) {
        this.setData({
            showDialog: !0
        });
    },
    onDialogClose: function(t) {
        this.setData({
            showDialog: !1
        });
    },
    onDialogConfirm: function(t) {
        var a = t.detail, o = (a.picker, a.value), e = a.index;
        this.setData({
            showDialog: !1,
            mode: o,
            type: this.data.typeColumns[e]
        }), "HTTP代理" == this.data.mode || "SOCKS代理" == this.data.mode ? this.setData({
            showTarget: !1
        }) : this.setData({
            showTarget: !0
        }), "私密代理" == this.data.mode || "P2P连接" == this.data.mode ? this.setData({
            showPassword: !0,
            showPort: !1
        }) : this.setData({
            showPassword: !1,
            showPort: !0
        });
    },
    onPageCancel: function(t) {
        wx.navigateBack();
    },
    formSubmit: function(t) {
        console.log("form发生了submit事件，携带数据为：", t.detail.value), this.addTunnnel(t.detail.value);
    },
    addTunnnel: function(o) {
        var e = t.default.loading({
            duration: 0,
            forbidClick: !0,
            message: "正在处理",
            loadingType: "spinner",
            selector: "#van"
        }), s = a.globalData.serverUrl;
        wx.request({
            url: s + "/index/add",
            data: o,
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                cookie: a.globalData.cookies
            },
            success: function(a) {
                if (console.log(a.data), 1 == a.data.status) e.setData({
                    type: "success",
                    message: "添加成功!"
                }); else {
                    void 0 != a.data.msg && console.log(a.data.msg), e.setData({
                        type: "fail",
                        message: "添加失败"
                    });
                }
                setTimeout(function() {
                    t.default.clear(), wx.navigateBack();
                }, 1500);
            },
            fail: function(a) {
                console.log(a), e.setData({
                    type: "fail",
                    message: "操作异常!"
                }), setTimeout(function() {
                    t.default.clear();
                }, 1500);
            }
        });
    }
});