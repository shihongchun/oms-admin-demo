<template>
  <el-container>
    <el-form class="login_container">
      <h3 class="title">系统登录</h3>
      <el-form-item>
        <el-input type="text" placeholder="账号" required v-model="formAccount.account"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" @keydown.enter.native="submit" v-model="formAccount.password" placeholder="密码" required></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
      <el-form-item class="subBox">
        <el-button type="primary" @click="submit" class="submit">登录</el-button>
      </el-form-item>
    </el-form>
    <el-alert
      v-if="userErr"
      :title="errMessage"
      type="error"
      center
      show-icon>
    </el-alert>
  </el-container>
</template>

<script>
import util from '../util/util'
import doCookie from '../util/cookie'
export default {
  name: 'login',
  data () {
    return {
      checked: true,
      userErr: false,
      errMessage: '',
      formAccount: {
        account: '',
        password: ''
      }
    }
  },
  mounted () {
    // 本地缓存法
    // let user = util.getLocalStorage('user')
    // let checked = util.getLocalStorage('checked')
    // if (user && checked) {
    //   this.formAccount = JSON.parse(user)
    // }
    if (doCookie.getCookie('name') !== -1) {
      this.formAccount.account = doCookie.getCookie('name')
      this.formAccount.password = doCookie.getCookie('password')
    }
  },
  methods: {
    submit () {
      this.userErr = false
      if (!this.formAccount.account) {
        this.userErr = true
        this.errMessage = '请输入用户名'
      } else if (!this.formAccount.password) {
        this.userErr = true
        this.errMessage = '请输入密码'
      } else {
        this.http.post(this.ports.login, {
          'account': this.formAccount.account,
          'password': this.formAccount.password
        }).then(res => {
          if (res.data.status === 1) {
            // 本地缓存法
            // util.removeLocalStorage('checked')
            // if (this.checked) {
            //   util.setLocalStorage({'checked': true})
            // } else {
            //   util.setLocalStorage({'checked': false})
            // }
            // util.setLocalStorage({user: this.formAccount})
            // this.$router.push({path: '/index'})

            if (this.checked) {
              doCookie.setCookie('account', this.formAccount.account, 7)
              doCookie.setCookie('password', this.formAccount.password, 7)
            }
            this.$store.commit('addAccount', this.formAccount)
            util.setLocalStorage({user: this.formAccount})
            this.$router.push({path: '/index'})
          } else if (res.data.status === -1) {
            this.userErr = true
            this.errMessage = '没有该用户'
          } else if (res.data.status === 0) {
            this.userErr = true
            this.errMessage = '密码错误'
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
el-container {
  position: relative;
}
.login_container {
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius:8px;
  box-shadow: 0 0 25px #cac6c6;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: left;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
  .subBox {
    width: 100%;
    text-align: center;
    .submit {
     width: 280px;
   }
  }
}
</style>
