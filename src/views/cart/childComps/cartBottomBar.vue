<template>
  <div class="bot-bar">
    <div class="check-box">
      <check-button 
      :class="{checked: isSelectAll}" 
      :isChecked="false"
      @click.native="checkAll"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="goCalc">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from '../../../components/content/checkButton/CheckButton'
  export default {
    name: 'cartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.getters.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2) // 保留两位小数
      },
      checkLength() {
        // return this.$store.getters.cartLength().filter(item => item.checked).length
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        const length = this.checkLength
        if(length === this.$store.state.cartList.length) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      checkAll() {
        // console.log('checkall')
        this.$store.commit('checkAll', this.isSelectAll)
      },
      goCalc() {
        // console.log(this.checkLength)
        if (this.checkLength === 0) {
          this.$toast.show('请添加物品进入购物车', 2000)
        }
      }
    }
  }
</script>
<style scoped>
  .bot-bar {
    position: fixed;
    bottom: 49px;
    background-color: #eeeeee;
    width: 100%;
    height: 40px;
    display: flex;
    line-height: 40px;
    text-align: center;
  }

  .check-box {
    /* margin: 8px 10px; */
    width: 80px;
  }

  .total-price {
    flex: 1;
  }

  .calculate {
    width: 100px;
    background-color: var(--color-tint);
    color: #fff;
  }
</style>