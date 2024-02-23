// 注册引入的那个全局组件
// 引入echarts
// eslint-disable-next-line no-unused-vars
import * as echarts from 'echarts'
import Vue from 'vue'
import vcharts from 'vue-echarts'
// 这个echarts库和我们router vuex其实有一些区别的 通过原型向组件实例挂载echarts
Vue.component('v-chart', vcharts)
