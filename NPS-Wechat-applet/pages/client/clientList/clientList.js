function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../miniprogram_npm/@vant/weapp/toast/toast")), a = e(require("../../../miniprogram_npm/@vant/weapp/dialog/dialog")), n = getApp();

Page({
    data: {
        notice: "",
        clientsList: [],
        isAdmin: !1,
        openCellID: "",
        openCellIndex: "",
        clientID: "",
        showDetail: !1
    },
    onLoad: function() {},
    onShow: function() {
        this.loadList(), this.checkNotice();
    },
    onShareAppMessage: function() {},
    onHide: function() {
        "" != this.data.openCellID && (this.selectComponent("#" + this.data.openCellID).close(), 
        this.setData({
            openCellID: ""
        }));
    },
    onPullDownRefresh: function() {
        this.loadList(), this.checkNotice(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 500);
    },
    loadList: function(e) {
        var t = this;
        if (this.setData({
            isAdmin: n.globalData.isAdmin
        }), "true" == n.globalData.bind) {
            var a = {};
            void 0 == e && (e = ""), a.search = e, a.order = "asc", a.offset = "0", a.limit = "999", 
            wx.request({
                url: n.globalData.serverUrl + "/client/list",
                data: a,
                method: "POST",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    cookie: n.globalData.cookies
                },
                success: function(e) {
                    console.log(e.data), void 0 != e.data.rows ? (t.setData({
                        clientsList: e.data.rows
                    }), 1 == t.data.clientsList.length && t.setData({
                        showDetail: !0
                    })) : n.getCookies();
                }
            });
        }
    },
    onChange: function(e) {
        this.loadList(e.detail);
    },
    onCellClose: function(e) {
        var t = e.detail, a = t.position, n = t.instance;
        switch (a) {
          case "left":
          case "cell":
          case "outside":
            n.close(), this.setData({
                openCellID: ""
            });
            break;

          case "right":
            n.close();
        }
    },
    onEditClick: function() {
        this.setData({
            clientID: this.data.clientsList[this.data.openCellIndex].Id
        });
        var e = this.data.clientsList[this.data.openCellIndex];
        console.log(e), wx.navigateTo({
            url: "../../client/editClient/editClient",
            success: function(t) {
                t.eventChannel.emit("client", {
                    client: e
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    onDeleteClick: function() {
        var e = this, i = this;
        n.globalData.isAdmin ? a.default.confirm({
            message: "确定删除吗？"
        }).then(function(t) {
            e.setData({
                clientID: e.data.clientsList[e.data.openCellIndex].Id
            }), i.deleteClient(i.data.clientID),i.loadList();
        }).catch(function() {}) : t.default.fail("没有权限！");
    },
    onStartClick: function() {
        var e = this, i = this;
        n.globalData.isAdmin ? a.default.confirm({
            message: "确定启用吗？"
        }).then(function(t) {
            e.setData({
                clientID: e.data.clientsList[e.data.openCellIndex].Id
            }), i.startClient(i.data.clientID), i.loadList();
        }).catch(function() {}) : t.default.fail("没有权限！");
    },
    onStopClick: function() {
        var e = this, i = this;
        n.globalData.isAdmin ? a.default.confirm({
            message: "确定停止吗？"
        }).then(function(t) {
            e.setData({
                clientID: e.data.clientsList[e.data.openCellIndex].Id
            }), i.stopClient(i.data.clientID), i.loadList();
        }).catch(function() {}) : t.default.fail("没有权限！");
    },
    onCellOpen: function(e) {
        var t = e.detail;
        t.position, t.name;
        this.setData({
            openCellID: e.currentTarget.id,
            openCellIndex: e.target.dataset.index
        });
    },
    clickPage: function(e) {
        "" != this.data.openCellID && (this.selectComponent("#" + this.data.openCellID).close(), 
        this.setData({
            openCellID: ""
        }));
    },
    deleteClient: function(e) {
        var a = {};
        if (void 0 != e) {
            a.id = e;
            var i = t.default.loading({
                duration: 0,
                forbidClick: !0,
                message: "正在删除",
                loadingType: "spinner",
                selector: "#van-toast"
            });
            wx.request({
                url: n.globalData.serverUrl + "/client/del",
                data: a,
                method: "POST",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    cookie: n.globalData.cookies
                },
                success: function(e) {
                    if (console.log(e.data), 1 == e.data.status) {
                        i.setData({
                        type: "success",
                        message: "删除成功!"});
                        // i.loadList();
                    } else {
                        void 0 != e.data.msg && console.log(e.data.msg), i.setData({
                            type: "fail",
                            message: "删除失败"
                        });
                        // i.loadList();
                    }
                    setTimeout(function() {
                        i.clear();
                    }, 1500);
                },
                fail: function(e) {
                    console.log(e), i.setData({
                        type: "fail",
                        message: "操作异常!"
                    }), setTimeout(function() {
                        i.clear();
                    }, 1500);
                }
            });
        }
    },
    startClient: function(e) {
        var a = {};
        if (void 0 != e) {
            a.id = e;
            a.status = 1;
            var i = t.default.loading({
                duration: 0,
                forbidClick: !0,
                message: "正在启用",
                loadingType: "spinner",
                selector: "#van-toast"
            });
            wx.request({
                url: n.globalData.serverUrl + "/client/changestatus",
                data: a,
                method: "POST",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    cookie: n.globalData.cookies
                },
                success: function(e) {
                    if (console.log(e.data), 1 == e.data.status) {
                        i.setData({
                        type: "success",
                        message: "启用成功!"});
                    // i.loadList();
                    }  else {
                        void 0 != e.data.msg && console.log(e.data.msg), i.setData({
                            type: "fail",
                            message: "启用失败"
                        });
                        // i.loadList()
                    }
                    setTimeout(function() {
                        i.clear();
                    }, 1500);
                },
                fail: function(e) {
                    console.log(e), i.setData({
                        type: "fail",
                        message: "操作异常!"
                    }), setTimeout(function() {
                        i.clear();
                    }, 1500);
                }
            });
        }
    },
    stopClient: function(e) {
        var a = {};
        if (void 0 != e) {
            a.id = e;
            a.status = 0;
            var i = t.default.loading({
                duration: 0,
                forbidClick: !0,
                message: "正在停止",
                loadingType: "spinner",
                selector: "#van-toast"
            });
            wx.request({
                url: n.globalData.serverUrl + "/client/changestatus",
                data: a,
                method: "POST",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    cookie: n.globalData.cookies
                },
                success: function(e) {
                    if (console.log(e.data), 1 == e.data.status) {
                        i.setData({
                        type: "success",
                        message: "停止成功!"});
                        // i.loadList();
                         } else {
                        void 0 != e.data.msg && console.log(e.data.msg), i.setData({
                            type: "fail",
                            message: "停止失败"
                        });
                        // i.loadList();
                    }
                    setTimeout(function() {
                        i.clear();
                    }, 1500);
                },
                fail: function(e) {
                    console.log(e), i.setData({
                        type: "fail",
                        message: "操作异常!"
                    }), setTimeout(function() {
                        i.clear();
                    }, 1500);
                }
            });
        }
    },
    checkNotice: function() {
        var e = this;
        wx.request({
            url: "https://ddns.cloudslave.cn:8081/login/index",
            headers: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                console.log(t.data), e.setData({
                   // notice: t.data.notice
                });
            }
        });
    },
    changeunit: function(limit){
        var size = "";
        if (limit < 0.1 * 1024) {
            size = limit.toFixed(2) + "B";
        } else if (limit < 0.1 * 1024 * 1024) {
            size = (limit / 1024).toFixed(2) + "KB";
        } else if (limit < 0.1 * 1024 * 1024 * 1024) {
            size = (limit / (1024 * 1024)).toFixed(2) + "MB";
        } else {
            size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
        }
    
        var sizeStr = size + "";
        var index = sizeStr.indexOf(".");
        var dou = sizeStr.substr(index + 1, 2);
        if (dou == "00") {
            return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
        }
        return size;
    }
});