Page({
    data: {
        show: !1
    },
    onLoad: function(t) {
        var n = this;
        wx.setNavigationBarTitle({
            title: ""
        }), setTimeout(function() {
            n.setData({
                show: !1
            }), wx.switchTab({
                url: "../client/clientList/clientList"
            });
        }, 1500);
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            show: !0
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});