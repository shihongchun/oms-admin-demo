<template>
  <el-row>
    <el-col class="header">
      <el-dropdown trigger="click" class="user-box" @command="handleCommand">
      <span class="el-dropdown-link">
        {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="quit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      userName: '小明'
    }
  },
  mounted () {
    const userName = JSON.parse(localStorage.getItem('user')).account
    this.userName = userName
  },
  methods: {
    quit () {
      localStorage.removeItem('user')
      this.$router.push({path: '/login'})
    },
    handleCommand (command) {
      switch (command) {
        case 'quit': this.quit(); break
      }
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  height: 80px;
  background-color: #D4D4D5;
  .user-box {
    float: right;
    padding: 0 20px;
    line-height: 80px;
    margin-right: 40px;
    font-size: 20px;
    color: #000;
    text-align: center;
    &:hover {
      background-color: #545c64;
      color: #fff;
    }
  }
}
</style>
