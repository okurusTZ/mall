<template>
  <div class="tab-bar-item" @click="itemClick">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    // 可传入的值
    props: {
      path: String,
      activeColor: {
        type: String,
        default: "red"
        }
    },
    data() {
      return {
        //isActive: true
      }
    },
    computed: {
      isActive() {
        // 等于-1说明没有找到
        // 这样写还可以处理子路由的问题，因为返回的是指定字符串首次出现的位置
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods :{
      itemClick() {
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scope>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    /* 常用高度 */
    height: 49px;
    font-size: 14px;
    color: lightblue;
  }

  .tab-bar-item img {
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }

</style>
