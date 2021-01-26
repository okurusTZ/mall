import {ADD_CART, ADD_COUNT} from './mutation-types'

export default {
  [ADD_COUNT](state, payload) {
    payload.count += 1
  },
  [ADD_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  },
  checkAll(state, payload) {
    // console.log('发送到mutations')
    // console.log(payload)
    if(payload) {
      // 已经全部选中
      state.cartList.forEach(item => item.checked = false)
    } else {
      state.cartList.forEach(item => item.checked = true)
    }
  }
}