<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="info-title">用户评价</div>
      <div class="info-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">
          {{commentInfo.created | showDate}}
        </span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" alt="" v-for="(item, index) in commentInfo.images" :key="index">
      </div>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '../../../common/utils'
  export default {
    name: 'detailCommentInfo',
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      // 服务器返回的时间，都是数字，没有格式
      // 以unix时间元年为起点，返回对应的时间戳
      showDate(value) {
        // 1.将时间戳转成date对象
        const date = new Date(value * 1000)
        // 2.将date进行格式化
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  }
</script>
<style lang="less" scoped>
  .comment-info {
    font-size: 14px;
    border-bottom: 4px solid #ececec;
  }
  .info-header {
    display: flex;
    justify-content: space-between;
    margin: 10px 10px;
    padding: 10px 10px;
    border-bottom: 1px solid #ececec;
  }

  .info-user {
    padding: 10px 10px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      margin-right: 10px;
      vertical-align: middle;
    }
  }

  .info-detail {
    line-height: 20px;
    p {
      // color: #999;
      margin: 4px 10px;
    }
    .info-other {
      color: #999;
      margin-left: 10px;
      margin-bottom: 5px;
    }
    .info-imgs img{
      width: 60px;
      height: 60px;
      margin-left: 10px;
    }
  }

</style>