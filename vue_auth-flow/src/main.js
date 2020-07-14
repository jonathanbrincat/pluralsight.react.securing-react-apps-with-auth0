import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App.vue'
import About from './components/About.vue'
import Dashboard from './components/Dashboard.vue'
import Login from './components/Login.vue'

import auth from './auth'

import './index.css'

Vue.use(VueRouter)

function requireAuth(to, from, next) {
    if(auth.isAuthenticated()) return next();

    next({path: '/login'});
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/about', component: About },
    { path: '/dashboard', component: Dashboard, beforeEnter: requireAuth },
    { path: '/login', component: Login },
    { path: '/logout', beforeEnter (to, from, next) {
        auth.logout();
        next('/');
      }
    }
  ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
