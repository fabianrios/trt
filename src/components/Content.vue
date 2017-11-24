<template>
  <div class="content">
    <Mainbar></Mainbar>
    
    <div class="main_series innerContent">
      <h1><b>Content page</b> example</h1>
      <p class="intro_series">
        Cum sociis natoque penatibus et magnis dis parturient montes,
      </p>
    </div>

    <div class="innerText">
    <div class="articles">
      <h2 class="upper"><b>Sub</b> Title</h2>
      <p><b>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus.</b></p> 
      <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo. Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Etiam porta sem malesuada magna mollis euismod. Vestibulum id ligula porta felis euismod semper.</p>

      <img src="../assets/innercontent.png" alt="contenHorse">
      <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus.</p>
      <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Cras mattis consectetur purus sit amet fermentum.</p>
    </div>
    </div>

    <div class="heroText">
      <div class="innerHero">
        <h2 class="upper"><b>content</b> Ticker</h2> 
         <p>At my stable, I train horses from the beginning to Grand Prix, teach students who are competing at international level and give demonstrations and clinics all over the world about my own developed TRT method.</p>
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
  components: {
    Footer,
    Mainbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

 .innerText{
   background: white;
   color: #000;
   padding: 100px 0;
  .articles{
    max-width: 750px;
    margin: 0 auto;
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
   padding: 120px 0;
   .innerHero{
     max-width: 910px;
     margin: 0 auto;
     background: #fff;
     border: 1px solid #e6e6e6;
     padding: 50px 100px;
     color: #000;
   }
 }
</style>
