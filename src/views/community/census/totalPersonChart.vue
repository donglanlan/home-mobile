<template>
  <div class="totalPersonChart"></div>
</template>

<script>
import echarts from 'echarts'
import theme from './theme.json'
import { getTotalPerson } from '@/api/community/person'
import { Load } from '@/utils/msg'

const option = {
  title: {
    text: '该小区人口总数变化情况(人）',
    x: 'center'
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    name: '增加人数',
    data: [120, 200, 150, 80, 70, 110, 130],
    type: 'bar',
    barMaxWidth: 20
  }]
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
      getTotalPerson(this.id)
        .then(response => {
          // this.option.series[0].data = response
          this.myChart.setOption(this.option)
        })
    }
  },
  created() { },
  mounted() {
    this.myChart = echarts.init(document.querySelector('.totalPersonChart'), theme)
    this.drawPieChart()
  }
}
</script>

<style lang='less' scoped>
.totalPersonChart {
  height: 250px;
  margin-bottom: 50px;
}
</style>