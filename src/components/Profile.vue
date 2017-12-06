<template>
  <div class="profile">
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
        <h1 class="tac fwn upper"> {{user.name}} </h1>
        <h4 class="tac upper fwn">{{user.address}} • {{country.value}}</h4>
        <p class="tac bio">{{user.bio}}</p>
        <br />
        <h2 class="tac fwn upper"><b>Your</b> series</h2>
      </div>
      <div class="seriesshow">
        <div class="serie" v-for="serie in series" v-bind:style="{ 'background-image': `url(${serie.image})` }">
          <div class="text_Serie">
            <div class="fixw">
              <h1>{{ serie.name }}</h1>
              <p>{{ serie.text }}</p>
              <h3>COMING SPRING 2017</h3>
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
      backgroundImage: '',
      country: '',
      user: {},
      series: [{
        name: 'World of dressage',
        image: 'https://res.cloudinary.com/trt-tv/image/upload/v1511523784/assets/Worldofdressage.jpg',
        text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultrconsectetur. Maecenas sed diam eget risus varius blandit sit amet non magna.'
      },
      {
        name: 'Brett kidding',
        image: 'https://res.cloudinary.com/trt-tv/image/upload/v1511523784/assets/Brettkidding.jpg',
        text: 'Parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultrconsectetur. Maecenas sed diam eget risus varius blandit sit amet non magna. lorem'
      }
      ]
    }
  },
  async created () {
    const vm = this
    // console.log('get countries', vm.$parent.countries['DE'])
    if (!this.$session.exists()) {
      this.$router.push('/')
    } else {
      if (this.$session.get('jwt').id === parseInt(this.$route.params.id, 10)) {
        const url = `${vm.$parent.root}/user/${this.$session.get('jwt').id}`
        try {
          const response = await axios.get(url)
          vm.user = response.data
          vm.backgroundImage = vm.user.image
          vm.country = vm.$parent.countries.find(function (country) { return country.text === vm.user.country })
        } catch (e) {
          console.log('e', e.response.data)
          vm.errors.push(e)
        }
      } else {
        this.$router.push(`/`)
      }
    }
  },
  methods: {
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
        vm.user.image = response.data.secure_url
        vm.backgroundImage = response.data.secure_url
        vm.user.public_id = response.data.public_id
        console.log(vm.user)
        const posturl = `${vm.$parent.root}/user/${vm.user.id}`
        try {
          const postresponse = await axios.post(posturl, { image: vm.user.image })
          console.log('postresponse', postresponse.data)
        } catch (e) {
          console.log('e', e.response.data)
          this.errors.push(e)
        }
      } catch (e) {
        console.log('e', e.response.data)
        this.errors.push(e)
      }
      formData.forEach((val, key) => {
        console.log(key, val)
      })
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
    margin-top: 9px;
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
    margin: 130px 0 0 0;
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
