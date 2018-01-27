<template>
  <div class="profile" ref="theprofile">
    <Mainbar v-bind:class="{ static: isFloated }" ref="mainbar"></Mainbar>
    <div class="row">
      <div class="innerStart">
        <div class="profilepic">
          <div class="circlepic" v-bind:class="{ active: this.backgroundImage }" :style="{ 'background-image': 'url(' + this.backgroundImage + ')' }">
            <icon name="user-o" scale="3"></icon>
            <input type="file" @change="filesChange($event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">
            <div class="edit" v-on:click="triggerInput($event)">
              <icon name="pencil" scale="2"></icon>
            </div>
          </div>
        </div>
        <h1 class="tac fwn upper"> {{$parent.user.name}} </h1>
        <h4 class="tac upper fwn">{{$parent.user.address}} • {{getCountry($parent.user.country).value}}</h4>
        <p class="tac bio">{{$parent.user.bio}}</p>
        <br />
        <h2 v-if="series.length > 0" class="tac fwn upper" id="series"><b>Your</b> series</h2>
        <div class="tac" v-else>
          <router-link :to="'/series/'" class="button tac">Discover our series</router-link>
        </div>
      </div>
      <div class="seriesshow">
        <div class="serie" v-for="serie in series" v-bind:key="serie.id" v-bind:style="{ 'background-image': `url(${serie.image})` }">
          <div class="therating">
            <h3>YOUR REVIEW </h3>
            <div class="rating">
              <span v-bind:class="{ selected: serie.stars == 5}" v-on:click="rating(serie.id, 5)">5</span>
              <span v-bind:class="{ selected: serie.stars >= 4}" v-on:click="rating(serie.id, 4)">4</span>
              <span v-bind:class="{ selected: serie.stars >= 3}" v-on:click="rating(serie.id, 3)">3</span>
              <span v-bind:class="{ selected: serie.stars >= 2}" v-on:click="rating(serie.id, 2)">2</span>
              <span v-bind:class="{ selected: serie.stars >= 1}" v-on:click="rating(serie.id, 1)">1</span>
            </div>
          </div>
          <router-link :to="'/serie/'+serie.id">
            <div class="text_Serie">
              <div class="fixw">
                <h1>{{ serie.name }}</h1>
                <p>{{ serie.text }}</p>
                <h3>{{ serie.release }}</h3>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <br >
      <h2 v-if="episodes.length > 0" class="tac fwn upper" id="episodes"><b>Your</b> Episodes</h2>
      <ul class="episodes" id="episodes">
        <li  v-for="episode in episodes">
          <div class="episode_box">
            <div class="eimage">
              <img v-if="episode.image" :src="`${episode.image.split('upload')[0]}upload/c_thumb,w_255,h_255${episode.image.split('upload')[1]}`" alt="">
              <router-link :to="'/episode/'+episode.id" class="play normalize"></router-link>
              <div class="hoverish"></div>
            </div>
            <div class="etext">
              <router-link :to="'/episode/'+episode.id"><h3 class="upper fwn"><b>{{episode.name}}</b> </h3></router-link>
              <p>{{episode.bio}}</p>
            </div>
          </div>
        </li>
      </ul>
      <br >
      <h2 v-if="gifts.length > 0" class="tac fwn upper" id="gifts"><b>Your</b> gifts</h2>
      <div class="giftedseries">
          <div v-for="gift in gifts" class="serie gifted" v-bind:key="gift.id" v-bind:style="{ 'background-image': `url(${gift.Serie.image})` }">
            <div class="giftedDetails">
              <br><br>
              <p class="tac">You have received this serie from {{gift.User.name}}</p>
              <br>
              <a href="claim" class="button" v-on:click.prevent="claim(gift.id)">Claim this series</a>
              <br><br><br><br>
            </div>
            <div class="text_Serie">
              <div class="fixw">
                <h1>{{ gift.Serie.name }}</h1>
                <p>{{ gift.Serie.text }}</p>
                <h3>{{ gift.Serie.release }}</h3>
              </div>
            </div>
          </div>
      </div>
    </div>
    <Footer ref="footer"></Footer>
  </div>
</template>

<script>

import Footer from '@/components/Footer'
import Mainbar from '@/components/Mainbar'
import axios from 'axios'

