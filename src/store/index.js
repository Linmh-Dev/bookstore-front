import Vue from 'vue'
import Vuex from 'vuex'
import vueSaveData from 'vue-savedata'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    detail:{},
    bookList:[],
    indicator:'/',
    cart:[],
    currOrderID:'',
    loginState:false,
    username:'',
    avatar:'',
    url:'http://81.71.33.214:8080'
    //url:'http://localhost:8080'
  },
  mutations: {
    PUT_AVATAR:function (state, payload) {
      state.avatar = payload
    },
    PUT_ORDER_ID:function (state, payload) {
      state.currOrderID = payload
    },
    PUT_DETAIL:function (state, value) {
      state.detail = value
    },
    PUT_BOOK_LIST:function (state, value) {
      state.bookList = value
    },
    PUT_INDICATOR:function (state, value) {
      state.indicator = value
    },
    PUT_CART:function (state, payload) {
      state.cart=payload
    },
    REMOVE_CART:function (state, index) {
      state.cart.splice(index,1)
    },
    PUSH_CART:function (state, payload) {
      state.cart.push(payload)
    },
    DELETE_CART:function (state, payload) {
      let index = state.cart.indexOf(payload);
      if (index>=0)
      state.cart.splice(index,1)
    },
    CLEAR_CART:function (state, payload) {
      state.bookList=[]
    },
    PUT_LOGIN_STATE:function (state, payload) {
      state.loginState = payload;
    },
    PUT_USERNAME:function (state, payload) {
      state.username = payload;
    }
  },
  actions: {
    addCart(context,value){
      axios({
        method: "get",
        url: "cart",
        headers: {
          'Content-Type': 'text/html; charset=utf-8'
        }
      }).then( (response)=> {
               let temp = []
             response.data.data.forEach( (value)=>{
                temp.push({
                  id: value.id,
                  num: value.num,
                  name: value.name,
                  price: value.price,
                  pnum: value.pnum
                })
              })
        context.commit('PUT_CART',response.data.data)
      })
    }
  },
  modules: {
  },
   plugins:[vueSaveData()]
})
