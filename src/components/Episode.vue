<template>
  <div class="episode">
    <Mainbar v-bind:class="{ static: isFloated }"></Mainbar>
    <div class="row">
      <h1 class="upper tac">{{episode.name}}</h1>
      <div class="video">
        <video :src="episode.video" crossorigin="anonymous" controls="true" controlsList="nodownload"></video>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

import Footer from '@/components/Footer'
import Mainbar from '@/components/Mainbar'
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'social',
      isFloated: true,
      episode: {}
    }
  },
  created () {
    this.getEpisode()
  },
  methods: {
    getEpisode: async function getEpisode () {
      const vm = this
      const url = `${vm.$parent.root}/episode/${vm.$route.params.id}`
      try {
        const response = await axios.get(url)
        vm.episode = response.data
      } catch (e) {
        console.log('e', e.response.data)
        vm.errors.push(e)
      }
    }
  },
  components: {
    Footer,
    Mainbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.video{
  margin: 0 auto;
  text-align: center;
  video{
    width: 100%;
  }
}
</style>
