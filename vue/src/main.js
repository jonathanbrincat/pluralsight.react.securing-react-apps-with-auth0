import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";

import App from "./App.vue";
import Home from "./components/Home.vue";
import Profile from "./components/Profile.vue";
import Private from "./components/Private.vue";
import Public from "./components/Public.vue";
import Courses from "./components/Courses.vue";
import Callback from "./components/Callback.vue";

import "./index.css";

Vue.use(Vuex);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    count: 1,
    token: null,
  },

  mutations: {
    // INIT_STORE(state) {
    //   // Check if the ID exists
    //   if(localStorage.getItem('store')) {
    //     // Replace the state object with the stored item
    //     this.replaceState( //Vuex method
    //       Object.assign(state, JSON.parse(localStorage.getItem('store')))
    //     );
    //   }
    // },

    INIT_STORE(state) {
      if(localStorage.getItem('VUEX')) {
        state.token = localStorage.getItem('VUEX');
      }
    },

    SET_TOKEN(state, payload) {
      state.token = payload;
    },

    REMOVE_TOKEN(state) {
      state.token = null;
    },
  },

  actions: {
    setToken({ commit }, payload) {
      commit('SET_TOKEN', payload);
      localStorage.setItem('VUEX', payload);
    },

    removeToken({ commit }) {
      commit('REMOVE_TOKEN');
      localStorage.removeItem('VUEX');
    }
  },

  getters: {
    isAuthenticated: (state) => {
      return !!state.token;
    }
  }
});

// DEVNOTE: stores everything in store in localstorage
// Subscribe to store updates
// store.subscribe((mutation, state) => {
//   // Store the state object as a JSON string
//   localStorage.setItem('store', JSON.stringify(state));
// });

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Home },
    { path: "/profile", component: Profile },
    { path: "/public-api", component: Public },
    { path: "/private-api", component: Private },
    { path: "/courses", component: Courses },
    { path: "/callback", component: Callback },
  ],
});

export const $eventBus = new Vue({
  data() {
    return {
      token: localStorage.getItem('EVENTBUS') || null,
      // get token() {
      //   return localStorage.getItem('EVENTBUS') || null;
      // },

      // set token(value) {
      //   value ? localStorage.setItem('EVENTBUS', value) : localStorage.removeItem('EVENTBUS');
      // }
    }
  },

  // created() {
  //   this.$on('SET_EVENTBUSTOKEN', (payload) => {
  //     this.token = payload;
  //   })
  // },

  computed: {
    isAuthenticated() {
      this.token ? localStorage.setItem('EVENTBUS', this.token) : localStorage.removeItem('EVENTBUS');
      return !!this.token;
    }
  }
});

// proxy localstorage assignments through vue so we can make it reactive
// export const $localStorage = new Vue({
Vue.prototype.$localStorage = new Vue({
    data: { 
       // reactive property assigned to a localstorage key/value 
       tokenExpiry: localStorage.getItem('expires_at'),
       token: localStorage.getItem('INSTANCE') || null,
    },

    computed: {
      isAuthenticated() {
        return !!this.token;
      }
    },
    
    watch:{ 
       // watcher listening for changes on the delegated property to ensure the new value is written back to localstorage 
       tokenExpiry(value) { 
         localStorage.setItem('expires_at', value);
       },

       token(value) { 
         value ? localStorage.setItem('INSTANCE', value) : localStorage.removeItem('INSTANCE');
       }
    }
});

new Vue({
  render: (h) => h(App),
  store,
  router,

  beforeCreate() {
    this.$store.commit('INIT_STORE');
  },
}).$mount("#app");
