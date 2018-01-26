<template>
  <div class="aserie">
    <Mainbar v-bind:class="{ static: isFloated }" ref="mainBar"></Mainbar>
    <div class="main_series" v-bind:style="{ 'background-image': `url(${serie.image})` }">
      <a href="" v-scroll-to="'#episodes'" class="play big"></a>
      <h1>{{serie.name}}</h1>
      <p class="intro_series">
        {{serie.bio}}
      </p>
      <h3 class="upper">{{serie.release}}</h3>
    </div>
    <div class="row">
      <div class="promotion">
        <ul>
          <li>
            <icon name="play-circle-o" scale="4"></icon>
            <h3 class="upper fwn"><b>{{episodes.length}}</b> VIDEOS</h3>
            <p class="tac">Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh.</p>
          </li>
          <li>
            <icon name="heart-o" scale="4"></icon>
            <h3 class="upper fwn"><b>100%</b> EXCLUSIVE</h3>
            <p class="tac">Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh.</p>
          </li>
          <li>
            <icon name="star-o" scale="4"></icon>
            <h3 class="fwn"><b>€ {{serie.price}}</b> <small class="upper">life time access {{$parent.user.id}} {{serie.payed}}</small></h3>
            <a v-if="serie.payed !== true && $parent.user.id" :href="'http://www.trt-tv.eu/order/'+serie.id+'/'+$parent.user.id+'/create'" class="button">Pre-enroll</a>
            <a href="log in" v-else-if="serie.payed !== true && $parent.user.id" v-on:click="$refs.mainBar.showThemodal($event, 'login')" class="button">Pre-enroll</a>
            <a v-if="$parent.user.id" href="" class="button transparent" id="gagift" v-on:click.prevent="showModalfx()">Give as a gift</a>
          </li>
        </ul>
      </div>
      <br />
      <br />
      <br />
      <div class="aboutHome">
        <div class="theimg">
          <img src="http://res.cloudinary.com/trt-tv/image/upload/v1513698826/assets/behindguy.png" alt="" width="554" height="660">
        </div>
        <div class="text">
          <h2 class="fwn"><b>ABOUT</b> {{serie.name}}</h2>
          <p>{{serie.bio}}</p>
        </div>
      </div>
      <br />
      <br />
      <h2 class="fwn tac upper" v-if="episodes.length > 0"><b>The</b> Episodes</h2>
      <ul class="episodes" id="episodes">
        <li  v-for="episode in episodes">
          <div class="episode_box">
            <div class="eimage">
              <img v-if="episode.image" :src="`${episode.image.split('upload')[0]}upload/c_thumb,w_255,h_255${episode.image.split('upload')[1]}`" alt="">
              <router-link v-if="episode.payed === true || serie.payed === true" :to="'/episode/'+episode.id" class="play normalize"></router-link>
              <div class="hoverish"></div>
            </div>
            <div class="etext">
              <router-link :to="'/episode/'+episode.id"><h3 class="upper fwn"><b>{{episode.name}}</b> {{serie.name}}</h3></router-link>
              <p>{{episode.bio}}</p>
              <a v-if="episode.payed !== true && serie.payed !== true" :href="'http://www.trt-tv.eu/order/'+episode.id+'/'+$parent.user.id+'/episode_create'" class="button right">Get episode €{{episode.price}}</a>
            </div>
          </div>
        </li>
      </ul>
      <h2 class="fwn tac upper"><b>The</b> Series</h2>
      <div class="slideBanner row">
        <a id="leftgone" href="" v-on:click.prevent="moveLeft"><span></span></a>
        <transition-group name="list" tag="ul" class="seriesList"  v-on:enter="enter" v-on:leave="leave" v-bind:css="false">
          <li v-for="serie in $parent.series" v-bind:key="serie.id" v-bind:style="{'background-image':`url(${serie.image.split('upload')[0]}upload/c_thumb,w_265,h_185${serie.image.split('upload')[1]})`}" v-if="serie.publish">
            <a :href="'/#/serie/'+serie.id" class="fixclick">
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
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <h2 class="upper tac fwn" slot="header"><b>Give</b> as a gift</h2>
      <div slot="body">
        <form v-on:submit.prevent="submitGift" method="POST">
          <input type="email" name="email" id="email" placeholder="friend email">
          <div class="ext">
            <button class="button" id="thisone"> Order now</button>
          </div>
        </form>
        <br><br>
      </div>
    </modal>
    <Footer></Footer>
  </div>
</template>

<script>

import Footer from '@/components/Footer'
import Mainbar from '@/components/Mainbar'
import Modal from '@/components/Modal'
import axios from 'axios'

