<template>
    <img src="../../../assets/img/common/Checked.svg" 
    alt="" class="check-button"
    :class="{checked: isChecked}">
</template>

<script>
  export default {
    name: 'CheckButton',
    props: {
      isChecked: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped>
  .check-button {
    width: 20px;
    height: 20px;
    overflow: hidden;
    border-radius: 100%;
    border: 1px solid #ececec;
  }
  .checked {
    /* border-color: black; */
    background-color: var(--color-tint);
  }
</style>