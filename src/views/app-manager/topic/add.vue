<template>
  <el-form ref="form" :model="form" label-width="80px" class="form">
    <el-form-item label="活动名称">
      <el-input v-model="form.topic"></el-input>
    </el-form-item>
    <el-form-item label="发布人">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="人数上限">
      <el-input v-model="form.number"></el-input>
    </el-form-item>
    <el-form-item label="活动范围">
      <el-select v-model="form.range" multiple placeholder="请选择">
        <el-option
          v-for="item in carTypeData"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="活动性质">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
        <el-checkbox label="地推活动" name="type"></el-checkbox>
        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="特殊资源">
      <el-radio-group v-model="form.resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动形式">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'add',
  data () {
    return {
      carTypeData: ['认证车主', '实名车主', '意向车主', '基础会员'],
      form: {
        topic: '',
        number: '',
        range: [],
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
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
