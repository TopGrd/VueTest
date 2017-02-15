// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-default/index.css';

import store from './store';
import App from './App';
import router from './router';

/* eslint-disable no-new */
Vue.use(ElementUI);

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
