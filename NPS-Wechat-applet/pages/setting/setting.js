!function(a) {
    a && a.__esModule;
}(require("../../miniprogram_npm/@vant/weapp/toast/toast"));

var a = getApp();

Page({
    data: {
        userInfo: {
            avatarUrl: "",
            nickName: ""
        },
        isAdmin: !1,
        bindUsername: "",
        remark: ""
    },
    onLoad: function(a) {
        this.loadPage();
    },
    onReady: function() {},
    onShow: function() {
        this.loadPage();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.loadPage(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 500);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    loadPage: function() {
        a.checkPermission(), a.checkValidity(), "true" == a.globalData.bind && this.setData({
            bindUsername: a.globalData.username,
            isAdmin: a.globalData.isAdmin,
            remark: a.globalData.validityRemark
        });
    }
});