<template>
  <div class="adminepisodes">
    <Mainbar v-bind:class="{ static: isFloated }"></Mainbar>
    <div class="row">
      <h2 class="tac upper fwn"><b>Create</b> a episode</h2>
      <div class="center-form">
        <form v-on:submit.prevent="onCreateEpisode" method="POST">
          <label for="publish">
            Published ?
            <input type="checkbox" name="publish" id="publish">
          </label>
          <input type="text" name="name" id="name" placeholder="Name of the episode" required>
          <img src="" alt="" class="thumb">
          <label for="file">Image: </label>
          <input type="file" name="file" id="file">
          <input type="text" name="price" id="price" placeholder="Price in unformated numbers" required>
          <label for="video">Video URL: </label>
          <input type="text" name="video" id="video" placeholder="Full URL of the video" required>
          <label for="release">Release date: </label>
          <input type="date" name="release" id="release" placeholder="release date">
          <label for="serie_id">Serie: </label>
          <select name="serie_id">
            <option v-for="serie in $parent.series" v-bind:value="serie.id" v-bind:key="serie.id">
              {{serie.name.toLowerCase()}}
            </option>
          </select>
          <textarea name="bio" id="bio" cols="30" rows="10" placeholder="Description"></textarea>
          <button class="button upper">Create</button>
        </form>
      </div>
      <modal v-if="showModal" @close="showModal = false">
        <h4 class="upper tac fwn" slot="header"><b>Edit</b> {{editepisode.name}}</h4>
        <div slot="body">
          <form v-on:submit.prevent="onPushEpisode" method="POST">
            <label for="publish">
              Published ?
              <input type="checkbox" name="publish" id="publish" :checked="editepisode.publish">
            </label>
            <input type="text" name="name" id="name" placeholder="Name of the episode" required :value="editepisode.name">
            <img :src=" `${editepisode.image.split('upload')[0]}upload/c_thumb,h_100,w_100${editepisode.image.split('upload')[1]}` " alt="">
            <br />
            <label for="file">Image: </label>
            <input type="file" name="file" id="file">
            <input type="text" name="price" id="price" placeholder="Price" :value="editepisode.price" required>
            <label for="video">Video URL: </label>
            <input type="text" name="video" id="video" placeholder="Full URL of the video" :value="editepisode.video" required>
            <input type="hidden" name="id" id="id" placeholder="id" :value="editepisode.id">
            <input type="date" name="release" id="release" placeholder="Promo release" :value="new Date(editepisode.release).toISOString().substring(0, 10)">
            <label for="serie_id">Serie: </label>
            <select name="serie_id" v-model="editepisode.serie_id">
            <option v-for="serie in $parent.series" v-bind:value="serie.id" v-bind:key="serie.id">
              {{serie.name.toLowerCase()}}
            </option>
            </select>
            <textarea name="bio" id="bio" cols="30" rows="10" placeholder="Description" :value="editepisode.bio"></textarea>
            <button class="button expand upper">Update</button>
          </form>
        </div>
      </modal>
      <br />
      <h2 class="fwn tac upper"><b>List</b> of Episodes</h2>
      <div class="right">
          <select name="serie_id" @change="getEpisodes($event.target.value);">
            <option v-for="serie in $parent.series" v-bind:value="serie.id" v-bind:key="serie.id">
              {{serie.name.toLowerCase()}}
            </option>
          </select>
      </div>
       <div class="slideBanner row">
      <a id="leftgone" href=""><span></span></a>
      <ul class="seriesList">
      <li v-for="episode in episodes" v-bind:style="{'background-image':`url(${episode.image.split('upload')[0]}upload/c_thumb,w_265,h_185${episode.image.split('upload')[1]})`}" v-bind:key="episode.id">
        <a href="edit" v-on:click.prevent="onEditEpisode(episode)" class="edit"><icon name="pencil" scale="2"></icon></a>
        <div class="contentbanner">
          <router-link :to="'/episode/'+episode.id"><span class="logo"></span>
          <div class="promotext">
            <h3>{{episode.name}}</h3>
            <h5>Promo video</h5>
          </div>
          </router-link>
        </div>
      </li>
     </ul>
     <a href="" id="rightgone"><span></span></a>
    </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>

