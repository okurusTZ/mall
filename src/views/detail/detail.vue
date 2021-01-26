<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="detailNav"></detail-nav-bar>
    <!-- <p v-for="(item, idx) in this.$store.state.cartList" :key="idx">
      {{item}}
      </p> -->
    <scroll class="content" ref="scroll" 
    @contentScroll="contentScroll" :probe-type="3">
      <detail-swiper :banners="banners" ></detail-swiper>
      <detail-base-info :product="product"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-product-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-product-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <products-list :products="recommend" ref="recommend"></products-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <toast message="hahha"></toast>
  </div>
</template>

<script>
  // 导入组件
  import detailNavBar from './ChildComps/detailNavBar'
  import detailSwiper from './ChildComps/detailSwiper'
  import detailBaseInfo from './ChildComps/detailBaseInfo'
  import detailShopInfo from './ChildComps/detailShopInfo'
  import detailProductInfo from './ChildComps/detailProductInfo'
  import detailParamInfo from './ChildComps/detailParamInfo'
  import detailCommentInfo from './ChildComps//detailCommentInfo'
  import productsList from '../../components/content/products/ProductsList'
  import detailBottomBar from './ChildComps/detailBottomBar'
  import toast from '../../components/common/toast/Toast'

  import { itemImageListenerMixin, backTopMixin } from '../../common/mixin'

  import Scroll from '../../components/common/scroll/scroll'
  // 导入方法
  import { getDetail, getRecommend, Product, ProductParams, Shop} from '../../network/detail'
  import { debounce } from '../../common/utils'
  // import { debounce } from '../../common/utils'
  export default {
    name: 'Detail',
    components: {
      detailNavBar,
      detailSwiper,
      detailBaseInfo,
      detailShopInfo,
      detailProductInfo,
      detailParamInfo,
      detailCommentInfo,
      productsList,
      detailBottomBar,
      toast,
      Scroll
    },
    data() {
      return {
        iid: null,
        banners: [],
        // 这里product应该是个对象
        product: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommend: [],
        // itemImgListener: null
        newRefresh: null,
        offsetYs: [],
        getTopYs: null,
        currentIndex: 0
      }
    },
    mixins: [itemImageListenerMixin, backTopMixin],
    created() {
      // 这的params是由index里的:iid获取的，所以属性名要相同
      // 1. 保存传入的iid
      this.iid = this.$route.params.iid

      // 2. 根据iid请求详细的数据
      getDetail(this.iid).then(res => {
        const data = res.result
        // 1. 获取顶部图片轮播数据
        this.banners = data.itemInfo.topImages
        // 2. 获取商品信息
        this.product = new Product(data.itemInfo, data.columns, data.shopInfo)
        // 3. 创建店铺信息对象
        this.shop = new Shop(data.shopInfo)
        // 4. 保存商品的详情数据
        this.detailInfo = data.detailInfo
        // 5. 获取参数信息
        this.paramInfo = new ProductParams(data.itemParams.info, data.itemParams.rule)
        // 6. 取出评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        // 1. 第一次获取，在create里无法获取元素
        // this.offsetYs = []
        // this.offsetYs.push(0)
        // 在created里获取不到$refs...，还没有渲染
				// this.offsetYs.push(this.$refs.param.$el.offsetTop);
				// this.offsetYs.push(this.$refs.comment.$el.offsetTop);
				// this.offsetYs.push(this.$refs.recommend.$el.offsetTop);
        // this.offsetYs.push(Number.MAX_VALUE);
        
        // 2. 第二次获取，根据图片加载的程度，还是不对
        // 图片没有计算在内
        // 根据最新的数据，DOM已经被渲染出来，但是图片依然没有加载完
        // offsetTop值不对的时候，都是因为图片的问题
        // this.$nextTick(() => {
        //   this.offsetYs = []
        //   this.offsetYs.push(0)
        //   this.offsetYs.push(this.$refs.param.$el.offsetTop);
        //   this.offsetYs.push(this.$refs.comment.$el.offsetTop);
        //   this.offsetYs.push(this.$refs.recommend.$el.offsetTop);
        //   this.offsetYs.push(Number.MAX_VALUE);
        // })
      }) 

      getRecommend().then(res => {
        // const data = res.result
        this.recommend = res.data.list
      })

      this.getTopYs = debounce(() => {
        this.offsetYs = []
        this.offsetYs.push(0)
        // -44是为了处理navbar的遮盖
				this.offsetYs.push(this.$refs.param.$el.offsetTop - 44);
				this.offsetYs.push(this.$refs.comment.$el.offsetTop - 44);
				this.offsetYs.push(this.$refs.recommend.$el.offsetTop - 44);
        this.offsetYs.push(Number.MAX_VALUE);
        // console.log(this.offsetYs)
      }, 100)

    },
    mounted() {
    },
    /**
     * 这里主要是为了解决因为复用了productsList这个组件，
     * 而组件会在图片加载完成时向事件总线发送一个事件，
     * 需要分别判断事件在哪个页面发生
     * 1. 可以使用router来判断
     * if(this.$route.path.indexOf('/home') !=== -1) {
     *  // 在home页面处理
     * }
     * */
    destroy() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    methods: {
      swiperImgLoad() {
        this.$refs.scroll.scroll.refresh()
      },
      imgLoad() {
        // this.$refs.scroll.scroll.refresh()
        this.newRefresh()
        // console.log('?')
        // 为了处理图片没有加载出来时造成的值不对的问题
        // 防抖，防止多次调用
        this.getTopYs()
        // console.log(this.offsetYs)
      },
      titleClick(index) {
        // console.log(index)
        // var height = 0;
        // switch(index) {
        //   case 0:
        //     height = 0;
        //     break
        //   case 1:
        //     height = this.$refs.param.$el.offsetTop
        //     break
        //   case 2:
        //     height = this.$refs.comment.$el.offsetTop
        //     break
        //   case 3:
        //     height = this.$refs.recommend.$el.offsetTop
        //     break
        // }
        // console.log(height)
        this.$refs.scroll.scrollTo(0, -this.offsetYs[index], 500)
      },
      contentScroll(position) {
        // console.log(position)
        // 1. 获取y值
        const positionY = -position.y
        // 2. 与数组里的值进行对比
        for(let i in this.offsetYs) {
          // i的类型是string，所以i+1获得的值不对
          i = i * 1
          // parseInt(i)
          if (this.currentIndex !== i && (( i < this.offsetYs.length - 1  &&  positionY >= this.offsetYs[i] && positionY < this.offsetYs[i+1] ) 
          || ( i === this.offsetYs.length && positionY >= this.offsetYs[i]))) {
            this.currentIndex = i
            this.$refs.detailNav.currentIndex = i
          }
        }
        this.listenShowBackTop(position)
      },
      addToCart() {
        // 获取购物车需要展示的信息
        const cProduct = {}
        cProduct.image = this.banners[0]
        cProduct.title = this.product.title
        cProduct.desc = this.product.desc
        cProduct.price = this.product.lowNowPrice
        // 这是最重要的，在购买过程中用于确定商品
        cProduct.iid = this.iid

        // console.log(cProduct)
        // 将商品添加到购物车
        // 和mapGetters一样，可以通过mapActions来映射
        // actions可以返回一个promise，用于查看异步事件是否完成
        this.$store.dispatch('addCart', cProduct).then(res => {
          // console.log(res)
          this.$toast.show(res, 1000)
        })
      }
    }
  }
</script>

<style scoped>
  /* #detail {
    position: relative;
    z-index: 12;
    background-color: #ffffff;
  } */

  #detail {
    height: 100vh;
  }

  .content {
    /* 注意这里如果要计算高度，因为100%相对于父组件，所以要设置父组件高度 */
    height: calc(100% - 44px - 49px);
    /* 防止遮盖吸顶的组件 */
    overflow: hidden;
  }
</style>