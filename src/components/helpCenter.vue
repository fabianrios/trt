<template>
  <div class="content">
    <Mainbar></Mainbar>
    
    <div class="main_series innerContent">
      <h1><b>Welcome to the</b> help center</h1>
      <p class="intro_series">
        We are eager to answer all your questions.
      </p>
    </div>

    <div class="innerText">
    <div class="articles">
      <h2 class="upper"><b>GENERAL</b> TRT TV</h2>
      <ul class="accordion">
        <!-- <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> WHAT IS TRT TV?</a></h3>
          <p>TRT TV offers a broad collection of inspiring and educative equine videos, which are structured in “series”. On the <router-link :to="{name: 'Hello'}"> landing page </router-link> you can see the highlighted series inside a slider. Also, you can scroll down and click “Browse Classes” in order to explore all available series. To purchase content, you click the blue button at the corresponding series or episode and follow the payment getaway process. After paying, your purchased content will be available for you to watch at any time.</p>
        </li> -->
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> HOW DOES TRT TV WORK?</a></h3>
          <p>TRT TV offers a broad collection of inspiring and educative equine videos, which are structured in “series”. On the <router-link :to="{name: 'Hello'}"> landing page </router-link> you can see the highlighted series inside a slider. Also, you can scroll down and click <router-link :to="{name: 'Series'}">Browse Classes</router-link> in order to explore all available series. To purchase content, you click the blue button at the corresponding series or episode and follow the payment getaway process. After paying, your purchased content will be available for you to watch at any time.</p>
        </li>
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> WHAT IS THE PURPOSE OF TRT TV?</a></h3>
          <p>The purpose of the platform is to inform, inspire and amuse people in the horse world. However, the relevance of content on TRT TV is not limited to only riders and trainers of horses. In fact, its content may also be relevant for equine experts, entrepreneurs and even unrelated peers. Content on TRT TV is meant to be used as passive consumption that is easy to access at any time and on any smart device. Read more about the roots of TRT TV and the team behind it<router-link :to="{name: 'About'}">here.</router-link></p>
        </li>
      </ul>
      <h2 class="upper"><b>CONTENT</b> ON THE PLATFORM</h2>
      <ul class="accordion">
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> WHAT CAN I WATCH ON TRT TV?</a></h3>
          <p>On TRT TV, you can find video content in diverse categories, from educative videos to funny and inspiring material. This content tries to give you as many different “insider” perspectives and insights in different stories, processes, events, places and professions in the horse world. </p>
        </li>
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> HOW OFTEN DOES THE NEW CONTENT RELEASE?</a></h3>
          <p>The TRT TV team is constantly busy with concepting and producing new content. Every few months, a new series is being filmed and released which will be announced on social media and other news channels. Upcoming content will appear on the platform as well before it releases - indicated by a thumbnail and a short description or trailer.</p>
        </li>
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> CAN I DISCOVER CONTENT BEFORE BUYING??</a></h3>
          <p>When you click a series, you can watch its trailer, see its thumbnail and read a description about the content. In this way, you know what to expect before purchasing. If you have additional questions about the content, you can always <router-link :to="{name: 'ContactUs'}">contact the team.</router-link></p>
        </li>
      </ul>
      <h2 class="upper"><b>MANAGING</b> YOUR ACCOUNT</h2>
      <ul class="accordion">
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> HOW DO I CREATE AN ACCOUNT?</a></h3>
          <p>In order to create an account, you click <a href="#login" v-scroll-to="'#login'" class="button upper">sign up</a> in the right top corner of the website. You will have the possibility to sign up using your e-mail address or your Facebook account. </p>
        </li>
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> CAN I LOG IN TO MY ACCOUNT ON MULTIPLE DEVICES? </a></h3>
          <p>Yes, you can access your personal account from any device, at any time and location in the world if there is internet connection. No external app or download is required - the platform just converts to a super light web-app on mobile screens.</p>
        </li>
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> WHAT IS NEEDED TO ACTIVATE MY ACCOUNT?</a></h3>
          <p>When you signed up, <router-link v-if="$parent.user.id" :to="{ name: 'Profile', params: { id: $parent.user.id }}">your account</router-link> <span v-else>your account</span> will be directly activated and you will be ready to log in at any time. If you signed up using your e-mail address, you will get a confirmation mail in your inbox whereas Facebook sign up only requires a verification click to get your personal data directly from your profile.</p>
        </li>
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> HOW CAN I RESET MY PASSWORD?</a></h3>
          <p>You can reset your personal password in the drop down menu under the my account icon on the top right corner of the website.</p>
        </li>
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> WHO IS ABLE TO SEE RATINGS THAT I GIVE TO SERIES AND EPISODES?</a></h3>
          <p>Ratings that you give to content is personal, these star ratings are thus only visible for yourself when you are logged in to your accou</p>
        </li>
      </ul>
      <h2 class="upper"><b>PAYING</b> AND TRT TV GIFTS</h2>
            <ul class="accordion">
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> WHAT PAYMENT METHODS DOES TRT TV SUPPORT?</a></h3>
          <p>TRT TV supports multiple payment methods to purchase content on its platform. You can pay with PayPal, Credit Card and iDeal.</p>
        </li>
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> HOW DO I PURCHASE A SERIES? </a></h3>
          <p>To purchase a series on TRT TV, you click on the blue button that is directly on the series page at the series description. This blue button either functions as a pre-enroll button or as a purchase button. In both cases, you will be redirected to the payment section, which will after completion unlock or offers access to the full series and all episodes inside it.</p>
        </li>
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> CAN I ALSO BUY ONE SPECIFIC EPISODE INSTEAD OF THE FULL SERIES?</a></h3>
          <p>Yes, to buy one specific episode inside a series, you scroll down on a series page until you see the different episodes that are inside that series. You can click the corresponding blue buttons for buying the single episodes.</p>
        </li>
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> HOW DO I ACCESS MY PURCHASED CONTENT?</a></h3>
          <p>The TRT Gift section is built to surprise people. Under the blue buttons for purchasing content, you can also click the gift function after which you will be asked to fill in the e-mail of the gift receiver. Make sure you fill in this e-mail correctly in order for the gift to correctly </p>
        </li>
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> CAN I GET MY MONEY BACK?</a></h3>
          <p>No, after purchasing content you can not get your money back. However, in case of any misunderstanding or inconvenience we might refund you with a platform voucher. For this to happen, some requirements needs to be met.</p>
        </li>
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> HOW DOES THE “TRT GIFT” WORK?</a></h3>
          <p>The TRT Gift section is built to surprise people. Under the blue buttons for purchasing content, you can also click the gift function after which you will be asked to fill in the e-mail of the gift receiver. Make sure you fill in this e-mail correctly in order for the gift to correctly </p>
        </li>
      </ul>
      <h2 class="upper"><b>RESOLVING</b> ISSUES</h2>
      <ul class="accordion">
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> WHY DOES TRT TV NOT WORK?</a></h3>
          <p>There are several influencers for the quality of using TRT TV. Starting with the internet connection, we recommend watching content on TRT TV with high speed internet (preferably Wi-Fi) to avoid lagging video and buffering time and to optimise the quality. Secondly, we recommend using TRT TV on the most popular and steady browsers: Safari, Chrome, FireFox or Internet Explorer. Other browsers might cause some problems in the interface and user experience of the platform. Thirdly, we recommend avoiding older devices to make sure that the full user experience and resolution of the platform is met. Under certain conditions, TRT TV might not be able to work optimally. From a technical point of view, the website and streaming should always be steady unless there is problems with the data bases - which is really unlikely to happen often. If there is still some bugs that you experience as a user, don’t hesitate to <router-link :to="{name: 'ContactUs'}">contact us</router-link> - in the end, you are the one that can help us improve our services.</p>
        </li>
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> WHY DOES MY PURCHASED CONTENT NOT APPEAR UNDER MY PROFILE? </a></h3>
          <p>If your purchased content does not appear under <router-link v-if="$parent.user.id" :to="{ name: 'Profile', params: { id: $parent.user.id }}">view your series</router-link> <span v-else>view your series</span>, you might need to check if the payment is fulfilled completely and if the full due amount has been deduced from your bank account. You might also need to refresh the page or clear your web browser’s cookies in order for the new content to appear under your profile. If you still do not receive the content that you paid for, contact us.</p>
        </li>
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> THE STREAMING QUALITY IS POOR, WHAT CAN I DO?</a></h3>
          <p>Crucial in this is the internet connection, we recommend watching content on TRT TV with high speed internet (preferably Wi-Fi) to avoid lagging video and buffering time and to optimise the quality. Also, you can try to clear your browser’s cache or cookies in order to get a more fluent video quality.</p>
        </li>
        <li>
          <h3 v-on:click="displayInfo"><a><icon name="plus" scale="1" class="plus"></icon> <icon name="minus" scale="1" class="minus"></icon> MY PERSONAL DETAILS ARE INCORRECT, HOW CAN I CHANGE THEM?</a></h3>
          <p>You can make any adjustments in your personal information by clicking <router-link v-if="$parent.user.id" :to="{ name: 'Profile', params: { id: $parent.user.id }}">your profile</router-link> <span v-else>your profile</span> in the drop down menu under the profile icon in the top right corner of the website. You can change your e-mail, password, address information and profile picture.</p>
        </li>
      </ul>
    </div>
    </div>

    <div class="heroText">
      <div class="innerHero">
        <h2 class="upper"><b>OTHER</b> ISSUES</h2> 
         <p class="tal">In case of any other questions, do not hesitate to get in touch with our customer support department. You can reach out to the team via the <router-link :to="{name: 'ContactUs'}">contact us</router-link> page. We try to get back to any enquiry within one working day.</p>
      </div>
    </div>
    
    <Footer></Footer>
  </div>
