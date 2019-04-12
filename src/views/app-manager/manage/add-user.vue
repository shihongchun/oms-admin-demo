<template>
  <div class="form-box">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm2.account" class="small"></el-input>
      </el-form-item>
      <el-form-item label="管理员类别" prop="type">
        <el-select v-model="ruleForm2.type" placeholder="请选择" class="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" class="small"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off" class="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  name: 'add-user',
  data () {
    const checkAccount = (rule, value, callback) => {
      if (value.length > 16) {
        callback(new Error('账号长度超出'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      options: [
        {
          value: 1,
          label: '超级管理员'
        },
        {
          value: 2,
          label: '管理员'
        },
        {
          value: 3,
          label: '运营人员'
        }
      ],
      ruleForm2: {
        account: '',
        pass: '',
        checkPass: '',
        type: 3
      },
      rules2: {
        account: [
          { validator: checkAccount, trigger: 'blur' },
          { required: true, trigger: 'blur' }
        ],
        type: [
          { required: true, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' },
          { required: true, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
          { required: true, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.http.post(this.ports.addUser, {
            'account': this.ruleForm2.account,
            'password': this.ruleForm2.pass,
            'type': this.ruleForm2.type
          }).then(res => {
            console.log(res)
            if (res.data.status) {
              this.$router.push('/management/editOp')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped lang="scss">
.form-box {
  margin-top: 30px;
  .small {
    width: 400px;
  }
}
</style>
