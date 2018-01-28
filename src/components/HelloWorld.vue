<template>
  <div class="hello">
    <mainbar></mainbar>
    <div class="main_series">
      <div class="maincontainer">
        <video :poster="$parent.mainseries.image" v-if="$parent.mainseries.video" :src="$parent.mainseries.video" loop id="teaser"></video>
        <div class="shadow" v-if="$parent.mainseries.video"></div>
        <div class="extrainfo" v-bind:class="{ onvideo: $parent.mainseries.video }">
          <div class="inside">
            <a class="play big" v-bind:class="{ novideo: $parent.mainseries.video }" v-on:click="playTeaser"></a>
            <h1>{{$parent.mainseries.name}}</h1>
            <p class="intro_series">
              {{$parent.mainseries.bio}}
            </p>
            <router-link class="button transparent" :to="'/serie/'+$parent.mainseries.id">Watch more</router-link>
          </div>
        </div>
      </div>
    </div>

    <br />
    <div class="slideBanner row">
      <a id="leftgone" href="" v-on:click.prevent="moveLeft"><span></span></a>
      <transition-group name="list" tag="ul" class="seriesList" v-on:before-enter="beforeEnter" v-on:before-leave="beforeLeave" v-on:enter="enter" v-on:leave="leave" v-bind:css="false">
        <li v-for="serie in $parent.series" v-bind:key="serie.id" v-bind:style="{'background-image':`url(${serie.image.split('upload')[0]}upload/c_thumb,w_265,h_185${serie.image.split('upload')[1]})`}" v-if="serie.publish">
          <a :href="'/#/serie/'+serie.id" v-on:mouseover.prevent="changeSeries($event, serie)" class="fixclick">
            <div class="contentbanner">
              <div class="promotext">
                <h3>{{serie.name}}</h3>
                <h5>Promo video</h5>
              </div>
            </div>
          </a>
        </li>
     </transition-group>
     <a href="" id="rightgone" v-on:click.prevent="moveRight"><span></span></a>
    </div>
    <div class="row">
      <div class="aboutHome">
        <div class="theimg">
          <img src="../assets/Laag762.jpg" alt="" width="351" height="498">
        </div>
        <div class="text">
          <h1><b>ABOUT</b> TRT TV</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur alias laborum veniam odio accusantium eius, quaerat dolor doloribus modi aliquam? Iste aliquam impedit obcaecati maxime eaque tenetur perferendis qui ratione.</p>
          <a href="" class="button transparent">continue reading</a>
          <!-- <a href="" class="button">complete order</a> -->
        </div>
      </div>
      <div class="inspireBanner">
        <h2>Inspire someone you love</h2>
        <h1 class="upper"><b>Give the gift</b> oF TRT TV</h1>
        <br />
        <router-link :to="{ name: 'Series' }" class="button multiply upper">browse series now</router-link>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

import Icon from 'vue-awesome/components/Icon'
import Footer from '@/components/Footer'
import Mainbar from '@/components/Mainbar'
import Velocity from 'velocity-animate'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      playing: false,
      side: true,
      x: 50,
      speed: 200,
      sc: 0.9
    }
  },
  methods: {
    beforeEnter: function (el) {
      const x = this.x
      if (this.side) {
        Velocity(el, { translateX: `${x}px`, opacity: 0, scale: this.sc }, { duration: this.speed, easing: 'ease-in', iterations: 1 })
      } else {
        Velocity(el, { translateX: `-${x}px`, opacity: 0, scale: this.sc }, { duration: this.speed, easing: 'ease-in', iterations: 1 })
      }
    },
    beforeLeave: function (el) {
      const x = this.x
      if (this.side) {
        Velocity(el, { translateX: `-${x}px`, opacity: 1, scale: this.sc }, { duration: this.speed, easing: 'ease-in', iterations: 1 })
      } else {
        Velocity(el, { translateX: `${x}px`, opacity: 1, scale: this.sc }, { duration: this.speed, easing: 'ease-in', iterations: 1 })
      }
    },
    enter: function enter (el, done) {
      if (this.side) {
        Velocity(el, { translateX: '0px', opacity: 1, scale: 1 }, { complete: done })
      } else {
        Velocity(el, { translateX: '0px', opacity: 1, scale: 1 }, { complete: done })
      }
    },
    leave: function leave (el, done) {
      const x = this.x
      if (this.side) {
        Velocity(el, { translateX: `-${x}px`, opacity: 0 }, { complete: done })
      } else {
        Velocity(el, { translateX: `${x}px`, opacity: 0 }, { complete: done })
      }
    },
    moveLeft: function moveLeft () {
      const b = this.$parent.series[0]
      this.$parent.series.shift()
      this.side = true
      setTimeout(() => {
        this.$parent.series.push(b)
      }, this.speed)
    },
    moveRight: function moveRight () {
      const b = this.$parent.series[this.$parent.series.length - 1]
      this.$parent.series.pop()
      this.side = false
      setTimeout(() => {
        this.$parent.series.unshift(b)
      }, this.speed)
    },
    playTeaser: function playTeaser (e) {
      const teaser = document.getElementById('teaser')
      this.playing = !this.playing
      if (this.playing) {
        teaser.play()
        Velocity(e.currentTarget, { scale: this.sc, opacity: 0.1 }, { duration: this.speed - 100, easing: 'ease-in', iterations: 1 })
        e.currentTarget.classList.add('pause')
        Velocity(e.currentTarget, { scale: 1, opacity: 1 }, { duration: this.speed - 50, easing: 'ease-in', iterations: 1 })
      } else {
        teaser.pause()
        Velocity(e.currentTarget, { scale: this.sc, opacity: 0.1 }, { duration: this.speed - 100, easing: 'ease-in', iterations: 1 })
        e.currentTarget.classList.remove('pause')
        Velocity(e.currentTarget, { scale: 1, opacity: 1 }, { duration: this.speed - 50, easing: 'ease-in', iterations: 1 })
      }
    },
    changeSeries: function changeSeries (e, serie) {
      this.$parent.mainseries = serie
      this.playing = false
    }
  },
  components: {
    Icon,
    Footer,
    Mainbar,
    Velocity
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
