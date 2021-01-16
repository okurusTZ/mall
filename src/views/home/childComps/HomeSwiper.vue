<template>
  <swiper>
    <swiper-item v-for="(item, id) in banners" :key="id">
      <!-- 注意这里因为使用的是item，所以必须要bind: -->
      <a :href="item.link">
        <img :src="item.image" alt="">
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
    components: {
      swiper,
      swiperItem
    }
  }
</script>

<style scoped>
</style>