import Vue from 'vue';
import Router from 'vue-router';
import Container from 'components/Container';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Container',
      component: Container,
    }
  ],
  mode: 'history',
  /* eslint-disable no-console */
  scrollBehavior(to, from) {
    console.log(to);
    console.log(from);
  },
});

export default router;
