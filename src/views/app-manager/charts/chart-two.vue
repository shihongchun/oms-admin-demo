<template>
  <el-row class="table-box">
    <el-col :span="24" id="chart_a" style="height: 400px;">
    </el-col>
    <!--<el-col :span="24" id="chart_b" style="height: 400px;">-->
    <!--</el-col>-->
  </el-row>
</template>

<script>
let echarts = require('echarts')
export default {
  name: 'chart-two',
  data () {
    return {
      chartData: {
        '线下地推': [],
        '代理样本': [],
        '微信会员推荐': [],
        'pc会员推荐': []
      },
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
    this.http.get(this.ports.getAddCount).then((res) => {
      if (res.data.status) {
        let data = res.data.data
        let date = new Date()
        let newData = {}
        for (let i = 0; i < 7; i++) {
          let aa = new Date(date.getTime() - i * 24 * 3600 * 1000)
          let newDate = this.moment(aa)
          console.log(newDate)
          newData[newDate] = {}
          data.forEach((item) => {
            if (item.date === newDate) {
              newData[newDate][item.source] = item.count
            }
          })
        }
        for (let i in this.chartData) {
          for (let j in newData) {
            if (newData[j][i]) {
              this.chartData[i].push(newData[j][i])
            } else {
              this.chartData[i].push(0)
            }
          }
        }
        console.log('data:' + JSON.stringify(this.chartData))
        this.drawLine()
      }
    })
  },
  methods: {
    moment (newDate) {
      let date = newDate.getFullYear().toString() + (newDate.getMonth() + 1 < 10 ? ('0' + (newDate.getMonth() + 1).toString()) : newDate.getMonth()).toString() + (newDate.getDate()).toString()
      return date
    },
    drawLine () {
      let chartA = echarts.init(document.getElementById('chart_a'))
      var dataX = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7']
      // 构图
      var option1 = {
        title: {
          text: '会员增长变化趋势',
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
          data: this.chartData['线下地推']
        },
        {
          name: '代理样本',
          type: 'line',
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: this.chartData['代理样本']
        },
        {
          name: '微信会员推荐',
          type: 'line',
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: this.chartData['微信会员推荐']
        },
        {
          name: 'PC会员推荐',
          type: 'line',
          stack: '总量',
          areaStyle: {
            normal: {}
          },
          data: this.chartData['PC会员推荐']
        }
        ]
      }
      chartA.setOption(option1)
      // var option2 = {
      //   title: {
      //     text: '自主会员变化趋势',
      //     left: 50
      //   },
      //   color: ['#fc8675', '#4acacb', '#5ab6df', '#6a8abe'],
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {
      //       type: 'cross',
      //       label: {
      //         backgroundColor: '#6a7985'
      //       }
      //     }
      //   },
      //   legend: {
      //     right: 55,
      //     data: ['微信自主注册', 'PC自主注册', '媒体推广', 'APP推广']
      //   },
      //   grid: {
      //     left: '3%',
      //     right: '4%',
      //     bottom: '3%',
      //     containLabel: true
      //   },
      //   xAxis: [{
      //     type: 'category',
      //     boundaryGap: false,
      //     data: dataX
      //   }],
      //   yAxis: [{
      //     minInterval: 1,
      //     type: 'value'
      //   }],
      //   series: [{
      //     name: '微信自主注册',
      //     type: 'line',
      //     stack: '总量',
      //     areaStyle: {
      //       normal: {}
      //     },
      //     data: arr4
      //   },
      //   {
      //     name: 'PC自主注册',
      //     type: 'line',
      //     stack: '总量',
      //     areaStyle: {
      //       normal: {}
      //     },
      //     data: arr11
      //   },
      //   {
      //     name: '媒体推广',
      //     type: 'line',
      //     stack: '总量',
      //     areaStyle: {
      //       normal: {}
      //     },
      //     data: arr5
      //   },
      //   {
      //     name: 'APP推广',
      //     type: 'line',
      //     stack: '总量',
      //     areaStyle: {
      //       normal: {}
      //     },
      //     data: arr7
      //   }
      //   ]
      // }
      // chartB.setOption(option2)
    }
  }
}
</script>

<style scoped lang="scss">
  .table-box {
    margin-top: 40px;
  }
</style>
