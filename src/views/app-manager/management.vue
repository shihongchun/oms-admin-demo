<template>
<div class="container">
  <div class="title">
    <h3>运营管理平台管理员列表</h3>
  </div>
  <div class="banel">
    <transition name="fade"
                      mode="out-in">
    <router-view></router-view>
  </transition>
  </div>
</div>
</template>

<script>
export default {
  name: 'management',
  data () {
    return {
      users: []
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  margin: 5px;
  background-color: #fff;
  .title {
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
  }
  .banel {
    margin: 10px 20px;
    padding: 10px;
  }
}
</style>
