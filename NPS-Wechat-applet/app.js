App({
    globalData: {
        bind: "",
        username: "",
        password: "",
        id: "",
        cookies: "",
        isAdmin: !1,
        validityRemark: "",
        serverUrl: "https://ddns.cloudslave.cn:8081",
        tt:""
    },
    onLaunch: function() {
        var e = this;
        this.globalData.bind = wx.getStorageSync("bind"), "true" == this.globalData.bind && (this.globalData.username = wx.getStorageSync("username"), 
        this.globalData.password = wx.getStorageSync("password"), this.globalData.cookies = wx.getStorageSync("cookies")),
        this.globalData.tt=wx.getStorageSync('serverUrl'),
        this.globalData.serverUrl=wx.getStorageSync('serverUrl'),
        this.checkPermission(), this.checkValidity(), wx.login({
            success: function(e) {}
        }), wx.getSetting({
            success: function(o) {
                o.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(o) {
                        e.globalData.userInfo = o.userInfo, e.userInfoReadyCallback && e.userInfoReadyCallback(o);
                    }
                });
            }
        });
    },
    onshow:function(){
        this.globalData.tt="onshow测试";//wx.getStorageSync('serverUrl');
    },
    saveCookies: function(e) {
        console.log(" now save cookie!"), wx.setStorageSync("cookies", e), this.globalData.cookies = e, 
        wx.setStorageSync("cookiesDate", Date.parse(new Date()));
    },
    removeCookies: function() {
        wx.removeStorageSync("cookies"), wx.removeStorageSync("cookiesDate"), this.globalData.cookies = "", 
        console.log("remove cookies!");
    },
    getCookies: function() {
        var e = this, o = {};
        o.username = this.globalData.username, o.password = this.globalData.password, wx.request({
            url: this.globalData.serverUrl + "/login/verify",
            data: o,
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(o) {
                console.log(o.data), 1 == o.data.status ? e.saveCookies(o.header["Set-Cookie"]) : console.log("获取cookies失败");
            },
            fail: function(e) {
                console.log(e.data);
            }
        }), this.checkPermission();
    },
    checkPermission: function() {
        var e = this;
        wx.request({
            url: this.globalData.serverUrl + "/client/add",
            method: "GET",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                cookie: this.globalData.cookies
            },
            success: function(o) {
                o.data.length > 0 ? e.globalData.isAdmin = !0 : e.globalData.isAdmin = !1;
            },
            fail: function(o) {
                console.log(o.data), e.globalData.isAdmin = !1;
            }
        });
    },
    checkValidity: function() {
        var e = this;
        if ("true" == e.globalData.bind) {
            var o = {};
            o.search = "", o.order = "asc", o.offset = "0", o.limit = "999", wx.request({
                url: e.globalData.serverUrl + "/client/list",
                data: o,
                method: "POST",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    cookie: e.globalData.cookies
                },
                success: function(o) {
                    console.log(o.data), void 0 != o.data.rows ? e.globalData.validityRemark = o.data.rows[0].Remark : e.getCookies();
                }
            });
        }
    }
});