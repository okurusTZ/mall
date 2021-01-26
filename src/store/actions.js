import {ADD_CART, ADD_COUNT} from './mutation-types'

export default {
  addCart(context, payload) {
    // 1.循环的方法
    // let oldProduct = null
    // for ( let item of state.cartList) {
    //   if(item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }

    // 2.indexOf的方法
    // let index = state.cartList.indexOf(payload)
    // if (index === -1){
    //   let oldProduct = state.cartList[index]
    // }

    // 3. find函数
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if(oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNT, oldProduct)
        resolve('商品数量加1')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_CART, payload)
        resolve('添加新商品')
      }
    })
  }
}