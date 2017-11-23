<template>
  <div class="hello">
    <mainbar></mainbar>
    
    <div class="main_series">
      <a href="" class="play big"></a>
      <h1>the specialist</h1>
      <p class="intro_series">
        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultrconsectetur. Maecenas sed diam eget risus varius blandit sit amet non magna.
      </p>
    </div>

    <div class="slideBanner row">
      <a id="leftgone" href=""><span></span></a>
      <ul class="seriesList">
      <li>
        <div class="contentbanner">
          <div class="promotext">
            <h3>World of Dressage</h3>
            <h5>Promo video</h5>
          </div>
        </div>
      </li>
      <li>
        <div class="comming"><span><b>comming</b> soon</span></div>
        <div class="contentbanner">
          <div class="promotext">
            <h3>BRETT KIDDING</h3>
            <h5>Promo video</h5>
          </div>
        </div>
      </li>
      <li class="active">
        <div class="contentbanner">
          <div class="promotext">
            <h3>THE specialist</h3>
            <h5>Promo video</h5>
          </div>
        </div>
      </li>
      <li>
        <div class="contentbanner">
          <div class="promotext">
            <h3>Around the world</h3>
            <h5>Promo video</h5>
          </div>
        </div>
      </li>
      <li>
        <div class="promotext">
          <h3>Around the world</h3>
          <h5>Promo video</h5>
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
          <a href="" class="button">complete order</a>
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
