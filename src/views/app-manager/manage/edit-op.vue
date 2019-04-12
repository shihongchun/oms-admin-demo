<template>
  <div class="table">
    <el-table
      :data="users"
      style="width: 100%">
      <el-table-column
        label="用户名"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>用户名: {{ scope.row.account }}</p>
            <p>类别: {{ options[scope.row.type-1].label }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.account }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑管理人员信息" :visible.sync="dialogFormVisible">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'edit-op',
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
      users: [],
      dialogFormVisible: false,
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
  mounted () {
    this.getUSer()
    console.log(JSON.stringify(this.$store.state) + 'ads')
  },
  methods: {
    getUSer () {
      this.http.post(this.ports.user).then(res => {
        console.log(res)
        this.users = res.data.data
      })
    },
    handleEdit (row) {
      this.dialogFormVisible = true
      this.ruleForm2.account = row.account
      this.ruleForm2.type = row.type
      this.ruleForm2.id = row.id
    },
    handleDelete (row) {
      this.http.get(this.ports.delUser, {
        'id': row.id
      }).then(res => {
        console.log(res)
        this.getUSer()
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm2.account)
          this.http.post(this.ports.editUser, {
            'account': this.ruleForm2.account,
            'password': this.ruleForm2.pass,
            'type': this.ruleForm2.type,
            'id': this.ruleForm2.id
          }).then(res => {
            console.log(res)
            if (res.data.status) {
              this.dialogFormVisible = false
              this.getUSer()
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

<style scoped>

</style>
