//index.js
//获取应用实例
const app = getApp()
var WXP = require('../../lib/wxp.min.js').default

Page({
  data: {
    tabBar: [{
        title: "首页",
        type: "fa-home"
      },
      {
        title: "查分",
        type: "fa-search"
      }
    ],
    toast:{
      type:false
    },
    carInfo: null,
    popUp: {
      type: false,
      value: [{type:"input",value:{name:"carNumber",title:"车牌号",placeholder:""}},{type:"input",value:{name:"carType",title:"车型",placeholder:"大车:01小车:02"}},{type:"input",value:{name:"engineNumber",title:"发动机号",placeholder:""}},{type:"input",value:{name:"frameNumber",title:"车架号",placeholder:""}},{type:"button",value:[{title:"添加",name:"add",background:"#2196f3"}]},]
    },
    InvoiceInfo: null,
    userInfo: null,
    permissionShow: "visibility: hidden;",
    inputViewShow: "visibility: hidden;"
  },
  onLoad: function () {
    wx.hideTabBar()
    this.initCache()
    this.setData({
      carInfo: app.getCache("carInfo")
    })
  },
  tabEvent(e) {
    let id = e.detail
    switch (id) {
      case "查分":
        wx.switchTab({
          url: "../historys/historys"
        })
        break;
      default:
        this.onShow()
        break;
    }
  },
  addTap(e) {
    let popUp = this.data.popUp
    popUp.type = false
    this.setData({
      popUp: popUp
    })
    let result = e.detail
    console.log(result);
    switch (result.carType) {
      case "01":
        result.carType = "大车"
        break;
      case "02":
        result.carType = "小车"
        break;
      case "51":
        result.carType = "新能源大车"
        break;
      case "52":
        result.carType = "新能源小车"
        break;
      default:
        break;
    }
    let carInfo = this.data.carInfo
    carInfo[result.carNumber] = {
      "车牌号": result.carNumber,
      "车型": result.carType,
      "发动机号": result.engineNumber,
      "车架号": result.frameNumber
    }
    delete carInfo.default
    this.setData({
      carInfo: carInfo
    })
    app.setCache("carInfo", carInfo)
  },
  onShow() {
    this.setData({
      userInfo:app.getCache("userInfo")
    })
  },
  queryCarInfo(e) {
    let result = e.currentTarget.dataset.value
    console.log(result)
    let data = {
      car_no:result["车牌号"],
      car_type:result["车型"],
      engine_number:result["发动机号"],
      frame_number:result["车架号"]
    }
    data.car_type = this.carTypeTranslation(data.car_type,"code")
    console.log(data)
    this.requestViolationInfo(data)
  },
  requestViolationInfo(data){
    let that = this
    WXP.request({
      url:"http://bing.com"
    }).then(result=>{
      console.log(result)
      let userInfo = app.getCache("userInfo")
      userInfo.queryNumber = userInfo.queryNumber -1
      app.setCache("userInfo",userInfo)
      let toast = that.data.toast
      toast.type = !toast.type
      toast["value"] = {
        icon:"success",
        message:"查询成功!",
        timeout:"2000"
      }
      that.setData({
        toast:toast
      })
      setTimeout(() => {
        let id = data.car_no
        that.goToViolationInfo(id)
      }, 2000)


    }).catch(error=>{})
  },
  openDetails(e){
    let id = e.currentTarget.id
    this.goToViolationInfo(id)
    
  },
  goToViolationInfo(id){
    wx.navigateTo({
      url: "../violationInfo/violationInfo?id=" +id
    })
  },
  floatButtonTap() {
    let popUp = this.data.popUp
    popUp.type = !popUp.type
    this.setData({
      popUp: popUp
    })
  },
  initCache() {
    let carInfo = app.getCache("carInfo")
    if (carInfo == false) {
      app.setCache("carInfo", {
        default: {
          "提示": "点击右下角+按钮添加车辆"
        }
      })
    }
    let violationInfo = app.getCache("violationInfo")
    if (violationInfo == false) {
      app.setCache("violationInfo", {})
    }
    let userInfo = app.getCache("userInfo")
    if (userInfo == false) {
      app.setCache("userInfo", {
        queryNumber:1
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
  toastClose(){
    let toast = this.data.toast
      toast.type = !toast.type
      this.setData({
        toast:toast
      })
  },
  carTypeTranslation(carType,returnType){
    let typeName = {
      "01":"大车",
      "02":"小车",
      "51":"新能源大车",
      "52":"新能源小车"
    }
    let typeCode = {
      "大车":"01",
      "小车":"02",
      "新能源大车":"51",
      "新能源小车":"52"
    }
    if (returnType == "code") {
      return typeCode[carType]
    }else if(returnType == "name"){
      return typeName[carType]
    }
  },
  onShareAppMessage: function () {

  }
})