</template>

<script>

import Footer from '@/components/Footer'
import Mainbar from '@/components/Mainbar'

export default {
  name: 'Content',
  data () {
    return {
      msg: 'Content part'
    }
  },
  methods: {
    displayInfo: function displayInfo (e) {
      const _h = e.currentTarget
      const li = _h.parentNode
      for (var i = 0; i < li.parentNode.children.length; i++) {
        li.parentNode.children[i].children[0].classList.remove('active')
        li.parentNode.children[i].children[1].style.display = 'none'
      }
      li.lastChild.style.display = li.lastChild.style.display === 'block' ? 'none' : 'block'
      _h.className === 'active' ? _h.classList.remove('active') : _h.classList.add('active')
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
.accordion{
  li{
    a{
      cursor: pointer;
    }
    h3{
      &.active{
        .minus{
          display: inline-block;
        }
        .plus{
          display: none;
        }
      }
    }
    .minus{
      display: none;
    }
    p{
      display: none;
    }
  }
}

.main_series.innerContent{
  padding-bottom: 90px;
}

 .innerText{
   background: white;
   color: #000;
   padding: 100px 0;
  .articles{
    max-width: 750px;
    margin: 0 auto;
    padding:0 10px;
    @media only screen and (min-width: 768px) {
      padding:0;
    }
    img{
      width: 100%;
      margin: 30px 0;
    }
  }
 }
 
 h2{
   font-weight: 300;
 }

 .heroText{
   background: #f5f5f5;
   padding: 20px;
   .innerHero{
     max-width: 910px;
     margin: 0 auto;
     background: #fff;
     border: 1px solid #e6e6e6;
     padding: 20px;
     color: #000;
     text-align: center;
   }
   @media only screen and (min-width: 768px) {
     padding: 120px 0;
     .innerHero{
       padding: 50px 100px;
     }
   }
 }
</style>
