<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    props: {
      message: {
        type: String,
        default: ''
      },
      isShow: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      show(message = '默认文字', duration = 2000) {

        // duration = duration || 2000
        this.isShow = true
        this.message = message

        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration);
      }
    }
  }
</script>
<style scoped>
  .toast {
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 10px;
    border-radius: 10%;
    color: white;
    transform: translate(-50%, -50%);
    background-color:rgba(0, 0, 0, .75);
  }
</style>