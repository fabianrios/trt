<template>
  <div class="series">
    <Mainbar v-bind:class="{ static: isFloated }"></Mainbar>
    <div class="row">
      <div class="innerStart">
        <h1 class="tac fwn upper"><b>The</b> series</h1>
        <p class="tac">Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultrconsectetur.Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultrconsectetur.</p>
      </div>
      <div class="seriesshow">
        <div class="serie" v-for="serie in $parent.series" v-bind:style="{ 'background-image': `url(${serie.image})` }" v-bind:key="serie.id">
          <router-link :to="'/serie/'+serie.id">
          <div class="text_Serie">
            <div class="fixw">
              <h1>{{ serie.name }}</h1>
              <p>{{ serie.text }}</p>
              <h3>COMING SPRING 2017</h3>
            </div>
          </div>
          </router-link>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

import Icon from 'vue-awesome/components/Icon'
import Footer from '@/components/Footer'
import Mainbar from '@/components/Mainbar'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'social',
      isFloated: true
    }
  },
  method () {
  },
  components: {
    Icon,
    Footer,
    Mainbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
