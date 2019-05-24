// components/d-toast/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bottom:{
      type:String,
      value:"50vh"
    },
    value:{
      type:Object,
      value:{
        icon:"fail",
        message:"success",
        timeout:2000
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animation:"fade-in"
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready(){
    let timeout = this.data.value.timeout
    
    setTimeout(() => {
      this.setData({
        animation:"fade-out"
      })
      setTimeout(() => {
        this.triggerEvent("toastClose") 
      }, 1000);
    }, timeout);
    

  }
})
