<template>
  <div class="series">
    <Mainbar v-bind:class="{ static: isFloated }"></Mainbar>
    <div class="row">
      <div class="innerStart">
        <h1 class="tac fwn upper"><b>The</b> series</h1>
        <p class="tac">Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultrconsectetur.Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultrconsectetur.</p>
      </div>
      <div class="seriesshow">
        <div class="serie" v-for="serie in series" v-bind:style="{ 'background-image': `url(${serie.image})` }">
          <div class="text_Serie">
            <div class="fixw">
              <h1>{{ serie.name }}</h1>
              <p>{{ serie.text }}</p>
              <h3>COMING SPRING 2017</h3>
            </div>
          </div>
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
      isFloated: true,
      series: [{
        name: 'World of dressage',
        image: 'https://res.cloudinary.com/trt-tv/image/upload/v1511523784/assets/Worldofdressage.jpg',
        text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultrconsectetur. Maecenas sed diam eget risus varius blandit sit amet non magna.'
      },
      {
        name: 'Brett kidding',
        image: 'https://res.cloudinary.com/trt-tv/image/upload/v1511523784/assets/Brettkidding.jpg',
        text: 'Parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultrconsectetur. Maecenas sed diam eget risus varius blandit sit amet non magna. lorem'
      }
      ]
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
