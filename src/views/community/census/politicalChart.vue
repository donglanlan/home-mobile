<template>
  <div class="politicalChart"></div>
</template>

<script>
import echarts from 'echarts'
import { getPoliticalSpread } from '@/api/community/person'
import { Load } from '@/utils/msg'

const option = {
  title: {
    text: '政治面貌分布',
    x: 'center'
  },
  legend: {
    type: 'scroll',
    top: 25,
    data: [],
    selected: { '群众': false }
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  series: [
    {
      name: '政治面貌',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
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
      getPoliticalSpread(this.id)
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
    this.myChart = echarts.init(document.querySelector('.politicalChart'))
    this.drawPieChart()
  }
}
</script>

<style lang='less' scoped>
.politicalChart {
  height: 250px;
}
</style>