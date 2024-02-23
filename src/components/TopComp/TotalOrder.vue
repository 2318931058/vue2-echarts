<template>
    <div class="total-order">
        <CommonCard title="累计订单额" :value="reportData.orderToday">
            <template #default>
                <v-chart :option="option"/>
            </template>
            <template #footer>
                <span>昨日销售额</span>
                <span class="css-1">￥ {{ reportData.orderLastDay }}</span>
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
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          show: false
        },
        // 绘制一些画布很小的图表的时候 尽量让grid和容器靠在一起
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        series: {
          type: 'line',
          data,
          areaStyle: {
            color: 'purple'
          },
          lineStyle: {
            width: 0
          },
          itemStyle: {
            opacity: 0
          },
          smooth: true
        }
      }
    }
  },
  watch: {
    reportData (newValue) {
      this.renderChart(newValue.orderTrend)
    }
  }
}
</script>

<style scoped>

</style>
