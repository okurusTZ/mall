<template>
  <div class="shop">
    <div class="shop-info">
      <img :src="shop.logo" alt="">
      <div>{{shop.name}}</div>
    </div>

    <div class="shop-other-info">
      <div class="shop-other-item shop-other-sell">
        <div class="sell">
          <!-- 利用filter来处理销量 -->
          <p>{{shop.sells | saveNum}}</p>
          <p>总销量</p>
      </div>

        <div class="item">
          <p>{{shop.productCount}}</p>
          <p>全部宝贝</p>
        </div>       
      </div>

    <div class="comments shop-other-item">
      <div v-for="(item, idx) in shop.score" :key="idx">
        {{item.name}}&ensp;
        <span class="score" :class="{active:item.isBetter }">{{item.score}}</span>
        <span class="score-bg" :class="{active:item.isBetter }">{{item.isBetter? '高':'低'}}</span>
      </div>
    </div>

    </div>

    <div class="enter-shop-wrap">
      <div class="enter-shop">
        进店逛逛
      </div>
    </div>

    </div>
</template>

<script>
  export default {
    name: 'detailShopInfo',
    props: {
      shop: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      saveNum(value) {
        if(value < 10000) return value;
        return (value/10000).toFixed(1) + '万'
      }
    }
  }
</script>

<style lang="less" scoped>

  .shop-info {
    margin: 20px 10px 10px 10px;
    display: flex;
    align-items: center;
    img {
      height: 50px;
      width: 50px;
      border-radius: 100%;
      vertical-align: middle;
      border: 1px solid #eeeeee;
    }
    div {
      margin-left: 10px;
    }
  }

  .shop-other-info {
    font-size: 16px;
    align-items: center;
    line-height: 22px;
    display: flex;
    // margin-left: 10px;
    
    .shop-other-item {
      flex: 1;
      text-align: center;
    }
    .shop-other-sell {
      display: flex;
      div {
        flex: 1;
      }
    }
    .item {
      border-right: 1px solid #ececec;
    }
  }

  .shop-other-info .comments {
    font-size: 14px;
    margin-left: 10px;
    .score {
      display: inline-block;
      /* 确定宽度之后inline-block可以调整 */
      width: 30px;
      color: #006666;
      &.active {
        color: #880000;
      }
    }

    .score-bg {
  		background-color: #006666;
		  color: #fff;
		  padding: 1px 4px;
      font-size: 12px;   
      &.active {
        background-color: #880000;
      }     
    }
}

	.enter-shop-wrap{
		text-align: center;
		.enter-shop {
			display: inline-block;
      background-color: #f2f2f2;
      width: 150px;
      height: 30px;
      line-height: 20px;
			font-size: 12px;
			padding: 6px 30px;
			border-radius: 70px;
			margin: 10px;
		}
	}

</style>