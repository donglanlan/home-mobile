<template>
  <div class="placeChart"></div>
</template>

<script>
import echarts from 'echarts'
import { getPlaceSpread } from '@/api/community/person'
import { Load } from '@/utils/msg'

const option = {
  title: {
    text: '户籍分布',
    x: 'center'
  },
  legend: {
    type: 'scroll',
    top: 25,
    data: [],
    selected: {'湖北': false}
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  series: [
    {
      name: '户籍',
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
      getPlaceSpread(this.id)
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
    this.myChart = echarts.init(document.querySelector('.placeChart'))
    this.drawPieChart()
  }
}
</script>

<style lang='less' scoped>
.placeChart {
  height: 250px;
  margin-bottom: 50px;
}
</style>