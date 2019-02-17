<template>
  <el-container>
    <el-row class="center_box">
      <el-col class="num">404</el-col>
      <el-col class="text">页面失踪了0.0</el-col>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: '404'
}
</script>

<style lang="scss" scoped>
.center_box {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  .num {
    font-size: 50px;
    color: mediumspringgreen;
    text-align: center;
  }
  .text {
    font-size: 36px;
    color: grey;
    margin-top: 10px;
    text-align: center;
  }
}
</style>
