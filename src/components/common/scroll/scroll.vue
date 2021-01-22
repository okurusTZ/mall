<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // 1.创建BScroll对象
      // 直接使用class不够明确，可能会有同名
      // 在vue中，绑定一个ref属性
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 2. 监听滚动的位置
      this.scroll.on('scroll', (position) => {
        this.$emit('contentScroll', position)
      })

      // 3. 监听上拉事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        setTimeout(() => {
          this.scroll.finishPullUp()
        }, 500);
      }
    }
  }
</script>
<style scoped>
</style>