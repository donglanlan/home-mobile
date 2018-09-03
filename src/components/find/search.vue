<template>
  <div class="search">

    <sub-header title="搜一搜"></sub-header>

    <div class="content">
      <div class="searchBox">
        <select v-model="checkedId">
          <option value="0">绿景苑</option>
          <option value="1">测试小区测试小区</option>
        </select>
        <div class="searchInput" @click="clickFn">搜索</div>
        <svg-icon icon-class="search" />
      </div>
    </div>

  </div>
</template>

<script>
import subHeader from '@/components/subHeader'

export default {
  name: '',
  components: {
    subHeader
  },
  data() {
    return {
      checkedId: '0'
    }
  },
  methods: {
    clickFn() {
      this.$router.push({ path: '/searchContent'})
    }
  },
  created() {}
}
</script>

<style lang='less' scoped>
.searchBox {
  margin: 20px;
  padding: 0 10px;
  line-height: 44px;
  background-color: #fff;
  border-radius: 5px;
  color: #d3d3d3;
  display: flex;
  align-items: center;
  select {
    width: 76px;
    height: 44px;
    outline: none;
    border: none;
  }
  .svg-icon {
    font-size: 20px;
    margin-right: 8px;
  }
  .searchInput {
    flex: 1;
  }
}
</style>