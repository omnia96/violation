const app = getApp()
Page({
  data: {
    violationInfo:null
  },
  onLoad: function (options) {
    let result = options
    console.log(result)
    let violationInfo = app.getCache("violationInfo")
    this.setData({
      violationInfo:violationInfo[result.id]
    })
  },
  onShow: function () {
    
  }
})