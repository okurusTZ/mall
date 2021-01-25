<template>
  <div class="bottom-bar">
    <div class="service">
      <img src="../../../assets/img/detail/icon01.png" alt="">
      客服
    </div>
    <div class="shop">
      <img src="../../../assets/img/detail/icon02.png" alt="">
      店铺
    </div>
    <div class="collect">
      <img src="../../../assets/img/detail/icon03.png" alt="">
      收藏
    </div>
    <div class="add-cart" @click="addToCart">
      加入购物车
    </div>
    <div class="purchase">
      购买
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detailBottomBar',
    methods: {
      addToCart() {
        this.$emit('addToCart')
      }
    }
  }
</script>

<style lang="less" scoped>
  .bottom-bar {
    border-top: 1px solid #ececec;
    position: relative;
    background-color: #ffffff;
    // bottom: 49px;
    height: 49px;
    z-index: 10;
    display: flex;
    div {
      // display: block;
      width: 18%;
      font-size: 14px;
      color: #333;
      line-height: 49px;
      text-align: center;
      img {
        width: 22px;
        height: 22px;
        margin: 2px;
        vertical-align: middle;
      }
    }

    .add-cart {
      width: 26%;
      background-color: #f9cd08;
    }

    .purchase {
      width: 26%;
      color: #fff;
      background-color: var(--color-highlight-text);
    }
  }
</style>