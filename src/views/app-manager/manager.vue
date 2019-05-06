<template>
  <div style="margin: 40px 30px 0;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="会员姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formInline.tel" placeholder="会员手机号"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="formInline.sex" placeholder="会员性别">
          <el-option label="无" value=""></el-option>
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="会员类型">
        <el-select v-model="formInline.type" placeholder="会员类型">
          <el-option label="无" value=""></el-option>
          <template v-for="(item,index) in memberType" >
            <el-option :label="item" :value="item" :key="index"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getMember(1)">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="members"
      height="460"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="tel"
        label="手机号"
      >
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="type"
        label="会员类别"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="date"
        label="注册时间"
        width="160"
      >
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="car_type"-->
        <!--label="车辆类别"-->
        <!--width="160"-->
      <!--&gt;-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="car_brand"-->
        <!--label="车辆品牌"-->
        <!--width="160"-->
      <!--&gt;-->
      <!--</el-table-column>-->
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="source"
        label="来源">
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="pageChange"
      layout="prev, pager, next"
      :total="page">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'manager',
  created () {
    this.getMember(1)
  },
  data () {
    return {
      // carTypeData: ['认证车主', '实名车主', '意向车主', '基础会员'],
      // carBrandData: ['小型车', 'SUV', '大型车', '跑车'],
      page: 0,
      memberType: ['认证会员', '实名会员', '意向会员', '基础会员'],
      formInline: {
        name: '',
        tel: '',
        sex: '',
        type: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        tel: '17712345678',
        sex: '男',
        age: 18,
        type: '认证车主',
        // carType: '小型车',
        // carBrand: 1,
        source: 'pc端',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        tel: '17712345678',
        sex: '男',
        age: 18,
        type: '认证车主',
        // carType: '小型车',
        // carBrand: 1,
        source: '微信公众号',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        tel: '17712345678',
        sex: '男',
        age: 18,
        type: '实名车主',
        // carType: '小型车',
        // carBrand: 1,
        source: 'pc端',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        tel: '17712345678',
        sex: '男',
        age: 18,
        type: '实名车主',
        // carType: '小型车',
        // carBrand: 1,
        source: 'pc端',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        tel: '17712345678',
        sex: '男',
        age: 18,
        type: '实名车主',
        // carType: '小型车',
        // carBrand: 1,
        source: 'pc端',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        tel: '17712345678',
        sex: '男',
        age: 18,
        type: '实名车主',
        // carType: '小型车',
        // carBrand: 1,
        source: 'pc端',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        tel: '17712345678',
        sex: '男',
        age: 18,
        type: '实名车主',
        // carType: '小型车',
        // carBrand: 1,
        source: '微信公众号',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      members: []
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    pageChange (e) {
      this.getMember(e)
      console.log(e)
    },
    getMember (num) {
      this.http.post(this.ports.getMember, {
        name: this.formInline.name,
        tel: this.formInline.tel,
        sex: this.formInline.sex,
        type: this.formInline.type,
        page: num
      }).then(res => {
        console.log(res)
        this.members = res.data.data
        this.page = res.data.page
      })
    }
  }
}
</script>

<style scoped>

</style>
