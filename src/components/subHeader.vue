<template>

  <div class="head-wrapper">
    <div class="back"
      @click="goBack">
      <svg-icon icon-class="back" />
      <span>返回</span>
    </div>
    <span>{{title}}</span>
  </div>

</template>

<script>
export default {
  name: '',
  props: {
    title: ''
  },
  data() {
    return {}
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  created() { }
}
</script>

<style lang='less' scoped>
</style>