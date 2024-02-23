<template>
    <div class="total-user">
        <CommonCard title="累计用户数" :value="reportData.totalUser">
            <template #default>
                <v-chart :option="option"/>
            </template>
            <template #footer>
                <div class="wrapper">
                    <div>
                        <span>日同比</span>
                        <span class="css-1">{{reportData.userGrowLastDay}}%</span>
                        <span class="increase"></span>
                    </div>
                    <div>
                        <span>月同比</span>
                        <span class="css-1">{{reportData.userGrowLastMonth}}%</span>
                        <span class="increase"></span>
                    </div>
                </div>
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
    renderChart (v1, v2) {
      this.option = {
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          show: false
        },
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        series: [
          {
            name: '上月平台用户数',
            type: 'bar',
            data: [v1],
            barWidth: 10,
            itemStyle: {
              color: 'green'
            },
            stack: 'total'
          },
          {
            name: '本月平台用数',
            type: 'bar',
            data: [v2],
            barWidth: 10,
            itemStyle: {
              color: '#ddd'
            },
            stack: 'total'
          }, {
            type: 'custom',
            renderItem: (params, api) => {
              // 绘制这个图表中的三角形 关注：这个三角形的位置 如何绘制三角形这个形状
              const endPoion = api.coord([api.value(0), 0])
              //
              return {
                type: 'group',
                children: [
                  {
                    type: 'path',
                    shape: {
                      d: 'M511.744 319.999l-383.744 383.744h767.488l-383.744-383.744z', // 通过SVG来制定图形的形状
                      x: endPoion[0] - 5,
                      y: 35,
                      width: 10,
                      height: 10,
                      layout: 'cover'
                    },
                    style: {
                      fill: 'green'
                    }
                  }, {
                    type: 'path',
                    shape: {
                      d: 'M889.696 320.8H158.848l365.504 365.536 365.344-365.536z', // 通过SVG来制定图形的形状
                      x: endPoion[0] - 5,
                      y: 5,
                      width: 10,
                      height: 10,
                      layout: 'cover'
                    },
                    style: {
                      fill: 'green'
                    }
                  }
                ]
              }
            },
            data: [v1]
          }
        ]
      }
    }
  },
  watch: {
    reportData (newValue) {
      this.renderChart(newValue.userLastMonth, newValue.userToday)
    }
  }
}
</script>

<style scoped>
.wrapper{
    display: flex;
    gap:10px
}
</style>
