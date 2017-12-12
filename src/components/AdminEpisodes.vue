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
            <option v-for="serie in $parent.series" v-bind:value="serie.id">
              {{serie.name.toLowerCase()}}
            </option>
          </select>
          <textarea name="bio" id="bio" cols="30" rows="10" placeholder="Description"></textarea>
          <button class="button upper">Create</button>
        </form>
      </div>
      <!-- <modal v-if="showModal" @close="showModal = false">
        <h4 class="upper tac fwn" slot="header"><b>Edit</b> {{editserie.name}}</h4>
        <div slot="body">
          <form v-on:submit.prevent="onPushSerie" method="POST">
            <label for="publish">
              Published ?
              <input type="checkbox" name="publish" id="publish" :checked="editserie.publish">
            </label>
            <input type="text" name="name" id="name" placeholder="Name of the series" required :value="editserie.name">
            <img :src=" `${editserie.image.split('upload')[0]}upload/c_thumb,h_100,w_100${editserie.image.split('upload')[1]}` " alt="">
            <br />
            <label for="file">Image: </label>
            <input type="file" name="file" id="file">
            <input type="text" name="price" id="price" placeholder="Price" :value="editserie.price" required>
            <input type="hidden" name="id" id="id" placeholder="id" :value="editserie.id">
            <input type="text" name="release" id="release" placeholder="Promo release" :value="editserie.release">
            <textarea name="bio" id="bio" cols="30" rows="10" placeholder="Description" :value="editserie.bio"></textarea>
            <button class="button expand upper">Update</button>
          </form>
        </div>
      </modal> -->
      <br />
      <h2 class="fwn tac upper"><b>List</b> of Episodes</h2>
      <div class="right">
          <select name="serie_id" @change="getEpisodes($event.target.value);">
            <option v-for="serie in $parent.series" v-bind:value="serie.id">
              {{serie.name.toLowerCase()}}
            </option>
          </select>
      </div>
       <div class="slideBanner row">
      <a id="leftgone" href=""><span></span></a>
      <ul class="seriesList">
      <li v-for="episode in episodes" v-bind:style="{'background-image':`url(${episode.image.split('upload')[0]}upload/c_thumb,w_265,h_185${episode.image.split('upload')[1]})`}">
        <div class="contentbanner">
          <div class="promotext">
            <h3>{{episode.name}}</h3>
            <h5>Promo video</h5>
          </div>
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
      // editserie: {},
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
    getEpisodes: async function getEpisodes (serie) {
      const vm = this
      const posturl = `${vm.$parent.root}/serie/${serie}/episodes`
      console.log(posturl)
      try {
        const response = await axios.get(posturl)
        vm.episodes = response.data
        console.log('e', response.data)
      } catch (e) {
        console.log('e', e.response.data)
        vm.$parent.errors.push(e)
      }
    },
    createEpisode: async function createSerie (body) {
      const vm = this
      const posturl = `${vm.$parent.root}/episode`
      console.log(body, posturl)
      try {
        const postresponse = await axios.post(posturl, body)
        // vm.$parent.episodes.unshift(postresponse.data)
        console.log('e', postresponse.data)
      } catch (e) {
        console.log('e', e.response.data)
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
