<template>
  <div class="container">
      <section class="header">
        <input ref="upload" type="file" name="file" />
        <el-button @click="testFomrData()">formdata上传</el-button>
      </section>

      <section class="body">
        <el-button @click="fetchList()">刷新列表</el-button>
        <img src="../assets/logo.png" alt="">
        <table class="notes-table">
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
  </div>
</template>

<script>
import {
  Button, Input, Message, Pagination, Slider, Select, Option, Loading,
} from 'element-ui';
import Vue from 'vue';

const axios = require('axios');

export default {
  name: 'App',
  components: {
    ElButton: Button,
    ElInput: Input,
    ElPagination: Pagination,
    ElSlider: Slider,
    ElSelect: Select,
    ElOption: Option,
  },
  data() {
    return {
      newContent: null,
      allNotes: [],
      total: 0,
      adding: false,
      currentPage: 1,
      pageSize: 15,
      loading: true,
      loadingInstance: null,
    };
  },
  methods: {
    testFomrData(e) {
      const data = new FormData();
      data.append('name', 'hello express');
      const file = this.$refs.upload.files[0];
      data.append('file', file);

      axios.request({
        url: '/api/upload',
        method: 'post',
        data,
      }).then((res) => {
        if (res.data.msg === 123) {
          this.$refs.upload.value = null;
        }
      });
    },
    startLoading() {
      this.loadingInstance = Loading.service({ target: '.notes-table' });
    },
    endLoading() {
      this.loadingInstance.close();
    },
    addNotes() {
      if (this.newContent) {
        axios.post('/api/addNotes', { content: this.newContent }).then((res) => {
          Message.success(res.data.msg);
          this.newContent = null;
          this.fetchList();
          this.adding = false;
        });
      }
    },
    fetchList(currentPage = this.currentPage, pageSize = 15) {
      this.startLoading();
      axios.get('/api/notesAll', {
        params: {
          pageSize,
          currentPage,
        },
      }).then((res) => {
        this.allNotes = res.data.list;
        this.total = res.data.total;
        this.endLoading();
      });
    },
    deleteNotes(id) {
      axios.get(`/api/notesDeleteById?id=${id}`).then((res) => {
        Message.success(res.data.msg);
        this.fetchList();
      });
    },
    updateNote(value, id) {
      // axios.get(`/api/notesUpdateById?content=${value}&id=${id}`).then((res) => {
      //   Message.success(res.data.msg);
      // });
      axios.post('/api/notesUpdateById', {
        id,
        value,
      }).then((res) => {
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
    // this.fetchList();
    const customerData = [
      {
        // ssn: new Date().getTime(), name: 'Bill', email: Math.random(), test: `test${Math.random()}`,
        ssn: 666, name: 'Bill', email: Math.random(), test: `test${Math.random()}`,
      },
    ];
    const dbName = 'the_name';
    const request = indexedDB.open(dbName, 4);

    request.onerror = (event) => {
      // 错误处理
      console.log(event);
    };
    request.onsuccess = (event) => {
      // const db = event.target.result;
      const db = request.result;
      db.onerror = (error) => {
        // console.log(error);
      };
      db.transaction('customers').objectStore('customers').get(1584197139013).onsuccess = (res) => {
        // console.log(res.target.result);
      };
      const customerObjectStore = db.transaction(['customers'], 'readwrite').objectStore('customers');
      customerData.forEach((customer) => {
        const r = customerObjectStore.put(customer);
        r.onerror = (e) => { console.log(e); };
      });
    };


    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      console.log('onupgradeneeded');
      // 建立一个对象仓库来存储我们客户的相关信息，我们选择 ssn 作为键路径（key path）
      // 因为 ssn 可以保证是不重复的
      // const objectStore = db.createObjectStore('customers', { keyPath: 'ssn' });
      // const objectStore = db.objectStore('customers');
      // const objectStore = request.transaction.objectStore('customers');

      // // 建立一个索引来通过姓名来搜索客户。名字可能会重复，所以我们不能使用 unique 索引
      // objectStore.createIndex('test', 'test', { unique: false });

      // // 使用邮箱建立索引，我们向确保客户的邮箱不会重复，所以我们使用 unique 索引
      // objectStore.createIndex('email', 'email', { unique: true });

      // 使用事务的 oncomplete 事件确保在插入数据前对象仓库已经创建完毕
      // objectStore.transaction.oncomplete = () => {
      //   // 将数据保存到新创建的对象仓库
      //   console.log('successfully add tedst into db');
      // };
      // const customerObjectStore = db.transaction('customers', 'readwrite').objectStore('customers');
      // customerData.forEach((customer) => {
      //   customerObjectStore.add(customer);
      // });
    };
  },
  computed: {
  },
  mounted() {
    this.fetchList();
    // const oReq = new XMLHttpRequest();
    // oReq.open('GET', '/img/logo.82b9c7a5.png', true);
    // oReq.responseType = 'blob';

    // oReq.onload = (oEvent) => {
    //   console.log(oEvent);
    //   const url = URL.createObjectURL(oReq.response);
    //   const blob = oReq.response;
    //   console.log(blob);
    //   console.log(url);
    // };

    // oReq.send();
    const obj = { hello: 'world' };
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    console.log(url);
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

.container {
  padding: 15px;
  box-sizing: border-box;
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


</style>