export default {
  name: 'Profile',
  data () {
    return {
      msg: 'social',
      isFloated: true,
      backgroundImage: this.$session.get('jwt').image || '',
      country: '',
      series: [],
      episodes: [],
      givegifts: [],
      gifts: [],
      changeEmail: false,
      activate: false
    }
  },
  notifications: {
    showError: {
      title: '',
      message: 'Failed to update',
      type: 'error'
    },
    showSuccess: {
      title: '',
      message: 'Update email successful',
      type: 'success'
    }
  },
  created () {
    // console.log('get countries', vm.$parent.countries['DE'])
    if (!this.$session.exists()) {
      this.$router.push('/')
    } else {
      this.fetchUser()
      this.getGifts()
      this.getAwayGifts()
    }
  },
  watch: {
    series: {
      handler (val) {
        // console.log('val', val)
      },
      deep: true
    }
  },
  methods: {
    claim: async function claim (giftid) {
      console.log(giftid)
      const vm = this
      const url = `${vm.$parent.root}/user/${vm.$session.get('jwt').id}/claim`
      try {
        const response = await axios.post(url, {giftid: giftid, userid: vm.$session.get('jwt').id})
        console.log(response)
        if (response.status === 200) {
          vm.fetchUser()
          vm.getGifts()
          vm.getAwayGifts()
        }
      } catch (e) {
        console.log('e', e.response.data)
        vm.errors.push(e)
      }
    },
    onInput: function onInput (object, e) {
      if (object.email !== e.currentTarget.value) {
        document.getElementById('thisone' + object.id).disabled = false
      } else {
        document.getElementById('thisone' + object.id).disabled = true
      }
      console.log(object.email, e.currentTarget.value)
    },
    classHandler: function classHandler (serie) {
      console.log(this, serie)
    },
    showForm: function showForm (e) {
      const form = e.currentTarget.parentNode.parentNode.parentNode.querySelector('form')
      if (form.style.display === 'none') {
        form.style.display = 'block'
      } else {
        form.style.display = 'none'
      }
    },
    submitEmail: async function submitEmail (e) {
      const vm = this
      const url = `${vm.$parent.root}/user/${vm.$session.get('jwt').id}/emailChange`
      const form = e.currentTarget
      const sendBody = {
        giftid: parseInt(form.querySelector("input[name='giftid']").value, 10),
        email: form.querySelector("input[name='email']").value
      }
      try {
        const response = await axios.post(url, sendBody)
        if (response.status === 200) {
          vm.getAwayGifts()
          document.getElementById('thisone' + sendBody.giftid).disabled = true
          vm.showSuccess({title: 'Success email change', message: `we just sent an email to ${sendBody.email}!`, timeout: 4000})
        }
      } catch (e) {
        console.log('e', e.response.data)
        vm.errors.push(e)
      }
    },
    getCountry: function getCountry (userCountry) {
      userCountry = userCountry || 'NL'
      return this.$parent.countries.find(function (country) { return country.text === userCountry })
    },
    getGifts: async function getGifts () {
      const vm = this
      if (vm.$session.get('jwt').id === parseInt(vm.$route.params.id, 10)) {
        const url = `${vm.$parent.root}/user/${vm.$session.get('jwt').id}/gifts`
        try {
          const response = await axios.get(url)
          vm.gifts = response.data
        } catch (e) {
          console.log('e', e.response.data)
          vm.errors.push(e)
        }
      }
    },
    getAwayGifts: async function getAwayGifts () {
      const vm = this
      if (vm.$session.get('jwt').id === parseInt(vm.$route.params.id, 10)) {
        const url = `${vm.$parent.root}/user/${vm.$session.get('jwt').id}/awaygifts`
        try {
          const response = await axios.get(url)
          vm.givegifts = response.data
        } catch (e) {
          console.log('e', e.response.data)
          vm.errors.push(e)
        }
      }
    },
    fetchUser: async function fetchUser () {
      const vm = this
      if (vm.$session.get('jwt').id === parseInt(vm.$route.params.id, 10)) {
        const url = `${vm.$parent.root}/user/${vm.$session.get('jwt').id}`
        try {
          const response = await axios.get(url)
          vm.$parent.user = response.data
          vm.backgroundImage = vm.$parent.user.image
          vm.series = response.data.Series
          vm.episodes = response.data.Episodes
          vm.$session.set('jwt', vm.$parent.user)
        } catch (e) {
          console.log('e', e.response.data)
          vm.errors.push(e)
        }
      } else {
        this.$router.push(`/`)
      }
    },
    triggerInput: function triggerInput () {
      const input = this.$el.getElementsByClassName('input-file')[0]
      input.click()
    },
    rating: async function rating (serieid, rate) {
      console.log(serieid, rate)
      let vm = this
      const data = {
        serieid: serieid,
        rate: rate
      }
      const posturl = `${vm.$parent.root}/user/${vm.$parent.user.id}/rating`
      try {
        const response = await axios.post(posturl, data)
        vm.series.forEach(function (serie) {
          if (serie.id === serieid) {
            serie.stars = rate
          }
        })
        console.log('response', response.data)
      } catch (e) {
        console.log('e', e.response.data)
        this.errors.push(e)
      }
    },
    filesChange: async function filesChange (file) {
      let vm = this
      let formData = new FormData()
      // console.log(file[0], file[0].name)
      formData.append('file', file[0])
      formData.append('upload_preset', vm.$parent.cloudinary.uploadPreset)
      formData.append('cloud_name', vm.$parent.cloudinary.cloudName)
      const url = `https://api.cloudinary.com/v1_1/${vm.$parent.cloudinary.cloudName}/upload`
      console.log(url, this.$parent.cloudinary.uploadPreset)
      try {
        const response = await axios.post(url, formData)
        console.log(response.data)
        vm.$parent.user.image = response.data.secure_url
        vm.backgroundImage = response.data.secure_url
        vm.$parent.user.public_id = response.data.public_id
        const posturl = `${vm.$parent.root}/user/${vm.$parent.user.id}`
        try {
          const postresponse = await axios.post(posturl, { image: vm.$parent.user.image })
          console.log('postresponse', postresponse.data)
        } catch (e) {
          console.log('e', e.response.data)
          this.errors.push(e)
        }
      } catch (e) {
        console.log('e', e.response.data)
        this.errors.push(e)
      }
      // formData.forEach((val, key) => {
      //   console.log(key, val)
      // })
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
.giftedDetails{
  background: rgba(0,0,0,0.4);
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 20px;
  form{
    margin-top: 50px;
  }
  p{
    margin: 0 auto;
    max-width: 550px;
  }
}

.therating{
  float: right;
  margin-right: 20px;
  h3{
    display: inline-block;
    color: #fff;
    opacity: 1;
  }
}
.rating {
  margin-left: 10px;
  display: inline-block;
  unicode-bidi: bidi-override;
  direction: rtl;
  text-align: center;
}
.rating > span {
  display: inline-block;
  position: relative;
  width: 1.1em;
  color: transparent;
  &:before{
    content: "\2605";
    position: absolute;
    left: 0; 
    color: #fff;
  }
}
.rating > span:hover,
.rating > span:hover ~ span {
  cursor: pointer;
}
.rating > span:hover:before,
.rating > span:hover ~ span:before {
   content: "\2605";
   position: absolute;
   left: 0; 
   color: #009fe3;
}
.rating > span.selected,
.rating > span.selected ~ span {
  color: transparent;
}
.rating > span.selected:before,
.rating > span.selected ~ span:before {
   content: "\2605";
   position: absolute;
   left: 0; 
   color: #009fe3;
}


.input-file{
  display: none;
}

.edit{
  display: block;
  background: #009fe3;
  border-radius: 100%;
  height: 55px;
  width: 55px;
  position: absolute;
  right: -20px;
  top: 5px;
  cursor: pointer;
  svg{
    position: relative;
    text-align: center;
    margin: 0 auto;
    margin-top: 2px;
    display: block !important;
  }
}

.profile{
  .innerStart{
    h1{
      margin: 50px 0 0 0;
    }
    h4{
      margin-top: 0;
    }
    margin: 0 0 0 0;
  }
}
.profilepic{
  position: relative;
  .circlepic{
    position: relative;
    max-width: 160px;
    height: 160px;
    border-radius: 100%;
    line-height: 180px;
    border:  5px solid white;
    margin: 0 auto;
    text-align: center;
    background-size: 100%;
    &.active{
      svg{
        display: none;
      }
    }
  }
}
.bio{
  max-width: 550px;
}
</style>
