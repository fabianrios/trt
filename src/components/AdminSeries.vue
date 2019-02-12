<template>
  <div class="adminseries">
    <Mainbar v-bind:class="{ static: isFloated }"></Mainbar>
    <div class="row">
      <h2 class="tac upper fwn"><b>Create</b> a serie</h2>
      <div class="center-form">
        <form v-on:submit.prevent="onCreateSerie" method="POST">
          <label for="publish">
            Published ?
            <input type="checkbox" name="publish" id="publish">
          </label>
          <input type="text" name="name" id="name" placeholder="Name of the series" required>
          <img src="" alt="" class="thumb">
          <label for="file">Image: </label>
          <input type="file" name="file" id="file">
          <input type="text" name="price" id="price" placeholder="Price in unformated numbers" required>
          <input type="text" name="video" id="video" placeholder="Trailer">
          <input type="text" name="release" id="release" placeholder="Promo release">
          <textarea name="bio" id="bio" cols="30" rows="10" placeholder="Description"></textarea>
          <textarea name="firstrow" id="firstrow" cols="30" rows="10" placeholder="Description in video"></textarea>
          <textarea name="secondrow" id="secondrow" cols="30" rows="10" placeholder="Description in 100% exclusive"></textarea>
          <input type="text" name="sideimage" id="sideimage" placeholder="Image URL">
          <textarea name="paragraph" id="paragraph" cols="30" rows="10" placeholder="Description in next to image"></textarea>
          <button class="button upper">Create</button>
        </form>
      </div>
      <modal v-if="showModal" @close="showModal = false">
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
            <input type="text" name="video" id="video" placeholder="Trailer" :value="editserie.video" required>
            <input type="hidden" name="id" id="id" placeholder="id" :value="editserie.id">
            <input type="text" name="release" id="release" placeholder="Promo release" :value="editserie.release">
            <textarea name="bio" id="bio" cols="30" rows="10" placeholder="Description" :value="editserie.bio"></textarea>
            <textarea name="firstrow" id="firstrow" cols="30" rows="10" placeholder="Description in video" :value="editserie.firstrow"></textarea>
            <textarea name="secondrow" id="secondrow" cols="30" rows="10" placeholder="Description in 100% exclusive" :value="editserie.secondrow"></textarea>
            <input type="text" name="sideimage" id="sideimage" placeholder="Side image URL" :value="editserie.sideimage">
            <textarea name="paragraph" id="paragraph" cols="30" rows="10" placeholder="Description in next to image" :value="editserie.paragraph"></textarea>
            <button class="button expand upper">Update</button>
          </form>
        </div>
      </modal>
      <br />
      <h2 class="fwn tac upper"><b>List</b> of series</h2>
      <div class="seriesshow">
        <div class="serie admin" v-for="serie in $parent.series" v-bind:style="{ 'background-image': `url(${serie.image})` }" v-bind:key="serie.id">
          <a href="edit" v-on:click.prevent="onEditSerie(serie)" class="edit"><icon name="pencil" scale="2"></icon></a>
          <a href="feature" v-on:click.prevent="onFeatureSerie(serie.id)" v-bind:class="[{selected: $parent.mainseries.id === serie.id}, 'feature']" ><icon name="star" scale="2"></icon></a>
          <div class="text_Serie">
            <div class="fixw">
              <h2>{{ serie.name }}</h2>
              <p>{{ serie.text }}</p>
              <h3>{{ serie.release }}</h3>
            </div>
          </div>
        </div>
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
      editserie: {},
      showModal: false
    }
  },
  created () {
    if (!this.$session.exists()) {
      this.$router.push('/')
    } else {
      this.$parent.isAdmin()
    }
  },
  methods: {
    onPushSerie: function onPushSerie (e) {
      const form = e.currentTarget
      const sendBody = this.$parent.parseBody(form)
      if (sendBody.hasOwnProperty('file')) {
        this.uploadImage(sendBody, false)
      } else {
        this.updateSerie(sendBody)
      }
    },
    onFeatureSerie: async function onFeatureSerie (id) {
      const vm = this
      const url = `${vm.$parent.root}/dashboard/1/update`
      const sendBody = {
        main_serie_id: id
      }
      try {
        const response = await axios.post(url, sendBody)
        vm.$parent.mainseries = response.data
      } catch (e) {
        console.log('e', e.response.data)
        vm.errors.push(e)
      }
    },
    onEditSerie: function onEditSerie (serie) {
      this.editserie = serie
      this.showModal = true
    },
    onCreateSerie: function onCreateSerie (e) {
      const vm = this
      const form = e.currentTarget
      const sendBody = vm.$parent.parseBody(form)
      console.log(sendBody, vm.$parent.progressWidth)
      if (sendBody.hasOwnProperty('file')) {
        vm.uploadImage(sendBody, true)
      } else {
        vm.createSerie(sendBody)
      }
    },
    updateSerie: async function updateSerie (body) {
      const vm = this
      const posturl = `${vm.$parent.root}/serie/${body.id}/update`
      try {
        const postresponse = await axios.post(posturl, body)
        for (let i in vm.$parent.series) {
          if (parseInt(vm.$parent.series[i].id, 10) === parseInt(body.id, 10)) {
            vm.$parent.series[i] = postresponse.data
          }
        }
        vm.showModal = false
        // console.log('postresponse', postresponse.data, vm.$parent.series)
      } catch (e) {
        console.log('e', e.response.data)
        vm.errors.push(e)
      }
    },
    createSerie: async function createSerie (body) {
      const vm = this
      const posturl = `${vm.$parent.root}/serie`
      try {
        const postresponse = await axios.post(posturl, body)
        console.log('postresponse', postresponse.data)
        vm.$parent.series.unshift(postresponse.data)
      } catch (e) {
        console.log('e', e.response.data)
        vm.errors.push(e)
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
          // console.log(vm.$parent.progressWidth, percentCompleted)
        }
      }
      try {
        const response = await axios.post(url, formData, config)
        console.log(response.data)
        body['image'] = response.data.secure_url
        if (create) {
          vm.createSerie(body)
        } else {
          vm.updateSerie(body)
        }
      } catch (e) {
        console.log('e', e.response.data)
        this.errors.push(e)
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
