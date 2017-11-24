<template>
  <div class="mainbar">
    <div class="row">
      <span class="logo"></span>
      <ul class="signform">
        <li><a href="login"  v-on:click="showThemodal($event)">login</a></li>
        <li><a href="sign up" v-on:click="showThemodal($event)">sign up</a></li>
      </ul>
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <h2 class="upper tac fwn" slot="header"><b>create</b> account</h2>
      <div slot="body">
        <form action="">
          <input type="email" placeholder="Email Adress">
          <input type="text" placeholder="Name">
          <input type="text" placeholder="Country">
          <input type="text" name="adress" id="adress" placeholder="Adress">
          <button class="button expand upper">sign in</button>
        </form>
        <br />
        <p class="tac nm">Already have an account <a href="">Sign in</a></p>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal'

export default {
  name: 'Mainbar',
  data () {
    return {
      msg: 'Mainbar',
      showModal: false
    }
  },
  methods: {
    showThemodal: function showThemodal (e) {
      e.preventDefault()
      this.showModal = true
      console.log(e)
    }
  },
  components: {
    Modal
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
