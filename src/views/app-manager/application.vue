<template>
<div class="box">
  <chart-two/>
</div>
</template>

<script>
import chartTwo from './charts/chart-two'
export default {
  name: 'application',
  components: {
    // 'component-a': componentA
    'chart-two': chartTwo
  }
}
</script>

<style scoped lang="scss">
  .box {
    height: calc(100vh - 80px);
    overflow-y: scroll;
  }
</style>
