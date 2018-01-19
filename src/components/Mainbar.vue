<template>
  <div class="mainbar">
    <div class="row">
      <router-link to="/"><span class="logo"></span></router-link>
      <ul class="signform" v-if="!logUser">
        <li><a href="login"  v-on:click="showThemodal($event, 'login')">login</a></li>
        <li><a href="sign up" v-on:click="showThemodal($event, 'register')">sign up</a></li>
      </ul>
      <ul v-else class="signform">
        <li><h4 class="upper nm">WELCOME {{$parent.$parent.user.name}}</h4></li>
        <li>
          <router-link :to="{ name: 'Profile', params: { id: $parent.$parent.user.id }}"><icon name="user" scale="1"></icon></router-link>
          <div class="optionen">
            <ul>
              <li><router-link class="button backwards" :to="{ name: 'Profile', params: { id: $parent.$parent.user.id }}">Your profile</router-link></li>
              <li v-if="$parent.$parent.user.admin"><router-link class="button backwards" :to="{ name: 'Adminepisodes' }">Admin episodes</router-link></li>
              <li v-if="$parent.$parent.user.admin"><router-link class="button backwards" :to="{ name: 'Adminseries' }">Admin series</router-link></li>
              <li><a href="settings" class="button backwards" v-on:click="showThemodal($event, 'update')">Edit your settings</a></li>
              <li><router-link class="button backwards" :to="{ name: 'Profile', params: { id: $parent.$parent.user.id }}" v-scroll-to="'#series'">View your series</router-link></li>
              <li><a href="logout" class="button backwards" v-on:click="logOut($event)">Sign out</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <h2 class="upper tac fwn" slot="header" v-if="whichModal ===  'register'"><b>create</b> account</h2>
      <h2 class="upper tac fwn" slot="header" v-else-if="whichModal ===  'update'"><b>update</b> profile</h2>
      <h2 class="upper tac fwn" slot="header" v-else-if="whichModal ===  'forgot'"><b>Passowrd</b> recovery</h2>
      <h2 class="upper tac fwn" slot="header" v-else><b>Log</b> in</h2>
      <div slot="body"  v-if="whichModal ===  'register'">
        <form v-on:submit.prevent="onRegister" method="POST">
          <input type="email" name="email" placeholder="Email Adress">
          <input type="text" name="name" placeholder="Name">
          <select v-model="selected" name="country">
            <option disabled value="0">Select an option</option>
            <option v-for="country in $parent.$parent.countries" v-bind:value="country.text">
              {{country.value}}
            </option>
          </select>
          <input type="text" name="address" id="address" placeholder="Address">
          <input type="password" name="password" id="password" placeholder="Password" required>
          <button class="button expand upper">sign up</button>
        </form>
        <br />
        <p class="tac nm">Already have an account? <a href="login" v-on:click="showThemodal($event, 'login')">click here</a></p>
      </div>
      <div slot="body" v-else-if="whichModal ===  'update'">
        <form v-on:submit.prevent="onSubmitUpdate" method="POST">
          <input type="email" name="email" placeholder="Email Adress" :value="$parent.$parent.user.email">
          <input type="text" name="name" placeholder="Name" :value="$parent.$parent.user.name">
          <input type="text" name="address" placeholder="Address" :value="$parent.$parent.user.address">
          <select v-model="$parent.$parent.user.country" name="country">
            <option disabled value="0">Select an option</option>
            <option v-for="country in $parent.$parent.countries" v-bind:value="country.text">
              {{country.value}}
            </option>
          </select>
          <textarea name="bio" id="bio" cols="30" rows="10" :value="$parent.$parent.user.bio"></textarea>
          <button class="button expand upper">update</button>
        </form>
        <br />
      </div>
      <div slot="body" v-else-if="whichModal ===  'forgot'">
        <form v-on:submit.prevent="onSubmitForgot" method="POST">
          <input type="email" name="email" placeholder="Email Adress">
          <button class="button expand upper">send email</button>
        </form>
        <br />
      </div>
      <div slot="body" v-else>
        <form v-on:submit.prevent="onSubmit" method="POST">
          <input type="email" name="email" placeholder="Email Adress" required>
          <input type="password" name="password" placeholder="password" required>
          <button class="button expand upper">sign in</button>
        </form>
        <h4 class="tac">or</h4>
        <facebook-login class="button ext"
          appId="138744983473354"
          @login="getUserData"
          @logout="onLogout"
          @get-initial-status="getUserData">
        </facebook-login>
        <p class="nm"><small><a href="forgot" v-on:click="showThemodal($event, 'forgot')">forgot your password?</a></small></p>
        <p class="tac nm">Don't you have an account yet? <a href="sign up" v-on:click="showThemodal($event, 'register')">Sign up</a></p>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import axios from 'axios'
import facebookLogin from 'facebook-login-vuejs'

