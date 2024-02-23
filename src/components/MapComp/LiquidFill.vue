<template>
    <v-chart :option="option"/>
</template>

<script>
import 'echarts-liquidfill'
import { getReportdata } from '@/request'
export default {
  data () {
    return {
      option: null
    }
  },
  methods: {
    renderChart (data) {
      this.option = {
        series: {
          type: 'liquidFill',
          data: [data],
          color: ['red'],
          radius: '80%',
          amplitude: '4%',
          outline: {
            borderDistance: 2,
            itemStyle: {
              borderWidth: 2
            }
          }
        }
      }
    }
  },
  async mounted () {
    const res = await getReportdata()
    console.log(res, 123)
    this.renderChart(+res.salesGrowLastDay / 100).toFixed(2)
  }
}
</script>

<style scoped>

</style>
