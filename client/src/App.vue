<template>
  <div id="app">
    <section class="container">
      <section class="header">
        <el-button><router-link to="/foo">Go to Foo</router-link></el-button>
        <el-button><router-link to="/bar">Go to Bar</router-link></el-button>
        <div>below is router view</div>
        <router-view></router-view>

        <form action="/api/upload" method="post" enctype="multipart/form-data" target="_blank">
          <input type="file" name="avatar" />
          <button type="submit">  upload </button>
        </form>

      </section>
      <section class="body">
        <el-button @click="fetchList()">刷新列表</el-button>
        <el-button @click="testFomrData()">test formdata</el-button>
        <table>
          <thead>
            <tr><td>id</td><td>content</td><td>datetime</td><td>actions</td></tr>
          </thead>
          <tbody>
            <tr v-for="(item) in allNotes" :key="item.id">
              <td>{{item.id}}</td>
              <td>
                <el-input v-model="item.content"></el-input>
              </td>
              <td>
                {{new Date(item.datetime).toLocaleString()}}
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
          <el-button @click="setNewNote" :disabled="adding" v-if="allNotes.length!==15">add</el-button>
        </table>
      </section>
      <section class="footer">
        <el-pagination
          background
          layout="total, prev, pager, next"
          @current-change="handlePageChange"
          :page-size="pageSize"
          :total="total">
        </el-pagination>
      </section>
    </section>
  </div>
</template>

<script>
import {
  Button, Input, Message, Pagination,
} from 'element-ui';

const axios = require('axios');

export default {
  name: 'App',
  components: {
    ElButton: Button,
    ElInput: Input,
    ElPagination: Pagination,
  },
  data() {
    return {
      newContent: null,
      allNotes: [],
      total: 0,
      adding: false,
      currentPage: 1,
      pageSize: 15,
    };
  },
  methods: {
    testFomrData() {
      const data = new FormData();
      data.append('name', 'hello express');
      // axios.post('/api/addNotes?test=123', {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     // 'Content-Type': 'application/json',
      //   },
      // }).then((res) => {

      // });
      axios.request({
        url: '/api/addNotes',
        method: 'post',
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded',
        // },
        // data: 'name=hello',

        // headers: {
        //   'Content-Type': 'application/json',
        // },
        // data: {
        //   'name': 'hello',
        // },
        headers: {
          // 'Content-Type': 'multipart/form-data',
        },
        // data: {
        //   'name': 'hello',
        // },
        // data: 'name=hello&age=123',
        data,
      });
    },
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
    fetchList(currentPage = this.currentPage, pageSize = 15) {
      axios.get(`/api/notesAll?pageSize=${pageSize}&currentPage=${currentPage}`).then((res) => {
        this.allNotes = res.data.list;
        this.total = res.data.total;
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
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchList();
    },
  },
  created() {
    this.fetchList();
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #aaa;
  border-radius: 2px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #999;
  border-radius: 4px;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .container {
    padding: 15px;
    box-sizing: border-box;
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100%;
    .header {
      flex: 0 0 auto;
    }
    .body {
      flex: 1 1 auto;
      overflow: auto;
      border: 1px solid #999;
      margin: 15px 0;
      table {
        table-layout: fixed;
        width: 100%;
      }
    }
    .footer {
      flex: 0 0 auto;
    }
  }
  table, th, td  {
    border: 1px solid #999;
    padding: 5px;
    border-collapse: collapse;
  }
}

</style>
