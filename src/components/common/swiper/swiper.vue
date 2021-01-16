<template>
  <div id="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <slot name="indicator">
    </slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <!-- 这里需要添加key，加了key之后与内容有了唯一性的关联 -->
        <div v-for="(item, index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}" :key="index">
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    // 每次轮播所间隔的时间
    interval: {
      type: Number,
      default: 3000
    },
    animDuration: {
      type: Number,
      default: 300
    },
    moveRatio: {
      type: Number,
      default: 0.3
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 当前显示的slide的index
      currentIndex: 1,
      // swiper的宽度
      totalWidth: 0,
      // swiper的样式
      swiperStyle: {},
      // 元素的个数
      slideCount: 0, 
      // 是否正在滚动，主要用于处理滚动和用户手动操作的冲突
      scrolling: false 
    }
  },
  mounted() {
    // 1.操作dom，在前后添加slide
    setTimeout(() => {
      this.handleDom();
      this.startTimer();
    }, 3000);
  },
  methods: {
    /**
     * 定时器相关的操作
     */
    startTimer() {
      // setInterval:每间隔interval的时间，执行一次操作
      // playTimer是一个interval的对象，在停止时可调用
      this.playTimer = window.setInterval(() => {
        // 修改当前显示slide的index
        this.currentIndex ++;
        // 滑动到指定位置
        this.scrollContent(-this.currentIndex * this.totalWidth)
      }, this.interval)
    },
    stopTimer() {
      window.clearInterval(this.playTimer);
    },

    /**
     * 滚动到正确的位置
     */
    scrollContent(currentPosition) {
      // 0. 设置滚动条件
      this.scrolling = true;

      // 1.开始滚动
      this.swiperStyle.transition = 'transform ' + this.animDuration + 'ms';
      this.setTransform(currentPosition);

      // 2.判断滚动到的位置
      this.checkPosition();

      // 3.滚动完成
      this.scrolling = false;
    },

    
    setTransform(currentPosition) {
      // 这里swiperStyle指向的就是swiper的css样式，可以通过JS代码修改
      this.swiperStyle.transform = `translate3d(${currentPosition}px, 0, 0)`;
      this.swiperStyle['-webkit-transform'] = `translate3d(${currentPosition}px, 0, 0)`;
      this.swiperStyle['-ms-transform'] = `translate3d(${currentPosition}px, 0, 0)`;
    },
    /**
     * 校验准确的位置
     * 主要是用于边界处理的情况
     * currentIndex<0 || currentIndex > slideCount + 1
     */
    checkPosition() {
      window.setTimeout(() => {
        // 停止移动？
        this.swiperStyle.transition = '0ms';
        if(this.currentIndex >= this.slideCount + 1) {
          // 返回第一张图片
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if(this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }
        // 结束移动后的回调??
        this.$emit('transitionEnd', this.currentIndex-1);
      }, this.animDuration)
    },

    handleDom() {
      // 1.获取需要操作的元素
      let swiperEl = document.querySelector('.swiper');
      let slideEls = swiperEl.getElementsByClassName('slide');

      // 2. 保存slide的个数
      this.slideCount = slideEls.length;

      // 3.如果大于1个，在前后分别添加一个slide
      if(this.slideCount > 1) {
        // cloneNode(true 深拷贝，把对应的内容完全复制了过来
        // 要做到无缝切换，实际上是添加了两张新图片，然后在现实新图片的时候切换位置
        let cloneFirst = slideEls[0].cloneNode(true);
        let cloneLast = slideEls[this.slideCount-1].cloneNode(true);
        swiperEl.insertBefore(cloneLast, slideEls[0]);
        swiperEl.appendChild(cloneFirst);
        // 水平方向的width+padding+border-width
        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
      }

      // 4.让swiper元素显示第一个（目前显示的是添加的clonelast
      this.setTransform(-this.totalWidth)
    },

    /**
     * 拖动事件的处理
     */

    touchStart(e) {
      // 1.如果正在滚动，不可以拖动
      if(this.scrolling) return;
      // 2.停止计时器
      this.stopTimer();
      // 3.保存开始滚动的位置
      // e.touches: 当前屏幕上所有触摸点的列表
      this.startX = e.touches[0].pageX;
    },
    touchMove(e) {
      // 1.计算出用户拖动的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;

      // 2.设置当前的位置
      this.setTransform(moveDistance);
    },
    touchEnd(e) {
      // 1.获取移动的距离
      let currentMove = Math.abs(this.distance);

      // 2.判断最终的距离
      if(this.distance === 0) {
        return;
      }else if(this.distance > 0 && currentMove > this.moveRatio * this.totalWidth) {
        this.currentIndex --;
      }else if(this.distance < 0  && currentMove > this.moveRatio * this.totalWidth) {
        this.currentIndex ++;
      }
      // 3.移动到正确位置
      this.scrollContent(-this.currentIndex * this.totalWidth);
      // 4.移动完成后重新开启定时器
      this.startTimer();
    },
    /**
     * 控制上一个，下一个
     */

    previous() {
      this.changeItem(-1);
    },
    next() {
      this.changeItem(1);
    },
    changeItem(num) {
      // 1.修改定时器
      this.stopTimer();
      // 2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth)
      // 3.添加定时器
      this.startTimer();
    }
  }
}
</script>

<style scoped>
  #hy-swiper {
    overflow: hidden;
    position: relative;
  }

  .swiper {
    display: flex;
  }

  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }

  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }
  
  .indi-item.active {
    background-color: rgba(212,62,46,1.0);
  }
</style>