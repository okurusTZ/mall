<template>
  <div class="recommends">
    <div class="recommend-item" v-for="(item,id) in recommends" :key="id">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RecommendView',
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>
<style scoped>
  .recommends {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    
    padding: 10px 0px 10px;
    border-bottom: 5px solid #eeeeee;
  }
  .recommend-item{
    flex: 1;

  }
  .recommend-item img {
    /* 这里最好不要写死，不然会根据屏幕改编 */
    height: 70%;
    width: 70%;
    margin-bottom: 10px;
  }
</style>