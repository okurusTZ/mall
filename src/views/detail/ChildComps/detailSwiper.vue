<template>
  <swiper  class="banners">
    <swiper-item v-for="(item, idx) in banners" :key="idx">
      <img :src="item" alt="" @load="imgLoad">
    </swiper-item>
  </swiper>
</template>

<script>
  import { swiper, swiperItem } from '../../../components/common/swiper/index'
  export default {
    name: 'detailSwiper',
    components: {
      swiper,
      swiperItem
    },
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
    methods: {
      imgLoad() {
        if(!this.isLoad) {
          this.$emit('swiperImgLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>
<style scoped>
  .banners {
    height: 300px;
    overflow: hidden;
  }
</style>