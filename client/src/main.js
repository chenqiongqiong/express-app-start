import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Foo from './components/Foo.vue';
import Bar from './components/Bar.vue';
import NotFoundComponent from './components/NotFoundComponent.vue';

Vue.use(VueRouter);

Vue.config.productionTip = false;


const routes = [
  { path: '/', component: Foo },
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { path: '*', component: NotFoundComponent },
];

const router = new VueRouter({
  mode: 'history',
  base: '/bee/portal/',
  routes, // (缩写) 相当于 routes: routes
});


new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
