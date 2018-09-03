<template>
  <div class="ageChart"></div>
</template>

<script>
import echarts from 'echarts'
import { getBirthSpread } from '@/api/community/person'
import { Load } from '@/utils/msg'

const option = {
  title: {
    text: '年龄分布',
    x: 'center'
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 10,
    data: []
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  series: [
    {
      name: '年龄',
      type: 'pie',
      radius: '55%',
      center: ['35%', '60%'],
      data: [],
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
      this.option.series[0].data = []
      getBirthSpread(this.id)
        .then(response => {
          this.option.legend.data = response.X_axis
            response.X_axis.forEach((item, index) => {
              let obj = {}
              obj.name = item
              obj.value = response.Y_axis[index]
              this.option.series[0].data.push(obj)
            })
          this.myChart.setOption(this.option)
        })
    }
  },
  created() { },
  mounted() {
    let chart = document.querySelector('.ageChart')
    chart.style.width = window.innerWidth + 'px'
    this.myChart = echarts.init(chart)
    this.drawPieChart()
  }
}
</script>

<style lang='less' scoped>
.ageChart {
  height: 200px;
  margin-bottom: 50px;
}
</style>