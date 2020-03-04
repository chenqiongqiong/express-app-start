<template>
  <div id="app">
    <el-button>123</el-button>
    <img alt="Vue logo" src="./assets/logo.png" @click="request">
    <HelloWorld msg="W  elcome to Your Vue.js App-hello world"/>
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go   to Bar</router-link>
    <div>below is router view</div>
    <router-view></router-view>
  </div>
</template>

<script>
import { Button } from 'element-ui';
import HelloWorld from './components/HelloWorld.vue';

const axios = require('axios');

export default {
  name: 'App',
  components: {
    HelloWorld,
    ElButton: Button,
  },
  methods: {
    request() {
      axios.get('/api/sql', { params: { name: 'hello', age: 12 } }).then(() => {
        // console.log("success");
      });
    },
  },
};
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
