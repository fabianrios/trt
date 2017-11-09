<template>
  <div class="hello">
    <div class="mainbar">
      <div class="row">
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
<style scoped <style lang="scss">

html, body{
  background: #000;
  font-size: 100%;
  font-weight: normal;
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
    max-width:1130px;
    margin: 0 auto;
    text-align: center;
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
    font-weight: 300;
    line-height: 30px;
  }
}

.signform{
  text-align: right;
  margin-top:50px;
  li{
    display: inline-block;
    margin-left:10px;
    a{
      text-transform: uppercase;
      color: #fff;
    }
  }
}
</style>
