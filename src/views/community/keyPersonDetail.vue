<template>
  <div>

    <div class="homeHeader">
      <div class="head-wrapper">
        <div class="back"
          @click="goBack">
          <svg-icon icon-class="back" />
        </div>
        <span>详细信息</span>
        <span class="remove">移除</span>
      </div>
    </div>

    <div class="subContent">
      <div class="scroll-wrapper">
        <scroll>
          <div class="keyPersonItem">
            <img src="../../static/image/error.jpg">
            <div class="describe">
              <p>
                <span class="title left">{{detail.name}}</span>
                <span class="title">{{checkedEqu.name}}</span>
              </p>
              <p>
                <span class="left subtitle">性别</span>
                <span class="text">{{detail.sexValue}}</span>
              </p>
              <p>
                <span class="left subtitle">年龄</span>
                <span class="text">{{detail.age}}</span>
              </p>
              <p>
                <span class="left subtitle">民族</span>
                <span class="text">{{detail.nationValue}}</span>
              </p>
            </div>
          </div>
          <ul>
            <li>
              <p>布控类型</p>
              <span>{{detail.keyPersonPropValue}}</span>
            </li>
            <li>
              <p>身份证号</p>
              <span>{{detail.cerNum}}</span>
            </li>
            <li>
              <p>房间号</p>
              <span v-if="detail.baseHouses[0] && detail.baseHouses[0].buildingName && detail.baseHouses[0].unitName && detail.baseHouses[0].houseName">{{detail.baseHouses[0].buildingName + detail.baseHouses[0].unitName + detail.baseHouses[0].houseName}}</span>
            </li>
            <li>
              <p>手机号</p>
              <span>{{detail.phone}}</span>
            </li>
          </ul>
          <group>
            <cell title="布控通知"
              is-link
              @click.native="defence">点击查看</cell>
          </group>
          <group>
            <cell title="历史轨迹"
              is-link>点击查看</cell>
          </group>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import { mapGetters } from 'vuex'

export default {
  name: '',
  components: {
    Group,
    Cell
  },
  data() {
    return {
      detail: this.$route.query.detail
    }
  },
  methods: {
    defence() {
      // 布防状态跳转至不同页面
      if (this.detail.defenceState === '1') {
        this.$router.push({ path: '/events', query: { id: 4 } })
      } else {
        this.$router.push({ path: '/defenceDetail', id: this.detail.id })
      }
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  created() { },
  computed: {
    ...mapGetters([
      'checkedEqu'
    ])
  }
}
</script>

<style lang='less' scoped>
.remove {
  position: absolute;
  right: 15px;
  font-size: 14px;
}
.keyPersonItem {
  margin-top: 10px;
  padding: 15px;
  background-color: #fff;
  display: flex;
  position: relative;
  img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
  }
  .describe {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 14px;
    color: #999;
    .title {
      color: #333;
      font-weight: 700;
    }
    .left {
      display: inline-block;
      width: 60px;
    }
    .text {
      color: #333;
    }
  }
}
ul {
  margin-top: 10px;
  color: #999;
  li {
    height: 44px;
    line-height: 44px;
    padding-left: 15px;
    font-size: 14px;
    border-bottom: 1px solid #dddbdb;
    background-color: #fff;
    display: flex;
    p {
      width: 110px;
    }
    span {
      color: #333;
    }
  }
}
</style>