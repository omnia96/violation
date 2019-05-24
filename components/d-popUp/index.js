// components/d-pop-up/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bottom:{
      type:String,
      value:"50vh"
    },
    items:{
      type:Array,
      value:[
        {
         type:"input",
         value:{
           name:"username",
           title:"用户名"
         } 
        },
        {
          type:"input",
          value:{
            name:"password",
            title:"密码",
            placeholder:"password"
          } 
         },
         {
          type:"button",
          value:[
            {
              title:"注册",
              name:"regis"
            },{
              title:"登录",
              background:"red",
              name:"login"
            }
          ]
         }
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputData:[],
    animation:"fade-in"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    saveInput(e){
      let inputId = e.target.id
      let inputValue = e.detail.value
      let inputData = Array()
      inputData = this.data.inputData
      inputData[inputId] = inputValue
      this.data.inputData = inputData
    },
    handleTap(e){
      let buttonId = e.target.id
      let inputData = this.data.inputData
      this.setData({
        animation:"fade-out"
      })
      setTimeout(() => {
        this.triggerEvent(buttonId + "Tap",inputData) 
      }, 1000);
    }
  }
})
