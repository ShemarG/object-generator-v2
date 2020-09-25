<template>
  <div id="app">
    <div class="title-container">
      <span style="height: 9vw; margin: 4vh 0vh;" class="d-flex align-items-center justify-content-center">OBJECT GENERATOR</span>
    </div>
    <div class="main-container">
      <ObjectConfig></ObjectConfig>
    </div>
  </div>
</template>

<script>

import ObjectConfig from 'components/object-config.vue'

export default {
  name: 'App',
  components: {
    ObjectConfig
  }
}
</script>

<style>

  @font-face {
    font-family: Bungee;
    src: url('~fonts/bungee_regular.ttf');
  }

  body {
    margin: 0;
  }

  .title-container {
    width: 100%;
    height: 17vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: DodgerBlue;
    font-family: Bungee;
    font-size: 8.5vw;
    text-shadow: -0.2vh 0 black, 0 0.2vh black, 0.2vh 0 black, 0 -0.2vh black;
    background-image: url("~images/gears.jpg");
    background-size: cover;
    border-bottom: 5px ridge blue;
  }

  .main-container {
    width: 100%;
    height: 83vh;
    background-image: url("~images/blue_crystal.jpg");
    background-size: cover;
  }

  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }
</style>
