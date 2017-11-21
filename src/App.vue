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
      errors: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData: async (e) => {
      const vm = this
      vm.users = []
      try {
        const response = await axios.get(`http://localhost:5000/data/call`)
        this.info = response.data
        console.log(this.info)
      } catch (e) {
        this.errors.push(e)
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
