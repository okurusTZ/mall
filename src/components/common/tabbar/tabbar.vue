<template>
    <div id="tab-bar">
      <!-- 一个组件只关心自身的样式，如果有子组件，就用slot代替 -->
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style>
  body {
  padding: 0;
  margin: 0;
}

#tab-bar {
  display: flex;
  background-color: #f6f6f6;

  /* 固定tabbar在最下方 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  /* 设置阴影 */
  /* 参数：X轴上的偏移，Y轴上的偏移，阴影的扩散程度和颜色 */
  /* 因为需要Y轴向上的偏移，所以X设为0，Y设为-3 */
  box-shadow: 0px -1px 1px rgba(100,100,100,0.2);
  z-index: 10;
}

</style>
