<template>
  <div>
    <div>{{a}}</div>
    <button @click="handle">+1</button>
  </div>
</template>

<script>
import bus from './bus'
export default {
  name: 'test-bus',
  data () {
    return {
      a: 0
    }
  },
  methods: {
    handle () {
      this.a++
      bus.$emit('increment', this.a)
    }
  }
}
</script>

<style scoped>

</style>
