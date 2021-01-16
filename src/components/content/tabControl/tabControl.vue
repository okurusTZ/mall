<template>
  <div class="tab-control">
    <!-- 如果只是文字部分不一样，可以不用用插槽 -->
    <div v-for="(item, index) in titles" :key="index" 
    class="tab-control-item" :class="{active: index === currentIndex}"
    @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      // 可以直接传入一个titles数组，表示文字信息
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      tabClick(index) {
        this.currentIndex = index;
        this.$emit('tabClick', index);
      }
    }
  }
</script>
<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    z-index: 8;
  }

  .tab-control-item {
    flex: 1;
  }

  .active {
    color: var(--color-tint);
  }

  .active span {
    padding: 5px;
    border-bottom: 3px solid var(--color-tint);
  }
</style>