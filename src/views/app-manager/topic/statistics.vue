<template>
<div>
  <h2 style="margin: 20px">活动统计情况如下</h2>
  <el-table
    :data="table"
    border
    style="width: 1100px;margin: 20px">
    <el-table-column
      fixed
      prop="date"
      label="创建日期"
      width="200">
    </el-table-column>
    <el-table-column
      prop="activity_name"
      label="活动名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="max_number"
      label="最大人数"
      width="120">
    </el-table-column>
    <el-table-column
      prop="activity_kind"
      label="活动类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="activity_des"
      label="活动描述"
      width="300">
    </el-table-column>
    <el-table-column
        prop="activity_type"
        label="开启状态"
        width="100"
    >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.activity_type === 1 ? 'primary' : 'success'"
            close-transition>{{scope.row.activity_type? '是':'否'}}</el-tag>
        </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
export default {
  name: 'statistics',
  mounted () {
    this.getActivity()
  },
  methods: {
    handleClick (row) {
      console.log(row.activity_id)
    },
    getActivity () {
      this.http.get(this.ports.getActivity).then((res) => {
        if (res.data.status) {
          this.table = res.data.data
        }
      })
    }
  },
  data () {
    return {
      table: [{'activity_name': '猜猜看',
        'issuer_id': 1,
        'max_number': 100,
        'activity_range': '意向会员，认证会员',
        'activity_kind': '线下活动',
        'activity_des': '好玩的猜谜活动',
        'activity_type': 1,
        'activity_id': 1,
        'date': '2019-04-10 02:04:16'}],
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  }
}
</script>

<style scoped>

</style>
