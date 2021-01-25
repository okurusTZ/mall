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
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    // console.log(this.$refs.scroll.refresh)
    // 存在的问题，在mounted里debounce获取不到this.$refs
    // 注意这里传值，不能传refresh(), 假如传refresh(),穿进去的是
    // return的部分，应该传的是函数本身refresh
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {
      // console.log('图片加载')
      this.newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)   
  },
  updated() {
    // console.log(this.$refs.scroll)
  }
}

// 对于返回顶部的图标的抽离
import BackTop from '../components/content/backTop/backTop'
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = (-position.y) > 1000 
    }
  }
}
