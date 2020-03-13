<template>
  <div id="app">
    <div class="test">
    <el-button @click="isMoving=true">set isMoving</el-button>
    <div class="control">
      <div class="control-item">
        x <el-slider :step="0.01" :min="0" :max="1" v-model="x"></el-slider>
      </div>
      <div class="control-item">
        y <el-slider :step="0.01" :min="0" :max="1" v-model="y" ></el-slider>
      </div>
      <div class="control-item">
        z <el-slider :step="0.01" :min="0" :max="1" v-model="z"></el-slider>
      </div>
      <div class="control-item">
        angle <el-slider :min="0" :max="360" v-model="angle" ></el-slider>
      </div>
    </div>
    <div class="box" :style="styleObj" :class="{moving: isMoving}">
      <div class="face front">front</div>
      <div class="face right">right</div>
      <div class="face left">left</div>
      <div class="face top">top</div>
      <div class="face bottom">bottom</div>
      <div class="face back">back</div>
    </div>

  </div>
    <section class="container">
      <section class="header">
        <el-button><router-link to="/foo">Go to Foo</router-link></el-button>
        <el-button><router-link to="/bar">Go to Bar</router-link></el-button>
        <div>below is router view</div>
        <router-view></router-view>

        <input ref="upload" type="file" name="file" />
        <el-button @click="testFomrData()">formdata上传</el-button>
      </section>
      <section class="body">
        <el-button @click="fetchList()">刷新列表</el-button>

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
  Button, Input, Message, Pagination, Slider,
} from 'element-ui';

const axios = require('axios');

export default {
  name: 'App',
  components: {
    ElButton: Button,
    ElInput: Input,
    ElPagination: Pagination,
    ElSlider: Slider,
  },
  data() {
    return {
      newContent: null,
      allNotes: [],
      total: 0,
      adding: false,
      currentPage: 1,
      pageSize: 15,
      x: 0,
      y: 0,
      z: 0,
      angle: 0,
      isMoving: false,
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
  computed: {
    styleObj() {
      return {
        transform: `rotate3d(${this.x}, ${this.y}, ${this.z}, ${this.angle}deg)`,
      };
    },
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


.test {
  background: burlywood;
  opacity: .6;
  height: 300px;
  padding: 15px;
  .control {
    display: flex;
    justify-content: space-between;
    .control-item {
      flex: auto 1 1;
      margin: 0 15px;
    }
  }
}
.moving {
  animation: move 5s infinite;
}
.box {
  position: relative;
  width: 100px;
  height: 100px;
  left: 100px;
  top: 90px;
  // perspective: 550px;
  transform-style: preserve-3d;
  .face {
    opacity: .5;
    color: #fff;
    font-size: 19px;
    background: chartreuse;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: visible;
  }
  .front {
    transform: rotateX(0deg);
  }
  .right {
    transform: translateX(50px) translateZ(-50px) rotateY(90deg);
    background: hotpink;
  }
  .left {
    transform: translateX(-50px) translateZ(-50px) rotateY(-90deg);
    background: sienna;
  }
  .top {
    transform: translateY(-50px) translateZ(-50px) rotateX(-90deg);
    background: aqua;
  }
  .bottom {
    transform: translateY(50px) translateZ(-50px) rotateX(90deg);
    background: teal;
  }
  .back {
    transform: translateZ(-100px);
    background: blueviolet;
  }
}
@keyframes move{
  0% {
    left: 100px;
  }
  50% {
    left: 600px;
  }
  100% {
    left: 100px;
  }
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
