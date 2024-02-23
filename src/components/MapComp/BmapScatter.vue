<template>
        <v-chart :option="option" class="chart"/>
</template>

<script>
// 引入echarts中对百度地图的支持
import 'echarts/extension/bmap/bmap'
import { getMapdata } from '@/request'
function converData (city, geodata) {
  const res = []
  city.forEach(item => {
    const geo = geodata[item.name]
    if (geo) {
      res.push({
        name: item.name,
        value: geo.concat(item.value)
      })
    }
  })
  console.log(res)
  return res
}
export default {
  data () {
    return {
      option: null,
      cityData: null
    }
  },
  methods: {
    renderChart (data) {
      this.option = {
        bmap: {
          key: '9EL8yDqL35kdtjhrxts0oF1mAo53dRqq',
          center: [108.954355, 34.346721],
          zoom: 5
          //   roam: true
        //   mapStyle: {
        //     styleJson: [
        //       {
        //         featureType: 'water',
        //         elementType: 'all',
        //         stylers: {
        //           color: '#d1d1d1'
        //         }
        //       },
        //       {
        //         featureType: 'land',
        //         elementType: 'all',
        //         stylers: {
        //           color: '#f3f3f3'
        //         }
        //       },
        //       {
        //         featureType: 'railway',
        //         elementType: 'all',
        //         stylers: {
        //           visibility: 'off'
        //         }
        //       },
        //       {
        //         featureType: 'highway',
        //         elementType: 'all',
        //         stylers: {
        //           color: '#fdfdfd'
        //         }
        //       },
        //       {
        //         featureType: 'highway',
        //         elementType: 'labels',
        //         stylers: {
        //           visibility: 'off'
        //         }
        //       },
        //       {
        //         featureType: 'arterial',
        //         elementType: 'geometry',
        //         stylers: {
        //           color: '#fefefe'
        //         }
        //       },
        //       {
        //         featureType: 'arterial',
        //         elementType: 'geometry.fill',
        //         stylers: {
        //           color: '#fefefe'
        //         }
        //       },
        //       {
        //         featureType: 'poi',
        //         elementType: 'all',
        //         stylers: {
        //           visibility: 'off'
        //         }
        //       },
        //       {
        //         featureType: 'green',
        //         elementType: 'all',
        //         stylers: {
        //           visibility: 'off'
        //         }
        //       },
        //       {
        //         featureType: 'subway',
        //         elementType: 'all',
        //         stylers: {
        //           visibility: 'off'
        //         }
        //       },
        //       {
        //         featureType: 'manmade',
        //         elementType: 'all',
        //         stylers: {
        //           color: '#d1d1d1'
        //         }
        //       },
        //       {
        //         featureType: 'local',
        //         elementType: 'all',
        //         stylers: {
        //           color: '#d1d1d1'
        //         }
        //       },
        //       {
        //         featureType: 'arterial',
        //         elementType: 'labels',
        //         stylers: {
        //           visibility: 'off'
        //         }
        //       },
        //       {
        //         featureType: 'boundary',
        //         elementType: 'all',
        //         stylers: {
        //           color: '#fefefe'
        //         }
        //       },
        //       {
        //         featureType: 'building',
        //         elementType: 'all',
        //         stylers: {
        //           color: '#d1d1d1'
        //         }
        //       },
        //       {
        //         featureType: 'label',
        //         elementType: 'labels.text.fill',
        //         stylers: {
        //           color: '#999999'
        //         }
        //       }
        //     ]
        //   }
        },
        title: {
          text: '新中地网点地图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '新中地外卖',
            coordinateSystem: 'bmap',
            type: 'scatter',
            data,
            encode: {
              value: 2
            },
            symbolSize (value) {
              return value[2] / 10
            }

          }, {
            name: '新中地外卖',
            coordinateSystem: 'bmap',
            type: 'effectScatter',
            data: data.sort((a, b) => {
              return b.value[2] - a.value[2]
            }).slice(0, 10),
            encode: {
              value: 2
            },
            symbolSize (value) {
              return value[2] / 10
            },
            rippleEffect: {
              color: 'purple',
              brushType: 'stroke'
            },
            tooltip: {
              formatter: (params) => {
                return params.data.name + '销售额:' + params.data.value[2]
              },
              textStyle: {
                color: 'green'
              }
            }
          }
        ]
      }
    }
  },
  async mounted () {
    const res = await getMapdata()
    this.renderChart(converData(res.city, res.geodata))
  }
}
</script>

<style lang='scss' scoped>

</style>
