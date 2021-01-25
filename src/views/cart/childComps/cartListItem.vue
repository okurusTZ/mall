<template>
  <div class="item">
    <img :src="product.image" alt="">
    {{product.title}}
  </div>
</template>

<script>
  export default {
    name: 'cartListItem',
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
</style>