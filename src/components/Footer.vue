<template>
  <div class="footer">
    <div class="social tac">
      <h3 class="upper fwn"><b>stay up to date with</b> trt tb</h3>
      <ul class="social-icons">
        <li><a href="https://www.instagram.com/tristantucker_official/ " target="_blank"><icon name="instagram" scale="2"></icon></a></li>
        <li><a href="https://www.youtube.com/channel/UC2Y_M0XAo8NpCf0cktKdf_w" target="_blank"><icon name="youtube" scale="2"></icon></a></li>
        <li><a href="https://www.facebook.com/tristan.tucker.543 " target="_blank"><icon name="facebook" scale="2"></icon></a></li>
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
            <li><a href="">HELP CENTER</a></li>
            <li><a href="">CONTACT US</a></li>
            <li><a href="">PRIVACY</a></li>
            <li><a href="">TERMS</a></li>
            <li><a href="">CAREERS</a></li>
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
    float: left;
    width: 19%;
    display: inline-block;
    img{
      display: inline-block;
      max-width: 120px;
      vertical-align: bottom;
    }
  }
  .linksfooter{
    display: inline-block;
    width: 60%;
    border-left: 1px solid #333;
    border-right: 1px solid #333;
    padding-top: 30px;
    padding-bottom: 20px;
    p{
      color: #555;
      font-size: 12px;
    }
    ul{
      li{
        margin:0 10px;
        display: inline-block;
        a{
          color: white;
          text-transform: uppercase;
        }
      }
    }
  }
  .acceptedPayment{
    width: 20%;
    float: right;
    position: relative;
    top: 40px;
    display: inline-block;
    img{
      max-width: 50px;
      margin: 0 10px;
      display: inline-block;
    }
  }
}
</style>
