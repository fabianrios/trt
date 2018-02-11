<template>
  <div class="footer">
    <div class="social tac">
      <h3 class="upper fwn"><b>stay up to date with</b> trt tb</h3>
      <ul class="social-icons">
        <li><a href="https://www.instagram.com/tristantucker_official/" target="_blank"><icon name="instagram" scale="2"></icon></a></li>
        <li><a href="https://www.youtube.com/channel/UC2Y_M0XAo8NpCf0cktKdf_w" target="_blank"><icon name="youtube" scale="2"></icon></a></li>
        <li><a href="https://www.facebook.com/tristan.tucker.543" target="_blank"><icon name="facebook" scale="2"></icon></a></li>
      </ul>
    </div>
    <footer>
      <div class="inner">
        <div class="logofooter">
          <a href=""><img src="../assets/pferdlogo.svg" alt=""></a>
        </div>
        <div class="linksfooter">
          <ul>
            <li><router-link :to="{ name: 'Series' }">BROWSE CLASSES</router-link></li>
            <li><router-link :to="{ name: 'HelpCenter' }">HELP CENTER</router-link></li>
            <li><router-link :to="{ name: 'ContactUs' }">CONTACT US</router-link></li>
            <li><router-link :to="{ name: 'Privacy' }">PRIVACY</router-link></li>
            <li><router-link :to="{ name: 'Terms' }">TERMS</router-link></li>
            <li><router-link :to="{ name: 'Careers' }">CAREERS</router-link></li>
          </ul>
          <p>Copyright © 2017 TRT TV</p>
        </div>
        <div class="acceptedPayment">
          <img src="../assets/ideal.gif" alt="ideal">
          <img src="../assets/mastercard.svg" alt="mastercard">
          <img src="../assets/Paypal-logo.png" alt="paypal">
        </div>
      </div>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'Footer',
  data () {
    return {
      msg: 'social'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .footer{
  width: 100%;
  background: #000;
}

.social{
  background-color: #070707;
  padding: 70px 0;
  .social-icons{
    li{
      display: inline-block;
      margin:0 10px;
      a{
        color: white;
      }
    }
  }
}

footer{
  margin: 0 auto;
  border-top: 1px solid #333333;
  width: 100%;
  text-align: center;
  padding: 20px 0;
  .inner{
    max-width: 1280px;
    margin: 0 auto;
  }
  .logofooter{
    float: none;
    width: 100%;
    display: block;
    @media only screen and (min-width: 768px) {
      float: left;
      width: 19%;
      display: inline-block; 
    }
    img{
      display: inline-block;
      max-width: 120px;
      vertical-align: bottom;
    }
  }
  .linksfooter{
    display: block;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 0;
    @media only screen and (min-width: 768px) {
      border-left: 1px solid #333;
      border-right: 1px solid #333;
      display: inline-block;
      padding-top: 30px;
      width: 60%;
    }
    p{
      color: #555;
      font-size: 12px;
    }
    ul{
      li{
        margin:15px;
        display: block;
        @media only screen and (min-width: 768px) {
          margin:0 10px;
          display: inline-block;
        }
        a{
          color: white;
          text-transform: uppercase;
        }
      }
    }
  }
  .acceptedPayment{
    width: 100%;
    float: none;
    position: relative;
    top: 10px;
    display: block;
    @media only screen and (min-width: 768px) {
      display: inline-block;
      top: 40px;
      width: 20%;
      float: right;
    }
    img{
      max-width: 50px;
      margin: 0 10px;
      display: inline-block;
    }
  }
}
</style>
