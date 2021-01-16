<template>
  <div class="product-list-item">
    <img :src="product.show.img" alt="">
    <div class="product-info">
      <p>{{product.title}}</p>
      <span class="price">{{product.price}}</span>
      <span class="collect">{{product.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProductListItem',
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
 .product-list-item {
   padding-bottom: 40px;
   width: 45%;
   /* 因为下面是绝对定位的，所以这里必须要相对定位
   以便于info相对于父元素定位 */
   position: relative;
 }

 .product-list-item img {
   width: 100%;
   border-radius: 5px;
 }

 .product-info {
   font-size: 12px;
   /* 防止图片有大有小的情况 */
   position: absolute;
   bottom: 5px;
   left: 0;
   right: 0;
   overflow: hidden;
   text-align: center;
 }
 .product-info p {
   overflow: hidden;
   /* 显示省略号来表示被修剪的文本 */
   text-overflow: ellipsis;
   /* 文本内元素不进行换行 */
   white-space: nowrap;
   margin-bottom: 3px;
 } 
 .product-info .price{
   color: var(--color-highlight-text);
   margin-right: 20px;
 }
 .product-info .collect {
   position: relative;
 }
 .product-info .collect::before {
   content: '';
   position: absolute;
   left: -15px;
   top: -1px;
   width: 14px;
   height: 14px;
   background: url('../../../assets/img/common/collect.svg') 0 0/14px 14px;
 }

</style>