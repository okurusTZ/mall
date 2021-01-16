<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Slide'
  }
</script>

<style scoped>
  .slide {
    width: 100%;
    /* 为了使width属性有效果，必须设置flex-shrink=0
    flex-shrink=1: 父元素不够用的时候，子元素要同时缩小来适应总宽度 */
    flex-shrink: 0;
  }

  .slide img {
    width: 100%;
  }
</style>