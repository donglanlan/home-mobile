<template>
  <div class="eventsShow">
    <home-header title="布控预警"></home-header>
    <div class="subContent">
      <div class="scroll-wrapper">
        <scroll>
          <ul>
            <li>
              <img src="../../static/image/test1.png">
              <div class="describe">
                <p>
                  <span>告警地点</span>
                  <span class="text">大门入口-人行通道</span>
                </p>
                <p>
                  <span>告警时间</span>
                  <span class="text">2018-7-12 18:45:45</span>
                </p>
              </div>
            </li>
            <li>
              <img src="../../static/image/test1.png">
              <div class="describe">
                <p>
                  <span>告警地点</span>
                  <span class="text">大门入口-人行通道</span>
                </p>
                <p>
                  <span>告警时间</span>
                  <span class="text">2018-7-12 18:45:45</span>
                </p>
              </div>
            </li>
          </ul>
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
    return {}
  },
  methods: {},
  created() { }
}
</script>

<style lang='less' scoped>
.subContent {
  li {
    padding: 15px;
    margin-bottom: 10px;
    background-color: #fff;
    display: flex;
    font-size: 14px;
    color: #999;
    img {
      width: 120px;
      height: 70px;
      margin-right: 10px;
    }
    .describe {
      display: flex;
      flex-direction: column;
      justify-content: center;
      p {
        &:nth-of-type(1) {
          margin-bottom: 15px;
        }
        .text {
          margin-left: 15px;
          font-size: 12px;
          color: #333;
        }
      }
    }
  }
}
</style>