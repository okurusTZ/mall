<template>
  <swiper>
    <swiper-item v-for="(item, id) in banners" :key="id">
      <!-- 注意这里因为使用的是item，所以必须要bind: -->
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {swiper, swiperItem} from '../../../components/common/swiper/index'
  export default {
    name: 'HomeSwiper',

    // 父子组件之间通信
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      swiper,
      swiperItem
    },
    methods: {
      imgLoad() {
        // 只需要发送一次事件
        if(!this.isLoad) {
          this.$emit('swiperImgLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>
</style>