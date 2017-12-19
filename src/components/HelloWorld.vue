<template>
  <div class="hello">
    <mainbar></mainbar>
    
    <div class="main_series" v-bind:style="{ 'background-image': `url(${$parent.mainseries.image})` }">
      <router-link :to="'/serie/'+$parent.mainseries.id" class="play big"></router-link>
      <h1>{{$parent.mainseries.name}}</h1>
      <p class="intro_series">
        {{$parent.mainseries.bio}}
      </p>
    </div>

    <div class="slideBanner row">
      <a id="leftgone" href=""><span></span></a>
      <ul class="seriesList">
      <li v-for="serie in $parent.series" v-bind:style="{'background-image':`url(${serie.image.split('upload')[0]}upload/c_thumb,w_265,h_185${serie.image.split('upload')[1]})`}" v-if="serie.publish">
        <div class="contentbanner">
          <router-link :to="'/serie/'+serie.id"><span class="logo"></span>
          <div class="promotext">
            <h3>{{serie.name}}</h3>
            <h5>Promo video</h5>
          </div>
          </router-link>
        </div>
      </li>
     </ul>
     <a href="" id="rightgone"><span></span></a>
    </div>
    <div class="row">
      <div class="aboutHome">
        <div class="theimg">
          <img src="../assets/Laag762.jpg" alt="" width="351" height="498">
        </div>
        <div class="text">
          <h1><b>ABOUT</b> TRT TV</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur alias laborum veniam odio accusantium eius, quaerat dolor doloribus modi aliquam? Iste aliquam impedit obcaecati maxime eaque tenetur perferendis qui ratione.</p>
          <a href="" class="button transparent">continue reading</a>
          <!-- <a href="" class="button">complete order</a> -->
        </div>
      </div>
      <div class="inspireBanner">
        <h2>Inspire someone you love</h2>
        <h1 class="upper"><b>Give the gift</b> oF TRT TV</h1>
        <br />
        <a href="" class="button multiply">order now</a>
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
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Icon,
    Footer,
    Mainbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
