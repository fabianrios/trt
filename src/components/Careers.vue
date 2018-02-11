<template>
  <div class="content">
    <Mainbar></Mainbar>
    
    <div class="main_series innerContent">
      <h1>Careers</h1>
      <p class="intro_series">Professional opportunities at TRT TV.</p>
    </div>

    <div class="innerText">
      <div class="articles">
        <h2 class="upper"><b>VACANCIES</b> OPEN JOBS</h2>
        <p>There are no open jobs at this moment.</p>
        <h2 class="upper"><b>OPEN</b> APPLICATION</h2>
        <p>The TRT TV team is always open for professional collaboration structures and new forces. Therefore, any request or initiative is welcome by leaving after a message at our customer support.</p>
        <ul>
          <li>
            <icon name="envelope-o" scale="1"></icon> <a href="mailto:info@trt-tv.eu">info@trt-tv.eu</a>
          </li>
          <li>
            <icon name="whatsapp" scale="1"></icon> <a href="tel:+31657564847">+31 6 57 56 48 47</a>
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
  name: 'Careers',
  data () {
    return {
      msg: 'Privacy part'
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

.main_series.innerContent{
  background: url('http://res.cloudinary.com/trt-tv/image/upload/v1518357516/assets/carrers.jpg') no-repeat top center;
  background-size: cover;
  padding-bottom: 90px;
}

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
