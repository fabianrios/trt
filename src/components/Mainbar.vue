<template>
  <div class="mainbar">
    <div class="row">
      <a href="#menu" id="menuButton" v-on:click.prevent="openMenu"><icon name="bars" scale="3"></icon></a>
      <router-link to="/"><span class="logo"></span></router-link>
      <ul class="signform" v-if="!logUser">
        <li><a href="login" id="login"  v-on:click="showThemodal($event, 'login')">login</a></li>
        <li><a href="sign up" v-on:click="showThemodal($event, 'register')">sign up</a></li>
      </ul>
      <ul v-else class="signform" id="#menu">
        <li><h4 class="upper nm">WELCOME {{$parent.$parent.user.name}}</h4></li>
        <li>
          <router-link :to="{ name: 'Profile', params: { id: $parent.$parent.user.id }}"><icon name="user" scale="1"></icon></router-link>
          <div class="optionen">
            <ul>
              <li><router-link class="button backwards" :to="{ name: 'Profile', params: { id: $parent.$parent.user.id }}">Your profile</router-link></li>
              <li v-if="$parent.$parent.user.admin"><router-link class="button backwards" :to="{ name: 'Adminepisodes' }">Admin episodes</router-link></li>
              <li v-if="$parent.$parent.user.admin"><router-link class="button backwards" :to="{ name: 'Adminseries' }">Admin series</router-link></li>
              <li v-if="$parent.$parent.user.admin"><router-link class="button backwards" :to="{ name: 'Adminusers' }">Admin users</router-link></li>
              <li><a href="settings" class="button backwards" v-on:click="showThemodal($event, 'update')">Edit your settings</a></li>
              <li><router-link class="button backwards" :to="{ name: 'Profile', params: { id: $parent.$parent.user.id }}" v-scroll-to="'#series'">View your series</router-link></li>
              <li><a href="logout" class="button backwards" v-on:click.prevent="logOut()">Sign out</a></li>
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
            <option v-for="country in $parent.$parent.countries" v-bind:value="country.text" v-bind:key="country.value">
              {{country.value}}
            </option>
          </select>
          <input type="text" name="address" id="address" placeholder="Address">
          <input type="password" name="password" id="password" placeholder="Password" required>
          <button class="button expand upper">sign up</button>
        </form>
        <h4 class="tac fwn">or</h4>
        <facebook-login class="button ext"
          appId="138744983473354"
          loginLabel="REGISTER WITH FACEBOOK"
          @login="getUserData"
          @logout="logOut"
          @get-initial-status="getUserData">
        </facebook-login>
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
            <option v-for="country in $parent.$parent.countries" v-bind:value="country.text" v-bind:key="country.value">
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
        <h4 class="tac fwn">or</h4>
        <facebook-login class="button ext"
          appId="138744983473354"
          loginLabel="LOGIN WITH FACEBOOK"
          @login="getUserData"
          @logout="logOut"
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
import Velocity from 'velocity-animate'

// Helpers
import {
  fbLogout
} from '../helpers.js'

export default {
  name: 'Mainbar',
  data () {
    return {
      msg: 'Mainbar',
      showModal: false,
      whichModal: 'register',
      logUser: this.$session.exists(),
      errors: [],
      FB: undefined,
      selected: 'NL',
      face: false,
      menuActive: true
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
    openMenu: function openMenu () {
      this.menuActive = !this.menuActive
      const mainbar = document.getElementsByClassName('mainbar')[0]
      const signform = document.getElementsByClassName('signform')[0]
      const optionen = document.getElementsByClassName('optionen')[0]
      if (this.menuActive) {
        mainbar.classList.remove('active')
        Velocity(signform, { opacity: 0, scale: 0 }, { duration: 200, easing: 'ease-out', iterations: 1 })
        signform.style.display = 'block'
        if (this.logUser) {
          optionen.style.display = 'none'
        }
      } else {
        mainbar.classList.add('active')
        signform.style.display = 'block'
        Velocity(signform, { opacity: 1, scale: 1 }, { duration: 200, easing: 'ease-in', iterations: 1 })
        if (this.logUser) {
          optionen.style.display = 'block'
        }
      }
    },
    getUserData: function getUserData () {
      const vm = this
      window.FB.api('/me', 'GET', { fields: 'id,name,email' },
        userInformation => {
          if (userInformation.email) {
            vm.faceRegister(userInformation)
          }
        }
      )
    },
    faceRegister: async function faceRegister (user) {
      const vm = this
      const url = `${vm.$parent.$parent.root}/facebook/auth`
      try {
        const response = await axios.post(url, user)
        vm.$parent.$parent.user = response.data
        vm.face = true
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
    onLogin: function onLogin () {
      this.getUserData()
    },
    showThemodal: function showThemodal (e, which) {
      e.preventDefault()
      this.showModal = true
      this.whichModal = which
    },
    logOut: function logOut () {
      console.log(this.face)
      fbLogout()
        .then(response => {
          this.face = false
        }
        )
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
        vm.showLoginSuccess({title: 'passoword recovery', message: `don't worry ${response.data}, we just send you an email`, timeout: 4000})
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
    Velocity
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$blue: #009fe3;

#menuButton{
  position: absolute;
  top: 40px;
  right: 20px;
  color: #fff;
  display: block;
  @media only screen and (min-width: 768px) {
    display: none;
  }
}

.mainbar{
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 9;
  &.active{
    background: #000;
  }
  @media only screen and (min-device-width : 768px) and (max-device-width : 1024px)  {
    padding: 0 30px;
  }
}
 
.signform{
  width:100%;
  position: relative;
  top:35px;
  background: #000;
  padding-bottom: 10px;
  display: none;
  opacity: 0;
  zoom: 0;
  li{
    width:100%;
    display:block;
    padding: 10px 0;
    a{
      text-transform: uppercase;
      color: #fff;
      padding-left: 20px;
    }
  }
  &:hover{
    .optionen{
      display: block;
    }
  }
  @media only screen and (min-width: 768px) {
    background: transparent;
    width: 35%;
    position: relative;
    float: right;
    text-align: right;
    padding: 10px 0;
    display: block;
    opacity: 1;
    zoom: 1;
    li{
      width:auto;
      display: inline-block;
      margin-left:10px;
      text-align:left;
      a{
        padding-left: 0;
      }
    }
  }
}

.logo{
  background:url(../assets/Logo_trttv.png) no-repeat center center;
  width: 135px;
  height: 50px;
  display: inline-block;
  position: relative;
  top: 40px;
  left: 20px;
  background-size:100%;
  @media only screen and (min-width: 768px) {
    left: 0;
  }
}

.optionen{
  display: none;
  position: absolute;
  width: 100%;
  right: 0;
  top: -25px;
  padding-top: 35px;
  @media only screen and (min-width: 768px) {
    width: 300px;
    top: 20px;
  }
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
