<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6"
        ><el-card shadow="hover"> <TotalSale :reportData="reportData"/> </el-card
      ></el-col>
      <el-col :span="6">
        <el-card shadow="hover"><TotalOrder :reportData="reportData"/></el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover"> <TodayUser :reportData="reportData"/></el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover"> <TotalUser :reportData="reportData"/></el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TodayUser from './TodayUser.vue'
import TotalOrder from './TotalOrder.vue'
import TotalSale from './TotalSale.vue'
import TotalUser from './TotalUser.vue'
import { getReportdata } from '../../request'
export default {
  components: {
    TotalSale,
    TotalOrder,
    TodayUser,
    TotalUser
  },
  data () {
    return {
      reportData: {}
    }
  },
  async mounted () {
    const res = await getReportdata()
    this.reportData = res
  }
}
</script>

<style scoped></style>
