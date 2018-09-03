<template>
  <div class="nativeChart"></div>
</template>

<script>
import echarts from 'echarts'
import { getNativeSpread } from '@/api/community/person'
import { Load } from '@/utils/msg'

const option = {
  title: {
    text: '民族分布',
    x: 'center'
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 10,
    data: [],
    selected: {'汉族': false}
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  series: [
    {
      name: '民族',
      type: 'pie',
      data: [],      
      radius: '55%',
      center: ['35%', '60%'],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

export default {
  name: '',
  props: {
    id: ''
  },
  data() {
    return {
      myChart: null,
      option
    }
  },
  methods: {
    drawPieChart() {
      Load.show('加载中...')
      getNativeSpread(this.id)
        .then(response => {
          this.option.series[0].data = response
          this.option.legend.data = response.map(item => {
            return item.name
          })
          this.myChart.setOption(this.option)
        })
    }
  },
  created() { },
  mounted() {
    this.myChart = echarts.init(document.querySelector('.nativeChart'))
    this.drawPieChart()
  }
}
</script>

<style lang='less' scoped>
.nativeChart {
  height: 200px;
  margin-bottom: 50px;
}
</style>