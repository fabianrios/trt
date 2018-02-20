<template>
  <div class="content">
    <Mainbar></Mainbar>
    
    <div class="main_series innerContent">
      <h1><b>Contact</b> Us</h1>
      <p class="intro_series">Professional opportunities at TRT TV.</p>
    </div>

    <div class="innerText">
      <div class="articles">
        <h2 class="upper"><b>HEADQUARTERS</b> OFFICE</h2>
        <h3 class="upper"><b>TRT TV</b> OFFICE</h3>
        <dir>TRT Equestrian B.V.</br>
        Zeelandseweg 26</br>
        5453RS Langenboom</dir>
        <h2 class="upper"><b>COMPANY</b> INFORMATION</h2>
        <account>KvK 67637671 </br>
        IBAN NL 42 RABO 0300 3044 12</br>
        VAT NL857103532B01</account>
        <h2 class="upper"><b>ENQUIRIES</b> ISSUES</h2>
        <ul>
          <li>
            <icon name="envelope-o" scale="1"></icon> <a href="mailto:info@trt-tv.eu">info@trt-tv.eu</a>
          </li>
          <li>
            <icon name="whatsapp" scale="1"></icon> <a href="tel:+31657564847">+31 6 57 56 48 47</a>
          </li>
        </ul>
        <h2 class="upper"><b>SOCIAL MEDIA</b> NEWS</h2>
        <ul>
          <li>
            <icon class="facebook" name="facebook-square" scale="1"></icon> <a href="https://www.facebook.com/thetrttv">Like us on Facebook</a>
          </li>
          <li>
            <icon class="instagram" name="instagram" scale="1"></icon> <a href="https://www.instagram.com/trt_tv/">Follow us on Instagram</a>
          </li>
          <li>
            <icon class="youtube" name="youtube-square" scale="1"></icon> <a href="https://www.youtube.com/channel/UC4JOZGZwrOFcez8oaBd7ugw">Watch us on YouTube</a>
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
  name: 'ContactUs',
  data () {
    return {
      msg: 'Contact Us'
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

.facebook{
  color:#485a95;
}

.instagram{
  color: #de903f;
}

.youtube{
  color: #ff0000;
}

.fa-icon{
  position: relative;
  top: 2px;
  margin-right: 5px;
}

.main_series.innerContent{
  background: url('http://res.cloudinary.com/trt-tv/image/upload/v1518357515/assets/concatus.jpg') no-repeat top center;
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

 h3{
   font-weight: 300;
   font-size: 30px;
 }

 dir{
   padding: 0;
   margin: 0;
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
