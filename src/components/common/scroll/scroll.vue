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

      // 4. 等图片加载完后，更新一下滚动的高度
      // 根据scrollerHeight属性来决定
      // scrollerHeight由放在BScroll的content中的子组件的高度决定的
      // 但最开始记载时，没有将图片计算在内

      // 监听每一张图片是否加载完成，只要有一张图片加载完成，就执行一次
      this.scroll.refresh()
    },
    methods: {
      scrollTo(x, y, time=300) {
        // 先判断是否为null，如果不为null，再执行，防止没有加载出来
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        setTimeout(() => {
          this.scroll.finishPullUp()
        }, 500);
      },
      refresh() {
        console.log('refresh')
        this.scroll && this.scroll.refresh();
      }
    }
  }
</script>
<style scoped>
</style>