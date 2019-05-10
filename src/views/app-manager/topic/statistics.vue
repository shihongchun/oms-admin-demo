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
  <el-dialog title="编辑活动" :visible.sync="dialogFormVisible">
    <el-form :model="form" status-icon  ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称">
        <el-input :value="form.activity_name" class="small" disabled></el-input>
      </el-form-item>
      <el-form-item label="活动开启状态">
        <el-switch
          v-model="form.activity_type"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value='1'
          inactive-value='0'>
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </div>
  </el-dialog>
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
      this.dialogFormVisible = true
      this.form = row
      console.log(row)
    },
    getActivity () {
      this.http.get(this.ports.getActivity).then((res) => {
        if (res.data.status) {
          this.table = res.data.data
        }
      })
    },
    submitForm () {
      console.log(typeof this.form.activity_type)
      this.dialogFormVisible = false
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      form: {},
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
