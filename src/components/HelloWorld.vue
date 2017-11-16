<template>
  <div class="hello">
    <div class="mainbar">
      <div class="row">
        <span class="logo"></span>
        <ul class="signform">
          <li><a href="login">login</a></li>
          <li><a href="sign up">sign up</a></li>
        </ul>
      </div>
    </div>
    
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
          <a href="" class="button continue">continue reading</a>
          <a href="" class="button">complete order</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

$blue: #009fe3;

html, body{
  background: #000;
  font-size: 100%;
  font-weight: normal;
}

p{
  font-weight: 300;
  line-height: 30px;
}

a {
  &.button{
    background:$blue;
    color: white;
    height: 55px;
    display: inline-block;
    line-height: 55px;
    padding: 0 30px;
  }
}

.aboutHome{
  .theimg{
    width:40%;
    display: inline-block;
    text-align: center;
  }
  .text{
    width: 50%;
    display: inline-block;
    vertical-align: top;
    margin-top: 100px;
    h1{
      font-weight: 300;
    }
  }
}

.slideBanner{
  width: 100%;
  height: auto;
  max-height:205px;
  overflow: hidden;
  position: relative;
  #leftgone, #rightgone{
    display: inline-block;
    height: 205px;
    width: 70px;
    position: absolute;
    top: 0;
    left: 0;
    background: -moz-linear-gradient(left, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left, rgba(0,0,0,1) 0%,rgba(255,255,255,0) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right, rgba(0,0,0,1) 0%,rgba(255,255,255,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#00ffffff',GradientType=1 ); /* IE6-9 */
    z-index: 9;
    span{
      display: inline-block;
      width: 50px;
      height: 205px;
      margin: 0 auto;
      text-align: center;
      background-color: $blue;
      -webkit-mask-image: url(../assets/arrow_left.svg);
      mask-image: url(../assets/arrow_left.svg);
      mask-size: 50px;
      -webkit-mask-size: 50px;
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center center;
      mask-position: center center;
    }
  }
  #rightgone{
    top: 0;
    right: 0;
    left: auto;
    background: -moz-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(0,0,0,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(0,0,0,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#000000',GradientType=1 ); /* IE6-9 */
    span{
      float: right;
      -webkit-mask-image: url(../assets/arrow_right.svg);
      mask-image: url(../assets/arrow_right.svg);
      mask-size: 50px;
      -webkit-mask-size: 50px;
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center center;
      mask-position: center center;
    }
  }
}

$deg: 315deg;
.seriesList{
  margin: 0 auto;
  text-align: center;
  li{
    position: relative;
    display: inline-block;
    width: 265px;
    height: 185px;
    background:url(../assets/horsemini.png) no-repeat top center;
    margin: 10px;
    .contentbanner{
      opacity: 0.3;
    }
    &.active{
      .contentbanner{
        opacity: 1;
      }
    }
    .comming{
        position: absolute;
        top: 0;
        left: 0;
        &:before{
          position: absolute;
          content: '';
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 150px 150px 0 0;
          border-color: $blue transparent transparent transparent;
        }
        span{
          position: absolute;
          top: 28px;
          left: 10px;
          text-transform: uppercase;
          text-align: center;
          transform: rotate($deg);
          -webkit-transform: rotate($deg);
          -moz-transform: rotate($deg);
          -o-transform: rotate($deg);
          -ms-transform: rotate($deg);
        }
    }
    .promotext{
      position: absolute;
      bottom: 0;
      padding: 20px;
      /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#999999+15,1aeddc+100&0+0,0.8+100 */
      background: -moz-linear-gradient(top, rgba(153,153,153,0) 0%, rgba(153,153,153,0.12) 15%, rgba(0,159,227,0.8) 100%); /* FF3.6-15 */
      background: -webkit-linear-gradient(top, rgba(153,153,153,0) 0%,rgba(153,153,153,0.12) 15%,rgba(0,159,227,0.8) 100%); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(to bottom, rgba(153,153,153,0) 0%,rgba(153,153,153,0.12) 15%,rgba(0,159,227,0.8) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00999999', endColorstr='#cc1aeddc',GradientType=0 ); /* IE6-9 */
      width: 100%;
      h3{
        margin: 0;
        text-transform: uppercase;
        text-align: left;
      }
      h5{
        margin: 0;
      }
    }
  }
}

h1{
  font-size: 50px;
  margin: 20px 0 40px 0;
}

div{
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  &.row{
    max-width:1185px;
    margin: 0 auto;
  }
}

.mainbar{
  width: 100%;
  padding:0 20px;
  position: absolute;
  top: 0;
  z-index: 9;
}

.play{
  background: url(../assets/player.svg);
  width: 80px;
  height: 80px;
  fill: white;
  display: inline-block;
  text-align: center;
  margin: 0 auto;
  margin-top: 300px;
  &.big{
    width: 150px;
    height: 150px;
  }
}

.main_series{
  background: url(../assets/horse.png) no-repeat top center;
  text-align: center;
  margin: 0 auto;
  position: relative;
  h1{
    font-weight: 300;
    text-transform: uppercase;
  }
  p{
    max-width: 800px;
    text-align: center;
    margin: 0 auto;
    padding-bottom: 100px;
  }
}

.signform{
  width: 30%;
  float: right;
  position: relative;
  top:55px;
  padding: 10px 0;
  li{
    display: inline-block;
    margin-left:10px;
    a{
      text-transform: uppercase;
      color: #fff;
    }
  }
}

.logo{
  background:url(../assets/logo.svg) no-repeat center center;
  width: 135px;
  height: 50px;
  display: inline-block;
  float: left;
  position: relative;
  top: 50px;
}

</style>
