<template>
  <div class="item">
    <div class="item-left">
      <div class="check-button">
        <check-button :is-checked="product.checked" @click.native="CheckClick"></check-button>
      </div>
      <img :src="product.image" alt="" class="item-img">
    </div>
    <div class="item-info">
      <p>{{product.title}}</p>
      <div class="item-desc">
        {{product.desc}}
      </div>
      <div class="bot-info">
        <div class="price">
          {{product.price}}
        </div>
        <div class="count">
          {{product.count}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from '../../../components/content/checkButton/CheckButton'
  export default {
    name: 'cartListItem',
    components: {
      CheckButton
    },
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      CheckClick() {
        this.product.checked = !this.product.checked
      }
    }
  }
</script>
<style lang="less" scoped>
  .item {
    display: flex;
    // margin: 8px 4px;
    padding: 8px;
    height: 120px;
    border-bottom: 1px solid #ececee;
    .item-left {
      width: 30%;
      align-items: center;
      display: flex;
      .item-img {
      height: 90%;
      border-radius: 10%;
      margin-left: 5px;
      // flex: 1;
      width: 120%;
      vertical-align: middle;
      overflow: hidden;
      }
    }

    .item-info {
      font-size: 16px;
      // 实现文字的省略
      p {
        color: #000;
        margin: 10px;
        width: 280px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .item-desc {
        width: 280px;
        margin: 10px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .bot-info {
        display: flex;
        justify-content: space-between;
        margin: 20px 10px;
        .price::before {
          content: '￥';
          margin-right: -5px;
        }
        .price {
          color:#f97e0b;
        }

        .count {
          color: #000;
        }
        .count::before {
          content: "×";
          margin-right: -4px;
        }
      }
    }
  }
</style>