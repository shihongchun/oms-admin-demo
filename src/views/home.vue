<template>
  <el-row  class="tac">
    <el-col :span="4"  class="tac menu-bg">
        <div class="label">
            <span class="t-label">运营管理平台</span>
        </div>
      <el-menu
        default-active="index"
        class="el-menu-vertical-demo"
        mode="vertical"
        :router=true
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span>会员统计</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="index">会员统计</el-menu-item>
            <el-menu-item index="application">会员来源</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">会员构成</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">会员行为</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">话题管理</span>
        </el-menu-item>
        <el-menu-item index="management">
          <i class="el-icon-rank"></i>
          <span slot="title">权限管理</span>
        </el-menu-item>
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
    }
  },
  components: {
    Header
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
