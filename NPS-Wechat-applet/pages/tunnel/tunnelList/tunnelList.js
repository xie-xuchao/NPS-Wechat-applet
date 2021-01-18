import regeneratorRuntime from '../../../utils/runtime.js'

function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, n) {
            function a(o, i) {
                try {
                    var l = e[o](i), s = l.value;
                } catch (t) {
                    return void n(t);
                }
                if (!l.done) return Promise.resolve(s).then(function(t) {
                    a("next", t);
                }, function(t) {
                    a("throw", t);
                });
                t(s);
            }
            return a("next");
        });
    };
}

function n(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

var a = t(require("../../../miniprogram_npm/@vant/weapp/toast/toast")), o = t(require("../../../miniprogram_npm/@vant/weapp/dialog/dialog")), i = getApp();

Page({
    data: {
        clientID: "",
        modeColumns: [ "TCP隧道", "UDP隧道", "HTTP代理", "SOCKS代理", "私密代理", "P2P连接" ],
        typeColumns: [ "tcp", "udp", "httpProxy", "socks5", "secret", "p2p" ],
        bTrue:["打开","关闭"],
        tTrue:[true,false],
        showFunctionDialog: !1,
        tunnelList: [],
        tunnelData: "",
        tableHeader: [ {
            prop: "Id",
            width: 60,
            label: "ID",
            color: "#55C355"
        }, {
            prop: "ModeStr",
            width: 170,
            label: "模式"
        }, {
            prop: "Port",
            width: 120,
            label: "端口"
        }, {
            prop: "TargetAddr",
            width: 250,
            label: "目标"
        }, {
            prop: "Status",
            width: 150,
            label: "状态"
        } , {
            prop: "Password",
            width: 150,
            label: "密钥"
        }, {
            prop: "Remark",
            width: 300,
            label: "备注"
        } ],
        stripe: !1,
        border: !0
    },
    onLoad: function(t) {
        this.setData({
            clientID: t.detail
        });
    },
    onReady: function() {},
    onShow: function() {
        this.loadtunnelList();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.loadtunnelList(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 500);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getIndex: function(t, e) {
        return e.findIndex(function(e) {
            if (e == t) return !0;
        });
    },
    onAddClient: function() {
        wx.navigateTo({
            url: "../addTunnel/addTunnel?detail=" + this.data.clientID
        });
    },
    loadtunnelList: function(t) {
        var e = this, a = {};
        void 0 == t && (t = ""), a.client_id = this.data.clientID, a.search = t, a.order = "asc", 
        a.offset = "0", a.limit = "999", a.type = "", wx.request({
            url: i.globalData.serverUrl + "/index/gettunnel",
            data: a,
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                cookie: i.globalData.cookies
            },
            success: function(t) {
                if (console.log(t.data), void 0 != t.data.rows) {
                    e.setData({
                        tunnelList: t.data.rows
                    });
                    var a = 0, o = e.data.tunnelList.length;
                    for (a = 0; a < o; a++) {
                        var i, l = "tunnelList[" + a + "].TargetAddr", s = "tunnelList[" + a + "].ModeStr", m = "tunnelList[" + a + "].Status", q = e.getIndex(e.data.tunnelList[a].Status, e.data.tTrue) , r = e.getIndex(e.data.tunnelList[a].Mode, e.data.typeColumns);
                        e.setData((i = {},n(i,m,e.data.bTrue[q]),i));
                        e.setData((i = {}, n(i, l, e.data.tunnelList[a].Target.TargetStr), n(i, s, e.data.modeColumns[r]), 
                        i));
                    }
                } else console.log("加载失败！");
            }
        });
    },
    onRowClick: function(t) {
        this.setData({
            showFunctionDialog: !0,
            tunnelData: t.detail.currentTarget.dataset.it
        });
    },
    onDialogClose: function() {
        this.setData({
            showFunctionDialog: !1
        }), o.default.close();
    },
    onBtnEdit: function() {
        this.setData({
            showFunctionDialog: !1
        });
        var t = this.data.tunnelData;
        wx.navigateTo({
            url: "../editTunnel/editTunnel",
            success: function(e) {
                e.eventChannel.emit("tunnel", {
                    tunnel: t
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    onBtnDelete: function() {
        var t = e(regeneratorRuntime.mark(function t() {
            var e, n, l, s, r = this;
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return e = !0, n = this, t.next = 4, o.default.confirm({
                        message: "确定删除隧道 " + this.data.tunnelData.Id + "?"
                    }).then(function(t) {
                        e = !0;
                    }).catch(function() {
                        e = !1, r.setData({
                            showFunctionDialog: !1
                        });
                    });

                  case 4:
                    e && (l = a.default.loading({
                        duration: 0,
                        forbidClick: !0,
                        message: "正在处理",
                        loadingType: "spinner",
                        selector: "#van-toast"
                    }), (s = {}).id = this.data.tunnelData.Id, wx.request({
                        url: i.globalData.serverUrl + "/index/del",
                        data: s,
                        method: "POST",
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            cookie: i.globalData.cookies
                        },
                        success: function(t) {
                            if (console.log(t.data), 1 == t.data.status) l.setData({
                                type: "success",
                                message: "删除成功!"
                            }), n.loadtunnelList(); else {
                                void 0 != t.data.msg && console.log(t.data.msg), l.setData({
                                    type: "fail",
                                    message: "删除失败"
                                });
                            }
                            setTimeout(function() {
                                a.default.clear(), n.setData({
                                    showFunctionDialog: !1
                                });
                            }, 1500);
                        },
                        fail: function(t) {
                            console.log(t), l.setData({
                                type: "fail",
                                message: "操作异常!"
                            }), setTimeout(function() {
                                a.default.clear();
                            }, 1500);
                        }
                    }));

                  case 5:
                  case "end":
                    return t.stop();
                }
            }, t, this);
        }));
        return function() {
            return t.apply(this, arguments);
        };
    }(),
    onBtnPause: function() {
        var t = e(regeneratorRuntime.mark(function t() {
            var e, n, l, s, r = this;
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return e = !0, n = this, t.next = 4, o.default.confirm({
                        message: "确定关闭隧道 " + this.data.tunnelData.Id + "?"
                    }).then(function(t) {
                        e = !0;
                    }).catch(function() {
                        e = !1, r.setData({
                            showFunctionDialog: !1
                        });
                    });
    
                  case 4:
                    e && (l = a.default.loading({
                        duration: 0,
                        forbidClick: !0,
                        message: "正在处理",
                        loadingType: "spinner",
                        selector: "#van-toast"
                    }), (s = {}).id = this.data.tunnelData.Id, wx.request({
                        url: i.globalData.serverUrl + "/index/stop",
                        data: s,
                        method: "POST",
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            cookie: i.globalData.cookies
                        },
                        success: function(t) {
                            if (console.log(t.data), 1 == t.data.status) l.setData({
                                type: "success",
                                message: "关闭成功!"
                            }), n.loadtunnelList(); else {
                                void 0 != t.data.msg && console.log(t.data.msg), l.setData({
                                    type: "fail",
                                    message: "关闭失败"
                                });
                            }
                            setTimeout(function() {
                                a.default.clear(), n.setData({
                                    showFunctionDialog: !1
                                });
                            }, 1500);
                        },
                        fail: function(t) {
                            console.log(t), l.setData({
                                type: "fail",
                                message: "操作异常!"
                            }), setTimeout(function() {
                                a.default.clear();
                            }, 1500);
                        }
                    }));
    
                  case 5:
                  case "end":
                    return t.stop();
                }
            }, t, this);
        }));
        return function() {
            return t.apply(this, arguments);
        };
    }(),
    onBtnStart: function() {
        var t = e(regeneratorRuntime.mark(function t() {
            var e, n, l, s, r = this;
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return e = !0, n = this, t.next = 4, o.default.confirm({
                        message: "确定打开隧道 " + this.data.tunnelData.Id + "?"
                    }).then(function(t) {
                        e = !0;
                    }).catch(function() {
                        e = !1, r.setData({
                            showFunctionDialog: !1
                        });
                    });
    
                  case 4:
                    e && (l = a.default.loading({
                        duration: 0,
                        forbidClick: !0,
                        message: "正在处理",
                        loadingType: "spinner",
                        selector: "#van-toast"
                    }), (s = {}).id = this.data.tunnelData.Id, wx.request({
                        url: i.globalData.serverUrl + "/index/start",
                        data: s,
                        method: "POST",
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            cookie: i.globalData.cookies
                        },
                        success: function(t) {
                            if (console.log(t.data), 1 == t.data.status) l.setData({
                                type: "success",
                                message: "打开成功!"
                            }), n.loadtunnelList(); else {
                                void 0 != t.data.msg && console.log(t.data.msg), l.setData({
                                    type: "fail",
                                    message: "打开失败"
                                });
                            }
                            setTimeout(function() {
                                a.default.clear(), n.setData({
                                    showFunctionDialog: !1
                                });
                            }, 1500);
                        },
                        fail: function(t) {
                            console.log(t), l.setData({
                                type: "fail",
                                message: "操作异常!"
                            }), setTimeout(function() {
                                a.default.clear();
                            }, 1500);
                        }
                    }));
    
                  case 5:
                  case "end":
                    return t.stop();
                }
            }, t, this);
        }));
        return function() {
            return t.apply(this, arguments);
        };
    }()
});
