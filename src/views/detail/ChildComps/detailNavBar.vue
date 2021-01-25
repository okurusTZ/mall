<template>
  <nav-bar>
    <div slot="left"  class="return" @click="goBack">
      <img src="../../../assets/img/common/return.svg" alt="">
    </div>
    <div slot="middle" class="middle">
      <div v-for="(item, idx) in titles" :key="idx" 
      class="middle-item" :class="{active: idx === currentIndex}"
      @click="itemClick(idx)">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from '../../../components/common/navbar/NavBar'
  export default {
    name: 'detailNavBar',
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      itemClick(index) {
        this.currentIndex = index
      }
    }
  }
</script>
<style scoped>
  .middle {
    display: flex;
    font-size: 14px;
    font-weight: 500;
  }

  .middle-item {
    flex: 1;
  }

  .return {
    margin-top: 6px;
  }

  .return img{
    height: 20px;
    widows: 20px;
  }

  .active {
    color: var(--color-tint);
    font-weight: 600;
  }
</style>