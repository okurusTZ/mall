import { debounce } from './utils'

/**
 * mixin 在这里的作用主要是用于分发Vue组件中的可复用功能
 * 例如在多个组件内， mounted内监听图片加载事件的部分是可复用的，就创建一个对应的mixin
 * 当组件使用混入对象的时候，混入对象的选项会被混合进该组件本身的选项
 * 即该组件本身在挂载时会执行mounted内的代码
 */
export const itemImageListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh(), 100)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)   
  }
}