<template>
  <div id="app">
    <section class="menu">
      <ul>
        <li>1</li>
        <li>3</li>
        <li>3</li>
      </ul>
    </section>
    <section class="content">
      hello world
    </section>

  </div>
</template>

<script>
import { Button, Input, Message } from 'element-ui';

export default {
  name: 'App',
  components: {
    ElButton: Button,
    ElInput: Input,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  .menu {
    flex: 2;
    background: blue;
  }
  .content {
    flex: 6;
    background: brown;
  }
}

</style>
