<template>
  <div class="series">
    <Mainbar v-bind:class="{ static: isFloated }"></Mainbar>
    <div class="row">
      <div class="innerStart">
        <h1 class="tac fwn upper"><b>The</b> series</h1>
        <p class="tac">Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultrconsectetur.Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultrconsectetur.</p>
      </div>
      <div class="seriesshow">
        <div class="encapsule" v-for="(serie, index) in series">
          <div class="serie" v-bind:style="{ background: pdata }">
            <div class="text_Serie">
              <div class="fixw">
                <h1>{{ serie.name }}</h1>
                <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultrconsectetur. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
                <h3>COMING SPRING 2017</h3>
              </div>
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
        image: 'Worldofdressage.jpg'
      },
      {
        name: 'Brett kidding',
        image: 'Brettkidding.jpg'
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
 .static{
   position: relative !important;
 }
 .innerStart{
   margin: 150px 0 100px 0;
   p{
     max-width:900px;
     margin: 0 auto;
   }
 }
 .serie{
   border: 1px solid #555555;
   text-align: center;
   position: relative;
   min-height: 700px;
   margin: 20px 0;
   background-image: url(../assets/Worldofdressage.jpg);
   -webkit-box-shadow: inset 0px -100px 250px 50px rgba(0,0,0,1);
   -moz-box-shadow: inset 0px 0px 250px 50px rgba(0,0,0,1);
   box-shadow: inset 0px -80px 400px 100px rgba(0,0,0,1);
   .text_Serie{
     position: absolute;
     bottom: 50px;
     width: 100%;
     margin: 0 auto;
   }
   .fixw{
     margin: 0 auto;
     width: 70%;
     text-align: center;
   }
   h1{
     font-weight: 300;
     text-transform: uppercase;
   }
   h3{
     opacity: 0.4;
   }
 }
</style>
