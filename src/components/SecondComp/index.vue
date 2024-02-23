<template>
  <div class="second-comp">
    <el-card class="box-card">
      <template #header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">销售额</el-menu-item>
          <el-menu-item index="2">访问量</el-menu-item>
        </el-menu>
        <div class="right">
          <el-radio-group v-model="time">
            <el-radio-button label="今日"></el-radio-button>
            <el-radio-button label="本周"></el-radio-button>
            <el-radio-button label="本月"></el-radio-button>
            <el-radio-button label="今年"></el-radio-button>
          </el-radio-group>
          <el-date-picker
            v-model="pickerTime"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
      </template>
      <div class="content">
        <div class="left-chart">
          <v-chart :option="option" />
        </div>
        <div class="right-list">
          <div class="list-title">排行版</div>
          <div v-for="data in rankdata" :key="data.no" class="list-item" >
            <span :class="{
                'top-3':data.no<4
            }">{{ data.no }}</span>
            <span>{{ data.title }}</span>
            <span>{{ data.sales }}</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getSaledata } from '@/request/index.js'
export default {
  data () {
    return {
      activeIndex: '1',
      time: '今日',
      pickerTime: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      option: null,
      saledata: null,
      rankdata: null
    }
  },
  methods: {
    handleSelect (index) {
      this.activeIndex = index
      if (this.activeIndex === '1') {
        this.rankdata = this.saledata.saleRank
        this.renderChart(
          this.saledata.saleFulleYearAxis,
          this.saledata.saleFulleYear
        )
      } else {
        this.rankdata = this.saledata.visitRank
        this.renderChart(
          this.saledata.visitFullYeadAxis,
          this.saledata.visitFullYear
        )
      }
    },
    renderChart (v1, v2) {
      this.option = {
        title: {
          text: '年度销售额',
          textStyle: {
            fontWeight: 600,
            fontSize: 14
          }
        },
        xAxis: {
          type: 'category',
          data: v1,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          }
        },
        grid: {
          left: 40
        },
        series: {
          type: 'bar',
          data: v2,
          barWidth: '40%'
        },
        color: 'skyblue'
      }
    }
  },
  async mounted () {
    const res = await getSaledata()
    this.saledata = res
    this.rankdata = this.saledata.saleRank
    this.renderChart(
      this.saledata.saleFulleYearAxis,
      this.saledata.saleFulleYear
    )
  }
}
</script>

<style lang="scss" scoped>
// 样式穿透 用于修改组件内部的样式
.second-comp {
  margin-top: 20px;
  position: relative;
  ::v-deep .el-card__header {
    padding: 0;
    border-bottom: none;
    .el-menu {
      padding-left: 50px;
    }
    .right {
      position: absolute;
      top: 10px;
      right: 2%;
      .el-radio-group {
        margin-right: 20px;
      }
    }
  }
  .content {
    display: flex;
    .left-chart {
      flex: 0 0 70%;
      height: 434px;
    }
    .right-list {
      flex: 1;
      .list-title {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 600;
      }
      .list-item {
        margin: 20px 0px;
        display: flex;
        gap: 20px;
        span {
          font-size: 14px !important;
          color: #464545;
        }
        span:nth-child(2) {
          flex: 1;
        }
        span:nth-child(1) {
          width: 20px;
          height: 20px;
          border-radius: 10px;
          text-align: center;
          line-height: 20px;
        }
        .top-3{
            background-color: rgb(9, 179, 247);
            color:#fff
        }
      }
    }
  }
}
</style>
