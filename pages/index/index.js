//index.js
//获取应用实例
const app = getApp()
var WXP = require('../../lib/wxp.min.js').default

Page({
  data: {
    current: 'index',
    InvoiceInfo: null,
    userInfo: {
      "nickName": "发票验真",
      "avatarUrl": "",
      "queryPoints": 1
    },
    permissionShow: "visibility: hidden;",
    inputViewShow: "visibility: hidden;"
  },
  onLoad: function () {
    wx.hideTabBar()
    this.initCache()
    let date = "20190430"
    if (this.InvoiceInfoIf(date)) {
      console.log("start set data")
      // console.log(this.InvoiceInfoIf(date))
    } else {
      console.log("start requst data")
      // this.getInvoiceInfo(date)
    }

    var that = this

  },
  onShow() {
    let that = this
    if (app.getCache("userInfo")) {
      that.setData({
        userInfo: app.getCache("userInfo")
      })
    } else {
      WXP.getSetting({}).then(result => {
        let res = result.authSetting["scope.userInfo"]
        if (res == true) {
          WXP.getUserInfo({}).then(result => {
            console.log(result.userInfo)
            let userInfo = result.userInfo
            app.setCache("queryPoints", 1)
            userInfo["queryPoints"] = app.getCache("queryPoints");
            that.setData({
              userInfo: userInfo
            })
            app.setCache("userInfo", userInfo);
          }).catch(error => {})
        }
      }).catch(error => {

      })
    }
  },
  getPermission() {
    var that = this
    that.setData({
      permissionShow: "visibility: visible;",
    })
    setTimeout(function () {
      that.onShow()
    }, 5000)

  },
  closeToast() {
    var that = this
    that.setData({
      permissionShow: "visibility: hidden;"
    })
  },
  handleScanning() {
    let that = this
    WXP.getSetting({}).then(result => {
      let res = result.authSetting["scope.userInfo"]
      if (res == true) {
        console.log("ok");
        WXP.scanCode({
          onlyfromCamera: true,
          scanType: "qrCode"
        }).then(result => {
          let array = {};
          array = result.result.split(",")
          console.log(array)
          let data = {}
          data["type"] = array[1] //发票种类代码
          data["code"] = array[2] //发票代码
          data["number"] = array[3] //发票号码
          data["money"] = array[4] //开票金额
          data["date"] = array[5] //开票日期
          data["checkCode"] = array[6] //发票校验码
          // console.log(data)
          let queryPoints = app.getCache("queryPoints")
          if (queryPoints > 0) {
            wx.navigateTo({
              url: "../content/content?date=" + data.date + "&code=" + data.code + "&number=" + data.number + "&checkCode=" + data.checkCode
            })
            queryPoints = queryPoints - 1
            app.setCache("queryPoints", queryPoints)
            let userInfo = app.getCache("userInfo")
            userInfo["queryPoints"] = queryPoints
            app.setCache("userInfo",userInfo)
          } else {
            wx.showToast({
              title: '查询点数不足',
              icon: 'none',
              duration: 2000
            })
          }

        }).catch(error => {})
      } else {
        that.getPermission()
      }
    }).catch(error => {})
  },
  openInputView() {
    let that = this
    WXP.getSetting({}).then(result => {
      let res = result.authSetting["scope.userInfo"]
      if (res == true) {
        that.setData({
          inputViewShow: "visibility: visible;"
        })
      } else {
        that.getPermission()
      }
    }).catch({})
  },
  closeInputView() {
    this.setData({
      inputViewShow: "visibility: hidden;"
    })
  },
  formSubmit(e) {
    console.log(e.detail.value)
    let data = e.detail.value
    let queryPoints = app.getCache("queryPoints")
          if (queryPoints > 0) {
            wx.navigateTo({
              url: "../content/content?date=" + data.date + "&code=" + data.code + "&number=" + data.number + "&checkCode=" + data.checkCode
            })
            queryPoints = queryPoints - 1
            app.setCache("queryPoints", queryPoints)
            let userInfo = app.getCache("userInfo")
            userInfo["queryPoints"] = queryPoints
            app.setCache("userInfo",userInfo)
          } else {
            wx.showToast({
              title: '查询点数不足',
              icon: 'none',
              duration: 2000
            })
          }
  },
  showVideoAd() {
    console.log(PromiseRewardedVideoAd.load());

    // Promise
  },
  initCache() {
    let userInvoiceInfo = null
    userInvoiceInfo = app.getCache("userInvoiceInfo")
    if (userInvoiceInfo === false) {
      app.setCache("userInvoiceInfo", {
        "msg": false,
        "data": {
          "defaut": "默认"
        }
      })
    }
  },
  InvoiceInfoIf(date) {
    let userInvoiceInfo = app.getCache("userInvoiceInfo")
    console.log(userInvoiceInfo)
    if (userInvoiceInfo["msg"] == true) {
      //存在缓存数据
      var data = userInvoiceInfo["data"]
      if (data[date]) {
        return data[date]
      } else {
        return false
      }
    } else {
      console.log("没有数据")
      //请求数据
      return false
    }
  },
  handleChange({
    detail
  }) {
    if (detail.key === "index") {
      this.onShow()
    } else if (detail.key === "historys") {
      wx.switchTab({
        url: "../historys/historys"
      })
    }
  },
  onShareAppMessage: function () {

  }
})