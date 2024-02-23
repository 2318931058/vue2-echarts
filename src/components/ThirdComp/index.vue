<template>
  <div class="third-comp">
    <div class="left">
      <el-card shadow="hover">
        <template #header>
          <div class="css-2">关键词搜索</div>
        </template>
        <div class="main">
          <div class="charts">
            <div class="left-chart">
              <div class="title">搜索用户量</div>
              <div class="number">{{ totalUser }}</div>
              <v-chart :option="option1" />
            </div>
            <div class="right-chart">
              <div class="title">总搜索量</div>
              <div class="number">{{ totalSearch }}</div>
              <v-chart :option="option2" />
            </div>
          </div>
          <div class="table">
            <el-table :data="tableData">
              <el-table-column
                prop="rank"
                label="排名"
                width="60"
              ></el-table-column>
              <el-table-column
                prop="keyWord"
                label="关键词"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="totalSearch"
                label="总搜索量"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="totalUser"
                label="搜索用户数"
                align="center"
              ></el-table-column>
            </el-table>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="20"
              :page-size="pageSize"
              @current-change="currentChange"
            >
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
    <div class="right">
      <el-card shadow="hover">
        <template #header>
          <div class="css-2">分类销售排行</div>
          <el-radio-group v-model="radio" @input="handleRadio">
            <el-radio-button label="品类"></el-radio-button>
            <el-radio-button label="商品"></el-radio-button>
          </el-radio-group>
        </template>
        <div class="pie-chart">
            <v-chart :option="pieChartOption"/>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getKeyWorddata, getCategorydata } from '@/request'

export default {
  data () {
    return {
      option1: null,
      option2: null,
      tableData: [],
      totalData: [],
      pageSize: 6, // 表示每页显示的条目数
      radio: '品类',
      pieChartOption: null,
      categoryData: null
    }
  },
  methods: {
    currentChange (page) {
      // 每次page值改变的时候 重新渲染tableData
      this.tableData = this.totalData.slice(
        this.pageSize * (page - 1),
        this.pageSize * page
      )
    },
    renderChart1 (data) {
      this.option1 = {
        xAxis: {
          type: 'category',
          show: false,
          boundaryGap: false
        },
        yAxis: {
          show: false
        },
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        series: {
          type: 'line',
          data,
          areaStyle: {
            color: 'skyblue'
          },
          itemStyle: {
            opacity: 0
          },
          smooth: true
        }
      }
    },
    renderChart2 (data) {
      this.option2 = {
        xAxis: {
          type: 'category',
          show: false,
          boundaryGap: false
        },
        yAxis: {
          show: false
        },
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        series: {
          type: 'line',
          data,
          areaStyle: {
            color: 'skyblue'
          },
          itemStyle: {
            opacity: 0
          },
          smooth: true
        }
      }
    },
    handleRadio (label) {
      // 切换label值的时候重新渲染表格
      if (label === '品类') {
        this.renderPieChart(this.categoryData.data1)
      } else {
        this.renderPieChart(this.categoryData.data2)
      }
    },
    renderPieChart (data) {
      // 如果希望显示legend数据 必须在传入的数据中添加name字段
      data.map(item => {
        item.name = item.title + '|' + item.value
        return item
      })
      const totalSale = data.reduce((pre, cur) => {
        return pre + cur.value
      }, 0)
      this.pieChartOption = {
        title: [{
          text: '品类分布',
          textStyle: {
            fontSize: 14,
            color: '#666'
          },
          left: 20,
          top: 20
        },
        {
          text: '累计订单量',
          subtext: totalSale,
          x: '40%',
          y: '45%',
          textAlign: 'center',
          textStyle: {
            fontSize: 14,
            color: '#999'
          },
          subtextStyle: {
            fontSize: 28,
            color: '#333'
          }
        }],
        tooltip: {
          formatter: (params) => {
            console.log(params, 123)
            const res = params.seriesName + '<br/>' + params.marker + params.data.title + '<br/>' + params.marker + '销售额:' + params.data.value
            return res
          }
        },
        series: {
          name: '品类分布',
          type: 'pie',
          data,
          radius: ['45%', '60%'],
          center: ['40%', '50%'],
          label: {
            show: true,
            position: 'outside',
            formatter: (params) => {
              return params.data.title
            }
          },
          itemStyle: {
            borderWidth: 8,
            borderColor: '#fff'
          }
        },
        legend: {
          left: '80%',
          top: 'top',
          textStyle: {
            color: '#888'
          },
          orient: 'vertical',
          height: 200
        }
      }
    }
  },
  async mounted () {
    const res = await getKeyWorddata()
    this.totalData = res
    this.tableData = this.totalData.slice(0, 6)
    this.renderChart1(
      this.totalData
        .map((item) => item.totalUser)
        .slice(0, 10)
        .reverse()
    )
    this.renderChart2(
      this.totalData
        .map((item) => item.totalSearch)
        .slice(0, 10)
        .reverse()
    )
    const _res = await getCategorydata()
    this.categoryData = _res
    this.renderPieChart(this.categoryData.data1)
  },
  computed: {
    totalSearch () {
      return this.totalData.reduce((cur, pre) => {
        return cur + pre.totalSearch
      }, 0)
    },
    totalUser () {
      return this.totalData.reduce((cur, pre) => {
        return cur + pre.totalUser
      }, 0)
    }
  }
}
</script>

<style lang='scss' scoped>
.third-comp {
  margin-top: 20px;
  display: flex;
  gap: 20px;
  & > div {
    flex: 1;
  }
  .left {
    .main {
      padding: 20px;
      .charts {
        display: flex;
        gap: 20px;
        & > div {
          flex: 1;
          .echarts {
            height: 50px;
          }
          .title {
            font-size: 14px;
            color: #727171;
          }
          .number {
            font-size: 20px;
            font-weight: 600;
            margin-top: 10px;
          }
        }
      }
    }
    .table {
      .el-pagination {
        margin-top: 16px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .right {
   .el-card {
      height: 100%;

      ::v-deep .el-card__body {
        height: 558px !important;
        .pie-chart{
        height: 100%;
      }
      }
      ::v-deep .el-card__header{
        position: relative;
         .el-radio-group{
            position: absolute;
            right: 2%;
            top: 10%;
        }
      }
    }
  }
}
</style>
<style>
div.css-2 {
  font-weight: 600;
}
</style>
