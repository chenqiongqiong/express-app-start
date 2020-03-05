<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <el-button @click="fetchList">刷新列表</el-button>

    <el-button><router-link to="/foo">Go to Foo</router-link></el-button>
    <el-button><router-link to="/bar">Go to Bar</router-link></el-button>

    <div>below is router view</div>
    <router-view></router-view>

    <table>
      <thead>
        <tr><td>id</td><td>content</td><td>actions</td></tr>
      </thead>
      <tbody>
        <tr v-for="(item) in allNotes" :key="item.id">
          <td>{{item.id}}</td>
          <td>
            <el-input v-model="item.content"></el-input>
          </td>
          <td>
            <el-button @click="updateNote(item.content, item.id)">update</el-button>
            <el-button @click="deleteNotes(item.id)">delete</el-button>
          </td>
        </tr>
        <tr v-show="adding">
          <td></td>
          <td>
            <el-input v-model.trim="newContent"></el-input>
          </td>
          <td>
            <el-button @click="addNotes(newContent)">add</el-button>
          </td>
        </tr>
      </tbody>
      <el-button @click="setNewNote" :disabled="adding">add</el-button>
    </table>
  </div>
</template>

<script>
import { Button, Input, Message } from 'element-ui';

const axios = require('axios');

export default {
  name: 'App',
  components: {
    ElButton: Button,
    ElInput: Input,
  },
  data() {
    return {
      newContent: null,
      allNotes: [],
      adding: false,
    };
  },
  methods: {
    addNotes() {
      if (this.newContent) {
        axios.get(`/api/addNotes?content=${this.newContent}`).then((res) => {
          Message.success(res.data.msg);
          this.newContent = null;
          this.fetchList();
          this.adding = false;
        });
      }
    },
    fetchList() {
      axios.get('/api/notesAll').then((res) => {
        this.allNotes = res.data.result;
      });
    },
    deleteNotes(id) {
      axios.get(`/api/notesDeleteById?id=${id}`).then((res) => {
        Message.success(res.data.msg);
        this.fetchList();
      });
    },
    updateNote(value, id) {
      axios.get(`/api/notesUpdateById?content=${value}&id=${id}`).then((res) => {
        Message.success(res.data.msg);
      });
    },
    setNewNote() {
      this.adding = true;
    },
  },
  created() {
    this.fetchList();
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  table, th, td  {
    border: 1px solid #999;
    padding: 5px;
    border-collapse: collapse;
  }
}

</style>
