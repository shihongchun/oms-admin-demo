<template>
  <div>
    <el-row>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="clickTemp"
          label="点击度"
          width="180">
        </el-table-column>
        <el-table-column
          prop="research"
          label="调研"
          width="180">
        </el-table-column>
        <el-table-column
          prop="vote"
          label="投票">
        </el-table-column>
        <el-table-column
          prop="lottery"
          label="抽奖">
        </el-table-column>
        <el-table-column
          prop="classroom"
          label="Karl课堂">
        </el-table-column>
        <el-table-column
          prop="pk"
          label="PK赛">
        </el-table-column>
        <el-table-column
          prop="guess"
          label="猜猜看">
        </el-table-column>
        <el-table-column
          prop="collect"
          label="集车标">
        </el-table-column>
        <el-table-column
          prop="evaluation"
          label="我车我评">
        </el-table-column>
        <el-table-column
          prop="race"
          label="任务赛道">
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="table-box">
      <el-col :span="24" id="chart_a" style="height: 400px;">
      </el-col>
    </el-row>
  </div>
</template>

<script>
let echarts = require('echarts')
export default {
  name: 'behavior',
  data () {
    return {
      tableData: [
        {
          clickTemp: '微信端',
          research: '25%',
          vote: '10%',
          lottery: '14%',
          classroom: '4%',
          pk: '7%',
          guess: '23%',
          collect: '0%',
          evaluation: '10%',
          race: '7%'
        },
        {
          clickTemp: 'PC端',
          research: '95%',
          vote: '1%',
          lottery: '1%',
          classroom: '0%',
          pk: '2%',
          guess: '1%',
          collect: '0%',
          evaluation: '0%',
          race: '0%'
        }
      ],
      sevenList: {
        'saiDaoSevenDayList': [1, 1, 1, 0, 0, 0, 0],
        'karlClassSevenDayList': [225, 255, 295, 260, 256, 242, 249],
        'pKGameSevenDayList': [268, 295, 334, 280, 268, 267, 267],
        'researchSevenDayList': [519, 673, 1629, 820, 514, 523, 505],
        'sevenDayList': [{'day': 'D05'}, {'day': 'D04'}, {'day': 'D03'}, {'day': 'D02'}, {'day': 'M04/D01'}, {'day': 'D31'}, {'day': 'D30'}],
        'lottoSevenDayList': [469, 539, 586, 448, 484, 444, 518],
        'guessGameSevenDayList': [572, 644, 696, 597, 543, 539, 503],
        'pinCheSevenDayList': [235, 258, 348, 254, 230, 222, 253],
        'setCarMarkSevenDayList': [0, 3, 8, 0, 2, 1, 0],
        'voteSevenDayList': [272, 303, 361, 277, 278, 262, 269]
      }
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let chartA = echarts.init(document.getElementById('chart_a'))
      var length = 7

      // 初始化数组
      var sevenDayArray = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', '昨日']
      var pKGameSevenDayArray = new Array(length)
      var guessGameSevenDayArray = new Array(length)
      var setCarMarkSevenDayArray = new Array(length)
      var karlClassSevenDayArray = new Array(length)
      var lottoSevenDayArray = new Array(length)
      var voteSevenDayArray = new Array(length)
      var researchSevenDayArray = new Array(length)
      var saiDaoSevenDayArray = new Array(length)
      var pinCheSevenDayArray = new Array(length)

      // 取得data中返回的值
      var pKGameSevenDayList = this.sevenList.pKGameSevenDayList
      var guessGameSevenDayList = this.sevenList.guessGameSevenDayList
      var setCarMarkSevenDayList = this.sevenList.setCarMarkSevenDayList
      var karlClassSevenDayList = this.sevenList.karlClassSevenDayList
      var lottoSevenDayList = this.sevenList.lottoSevenDayList
      var voteSevenDayList = this.sevenList.voteSevenDayList
      var researchSevenDayList = this.sevenList.researchSevenDayList
      var saiDaoSevenDayList = this.sevenList.saiDaoSevenDayList
      var pinCheSevenDayList = this.sevenList.pinCheSevenDayList
      for (var i = 0; i < length; i++) {
        pKGameSevenDayArray[i] = pKGameSevenDayList[length - 1 - i]

        guessGameSevenDayArray[i] = guessGameSevenDayList[length - 1 - i]

        setCarMarkSevenDayArray[i] = setCarMarkSevenDayList[length - 1 - i]

        karlClassSevenDayArray[i] = karlClassSevenDayList[length - 1 - i]

        lottoSevenDayArray[i] = lottoSevenDayList[length - 1 - i]

        voteSevenDayArray[i] = voteSevenDayList[length - 1 - i]

        researchSevenDayArray[i] = researchSevenDayList[length - 1 - i]

        saiDaoSevenDayArray[i] = saiDaoSevenDayList[length - 1 - i]

        pinCheSevenDayArray[i] = pinCheSevenDayList[length - 1 - i]
      }
      chartA.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['PK赛', '猜猜看', '集车标', 'Karl课堂', '抽奖', '投票', '调研', '任务赛道', '我车我评']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: sevenDayArray
        }],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [{
          name: 'PK赛',
          type: 'bar',
          data: pKGameSevenDayArray
        },
        {
          name: '猜猜看',
          type: 'bar',
          data: guessGameSevenDayArray
        },
        {
          name: '集车标',
          type: 'bar',
          data: setCarMarkSevenDayArray
        },
        {
          name: 'Karl课堂',
          type: 'bar',
          data: karlClassSevenDayArray
        },
        {
          name: '抽奖',
          type: 'bar',
          data: lottoSevenDayArray
        },
        {
          name: '投票',
          type: 'bar',
          data: voteSevenDayArray
        },
        {
          name: '调研',
          type: 'bar',
          data: researchSevenDayArray
        },
        {
          name: '任务赛道',
          type: 'bar',
          data: saiDaoSevenDayArray
        },
        {
          name: '我车我评',
          type: 'bar',
          data: pinCheSevenDayArray
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
