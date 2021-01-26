<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="middle">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar'
  import cartList from './childComps/cartList'
  import cartBottomBar from './childComps/cartBottomBar'
  import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    components: {
      NavBar,
      cartList,
      cartBottomBar
    },
    computed: {
      // cartLength() {
      //   return this.$store.getters.cartLength
      // }

      // 把store中的getter映射到计算属性
      ...mapGetters(['cartLength','cartList'])

      // 写对象可以起别名
      // ...mapGetters({
      //   length: 'cartLength',
      //   list: 'cartLength'
      // })
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: white;
  }
</style>