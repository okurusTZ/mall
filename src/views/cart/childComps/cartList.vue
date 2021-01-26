<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll"> 
      <cart-list-item 
      class="cart-item" 
      v-for="(item,idx) in cartList" 
      :key="idx"
      :product="item">
      </cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Scroll from '../../../components/common/scroll/scroll'
  import cartListItem from './cartListItem'
  export default {
    name: 'cartList',
    components: {
      Scroll,
      cartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.scroll.refresh()
    }
  }
</script>
<style lang="less" scoped>
  .cart-list {
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
  .cart-item {
    img {
      height: 100px;
      // width: 40px;
    }
  }
</style>