export default {
  name: 'Serie',
  data () {
    return {
      msg: 'social',
      isFloated: false,
      showModal: false,
      serie: {},
      episodes: {},
      side: true,
      x: 50,
      speed: 200
    }
  },
  created () {
    this.getSerie()
  },
  watch: {
    // call again the method if the route changes
    '$route': ['getSerie']
  },
  methods: {
    showModalfx: function showModalfx () {
      this.showModal = true
    },
    submitGift: async function submitGift (e) {
      const vm = this
      const url = `${vm.$parent.root}/order/${vm.serie.id}/${vm.$parent.user.id}/create`
      const form = e.currentTarget
      const sendBody = {
        email: form.querySelector("input[name='email']").value
      }
      try {
        const response = await axios.post(url, sendBody)
        console.log(response.data)
        if (response.status === 200) window.location.href = response.data.links.paymentUrl
      } catch (e) {
        console.log('e', e.response.data)
        vm.errors.push(e)
      }
    },
    enter: function enter (el, done) {
      const x = this.x
      const trans = this.side ? [{ transform: `translateX(${x}px)`, opacity: 0 }, { transform: 'translateX(0px)', opacity: 1 }] : [{ transform: `translateX(-${x}px)`, opacity: 0 }, { transform: 'translateX(0px)', opacity: 1 }]
      el.animate(trans, {
        duration: this.speed,
        iterations: 1,
        easing: 'ease-in'
      })
    },
    leave: function leave (el, done) {
      const x = this.x
      const trans = this.side ? [{ transform: 'translateX(0)', opacity: 1 }, { transform: `translateX(-${x}px)`, opacity: 0 }] : [{ transform: 'translateX(0)', opacity: 1 }, { transform: `translateX(${x}px)`, opacity: 0 }]
      el.animate(trans, {
        duration: this.speed,
        iterations: 1,
        easing: 'ease-out'
      })
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
    getSerie: async function getSerie () {
      const vm = this
      const url = `${vm.$parent.root}/serie/${vm.$route.params.id}`
      // console.log(vm.$refs.mainBar)
      try {
        const response = await axios.get(url)
        vm.serie = response.data
        vm.episodes = response.data.Episodes
        const seriesIndex = []
        // console.log(vm.$parent.user.Series, vm.$parent.user.Episodes, vm.serie)
        vm.$parent.user.Episodes.forEach(function (episode) {
          seriesIndex.push(episode.id)
        })
        vm.$parent.user.Series.forEach(function (userSerie) {
          if (userSerie.id === vm.serie.id) {
            vm.serie['payed'] = true
          }
        })
        vm.episodes.forEach(function (episode) {
          if (seriesIndex.indexOf(episode.id) !== -1) {
            episode['payed'] = true
          }
        })
        // console.log(seriesIndex, 'vm.episodes', vm.episodes, vm.serie)
      } catch (e) {
        console.log('e', e.response.data)
        vm.errors.push(e)
      }
    }
  },
  components: {
    Footer,
    Modal,
    Mainbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.aboutHome{
  max-width: 1000px;
  margin: 0 auto;
  .theimg{
    width: 30%;
    img{
      max-width: 400px;
      height: auto;
    }
  }
  .text{
    float: right;
    width: 50%;
  }
}

.promotion{
  margin-top: 80px;
  h3{
    font-size: 31px;
  }
  ul{
    padding: 0;
    margin: 0 auto;
    text-align: center;
    li{
      padding: 10px 20px;
      display: inline-block;
      width: 28%;
      vertical-align: top;
      &:nth-of-type(2){
        border: 1px solid #3B3B3B;
        border-top: 0;
        border-bottom: 0;
      }
      p{
        color: #555555;
      }
    }
  }
}

.episodes{
  max-width: 950px;
  margin: 0 auto;
  .episode_box{
    position: relative;
    margin-bottom: 10px;
  }
  .eimage{
    position: relative;
    display: inline-block;
    width: 26%;
    height: 255px;
    .play{
      position: absolute;
      top: 35%;
      left: 90px;
      z-index: 99999;
    }
    .hoverish{
      height: 155px;
      width: 255px;
      position: absolute;
      bottom: 0;
      z-index: 9999;
    }
    &:hover{
      .hoverish{
        background: -moz-linear-gradient(top, rgba(153,153,153,0) 0%, rgba(153,153,153,0.12) 15%, rgba(0,159,227,0.8) 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top, rgba(153,153,153,0) 0%,rgba(153,153,153,0.12) 15%,rgba(0,159,227,0.8) 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, rgba(153,153,153,0) 0%,rgba(153,153,153,0.12) 15%,rgba(0,159,227,0.8) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00999999', endColorstr='#cc1aeddc',GradientType=0 ); /* IE6-9 */
      }
    }
  }
  .etext{
    display: inline-block;
    padding: 30px;
    width: 70%;
    background: #fff;
    color: #000;
    vertical-align: top;
    height: 255px;
  }
}

#gagift{
  margin-top: 5px;
  border: 0;
}

.main_series{
  p{
    padding-bottom: 0;
  }
  h3{
    padding-bottom: 20px;
  }
}
</style>
