<template>

  <!-- 小区基本情况 -->
  <scroll>
    <float-person-chart :id="id"></float-person-chart>
    <total-person-chart :id="id"></total-person-chart>
    <age-chart :id="id"></age-chart>
    <native-chart :id="id"></native-chart>
    <place-chart :id="id"></place-chart>
    <political-chart :id="id"></political-chart>
  </scroll>

</template>

<script>
import floatPersonChart from './floatPersonChart'
import totalPersonChart from './totalPersonChart'
import ageChart from './ageChart'
import nativeChart from './nativeChart'
import placeChart from './placeChart'
import politicalChart from './politicalChart'
export default {
  name: '',
  props: {
    id: ''
  },
  components: {    
    floatPersonChart,
    totalPersonChart,
    ageChart,
    nativeChart,
    placeChart,
    politicalChart
  }
}
</script>