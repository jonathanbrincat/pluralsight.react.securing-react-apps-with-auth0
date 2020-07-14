import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import App from './App.vue';
import Home from './components/Home.vue';
import Profile from './components/Profile.vue';
import Private from './components/Private.vue';
import Public from './components/Public.vue';
import Courses from './components/Courses.vue';
import Callback from './components/Callback.vue';

import Auth from './Auth/Auth';

import './index.css';

Vue.use(Vuex);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('expires_at') || null,
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
            // localStorage.setItem('expires_at', payload);
        },

        removeToken({ commit }) {
            commit('REMOVE_TOKEN');
            // localStorage.removeItem('expires_at');
        }
    },

    getters: {
        isAuthenticated: (state) => {
            const expiresAt = JSON.parse(state.token);
            return new Date().getTime() < expiresAt;
        }
    }
});

// DEVNOTE: stores everything in store in localstorage
// Subscribe to store updates
// store.subscribe((mutation, state) => {
//   // Store the state object as a JSON string
//   localStorage.setItem('store', JSON.stringify(state));
// });

// proxy localstorage assignments through vue so we can make it reactive
// export const $localStorage = new Vue({
Vue.prototype.$localStorage = new Vue({
    data: { 
       // reactive property assigned to a localstorage key/value 
       token: localStorage.getItem('expires_at') || null,
    },

    computed: {
      isAuthenticated() {
        const expiresAt = JSON.parse(this.token);
        return new Date().getTime() < expiresAt;
      }
    },
    
    /*watch:{ 
       // watcher listening for changes on the delegated property to ensure the new value is written back to localstorage 
       token(value) { 
         value ? localStorage.setItem('expires_at', value) : localStorage.removeItem('expires_at');
       }
    }*/
});


function isAuthenticated(to, from, next) {
    // if(auth.isAuthenticated()) return next();
    if(store.getters.isAuthenticated) return next();

    next({path: '/'});
}

// function userHasScope()  {

// }

const router = new VueRouter({
    mode: "history",
    routes: [
        { path: '/', component: Home, name: 'home' },
        { path: '/profile', component: Profile, name: 'profile', beforeEnter: isAuthenticated }, //to home
        { path: '/public-api', component: Public, name: 'public-api' },
        { path: '/private-api', component: Private, name: 'private-api', beforeEnter: isAuthenticated }, //to auth.login
        { path: '/courses', component: Courses, name: 'courses', beforeEnter: isAuthenticated }, //to auth.login//&& userHasScope(['read:courses'])
        { path: '/callback', component: Callback, name: 'callback' },
    ],
});

const auth = new Auth(router);

new Vue({
    render: (h) => h(App, {
        props: {
            auth,
        }
    }),
    store,
    router,
    /*created() {
        auth.onChange = (isAuthenticated, authResult) => {
            console.log('isAuthenticated ', isAuthenticated, authResult);
            if(isAuthenticated) {
                console.log('ONCHANGE login');
                const expiresAt = JSON.stringify(
                    authResult.expiresIn * 1000 + new Date().getTime()
                );

                this.$store.dispatch('setToken', expiresAt);
                this.$localStorage.token = expiresAt;
            
            }else {
                console.log('ONCHANGE logout');
                this.$store.dispatch('removeToken');
                this.$localStorage.token = null;
            }
        }
    },*/
}).$mount('#app');

window.addEventListener('storage', function(event) {
  console.log('HELLO ', event);
  // document.querySelector('.my-key').textContent = event.key;
  // document.querySelector('.my-old').textContent = event.oldValue;
  // document.querySelector('.my-new').textContent = event.newValue;
  // document.querySelector('.my-url').textContent = event.url;
  // document.querySelector('.my-storage').textContent = JSON.stringify(event.storageArea);
});

