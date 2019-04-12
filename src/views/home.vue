<template>
  <el-row  class="tac">
    <el-col :span="4"  class="tac menu-bg">
        <div class="label">
            <span class="t-label">运营管理平台</span>
        </div>
      <el-menu
        class="el-menu-vertical-demo"
        mode="vertical"
        :unique-opened=true
        :router=true
        :default-active="activeNav"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span slot="title">会员统计</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="index" route="/index">会员统计</el-menu-item>
            <el-menu-item index="application" route="/application">会员来源</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="behavior" route="/behavior">
          <i class="el-icon-document"></i>
          <span slot="title">会员行为</span>
        </el-menu-item>
        <el-menu-item index="manager" route="/manager">
          <i class="el-icon-document"></i>
          <span slot="title">会员管理</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">活动管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="addTopic" route="/addTopic">活动添加</el-menu-item>
            <el-menu-item index="statistics" route="/Statistics">活动统计</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-rank"></i>
            <span slot="title">权限管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="management/editOP" route="/management/editOP">修改管理员</el-menu-item>
            <el-menu-item index="management/addUser" route="/management/addUser">添加管理员</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="20" class="main">
      <Header />
      <transition name="fade"
                  mode="out-in">
        <router-view></router-view>
      </transition>
    </el-col>
  </el-row>
</template>

<script>
import Header from './content/header'
export default {
  name: 'home',
  data () {
    return {
      activeNav: 'index'
    }
  },
  components: {
    Header
  },
  mounted () {
    console.log(window.location.href.split('8080/')[1])
    this.activeNav = window.location.href.split('8080/')[1]
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang="scss">

  .el-menu{
    border-right-width: 0;
    .el-submenu .el-menu-item {
      min-width: 190px;
    }
  }
.tac {
  height: 100%;
}
.menu-bg {
  background-color: #545c64;
}
.label {
  font-size: 30px;
  color: #fff;
  height: 80px;
  line-height: 80px;
  background-color: #545c64;
  .t-label {
    padding-left: 40px;
  }
}
.main {
  background-color: rgb(239, 240, 244);
}
</style>
