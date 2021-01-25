<template>
  <div v-if="Object.keys(paramInfo).length !== 0" class="param-wrap">
    <table v-for="(item, idx) in paramInfo.rules" :key="idx">
      <!-- 注意这里多层循环的时候，不能有相同名称的key -->
      <tr v-for="(list, idx) in item" class="flex" :key="'list' + idx">
        <td v-for="(listitem, idx) in list" :key="'listitem' + idx" class="rule-list-item"
        :class="{active: idx===0}" >
          {{listitem}}
        </td>
      </tr>
    </table>
    <table class="info-list-wrap">
      <tr v-for="(info, idx) in paramInfo.infos" :key="'info' + idx">
        <td class="info-list-tit">
          {{info.key}}
        </td>
        <td class="info-list-value">
          {{info.value}}
        </td>
      </tr>      
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detailParamInfo',
    props: {
      paramInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .param-wrap {
    border-top: 4px solid #ececec;
    border-bottom: 4px solid #ececec;
    margin: 10px 10px;
    position: relative;
  }
  
  .rule-list-item {
    font-size: 14px;
    // width: 20%;
    height: 42px;
    width: 100px;
    border-bottom: 1px solid #ececec;
    padding: 10px 4px;
    color: var(--color-tint);
    &.active {
      color: #555;
    }
  }
  .info-list-wrap {
    font-size: 14px;
    // border-bottom: 1px solid #ececec;
    padding: 0px 4px 10px 4px;
    line-height: 20px;
    color: var(--color-tint);
    .info-list-tit {
      border-bottom: 1px solid #ececec;  
      width: 18%;
      color: #555;
    }
    .info-list-value {
      border-bottom: 1px solid #ececec;   
      height: 42px;  
      // margin-left: 50px; 
      padding-left: 30px;
    }

  }

  .flex {
    display: flex;
  }

</style>