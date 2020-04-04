<template>
  <div class="container">
      <section class="header">
        <input ref="upload" type="file" name="file" />
        <el-button @click="testFomrData()">formdata上传</el-button>
      </section>

      <section class="notes-body">
        <el-button @click="fetchList()">刷新列表</el-button>
        <!-- <img src="../assets/logo.png" alt=""> -->
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
      this.loadingInstance = Loading.service({ target: '.notes-body' });
    },
    endLoading() {
      if (this.loadingInstance) {
        this.loadingInstance.close();
      }
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
      this.allNotes = [];
      axios.get('/api/notesAll', {
        params: {
          pageSize,
          currentPage,
        },
      }).then((res) => {
        this.allNotes = res.data.list;
        this.total = res.data.total;
      }).finally(() => {
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
    const customerData = [
      {
        ssn: new Date().getTime(), name: `Bill${Math.random()}`, email: Math.random(), test: `test${Math.random()}`,
        // ssn: 666, name: 'Bill', email: Math.random(), test: `test${Math.random()}`,
      },
    ];
    const dbName = 'the_name';
    const request = indexedDB.open(dbName, 5);

    request.onerror = (event) => {
      console.log(event);
    };
    request.onsuccess = (event) => {
      // const db = event.target.result;
      const db = request.result;
      db.onerror = (error) => {
        // console.log(error);
      };
      // db.transaction('customers').objectStore('customers').get(1584197139013).onsuccess = (res) => {
      //   // console.log(res.target.result);
      // };
      const customerObjectStore = db.transaction(['customers'], 'readwrite').objectStore('customers');
      customerData.forEach((customer) => {
        const r = customerObjectStore.put(customer);
        r.onerror = (e) => { console.log(e); };
      });
    };


    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      // 建立一个对象仓库来存储我们客户的相关信息，我们选择 ssn 作为键路径（key path）
      // 因为 ssn 可以保证是不重复的
      const storeName = 'customers';
      let objectStore;
      try {
        objectStore = db.createObjectStore('customers', { keyPath: 'ssn' });
        objectStore.createIndex('test', 'test', { unique: false });
        objectStore.createIndex('name', 'name', { unique: false });
        // 使用邮箱建立索引，我们向确保客户的邮箱不会重复，所以我们使用 unique 索引
        objectStore.createIndex('email', 'email', { unique: true });
      } catch (err) {
        objectStore = request.transaction.objectStore('customers');
      }
      // const objectStore = db.objectStore('customers');

      // 使用事务的 oncomplete 事件确保在插入数据前对象仓库已经创建完毕
      objectStore.transaction.oncomplete = () => {
        // 将数据保存到新创建的对象仓库
        console.log('successfully add tedst into db');
      };
    };
  },
  computed: {
  },
  mounted() {
    this.fetchList();

    function dataURItoBlob(dataURI) {
      let byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
      } else {
        byteString = unescape(dataURI.split(',')[1]);
      }
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    }


    const canvas = document.createElement('canvas');
    document.body.append(canvas);
    const height = 200;
    const width = 200;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = '#090';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 2 - width / 10, 0, Math.PI * 2);
    ctx.stroke();

    const dataURL = canvas.toDataURL('image/png', 1);
    const blob = dataURItoBlob(dataURL);
    const data = new FormData();
    data.append('name', 'hello express');
    data.append('file', blob, '123.png');
    axios.request({
      url: '/api/upload',
      method: 'post',
      data,
    }).then((res) => {
      // console.log(res);
    });


    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/image/file-1585840953188-196-123.png', true);
    xhr.responseType = 'blob';
    xhr.onload = function r() {
      if (this.status === 200) {
        // eslint-disable-next-line no-shadow
        const blob = this.response;

        const img = document.createElement('img');
        img.onload = function rr(e) {
          window.URL.revokeObjectURL(img.src); // 清除释放
        };
        img.src = window.URL.createObjectURL(blob);
        document.body.appendChild(img);


        const reader = new FileReader();
        reader.onload = function rrr() {
          // console.log(reader.result);
          // console.log(dataURItoBlob(reader.result));
        };
        reader.readAsDataURL(blob);
      }
    };
    xhr.send();


    // const obj = { hello: 'world' };
    // const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
    // const url = URL.createObjectURL(blob);
    // console.log(url);
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
  .notes-body {
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
