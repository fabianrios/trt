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
        <h2 class="tac fwn upper" id="series"><b>Your</b> series</h2>
      </div>
      <div class="seriesshow">
        <div class="serie" v-for="serie in series" v-bind:style="{ 'background-image': `url(${serie.image})` }">
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
      series: []
    }
  },
  created () {
    // console.log('get countries', vm.$parent.countries['DE'])
    if (!this.$session.exists()) {
      this.$router.push('/')
    } else {
      this.fetchUser()
    }
  },
  methods: {
    getCountry: function getCountry (userCountry) {
      return this.$parent.countries.find(function (country) { return country.text === userCountry })
    },
    fetchUser: async function fetchUser () {
      const vm = this
      if (vm.$session.get('jwt').id === parseInt(vm.$route.params.id, 10)) {
        const url = `${vm.$parent.root}/user/${vm.$session.get('jwt').id}`
        try {
          const response = await axios.get(url)
          vm.$parent.user = response.data
          vm.backgroundImage = vm.$parent.user.image
          const seriesIndex = []
          vm.$parent.user.Episodes.forEach(function (episode) {
            if (seriesIndex.indexOf(episode.serie_id) === -1) {
              seriesIndex.push(episode.serie_id)
            }
          })
          vm.series = vm.$parent.series.filter((serie) => seriesIndex.indexOf(serie.id) !== -1)
          vm.$session.set('jwt', vm.$parent.user)
          console.log('Episodes: ', seriesIndex, vm.series)
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
