<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" @click="request">
    <HelloWorld msg="Welcome to Your V123ue.js App"/>
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
    <div>below is router view</div>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
const axios = require('axios');

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    request() {
      axios.get('/api/sql').then(() => {
        console.log('success');
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
