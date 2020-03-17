<template>
  <div>
    <my-test>
      this is default
      <template v-slot:footer>
        this is footer
      </template>
    </my-test>
    <div class="footer">footer content el to be replaced</div>
  </div>
</template>

<script>

import Vue from 'vue';

export default {
  name: 'App',
  components: {
    MyTest: {
      props: {
        Hello: String,
        Level: Number,
      },
      render(createElement) {
        // return (
        //   <div on-click={() => { console.log(123); }}>{this.Hello}</div>
        // );
        // return createElement(`h${this.Level}`, this.$slots.default);
        return createElement('div', [
          createElement('p', this.$slots.default),
          createElement('h3', this.$slots.footer),
        ]);
      },
    },
  },
  data() {
    return {
      MYDATA: null,
    };
  },
  mounted() {
    const $el = document.querySelector('.footer');
    const VM = new Vue({
      name: 'test-componet',
      el: '.footer',
      // template: '<span><slot></slot></span>',
      data: {
        test: 666,
      },
      template: `
      <div id="example">
        <h1>{{test}}我是父组件的标题</h1>
      </div>`,
      render(createElement) {
        // return (
        //   <p style="text-align: left;"> <h1>{this.test}hello image</h1> <img /> </p>
        // );
        // return createElement(Bar, {
        //   props: {
        //     test: '666',
        //   },
        // });
        return createElement('div', '<span>faf</span>');
      },
    });
  },
};
</script>

<style lang="scss">
#example {
  text-align: left;
  z-index: 999;
  background: azure;
}
</style>
