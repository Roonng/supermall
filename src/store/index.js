import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  actions:{
    //添加商品到购物车
    addShopCar(context, product){
      return new Promise((resolve, reject) => {
        let oldProduct = null
        for(let item of context.state.cartList){
          if(product.iid == item.iid){
            oldProduct = item
          }
        }
        if(oldProduct){
          oldProduct.count += 1
          resolve('商品数量+1')
        }else{
          product.count = 1
          product.checked = true
          context.state.cartList.push(product)
          resolve('添加商品成功')
        }
      })

    }
  },
  mutations: {

  },
  getters: {
    cartLength(state){
      return state.cartList.length
    },
    cartList(state){
      return state.cartList
    }
  }
})

export default store
