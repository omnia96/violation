// components/navigationBar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    background:{
      type:String,
      value:"white"
    },
    primary:{
      type:String,
      value:"#2196f3"
    },
    secondary:{
      type:String,
      value:"#9e9e9e"
    },
    selected:{
      type:String,
      value:"Home"
    },
    itemList:{
      type:Array,
      value:[
        {
          title:"Home",
          type:"fa-home"
        },
        {
          title:"Log",
          type:"fa-book"
        }
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    navbarSelected(e){
      let id = e.currentTarget.id
      // console.log(id)
      let selected = this.data.selected
      // console.log(selected)
      if (id != selected) {
        // this.setData({
        //   selected:id
        // })
        this.triggerEvent("navbarSelected",id) 
      }else{
        this.triggerEvent("navbarSelected",id) 
      }
    },
    floatButtonTap(e){
      // console.log(e)
      this.triggerEvent("floatButtonTap") 
    }
  }
})
