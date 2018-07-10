<template>
  <div class="content">
    <Mainbar></Mainbar>
    
    <div class="main_series innerContent">
      <h1><b>About</b> TRT TV</h1>
      <p class="intro_series">Read all about the concept of TRT TV and its roots.</p>
    </div>

    <div class="innerText">
    <div class="articles">
      <h2 class="upper"><b>TRT TV </b> BACKGROUND</h2>
      <p>TRT TV is the brain child of renowned horseman and dressage rider Tristan Tucker, the man behind the TRT Method and the rest of the TRT Enterprise. TRT are the initials of Tristan Ross Tucker. Read more about Tristan Tucker <a href="">here</a>.</p>
      <h2 class="upper"><b>TRT TV </b> THE PRODUCT</h2>
      <p>TRT TV is a platform developed to provide people with inspiring, educational and entertaining media from the horse world that you can access from anywhere in the world on any mobile device. </p>

      <img src="../assets/product.jpg" alt="product">
      <p>The TRT TV team’s idea together, is to bring innovative content to the world with inspirational footage that shows perspectives in the horse world that are never seen before. TRT TV plans to give insights into different places, unique people, the most modern technologies and own ideas and innovations from an angle that is fresh and new. This content is unique, very crafty and never seen before, until now! The TRT TV team hopes that you enjoy this inspiring journey altogether.</p>
    </div>
    </div>

    <div class="heroText">
      <div class="innerHero">
        <h2 class="upper tal"><b>TRT TV</b> THE TEAM</h2> 
        <br>
        <ul class="thirds">
          <li>
            <img src="../assets/tristan.jpg" alt="tristan" width="208px" height="208px">
            <h4><b>TRISTAN TUCKER</b><img src="../assets/england.png" alt="england"></h4>
            <i>Owner, Core & Inspiration</i>
            <br>
            <p>It all started at the flying Australian horse man and entrepreneur, the one who brought his dream, passion and unique methodology all the way up. Tristan is the core of TRT TV, caring for inspiration and bringing on the stories as well as starring in the content.</p>
          </li>
          <li>
            <img src="../assets/martjin.jpg" alt="martjin" width="208px" height="208px">
            <h4><b>MARTIJN ROEFS</b><img src="../assets/netherlands.png" alt="netherlands"></h4>
            <i>Manager, Tech, Design & Brand</i>
            <br>
            <p>Where a dream is, is a way. Martijn is an optimistic and driven individual who gave shape to TRT TV by designing and developing the concept and platform. Martijn manages the overarching concept, technology, marketing, branding and design.</p>
          </li>
          <li>
            <img src="../assets/Rinus.jpg" alt="Rinus" width="208px" height="208px">
            <h4><b>RINUS DE GROOT</b><img src="../assets/netherlands.png" alt="netherlands"></h4>
            <i>Production, Content & Filming</i>
            <br>
            <p>An image says more than a thousand words... and so does a video! Rinus is the man behind the camera and the production manager of TRT TV. Rinus cares for the entire production, from capturing footage until crafty and ready-to-release content. </p>
          </li>
        </ul>
      </div>
    </div>
    
    <Footer></Footer>
  </div>
</template>

<script>

import Footer from '@/components/Footer'
import Mainbar from '@/components/Mainbar'

export default {
  name: 'About',
  data () {
    return {
      msg: 'About part'
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
 .innerText{
   background: white;
   color: #000;
   padding: 100px 0;
  .articles{
    max-width: 750px;
    margin: 0 auto;
    padding:0 10px;
    @media only screen and (min-width: 768px) {
      padding:0;
    }
    img{
      width: 100%;
      margin: 30px 0;
    }
  }
 }
 
 h2{
   font-weight: 300;
 }

 .heroText{
   background: #f5f5f5;
   padding: 20px;
   .innerHero{
     max-width: 910px;
     margin: 0 auto;
     background: #fff;
     border: 1px solid #e6e6e6;
     padding: 20px;
     color: #000;
     text-align: center;
   }
   @media only screen and (min-width: 768px) {
     padding: 120px 0;
     .innerHero{
       padding: 50px 94px;
     }
   }
 }
</style>
