var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../miniprogram_npm/@vant/weapp/toast/toast")), a = getApp();

Page({
    data: {
        username: "",
        password: "",
        serverUrl:""
    },
    username_input: function(e) {
        this.setData({
            username: e.detail
        });
    },
    password_input: function(e) {
        this.setData({
            password: e.detail
        });
    },
    onLoad: function(e) {},
    formSubmit: function(e) {
             console.log("form发生了submit事件，携带数据为：", e.detail.value), this.bindAccount(e.detail.value);
    },
    bindAccount: function(t) {
        if(a.globalData.serverUrl === null){
            o.setData({
                type: "fail",
                message: "服务器地址为空，绑定失败!"
            })
        } else {var o = e.default.loading({
            duration: 0,
            forbidClick: !0,
            message: "正在绑定",
            loadingType: "spinner",
            selector: "#van"
        }), n = a.globalData.serverUrl;
        wx.request({
            url: n + "/login/verify",
            data: t,
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(n) {
                console.log(n.data), 1 == n.data.status ? (o.setData({
                    type: "success",
                    message: "绑定成功!"
                }), wx.setStorageSync("username", t.username), wx.setStorageSync("password", t.password), 
                wx.setStorageSync('serverUrl', a.globalData.serverUrl),
                wx.setStorageSync("bind", "true"), wx.setStorageSync("cookies", n.header["Set-Cookie"]), 
                a.globalData.bind = "true", a.globalData.username = t.username, a.globalData.password = t.password, 
                a.globalData.cookies = n.header["Set-Cookie"], a.checkPermission()) : o.setData({
                    type: "fail",
                    message: "绑定失败!"
                }), setTimeout(function() {
                    e.default.clear(), wx.navigateBack();
                }, 1500);
            },
            fail: function(a) {
                console.log(a), o.setData({
                    type: "fail",
                    message: "操作异常,请检查服务器地址和账号密码！"
                }), setTimeout(function() {
                    e.default.clear();
                }, 1500);
            }
        })};
    },
    onPageCancel: function(e) {
        wx.navigateBack();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});