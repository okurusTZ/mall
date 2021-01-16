<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="middle">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" 
    :titles="['流行', '新款', '精选']"
    @tabClick="tabClick"></tab-control>
    <products-list :products="showProducts"></products-list>
  </div>
</template>

<script>
  // 子组件
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  // 公共组件
  import NavBar from '../../components/common/navbar/NavBar'
  import TabControl from '../../components/content/tabControl/tabControl'
  import ProductsList from '../../components/content/products/ProductsList'
  // 函数
  import { getHomeMultidata, getHomeProducts } from '../../network/home'

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      ProductsList
    },
    data() {
      return {
        banners:[],
        recommends:[],
        products: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          }
        },
        currentType: 'pop'
      }
    },
    computed: {
      showProducts() {
        return this.products[this.currentType].list
      }
    },
    // 组件创建完就发送网络请求
    created() {
      // 一般来说在created里面只写主要逻辑
      // 请求多个数据
      this.getHomeMultidata()
      // 请求商品数据
      this.getHomeProducts('pop')
      this.getHomeProducts('new')
      this.getHomeProducts('sell')
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        // console.log(index)
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        // 1.请求多个数据
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeProducts(type) {
        // 方便复用
        const page = this.products[type].page + 1;
        getHomeProducts(type, page).then((res) => {
          // res => type数据的前page页
          //  console.log(res.data)
          this.products[type].list.push(...res.data.list);
          this.products[type].page += 1;
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /* height: 100%;
    position: relative; */
    margin-top: 44px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 相当于父元素定位
    fixed会使元素脱离文档流，margin-top不影响 */
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  
  .tab-control {
    /* 停留效果 
       根据top值，自动改编position属性 */
    position: sticky;
    top: 44px;
    background-color: #fff;
  }
</style>