<template>
<el-row>
  <el-col :span="12" id="chart" style="height: 400px;">
  </el-col>
  <el-col :span="12" id="chart_a" style="height: 400px;">
  </el-col>
</el-row>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'index',
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = echarts.init(document.getElementById('chart'))
      let chartA = echarts.init(document.getElementById('chart_a'))
      console.log(this.$refs.chart)
      // 绘制图表
      myChart.setOption({
        title: { text: 'ECharts 入门示例' },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
      chartA.setOption({
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data: [
              {value: 235, name: '视频广告'},
              {value: 274, name: '联盟广告'},
              {value: 310, name: '邮件营销'},
              {value: 335, name: '直接访问'},
              {value: 400, name: '搜索引擎'}
            ]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
