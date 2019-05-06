<template>
  <el-form :model="form" ref="formName" label-width="80px" class="form">
    <el-form-item label="活动名称" :rules="{ required: true, message: '活动名称不能为空'}">
      <el-input v-model="form.activity_name"></el-input>
    </el-form-item>
    <el-form-item label="发布人" :rules="{ required: true, message: '发布人不能为空'}">
      <el-input v-model="form.issuer_name"></el-input>
    </el-form-item>
    <el-form-item label="人数上限" :rules="{ required: true, message: '人数上限不能为空'}">
      <el-input v-model="form.max_number" type="number"></el-input>
    </el-form-item>
    <el-form-item label="活动范围" :rules="{ required: true, message: '活动范围不能为空'}">
      <el-select v-model="form.activity_range" multiple placeholder="请选择">
        <el-option
          v-for="item in carTypeData"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动时间" :rules="{ required: true, message: '活动时间不能为空'}">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
    </el-form-item>
    <el-form-item label="活动性质" :rules="{ required: true, message: '活动性质不能为空'}">
      <el-select v-model="form.activity_kind" placeholder="请选择">
        <el-option
          v-for="item in ['线下活动','线上活动']"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动描述" :rules="{ required: true, message: '活动描述不能为空'}">
      <el-input type="textarea" v-model="form.activity_des"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import moment from 'moment'
export default {
  name: 'add',
  data () {
    return {
      carTypeData: ['认证会员', '实名会员', '意向会员', '基础会员'],
      form: {
        activity_name: '',
        issuer_name: '',
        max_number: '',
        activity_range: [],
        date: '',
        activity_kind: '',
        activity_des: ''
      },
      aForm: {
        activity_name: '',
        issuer_name: '',
        max_number: '',
        activity_range: [],
        date: '',
        activity_kind: '',
        activity_des: ''
      }
    }
  },
  methods: {
    onSubmit () {
      const t = this
      this.$refs['formName'].validate((valid) => {
        if (valid) {
          this.http.post(this.ports.addActivity, {
            'activity_name': t.form.activity_name,
            'issuer_name': t.form.issuer_name,
            'max_number': Number(t.form.max_number),
            'activity_range': t.form.activity_range.join(','),
            'activity_date': moment(t.form.date).format('YYYY-MM-DD HH:mm:ss'),
            'activity_kind': t.form.activity_kind,
            'activity_des': t.form.activity_des
          }).then(res => {
            if (res.data.status) {
              this.$message({
                message: '恭喜你，添加成功',
                type: 'success'
              })
              t.form = t.aForm
              t.$router.push('/statistics')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .form {
    width: 600px;
    margin-top: 20px;
    margin-left: 30px;
    overflow-y: scroll;
  }
</style>
