<template>
  <div class="communityIntro">
    <home-header title="小区简介"></home-header>

    <div class="subContent">
      <div class="scroll-wrapper">
        <scroll>
          <img src="../../static/image/intro.png">
          <div class="intro">
            <span class="title">绿景苑小区</span>
            <div class="text">
              绿景苑社区现有居民住楼14栋，绿景苑社区分东、西两个物业。现有楼房14栋，共54个居民单元，实有住户1932户，有户籍的户数1172户，户籍居民人数3006人。 1、2、5、6、7楼(居民住宅)； 3楼（驻街单位）绿景馨园小区6、7、8、9、10、11楼(居民住宅)；绿景馨园12、13楼(商住楼)
            </div>
            <img src="../../static/image/intro2.jpg">
          </div>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import homeHeader from '@/components/homeHeader'

export default {
  name: '',
  components: {
    homeHeader
  },
  data() {
    return {
      id: this.$route.query.id
    }
  },
  methods: {},
  created() { }
}
</script>

<style lang='less' scoped>
.communityIntro {
  height: 100%;
  img {
    width: 100%;
  }
  .intro {
    padding: 16px;
    color: #333;
    background-color: #fff;
    .title {
      font-size: 23px;
      font-weight: 700;
    }
    .text {
      margin-top: 20px;
      font-size: 14px;
      line-height: 24px;
      text-indent: 2em;
    }
    img {
      margin-top: 10px;
    }
  }
}
</style>