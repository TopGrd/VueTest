import Vue from 'vue';
import Vuex from 'vuex';
// import createLogger from 'vuex/dist/logger';
import Pay from './pay';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // 在非生产环境下，使用严格模式
  modules: {
    Pay
  },
// plugins: [createLogger()]
});
