<template lang="pug">
  div
    h1 Home
    RouterLink(to="/profile" v-if="auth.isAuthenticated()") View Profile
    button(@click="auth.login" v-else) Log In

    p auth.isAuthenticated = {{ auth.isAuthenticated() }}
    //- p tokenExpiry {{ tokenExpiry }}
    p proxy tokenExpiry {{ $localStorage.tokenExpiry  }}

    h3 LOCAL REACTIVITY IMPLEMENTAION
    //- 1. REACTIVITY
    h4 1.Reactivity
    button(@click="() => { !!fooToken ? fooLogout() : fooLogin() }") {{ !!fooToken ? 'log out' : 'log in'}}
    p Token: {{ fooToken }}

    hr

    //- 2. USING A WATCHER
    h4 2.Watcher
    button(@click="() => { !!barToken ? barLogout() : barLogin() }") {{ !!barToken ? 'log out' : 'log in'}}
    p Token: {{ barToken }}

    hr

    h4 3.Computed
    button(@click="() => { isAuthenticated ? foobarLogout() : foobarLogin() }") {{ isAuthenticated ? 'log out' : 'log in'}}
    p Token: {{ foobarToken }}
    p isAuthenticated: {{ isAuthenticated }}

    hr

    //- 4. GETTER/SETTER ON STATE
    h4 4.Getter/setter on State
    button(@click="() => { !!mooState.token ? mooLogout() : mooLogin() }") {{ !!mooState.token ? 'log out' : 'log in'}}
    p mooToken: {{ mooState.token }}
    p isAuthenticated: {{ mooState.isAuthenticated }}

    h3 GLOBAL REACTIVITY IMPLEMENTATION
    //- 1. Vuex
    h4 1.Vuex
    button(@click="() => { $store.getters.isAuthenticated ? vuexLogout() : vuexLogin() }") {{ $store.getters.isAuthenticated ? 'log out' : 'log in'}}
    p Token: {{ $store.state.token }}
    p isAuthenticated: {{ $store.getters.isAuthenticated }}

    hr

    //- 2. Vue instance/Delegated State - Event Bus and Computed prop
    h4 2.Vue instance (event Bus/computed)
    button(@click="() => { eventBusIsAuthenticated ? eventBusLogout() : eventBusLogin() }") {{ eventBusIsAuthenticated ? 'log out' : 'log in'}}
    p Token: {{ eventBusToken }}
    p isAuthenticated: {{ eventBusIsAuthenticated }}

    hr

    //- 3. Vue instance/Delegated State
    h4 3.Vue instance (watcher)
    button(@click="() => { !!$localStorage.token ? instanceLogout() : instanceLogin() }") {{ !!$localStorage.token ? 'log out' : 'log in'}}
    p Token: {{ $localStorage.token }}
    p isAuthenticated: {{ $localStorage.isAuthenticated }}

    //- 4.
    //-https://css-tricks.com/how-to-make-localstorage-reactive-in-vue/

    //- 5.
    //-npm install --save vuex-persistedstate
    //- https://www.npmjs.com/package/vuex-persistent-plugin
    //- https://www.npmjs.com/package/vuex-persist
    //- https://medium.com/swlh/build-your-own-data-persist-plugin-for-vuex-c1f5b1807afc
    //- https://github.com/robinvdvleuten/vuex-persistedstate
    //- https://github.com/championswimmer/vuex-persist
    //- https://www.digitalocean.com/community/tutorials/vuejs-vuex-persist-state
    //- various other npm packages

</template>

<script>
import { $eventBus } from '../main'; 

export default {
  name: "Home",

  props: {
    auth: Object
  },

  data() {
    return {
      // tokenExpiry: localStorage.getItem('expires_at')
      fooToken: localStorage.getItem('FOO') || null,
      barToken: localStorage.getItem('BAR') || null,
      foobarToken: localStorage.getItem('FOOBAR') || null,
      mooState: {
        get token() {
          return localStorage.getItem('MOO') || null;
        },
        set token(value) {
          value ? localStorage.setItem('MOO', value) : localStorage.removeItem('MOO');
        },
        get isAuthenticated() {
          return !!this.token;
        }
      },
    }
  },

  methods: {
    async vuexLogin() {
      const token = await new Promise( (resolve) => setTimeout(() => resolve('VUEX1234'), 2000) );
      // this.$store.commit('SET_TOKEN', token);
      this.$store.dispatch('setToken', token);
    },

    vuexLogout() {
      // this.$store.commit('REMOVE_TOKEN');
      this.$store.dispatch('removeToken');
    },

    async eventBusLogin() {
      const token = await new Promise( (resolve) => setTimeout(() => resolve('EVENTBUS1234'), 2000) );
      $eventBus.token = token;
      // $eventBus.$emit('SET_EVENTBUSTOKEN', token);
    },

    eventBusLogout() {
      $eventBus.token = null;
      // $eventBus.$emit('REMOVE_EVENTBUSTOKEN');
    },

    async instanceLogin() {
      const token = await new Promise( (resolve) => setTimeout(() => resolve('INSTANCE1234'), 2000) );
      this.$localStorage.token = token;
    },

    instanceLogout() {
      this.$localStorage.token = null;
    },

    clickHandler() {
      this.auth.login();
    },

    async fooLogin() {
      const token = await new Promise( (resolve) => setTimeout(() => resolve('FOO1234'), 2000) );
      this.fooToken = token;
      localStorage.setItem('FOO', token);
    },

    fooLogout() {
      this.fooToken = null;
      localStorage.removeItem('FOO');
    },

    async barLogin() {
      const token = await new Promise( (resolve) => setTimeout(() => resolve('BAR1234'), 2000) );
      this.barToken = token;
    },

    barLogout() {
      this.barToken = null;
    },

    async foobarLogin() {
      const token = await new Promise( (resolve) => setTimeout(() => resolve('FOOBAR1234'), 2000) );
      this.foobarToken = token;
    },

    foobarLogout() {
      this.foobarToken = null;
    },

    async mooLogin() {
      const token = await new Promise( (resolve) => setTimeout(() => resolve('MOO1234'), 2000) );
      this.mooState.token = token;
    },

    mooLogout() {
      this.mooState.token = null;
    }
  },

  computed: {
    isAuthenticated() {
      this.foobarToken ? localStorage.setItem('FOOBAR', this.foobarToken) : localStorage.removeItem('FOOBAR');
      return !!this.foobarToken;
    },

    eventBusToken() {
      return $eventBus.token;
    },

    eventBusIsAuthenticated() {
      return $eventBus.isAuthenticated;
    },
  },

  watch: {
    // tokenExpiry(newValue) {
    //   localStorage.setItem('expires_at', newValue);
    // }

    barToken(newValue) {
      newValue ? localStorage.setItem('BAR', newValue) : localStorage.removeItem('BAR');
    }
  }
};
</script>

<style scoped lang="scss"></style>
