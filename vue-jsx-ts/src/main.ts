import Vue from "vue";
import Vuex, { Store as VuexStore } from "vuex";
import VueRouter from "vue-router";

import App from "./App";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Private from "./components/Private";
import Public from "./components/Public";
import Courses from "./components/Courses";
import Callback from "./components/Callback";

import Auth from "./Auth/Auth";

import "./app.scss";

Vue.use(Vuex);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const store: VuexStore<object> = new VuexStore({
  state: {
    token: localStorage.getItem("expires_at") || null,
  },

  mutations: {
    SET_TOKEN(state: any, payload: any) {
      state.token = payload;
    },

    REMOVE_TOKEN(state: any) {
      state.token = null;
    },
  },

  actions: {
    setToken({ commit }, payload) {
      commit("SET_TOKEN", payload);
      // localStorage.setItem('expires_at', payload);
    },

    removeToken({ commit }) {
      commit("REMOVE_TOKEN");
      // localStorage.removeItem('expires_at');
    },
  },

  /* getters: {
    isAuthenticated: (state: any) => {
      const expiresAt: number = JSON.parse(state.token);
      return new Date().getTime() < expiresAt;
    },
  }, */
});

// proxy localstorage assignments through vue so we can make it reactive
/*export const $localStorage = new Vue({
  // Vue.prototype.$localStorage = new Vue({
  data: {
    // reactive property assigned to a localstorage key/value
    // token: localStorage.getItem("expires_at") || null,
    token: localStorage.getItem("expires_at") || "",
  },

  computed: {
    isAuthenticated(): boolean {
      if (!this.token.length) return false;
      const expiresAt = JSON.parse(this.token);
      return new Date().getTime() < expiresAt;
    },
  },

  watch:{ 
       // watcher listening for changes on the delegated property to ensure the new value is written back to localstorage 
       token(value) { 
         value ? localStorage.setItem('expires_at', value) : localStorage.removeItem('expires_at');
       }
  }
});*/

function isAuthenticated(to: any, from: any, next: any): Function {
  if (auth.isAuthenticated()) return next();
  // if (store.getters.isAuthenticated) return next();

  return next({ path: "/" });
}

const router: VueRouter = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Home, name: "home" },
    {
      path: "/profile",
      component: Profile,
      name: "profile",
      beforeEnter: isAuthenticated,
    },
    { path: "/public-api", component: Public, name: "public-api" },
    {
      path: "/private-api",
      component: Private,
      name: "private-api",
      beforeEnter: isAuthenticated,
    },
    {
      path: "/courses",
      component: Courses,
      name: "courses",
      beforeEnter: isAuthenticated,
    },
    { path: "/callback", component: Callback, name: "callback" },
  ],
});

const auth: Auth = new Auth(router);

new Vue({
  render: (h) =>
    h(App, {
      props: { auth },
    }),
  store,
  router,
}).$mount("#app");
