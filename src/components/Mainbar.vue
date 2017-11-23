<template>
  <div class="mainbar">
    <div class="row">
      <span class="logo"></span>
      <ul class="signform">
        <li><a href="login">login</a></li>
        <li><a href="sign up">sign up</a></li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Mainbar',
  data () {
    return {
      msg: 'Mainbar'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.mainbar{
  width: 100%;
  padding:0 20px;
  position: absolute;
  top: 0;
  z-index: 9;
}
 
.signform{
  width: 30%;
  position: relative;
  top:55px;
  float: right;
  text-align: right;
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
  position: relative;
  top: 50px;
}

</style>
