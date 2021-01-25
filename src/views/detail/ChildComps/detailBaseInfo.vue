<template>
  <!-- 初始化时product为空 -->
  <div v-if="Object.keys(product).length !== 0" class="base-info">
    <div class="title">
      {{product.title}}
    </div>
    <div class="price">
      <div class="low-price">{{product.lowNowPrice}}</div>
      <div class="old-price">{{product.oldPrice}}</div>
      <div class="discount-desc">{{product.discountDesc}}</div>
    </div>
    <div class="columns">
      <div class="sell">{{product.columns[0]}}</div>
      <div class="collect">{{product.columns[1]}}</div>
      <div class="delivery">{{product.services[product.services.length-1].name}}</div>
    </div>
    <div class="services">
      <div v-for="idx in product.services.length-1" :key="idx">
        <img :src="product.services[idx-1].icon" alt="">
        {{product.services[idx-1].name}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detailBaseInfo',
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>
<style scoped>
  .base-info {
    margin-left: 10px;
    margin-right: 10px;
  }
  .title {
    color: #000;
    font-size: 20px;
    /* font-weight: 550; */
    margin-top: 20px;
    line-height: 20px;
  }
  .price {
    display: flex;
    padding: 10px 4px 10px;
  }
  .low-price::before{
    /* 显示RMB符号 */
    content: '\00A5';
  }

  .low-price {
    font-size: 28px;
    color: var(--color-highlight-text);
  }
  
  .old-price {
    text-decoration: line-through;
    font-size: 15px;
    margin-left: 10px;
    margin-top: 8px;
    color: #999;
  }

  .discount-desc {
    background-color: var(--color-highlight-text);
    color: #fff;
    border-radius: 50px;
    font-size: 12px;
    padding: 2px 6px;
    line-height: 15px;
    height: 20px;
    margin-top: 7px;
    margin-left: 5px;
  }

  .columns {
    display: flex;
    color: #999;
    font-size: 15px;
    padding: 10px 4px;
    border-bottom: 1px solid #ededed;
    justify-content: space-between;
  }

  .columns div {
    /* flex: 1; */
    /* flex:1和justify-content貌似是冲突 */
  }

  .services {
    display: flex;
    font-size: 14px;
    color: #333;
    padding: 10px 4px;
    justify-content: space-between;
    border-bottom: 4px solid #ededed;
  }
  .services img {
    height: 20px;
    width: 20px;
    vertical-align: middle;
  }
</style>