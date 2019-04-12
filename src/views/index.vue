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
      chartData: {
        'attestationIncremental': [2, 5, 5, 1, 0, 12, 4, 6, 3, 3, 6, 1, 0, 1, 1, 4, 0, 1, 4, 3, 1, 1, 1, 0, 0, 1, 5040, 4, 1, 0],
        'intentionIncremental': [5, 3, 1, 1, 0, 30, 6, 11, 4, 3, 1, 1, 4, 1, 0, 5, 0, 1, 0, 1, 3, 2, 1, 1, 1, 1, 4, 12, 16, 3],
        'autonymIncremental': [6, 4, 5, 4, 2, 38, 12, 23, 9, 3, 1, 0, 1, 0, 0, 12, 3, 0, 2, 0, 4, 0, 1, 2, 3, 1, 145, 13, 18, 0],
        'timeAxis': ['04-05', '04-04', '04-03', '04-02', '04-01', '03-31', '03-30', '03-29', '03-28', '03-27', '03-26', '03-25', '03-24', '03-23', '03-22', '03-21', '03-20', '03-19', '03-18', '03-17', '03-16', '03-15', '03-14', '03-13', '03-12', '03-11', '03-10', '03-09', '03-08', '03-07'],
        'baseIncremental': [6, 5, 3, 3, 3, 16, 9, 10, 8, 19, 1, 1, 0, 0, 0, 1, 1, 3, 0, 1, 2, 0, 2, 0, 2, 0, 0, 14, 3, 0]
      }
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = echarts.init(document.getElementById('chart_a'))
      let chartA = echarts.init(document.getElementById('chart'))
      var linshiData4 = this.chartData.baseIncremental
      var linshiData3 = this.chartData.intentionIncremental
      var linshiData2 = this.chartData.autonymIncremental
      var linshiData1 = this.chartData.attestationIncremental
      // 绘制图表
      myChart.setOption({
        title: {
          text: '近30天增量变化',
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
          data: ['认证车主', '实名车主', '意向车主', '基础会员']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9',
            'D10', 'D11', 'D12', 'D13', 'D14', 'D15', 'D16', 'D17',
            'D18', 'D19', 'D20', 'D21', 'D22', 'D23', 'D24', 'D25',
            'D26', 'D27', 'D28', 'D29', '昨日']
        }],
        yAxis: [{
          type: 'value',
          minInterval: 1
        }],
        series: [
          {
            name: '认证车主',
            type: 'bar',
            barGap: '10%',
            data: linshiData1
          },
          {
            name: '实名车主',
            type: 'bar',
            barGap: '10%',
            stack: '非认证',
            data: linshiData2
          },
          {
            name: '意向车主',
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
      chartA.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['认证车主', '实名车主', '意向车主', '基础会员']
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
              {value: 11712, name: '认证车主'},
              {value: 18110, name: '实名车主'},
              {value: 22201, name: '意向车主'},
              {value: 57981, name: '基础会员'}
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
