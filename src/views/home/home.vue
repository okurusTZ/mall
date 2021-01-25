<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="middle">购物街</div></nav-bar>
    <tab-control class="tab-control" 
    :titles="['流行', '新款', '精选']"
    @tabClick="tabClick"
    v-show="isTabFixed"
    ref="tabcontrol1"></tab-control>    
    <scroll class="content"  ref="scroll" 
    :probe-type="3" 
    @contentScroll="contentScoll"
    :pull-up-load="true"
    @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control-bot" 
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabcontrol2"></tab-control>
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

  import { itemImageListenerMixin } from '../../common/mixin'
  // 函数
  import { getHomeMultidata, getHomeProducts } from '../../network/home'
  import { debounce } from '../../common/utils'

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
        isShowBackTop: false,
        tabOffset: 0,
        // 这里不用了，因为fixed会导致组件的上移
        isTabFixed: false,
        saveY: 0,
        // 监听图片是否刷新
        // itemImgListener: null
      }
    },
    mixins: [itemImageListenerMixin],
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
    mounted() {
      // 监听图片是否刷新完成
      // const refresh = debounce(this.$refs.scroll.refresh,200)
      // this.itemImgListener = () => {
      //   refresh()
      // }
      // // 这里之所以要用一个listener来保存监听的方法，是为了后续可以从时间总线里取消掉
      // this.$bus.$on('imgLoad', this.itemImgListener)
      
      // 获取tabcontrol的offsetTop属性
      // 所有的组件都有一个属性$el：用于获取组件中的元素
      //console.log(this.$refs.tabcontrol.$el.offsetTop)
    },
    // 只在keep-alive标签内有效
    activated() {
      // 每次重新进入页面时提取保存的y并刷新
      this.$refs.scroll.scrollTo(0, this.saveY)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 每次离开当前页面的时候保存Y值
      this.saveY = this.$refs.scroll.scroll.y

      // 取消全局事件的监听
      // 利用itemListener来取消
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    methods: {
      /**
       * 事件监听相关的方法
       */

      /**
       * 如果直接执行refresh，会被执行30次
       * 可以将refresh传入debounce中，执行一个新的函数
       */
      debounce(func, delay) { 
        let timer = null
        
        return function(...args) {
          // 第一次执行的时候，没有timer，所以创建一个timer
          // 如果在delay期间，又执行一次，那么会清除timer，创建新的timer
          if(timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay);

        }

      },
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
        this.$refs.tabcontrol1.currentIndex = index
        this.$refs.tabcontrol2.currentIndex = index
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
          // 完成当次加载更多
          this.$refs.scroll && this.$refs.scroll.finishPullUp()          
        })
      },
      backTopClick() {
        console.log('backtop');
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScoll(position) {
        // 1. 判断backtop是否显示
        this.isShowBackTop = -position.y > 1000 
        // 2. 判断tabcontrol是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffset
      },
      loadMore() {
        // console.log('loadmore')
        // 会产生无法上拉的情况，因为最外层有个固定的高度，内部内容的高度进行了改变后
        // 可滚动的区域长度没有及时刷新，所以会无法上拉
        // 因为图片是异步更新，所以在计算高度的时候，没有算入图片的高度
        this.getHomeProducts(this.currentType)
        // 刷新高度
        this.$refs.scroll.scroll.refresh()
      },
      swiperImgLoad() {
        this.tabOffset = this.$refs.tabcontrol2.$el.offsetTop
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
    fixed会使元素脱离文档流，margin-top不影响
    在浏览器原生滚动时需要
    现在bscroll实现了局部滚动，所以不需要 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  /* 不起效果 */
  .tab-control {
    /* 停留效果 
       根据top值，自动改编position属性 */
    /* position: sticky;
    top: 44px;
    background-color: #fff; */
    position: relative;
    z-index: 9;
    background-color: #fff;
    /* margin-top: -1px; */
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
  
  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
</style>