export default {
  name: 'Mainbar',
  data () {
    return {
      msg: 'Mainbar',
      showModal: false,
      whichModal: 'register',
      logUser: this.$session.exists(),
      errors: [],
      selected: 'NL'
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
    getUserData: function getUserData () {
      window.FB.api('/me', 'GET', { fields: 'id,name,email' },
        userInformation => {
          this.faceRegister(userInformation)
        }
      )
    },
    faceRegister: function faceRegister (user) {
      console.log(user)
    },
    sdkLoaded: function sdkLoaded (payload) {
      console.log('payload', payload)
      this.logUser = payload.isConnected
      window.FB = payload.FB
      if (this.logUser) this.getUserData()
    },
    onLogin: function onLogin () {
      this.logUser = true
      this.getUserData()
    },
    onLogout: function onLogout () {
      this.logUser = false
    },
    showThemodal: function showThemodal (e, which) {
      e.preventDefault()
      this.showModal = true
      this.whichModal = which
    },
    logOut: function logOut (e) {
      e.preventDefault()
      this.logUser = false
      this.$parent.$parent.user = {}
      this.$session.destroy()
      this.$router.push('/')
    },
    onRegister: async function onSubmit (e) {
      const vm = this
      const url = `${vm.$parent.$parent.root}/register`
      const form = e.currentTarget
      const sendBody = {
        name: form.querySelector("input[name='name']").value,
        password: form.querySelector("input[name='password']").value,
        email: form.querySelector("input[name='email']").value,
        image: null,
        publicid: null,
        address: form.querySelector("input[name='address']").value,
        country: form.querySelector("select[name='country']").value,
        bio: null,
        admin: false
      }
      console.log(sendBody, url)
      try {
        const response = await axios.post(url, sendBody)
        vm.$parent.$parent.user = response.data
        vm.showModal = false
        vm.logUser = true
        vm.$session.start()
        vm.$session.set('jwt', vm.$parent.$parent.user)
        vm.$router.push(`/profile/${vm.$parent.$parent.user.id}`)
      } catch (e) {
        console.log('e', e.response.data)
        vm.showLoginError({title: e.response.statusText, message: e.response.data, type: 'error', timeout: 4000})
        vm.errors.push(e)
      }
    },
    onSubmitUpdate: async function onSubmitUpdate (e) {
      const vm = this
      const url = `${vm.$parent.$parent.root}/user/${vm.$parent.$parent.user.id}`
      const form = e.currentTarget
      const sendBody = {
        name: form.querySelector("input[name='name']").value,
        email: form.querySelector("input[name='email']").value,
        address: form.querySelector("input[name='address']").value,
        country: form.querySelector("select[name='country']").value,
        bio: form.querySelector("textarea[name='bio']").value
      }
      console.log(sendBody, url)
      try {
        const response = await axios.post(url, sendBody)
        vm.$parent.$parent.user = response.data
        // console.log(vm.user)
        vm.showModal = false
        vm.logUser = true
        vm.$session.set('jwt', vm.$parent.$parent.user)
      } catch (e) {
        console.log('e', e.response)
        vm.showLoginError({title: e.response.statusText, message: e.response.data, type: 'error', timeout: 4000})
        vm.errors.push(e)
      }
    },
    onSubmitForgot: async function onSubmitForgot (e) {
      const vm = this
      const url = `${vm.$parent.$parent.root}/recover`
      const form = e.currentTarget
      const sendBody = {
        email: form.querySelector("input[name='email']").value
      }
      try {
        const response = await axios.post(url, sendBody)
        vm.showModal = false
        vm.showLoginSuccess({title: 'passowrd recovery', message: `don't worry ${response.data}, we just send you an email`, timeout: 4000})
      } catch (e) {
        console.log('e', e.response)
        vm.showLoginError({title: e.response.statusText, message: e.response.data, type: 'error', timeout: 4000})
        vm.errors.push(e)
      }
    },
    onSubmit: async function onSubmit (e) {
      const vm = this
      const url = `${vm.$parent.$parent.root}/login`
      const form = e.currentTarget
      const sendBody = {
        email: form.querySelector("input[name='email']").value,
        password: form.querySelector("input[name='password']").value
      }
      try {
        const response = await axios.post(url, sendBody)
        vm.$parent.$parent.user = response.data
        // console.log(vm.user)
        vm.showModal = false
        vm.logUser = true
        vm.$session.start()
        vm.$session.set('jwt', vm.$parent.$parent.user)
        // vm.showLoginSuccess()
        vm.$router.push(`/profile/${vm.$parent.$parent.user.id}`)
      } catch (e) {
        console.log('e', e.response)
        vm.showLoginError({title: e.response.statusText, message: e.response.data, type: 'error', timeout: 4000})
        vm.errors.push(e)
      }
    }
  },
  components: {
    Modal,
    facebookLogin
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$blue: #009fe3;

.mainbar{
  width: 100%;
  padding:0 20px;
  position: absolute;
  top: 0;
  z-index: 9;
}
 
.signform{
  width: 35%;
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
  &:hover{
    .optionen{
      display: block;
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

.optionen{
  display: none;
  position: absolute;
  width: 300px;
  right: 0;
  top: 20px;
  padding-top: 35px;
  &:before{
    content: '';
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #fff transparent;
    position: absolute;
    top: 25px;
    right: 20px;
  }
  &:hover{
    display: block;
  }
  ul{
    padding: 0;
    margin: 0;
    li{
      padding: 0;
      margin: 0;
      display: block;
      a{
        display: block;
        text-align: left;
        padding-left: 55px;
        text-transform: none;
        &.backwards{
          background: white;
          color: #000000;
          border-color: #fff;
          &:hover{
            background: $blue;
            color: #fff;
            border-color: $blue;
          }
        }
      }
    }
  }
}

</style>
