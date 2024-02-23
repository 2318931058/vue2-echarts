// 封装具体的请求方法
import request from './axios'
// 请求第一栏组件的数据的方法
export const getReportdata = () => request.get('/reportdata')
// 请求第二栏组件的数据的方法
export const getSaledata = () => request.get('/saledata')
// 请求第三栏组件关键词数据的方法
export const getKeyWorddata = () => request.get('/keyworddata')
// 请求第三栏组件饼图数据的方法
export const getCategorydata = () => request.get('/categorydata')
// 请求百度地图散点图数据的方法
export const getMapdata = () => request.get('/mapdata')
