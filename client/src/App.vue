<template>
  <div id="app">
    <el-button @click="fetchList">刷新列表</el-button>
    <el-input v-model.trim="content" />
    <img alt="Vue logo" src="./assets/logo.png" @click="request">

    <hr><router-link to="/foo">Go to Foo</router-link>
    <hr><router-link to="/bar">Go to Bar</router-link>
    <div>below is router view</div>
    <router-view></router-view>
    <ul>
      <li v-for="item in allNotes" :key="item.id">{{item.id+": "+item.content}}</li>
    </ul>
  </div>
</template>

<script>
import { Button, Input } from 'element-ui';

const axios = require('axios');

export default {
  name: 'App',
  components: {
    // HelloWorld,
    ElButton: Button,
    ElInput: Input,
  },
  data() {
    return {
      content: null,
      allNotes: [],
    };
  },
  methods: {
    request() {
      if (this.content) {
        axios.get('/api/notesAdd', { params: { name: 'hello', age: 12, content: this.content } }).then(() => {
        // console.log("success");
        });
      }
    },
    fetchList() {
      axios.get('/api/notesAll').then((res) => {
        this.allNotes = res.data.result;
      });
    },
  },
  created() {
    this.fetchList();
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
