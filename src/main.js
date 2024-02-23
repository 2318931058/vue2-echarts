import Vue from 'vue'
import App from './App.vue'
// 引入注册的插件
import './plugins/vue-echarts.js'
import './plugins/element-ui'
// 引入reset.css
import 'reset.css'
// 引入全局样式
import './main.css'
Vue.config.productionTip = false
new Vue({
  render: (h) => h(App)
}).$mount('#app')
