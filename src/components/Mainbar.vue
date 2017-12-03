<template>
  <div class="mainbar">
    <div class="row">
      <span class="logo"></span>
      <ul class="signform" v-if="!logUser">
        <li><a href="login"  v-on:click="showThemodal($event, 'login')">login</a></li>
        <li><a href="sign up" v-on:click="showThemodal($event, 'register')">sign up</a></li>
      </ul>
      <ul v-else class="signform">
        <li><h4 class="upper nm">WELCOME {{user.name}}</h4></li>
        <li><a href="profile" class="iconfix"><icon name="user" scale="1"></icon></a></li>
        <li><a href="logout" class="iconfix" v-on:click="logOut($event)"><icon name="sign-out" scale="1"></icon></a></li>
      </ul>
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <h2 class="upper tac fwn" slot="header" v-if="whichModal ===  'register'"><b>create</b> account</h2>
      <h2 class="upper tac fwn" slot="header" v-else><b>Log</b> in</h2>
      <div slot="body"  v-if="whichModal ===  'register'">
        <form action="http://localhost:5000/register" v-on:submit.prevent="onSubmit" method="POST">
          <input type="email" placeholder="Email Adress">
          <input type="text" placeholder="Name">
          <input type="text" placeholder="Country">
          <input type="text" name="adress" id="adress" placeholder="Adress">
          <button class="button expand upper">sign up</button>
        </form>
        <br />
        <p class="tac nm">Already have an account <a href="">Sign in</a></p>
      </div>
      <div slot="body" v-else>
        <form action="http://localhost:5000/login" v-on:submit.prevent="onSubmit" method="POST">
          <input type="email" name="email" placeholder="Email Adress">
          <input type="password" name="password" placeholder="password">
          <button class="button expand upper">sign in</button>
        </form>
        <br />
        <p class="tac nm">Any problem sign in? <a href="">click here</a></p>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import axios from 'axios'

export default {
  name: 'Mainbar',
  data () {
    return {
      msg: 'Mainbar',
      showModal: false,
      whichModal: 'register',
      user: this.$session.get('jwt') || {},
      logUser: this.$session.exists(),
      errors: []
    }
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
  },
  notifications: {
    showLoginError: {
      title: '',
      message: 'Failed to authenticate',
      type: 'error'
    },
    showLoginSuccess: {
      title: '',
      message: 'Login successful',
      type: 'success'
    }
  },
  methods: {
    showThemodal: function showThemodal (e, which) {
      e.preventDefault()
      this.showModal = true
      this.whichModal = which
    },
    logOut: function logOut () {
      this.$session.destroy()
      this.$router.push('/')
    },
    onSubmit: async function onSubmit (e) {
      const vm = this
      const url = `${vm.$parent.$parent.root}/login`
      const form = e.currentTarget
      // const sendBody = `email=${form.querySelector("input[name='email']").value}&password=${form.querySelector("input[name='password']").value}`
      const sendBody = {
        email: form.querySelector("input[name='email']").value,
        password: form.querySelector("input[name='password']").value
      }
      try {
        const response = await axios.post(url, sendBody)
        vm.user = response.data
        // console.log(vm.user)
        vm.showModal = false
        vm.logUser = true
        vm.$session.start()
        vm.$session.set('jwt', vm.user)
        vm.showLoginSuccess()
        vm.$router.push('/series')
      } catch (e) {
        console.log('e', e)
        vm.showLoginError({title: '', type: 'error', timeout: 4000})
        // miniToastr.error('message', 'title', 3000)
        vm.errors.push(e)
      }
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
