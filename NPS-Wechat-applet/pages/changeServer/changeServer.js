// pages/changeServer/changeServer.js

import regeneratorRuntime from '../../utils/runtime.js'
function t(t) {
  return t && t.__esModule ? t : {
      default: t
  };
}
var e = function(e) {
  return e && e.__esModule ? e : {
      default: e
  };
}(require("../../miniprogram_npm/@vant/weapp/toast/toast"))
var o = t(require("../../miniprogram_npm/@vant/weapp/dialog/dialog")),a=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData:['https://ddns.cloudslave.cn:8081','https://nps.aaaablog.com:8888'
  //'adfagasgsadfagasdghasf','adfadgagagagdagagdAFd'
],//下拉列表的数据
    index:0,//选择的下拉列表下标
    serverUrl: "",
    ser: null,
    text:"",
    showFunctionDialog: !1,
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
  inputClear: function(e) {
    this.setData({
        username:"",
        password: ""
    });
},
    // 点击下拉显示框
    selectTap(){
      this.setData({
        showFunctionDialog: !1
    });
    this.setData({
     show: !this.data.show
    });
    },
    // 点击下拉列表
    optionTap(e){
      this.setData({
        showFunctionDialog: !1
    });
    let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
     index:Index,
     show:!this.data.show
    });
    },
    onLoad: function (options) {
      this.setData({
        showFunctionDialog: !1
    });
    },
    reg: function(t) {
      this.setData({
          showFunctionDialog: !0
          // tunnelData: t.detail.currentTarget.dataset.it
      });
  },
  onDialogClose: function() {
      this.setData({
          showFunctionDialog: !1
      }), o.default.close();
  },
  formSubmit: function(e) {
    // this.onDialogClose();
    console.log("form发生了submit事件，携带数据为：", e.detail.value), this.regAccount(e.detail.value);
},
regAccount: function(t) {
  var tthis = this;
  console.log("注册函数");
if(Object.keys(a.globalData.serverUrl).length === 0){
    this.onDialogClose();
    wx.showToast({
      title:'服务器地址为空，注册失败',
      icon:'none',
      duration: 3000
     })
} else {var o = e.default.loading({
   duration: 0,
   forbidClick: !0,
   message: "正在注册",
   loadingType: "spinner",
   selector: "#van"
}), n = a.globalData.serverUrl;
 wx.request({
   url: n + "/login/register",
   data: t,
   method: "POST",
   header: {
       "Content-Type": "application/x-www-form-urlencoded"
   },
   success: function(n) {
    // tthis.onDialogClose(),
       console.log(n.data), 1 == n.data.status ? (
        wx.showToast({
          title:'注册成功',
          icon:'success',
          duration: 3000
         }),tthis.inputClear(),tthis.onDialogClose()
        ) : wx.showToast({
          title: n.data.msg,
          icon:'none',
          duration: 3000
         }),tthis.inputClear(), setTimeout(function() {
           e.default.clear();
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
  onRegCancel:function(e){
    this.onDialogClose();
  },
    serveraddrInput:function(e){
      this.setData({
        showFunctionDialog: !1
    });
      this.setData({
        text:e.detail.value
      })},
      ok1(e){
      var app=getApp(),aa=this.data.text;
    this.data.ser = app.globalData.serverUrl;
      console.log(aa);
      if(!(this.data.ser===aa)){
        app.globalData.serverUrl=aa;
        this.setData({serverUrl:aa});
      }
    },
    ok(e){
      this.setData({
        showFunctionDialog: !1
    });
      var app=getApp(),aa=this.data.selectData[this.data.index];
    this.data.ser = app.globalData.serverUrl;
      console.log(aa);
      if(!(this.data.ser===aa)){
        app.globalData.serverUrl=aa;
        this.setData({serverUrl:aa});
      }
    },

  ddns(e){
    this.setData({
      showFunctionDialog: !1
  });
    this.setData({serverUrl:this.data.serverUrl1});
    var app=getApp();
    this.data.ser = app.globalData.serverUrl;
    if(!(this.data.ser===this.data.serverUrl1)){
      app.globalData.serverUrl=this.data.serverUrl1}
  },
  aaaaablog(e){
    this.setData({
      showFunctionDialog: !1
  });
    var app=getApp();
    this.data.ser = app.globalData.serverUrl;
    if(!(this.data.ser===this.data.serverUrl2)){
      app.globalData.serverUrl=this.data.serverUrl2;
      this.setData({serverUrl:this.data.serverUrl2});}
  },
  checkdata:function(){
    this.setData({
      showFunctionDialog: !1
  });
    var app=getApp();
    this.setData({ttt:wx.getStorageSync('serverUrl')});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      showFunctionDialog: !1
  });
    var app=getApp();
    this.setData({ttt:app.globalData.serverUrl});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      showFunctionDialog: !1
  });
    var app=getApp();
    this.data.ttt=app.globalData.serverUrl;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      showFunctionDialog: !1
  });
    var app=getApp();
    this.data.ttt=app.globalData.serverUrl;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      showFunctionDialog: !1
  });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      showFunctionDialog: !1
  });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      showFunctionDialog: !1
  });
    var app=getApp();
    this.checkdata();
    setTimeout(function() {
      wx.stopPullDownRefresh();
  }, 500);

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      showFunctionDialog: !1
  });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    this.setData({
      showFunctionDialog: !1
  });
  }
})