function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../miniprogram_npm/@vant/weapp/toast/toast")), a = getApp();

Page({
    data: {
        tunnelData: "",
        showDialog: !1,
        modeColumns: [ "TCP隧道", "UDP隧道", "HTTP代理", "SOCKS代理", "私密代理", "P2P连接" ],
        typeColumns: [ "tcp", "udp", "httpProxy", "socks5", "secret", "p2p" ],
        showPassword: !1,
        showPort: !0,
        showTarget: !0,
        mode: ""
    },
    onLoad: function(t) {
        var e = this;
        this.getOpenerEventChannel().on("tunnel", function(t) {
            e.setData({
                tunnelData: t.tunnel
            });
            var a = e.getIndex(e.data.tunnelData.Mode, e.data.typeColumns);
            console.log(a), e.setData({
                mode: e.data.modeColumns[a]
            }), "HTTP代理" == e.data.mode || "SOCKS代理" == e.data.mode ? e.setData({
                showTarget: !1
            }) : e.setData({
                showTarget: !0
            }), "私密代理" == e.data.mode || "P2P连接" == e.data.mode ? e.setData({
                showPassword: !0,
                showPort: !1
            }) : e.setData({
                showPassword: !1,
                showPort: !0
            });
        });
    },
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
    onPagePause:function(t){
        var o = e.default.loading({
            duration: 0,
            forbidClick: !0,
            message: "正在处理",
            loadingType: "spinner",
            selector: "#van"
        }), n = a.globalData.serverUrl ;
        console.log("测试");
        setTimeout(function() {
                        e.default.clear();
                    }, 1500);
        // wx.request({
        //     url: n + "/index/stop",
        //     data: d,
        //     method: "POST",
        //     header: {
        //         "Content-Type": "application/x-www-form-urlencoded",
        //         cookie: a.globalData.cookies
        //     },
        //     success: function(t) {
        //         if (console.log(t.data), 1 == t.data.status) o.setData({
        //             type: "success",
        //             message: "暂停成功!"
        //         }); else {
        //             void 0 != t.data.msg && console.log(t.data.msg), o.setData({
        //                 type: "fail",
        //                 message: "暂停失败"
        //             });
        //         }
        //         setTimeout(function() {
        //             e.default.clear(), wx.navigateBack();
        //         }, 1500);
        //     },
        //     fail: function(t) {
        //         console.log(t), o.setData({
        //             type: "fail",
        //             message: "操作异常!"
        //         }), setTimeout(function() {
        //             e.default.clear();
        //         }, 1500);
        //     }
        // });
    },
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
    onDialogConfirm: function(e) {
        var a = e.detail, o = (a.picker, a.value), n = (a.index, this.getIndex(o, this.data.modeColumns));
        this.setData(t({
            showDialog: !1,
            mode: o
        }, "tunnelData.Mode", this.data.typeColumns[n])), "HTTP代理" == this.data.mode || "SOCKS代理" == this.data.mode ? this.setData({
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
    getIndex: function(t, e) {
        return e.findIndex(function(e) {
            if (e == t) return !0;
        });
    },
    formSubmit: function(t) {
        console.log("form发生了submit事件，携带数据为：", t.detail.value), this.editTunnnel(t.detail.value);
    },
    editTunnnel: function(t) {
        var o = e.default.loading({
            duration: 0,
            forbidClick: !0,
            message: "正在处理",
            loadingType: "spinner",
            selector: "#van"
        }), n = a.globalData.serverUrl;
        wx.request({
            url: n + "/index/edit",
            data: t,
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                cookie: a.globalData.cookies
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
                    e.default.clear(), wx.navigateBack();
                }, 1500);
            },
            fail: function(t) {
                console.log(t), o.setData({
                    type: "fail",
                    message: "操作异常!"
                }), setTimeout(function() {
                    e.default.clear();
                }, 1500);
            }
        });
    }
});