<template>
    <div>
        <el-button class="sendSmsBtn" type="primary">{{time | change}}</el-button>
    </div>
</template>

<script>
  let flag = false
  export default {
    data() {
      return {
        time: '获取验证码',
      }
    },
    props: {
      start: {
        type: Boolean
      }
    },
    watch: {
      start(value, oldvalue) {
        if (value == true) {
          this.countDown()
        }
      }
    },
    methods: {
      countDown() {
        this.time = 60;
        let time = setInterval(() => {
          this.time --
          flag = true
          if (this.time == 0) {
            this.$emit('countDown')
            this.time = '获取验证码'

            clearInterval(time)
          }
        }, 1000)
      }
    },
    filters: {
      change(value) {
        if (!value) return ""
        if (!isNaN(value)) {
          if (flag == true) {
            return `重新发送${value}S`
          }
          return value + 'S'
        } else {
          return value
        }
      }
    }

  }
</script>

<style>
    .sendSmsBtn{
        position: absolute;
        right: 10px;
        height: 34px;
        line-height: 34px;
        border-radius: 3px;
        /*background: #0094ff;*/
        border: none;
        padding: 0 6px;
        color: #fff;
        display: inline-block;
        width: 110px;
        top: 8px;
    }
</style>
