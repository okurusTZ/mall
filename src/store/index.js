import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  /**
   * mutations设计原则：
   * 1. 目的：修改state中的变量
   * 2. mutation里的方法作用尽量单一
   */
  mutations,
  actions,
  getters
})

export default store