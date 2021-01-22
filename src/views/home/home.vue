<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="middle">购物街</div></nav-bar>
    <scroll class="content"  ref="scroll" 
    :probe-type="3" 
    @contentScroll="contentScoll"
    :pull-up-load="true"
    @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" 
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"></tab-control>
      <products-list :products="showProducts"></products-list>
    </scroll>
    <!-- 组件不能之间监听点击，必须加上native -->
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
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
  import Scroll from '../../components/common/scroll/scroll'
  import BackTop from '../../components/content/backTop/backTop'
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
      ProductsList,
      Scroll,
      BackTop
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
        currentType: 'pop',
        isShowBackTop: false
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
      },
      backTopClick() {
        console.log('backtop');
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScoll(position) {
        this.isShowBackTop = -position.y > 1000 
      },
      loadMore() {
        // console.log('loadmore')
        // 会产生无法上拉的情况，因为最外层有个固定的高度，内部内容的高度进行了改变后
        // 可滚动的区域长度没有及时刷新，所以会无法上拉
        // 因为图片是异步更新，所以在计算高度的时候，没有算入图片的高度
        this.getHomeProducts(this.currentType)
        this.$refs.scroll.finishPullUp()
        // 刷新高度
        this.$refs.scroll.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #home {
    /* height: 100%;
    position: relative; */
    position: relative;
    /* 视口高度 viewpoint height */
    height: 100vh;
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

  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
  } */

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>