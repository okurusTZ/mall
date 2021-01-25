<template>
  <div v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-text-wrap">
      <div class="text-top-style"></div>
      <div class="desc info-text-desc">
        {{detailInfo.desc}}
      </div>
      <div class="text-bot-style"></div>
    </div>
    <div class="img-list-wrap" v-for="(item, idx) in detailInfo.detailImage" :key="idx">
      <div class="desc">{{item.key}}</div>
      <div v-for="(item, idx) in item.list" :key="idx">
        <img :src="item" alt="" class="img" @load="imgLoad">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detailProductInfo',
    data() {
      return {
        counter: 0,
        imagesLength: 0
      }
    },
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      imgLoad() {
        //if(++this.counter === this.imagesLength) {
          this.$emit('imgLoad')
        //}
      }
    },
    watch: {
      detailInfo() {
        // 直接用对象.属性的方法拿到属性
        this.imagesLength = this.detailInfo.detailImage[0].list.length
        // console.log('图片refresh')
      }
    }
  }
</script>

<style lang="less" scoped>
  .info-text-wrap {
    // 因为下面要使用absolute，所以这里需要relative
    position: relative;
    // 用于撑开文字部分的上部
    .text-top-style {
      width: 160px;
      height: 1px;
      background-color: #333;
      margin-left: 15px;
      &::before {
        position: absolute;
        left: 10px;
        top: -2.5px;
        display: block;
        content: "";
        width: 5px;
        height: 5px;
        background-color: #333;
      }
    }
    .text-bot-style {
      width: 60px;
      height: 1px;
      background-color: #333;
      position: absolute;
      right: 4px;
      bottom: 0;
      &::after {
        position: absolute;
        content: "";
        width: 5px;
        height: 5px;
        background-color: #333;
        top: -2.5px;
        right: 0;
        display: block;
      }
    }
    .info-text-desc {
      padding: 10px 10px;
    }
  }
      .desc {
      font-size: 14px;
      padding-bottom: 6px;
      line-height: 20px;
      margin: 4px 0;
      text-indent: 10px;
    }

    .img {
      width: 100%;
      margin-bottom: 10px;
    }
</style>