import Footer from '@/components/Footer'
import Mainbar from '@/components/Mainbar'
import Modal from '@/components/Modal'
import axios from 'axios'

export default {
  name: 'adminseries',
  data () {
    return {
      msg: 'social',
      isFloated: true,
      episodes: {},
      editepisode: {},
      showModal: false
    }
  },
  created () {
    // console.log('get countries', vm.$parent.countries['DE'])
    if (!this.$session.exists()) {
      this.$router.push('/')
    } else {
      this.$parent.isAdmin()
    }
  },
  methods: {
    onPushEpisode: function onPushEpisode (e) {
      const form = e.currentTarget
      const sendBody = this.$parent.parseBody(form)
      console.log(sendBody)
      if (sendBody.hasOwnProperty('file')) {
        this.uploadImage(sendBody, false)
      } else {
        this.updateEpisode(sendBody)
      }
    },
    updateEpisode: async function updateEpisode (body) {
      const vm = this
      const posturl = `${vm.$parent.root}/episode/${body.id}/update`
      try {
        const postresponse = await axios.post(posturl, body)
        for (let i in vm.episodes) {
          if (parseInt(vm.episodes[i].id, 10) === parseInt(body.id, 10)) {
            vm.episodes[i] = postresponse.data
          }
        }
        vm.showModal = false
        // console.log('postresponse', postresponse.data, vm.$parent.series)
      } catch (e) {
        console.log('e', e.response.data)
        vm.errors.push(e)
      }
    },
    onEditEpisode: function onEditEpisode (episode) {
      // console.log('onEditepisode', typeof episode.release, new Date(episode.release).toISOString().substring(0, 10))
      this.editepisode = episode
      this.showModal = true
    },
    onCreateEpisode: function onCreateSerie (e) {
      const vm = this
      const form = e.currentTarget
      const sendBody = vm.$parent.parseBody(form)
      if (sendBody.hasOwnProperty('file')) {
        vm.uploadImage(sendBody, true)
      } else {
        vm.createEpisode(sendBody)
      }
    },
    uploadImage: async function uploadImage (body, create) {
      const vm = this
      const url = `https://api.cloudinary.com/v1_1/${vm.$parent.cloudinary.cloudName}/upload`
      let formData = new FormData()
      formData.append('file', body.file[0])
      formData.append('upload_preset', 'series_cover')
      formData.append('cloud_name', vm.$parent.cloudinary.cloudName)
      //  formData.forEach((val, key) => {
      //  console.log(key, val)
      // })
      let config = {
        onUploadProgress: progressEvent => {
          let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
          vm.$parent.progressWidth = percentCompleted
          if (percentCompleted >= 100) {
            vm.$parent.progressColor = '#009fe3'
            setTimeout(() => {
              vm.$parent.progressWidth = 0
              vm.$parent.progressColor = 'orange'
            }, 1000)
          }
        }
      }
      try {
        const response = await axios.post(url, formData, config)
        console.log('response.data', response.data)
        body['image'] = response.data.secure_url
        if (create) {
          vm.createEpisode(body)
        }
      } catch (e) {
        console.log('error', e.response.data)
        this.errors.push(e)
      }
    },
    getEpisodes: async function getEpisodes (serie) {
      const vm = this
      const posturl = `${vm.$parent.root}/serie/${serie}/episodes`
      console.log(posturl)
      try {
        const response = await axios.get(posturl)
        vm.episodes = response.data
        console.log('getEpisodes', response.data)
      } catch (e) {
        console.log('error: ', e.response.data)
        vm.$parent.errors.push(e)
      }
    },
    createEpisode: async function createSerie (body) {
      const vm = this
      const posturl = `${vm.$parent.root}/episode`
      try {
        const postresponse = await axios.post(posturl, body)
        console.log('postresponse: ', postresponse.data)
      } catch (e) {
        console.log('error postresponse', e.response.data)
        vm.$parent.errors.push(e)
      }
    }
  },
  components: {
    Footer,
    Mainbar,
    Modal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
