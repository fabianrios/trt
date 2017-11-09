<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="css">
@import "https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,700";
</style>

<style>

html, body{
  background: #000;
  color: #fff;
  font-family: 'Open Sans', sans-serif;
}

a{
  color: #009fe3;
  text-decoration: none;
}

ul{
  list-style-type: none;
  margin: 0;
  padding: 0;
}


</style>
