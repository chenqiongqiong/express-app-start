<template>
  <div id="container">
    <section class="menu">
      <el-button><router-link to="/main">Go to Main</router-link></el-button>
      <el-button><router-link to="/test">Go to Test</router-link></el-button>
      <el-button><router-link to="/dimention">Go to dimention</router-link></el-button>
    </section>

    <section class="body">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import {
  Button,
} from 'element-ui';


export default {
  name: 'App',
  components: {
    ElButton: Button,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
  margin: auto;
  position: absolute;
  display: flex;
  flex-direction: column;
  .header {
    flex: auto 0 0;
  }
  .body {
    flex: auto 1 1;
    overflow: hidden;
  }
}
</style>
