<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      info: [],
      errors: [],
      root: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000',
      este: 'este'
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData: async function fetchData (e) {
      const vm = this
      const url = `${vm.root}/api/call`
      try {
        const response = await axios.get(url)
        vm.info = response.data
        console.log(vm.info)
      } catch (e) {
        vm.errors.push(e)
      }
    }
  }
}
</script>

<style lang="css">
@import "https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,700";
</style>

<style lang="scss">
@import "./styles/style.scss";
</style>
