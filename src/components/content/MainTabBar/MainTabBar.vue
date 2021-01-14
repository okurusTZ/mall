<template>
    <!-- 这里驼峰标识需要用-来连接 -->
    <tab-bar>
      <tab-bar-item path="/home" activeColor="red">
        <img slot="item-icon" src="../../../assets/img/tabbar/home.png" alt="">
        <img slot="item-icon-active" src="../../../assets/img/tabbar/home_active.png" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="red">
        <img slot="item-icon" src="../../../assets/img/tabbar/category.png" alt="">
        <img slot="item-icon-active" src="../../../assets/img/tabbar/category_active.png" alt="">
        <div slot="item-text">分类</div>       
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="red">
        <img slot="item-icon" src="../../../assets/img/tabbar/cart.png" alt="">
        <img slot="item-icon-active" src="../../../assets/img/tabbar/cart_active.png" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/me" activeColor="red">
        <img slot="item-icon" src="../../../assets/img/tabbar/me.png" alt="">
        <img slot="item-icon-active" src="../../../assets/img/tabbar/me_active.png" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
  import TabBar from '../../common/tabbar/tabbar'
  import TabBarItem from '../../common/tabbar/TabBarItem'
  export default {
    name: 'MainTabBar',
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style>
</style>
