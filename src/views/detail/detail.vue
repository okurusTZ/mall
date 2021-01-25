<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :banners="banners"></detail-swiper>
      <detail-base-info :product="product"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-product-info :detailInfo="detailInfo"></detail-product-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
      <products-list :products="recommend"></products-list>
    </scroll>
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
  import { itemImageListenerMixin } from '../../common/mixin'

  import Scroll from '../../components/common/scroll/scroll'
  // 导入方法
  import { getDetail, getRecommend, Product, ProductParams, Shop} from '../../network/detail'
  import { debounce } from '../../common/utils'
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
      }
    },
    mixins: [itemImageListenerMixin],
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
      }) 

      getRecommend().then(res => {
        // const data = res.result
        this.recommend = res.data.list
      })
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
        this.$refs.scroll.scroll.refresh()
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
    height: calc(100% - 44px);
    /* 防止遮盖吸顶的组件 */
    overflow: hidden;
  }
</style>