<template>
    <div class="today-user">
        <CommonCard title="今日用户交易数" :value="reportData.userToday">
            <template #default>
                <v-chart :option="option"/>
            </template>
            <template #footer>
                <span>退货率</span>
                <span class="css-1">{{reportData.returnRate}}%</span>
            </template>
        </CommonCard>
    </div>
</template>

<script>
import CommonCard from './CommonCard.vue'

export default {
  components: { CommonCard },
  props: ['reportData'],
  data () {
    return {
      option: null
    }
  },
  methods: {
    renderChart (data) {
      this.option = {
        xAxis: {
          type: 'category',
          show: false,
          data: [
            '00:00',
            '03:00',
            '05:00',
            '07:00',
            '09:00',
            '11:00',
            '13:00',
            '15:00',
            '17:00',
            '19:00',
            '21:00',
            '23:00'
          ]
        },
        yAxis: {
          type: 'value',
          show: false
        },
        tooltip: {},
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        series: {
          type: 'bar',
          name: '实时交易量',
          data,
          barWidth: '60%'
        }
      }
    }
  },
  watch: {
    reportData (newValue) {
      this.renderChart(newValue.orderUserTrend)
    }
  }
}
</script>

<style scoped>

</style>
