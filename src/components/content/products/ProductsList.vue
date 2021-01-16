<template>
  <div class="product-list">
    <products-list-item v-for="(item, index) in products" :key="index" :product="item"></products-list-item>
  </div>
</template>

<script>
  import ProductsListItem from './ProductListItem' 
  export default {
    name: 'ProductsList',
    components: {
      ProductsListItem
    },
    props: {
      // 父类传给自己的数据
      products: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>
<style scoped>
  .product-list {
    display: flex;
    /* 根据宽度往一行显示 */
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }

</style>