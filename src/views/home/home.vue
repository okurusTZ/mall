<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="middle">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
  // 子组件
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  // 公共组件
  import NavBar from '../../components/common/navbar/NavBar'
  // 函数
  import { getHomeMultidata } from '../../network/home'

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data() {
      return {
        banners:[],
        recommends:[]
      }
    },
    // 组件创建完就发送网络请求
    created() {
      // 请求多个数据
      this.getHomeMultidata()
    },
    methods: {
      getHomeMultidata() {
        // 1.请求多个数据
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      }
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>