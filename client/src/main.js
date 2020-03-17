import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Main from './components/Main.vue';
import NotFoundComponent from './components/NotFoundComponent.vue';

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
  { path: '/', component: Main },
  { path: '/main', component: () => import('./components/Main.vue') },
  { path: '/test', component: () => import('./components/Test.vue') },
  { path: '/dimention', component: () => import('./components/Dimention.vue') },
  { path: '/foo', component: () => import('./components/Foo.vue') },
  { path: '/bar', component: () => import('./components/Bar.vue') },
  { path: '*', component: NotFoundComponent },
];

const router = new VueRouter({
  mode: 'history',
  // base: '/bee/portal/',
  routes,
});


const app = new Vue({
  el: '#app',
  router,
  template: '<div>123</div>',
  render: (h) => h(App),
});
