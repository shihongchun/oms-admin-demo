<template>
  <el-row class="table-box">
    <el-col :span="24" id="chart_a" style="height: 400px;">
    </el-col>
    <el-col :span="24" id="chart_b" style="height: 400px;">
    </el-col>
  </el-row>
</template>

<script>
let echarts = require('echarts')
export default {
  name: 'chart-two',
  data () {
    return {
      map:
          {
            'arr6': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            'arr5': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            'arr7': [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            'arr2': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            'arr11': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            'arr1': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            'arr12': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            'arr4': [134, 187, 49, 77, 7, 253, 32, 1278, 78, 1616, 28, 16],
            'arr13': [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
            'arr3': [274, 26, 0, 15, 5, 35, 18, 270, 93, 86, 21, 9]
          }
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let chartA = echarts.init(document.getElementById('chart_a'))
      let chartB = echarts.init(document.getElementById('chart_b'))
      var arr11 = this.map.arr11 // pc正常注册
      var arr12 = this.map.arr12 // pc推荐
      var arr1 = this.map.arr1 // 代理样本
      var arr3 = this.map.arr3 // 微信推荐
      var arr4 = this.map.arr4 // 微信注册
      var arr5 = this.map.arr5 // 媒体推广
      var arr6 = this.map.arr6 // 线下代理
      var arr7 = this.map.arr7 // App推广
      var dataX = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12']
      // 构图
      var option1 = {
        title: {
          text: '推荐会员变化趋势',
          left: 50
        },
        color: ['#fc8675', '#4acacb', '#5ab6df', '#6a8abe'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          right: 55,
          data: ['线下地推', '代理样本', '微信会员推荐', 'PC会员推荐']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: dataX
        }],
        yAxis: [{
          minInterval: 1,
          type: 'value'
        }],
        series: [{
          name: '线下地推',
          type: 'line',
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: arr6
        },
        {
          name: '代理样本',
          type: 'line',
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: arr1
        },
        {
          name: '微信会员推荐',
          type: 'line',
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: arr3
        },
        {
          name: 'PC会员推荐',
          type: 'line',
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: arr12
        }
        ]
      }
      chartA.setOption(option1)
      var option2 = {
        title: {
          text: '自主会员变化趋势',
          left: 50
        },
        color: ['#fc8675', '#4acacb', '#5ab6df', '#6a8abe'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          right: 55,
          data: ['微信自主注册', 'PC自主注册', '媒体推广', 'APP推广']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: dataX
        }],
        yAxis: [{
          minInterval: 1,
          type: 'value'
        }],
        series: [{
          name: '微信自主注册',
          type: 'line',
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: arr4
        },
        {
          name: 'PC自主注册',
          type: 'line',
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: arr11
        },
        {
          name: '媒体推广',
          type: 'line',
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: arr5
        },
        {
          name: 'APP推广',
          type: 'line',
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: arr7
        }
        ]
      }
      chartB.setOption(option2)
    }
  }
}
</script>

<style scoped lang="scss">
  .table-box {
    margin-top: 40px;
  }
</style>
