<template>
  <el-row class="table-box">
    <el-col :span="12" id="chart" style="height: 400px;">
    </el-col>
    <el-col :span="12" id="chart_a" style="height: 400px;">
    </el-col>
  </el-row>
</template>

<script>
// 引入基本模板
let echarts = require('echarts')

export default {
  name: 'index',
  data () {
    return {
      countMember: {
        '认证会员': 0,
        '实名会员': 0,
        '意向会员': 0,
        '基础会员': 0
      },
      chartData: {
        // 'attestationIncremental': [2, 5, 5, 1, 0, 12, 4],
        // 'intentionIncremental': [5, 3, 1, 1, 0, 30, 6],
        // 'autonymIncremental': [6, 4, 5, 4, 2, 38, 12],
        // 'baseIncremental': [6, 5, 3, 3, 3, 16, 0]
        '意向会员': [],
        '实名会员': [],
        '认证会员': [],
        '基础会员': []
      }
    }
  },
  created () {
  },
  mounted () {
    this.http.get(this.ports.getMemberCount).then((res) => {
      if (res.data.status) {
        for (let it in this.countMember) {
          res.data.data.forEach((item) => {
            if (item.type === it) { this.countMember[it] = item.count }
          })
        }
        console.log('this.countMember:' + JSON.stringify(this.countMember))
        this.drawLineB()
      }
    })
    this.http.get(this.ports.getReacent).then((res) => {
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
              newData[newDate][item.type] = item.count
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
        this.drawLineA()
      }
    })
  },
  methods: {
    moment (newDate) {
      let date = newDate.getFullYear().toString() + (newDate.getMonth() + 1 < 10 ? ('0' + (newDate.getMonth() + 1).toString()) : newDate.getMonth()).toString() + (newDate.getDate() < 10 ? ('0' + (newDate.getDate()).toString()) : newDate.getDate().toString())
      // let date = newDate.getFullYear().toString() + (newDate.getMonth() + 1 < 10 ? ('0' + (newDate.getMonth() + 1).toString()) : newDate.getMonth()).toString() + (newDate.getDate()).toString()
      return date
    },
    drawLineA () {
      let myChart = echarts.init(document.getElementById('chart_a'))
      var linshiData4 = this.chartData['基础会员']
      var linshiData3 = this.chartData['意向会员']
      var linshiData2 = this.chartData['实名会员']
      var linshiData1 = this.chartData['认证会员']
      // 绘制图表
      myChart.setOption({
        title: {
          text: '近7天增量变化',
          left: 70
        },
        color: ['#fc8675', '#4acacb', '#5ab6df', '#6a8abe'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          right: 50,
          data: ['认证会员', '实名会员', '意向会员', '基础会员']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7']
        }],
        yAxis: [{
          type: 'value',
          minInterval: 1
        }],
        series: [
          {
            name: '认证会员',
            type: 'bar',
            barGap: '10%',
            data: linshiData1
          },
          {
            name: '实名会员',
            type: 'bar',
            barGap: '10%',
            stack: '非认证',
            data: linshiData2
          },
          {
            name: '意向会员',
            type: 'bar',
            barGap: '10%',
            stack: '非认证',
            data: linshiData3
          },
          {
            name: '基础会员',
            type: 'bar',
            barGap: '10%',
            stack: '非认证',
            data: linshiData4
          }]
      })
    },
    drawLineB () {
      let chartA = echarts.init(document.getElementById('chart'))
      chartA.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['认证会员', '实名会员', '意向会员', '基础会员']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: this.countMember['认证会员'], name: '认证会员'},
              {value: this.countMember['实名会员'], name: '实名会员'},
              {value: this.countMember['意向会员'], name: '意向会员'},
              {value: this.countMember['基础会员'], name: '基础会员'}
            ]
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .table-box {
    margin-top: 40px;
  }
</style>
