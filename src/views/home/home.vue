<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="middle">购物街</div></nav-bar>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar'
  import { getHomeMultidata } from '../../network/home'
  export default {
    name: "Home",
    components: {
      NavBar
    },
    data() {
      return {
        banners:[],
        recommends:[]
      }
    },
    // 组件创建完就发送网络请求
    create() {
      this.getHomeMultidata()
    },
    methods: {
      getHomeMultidata() {
        // 1.请求多个数据
        getHomeMultidata().then(res => {
          console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
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