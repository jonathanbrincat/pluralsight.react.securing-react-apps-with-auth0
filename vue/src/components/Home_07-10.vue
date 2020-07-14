<template lang="pug">
  div
    h1 Home
    RouterLink(to="/profile" v-if="auth.isAuthenticated()") View Profile
    button(@click="auth.login" v-else) Log In

    h2 auth.isAuthenticated = {{ auth.isAuthenticated() }}
    //- h3 tokenExpiry {{ tokenExpiry }}
    h3 proxy tokenExpiry {{ $localStorage.tokenExpiry  }}

    //- 1. USING A WATCHER
    //- input(v-model="foo")
    //- EQUIVALENT TO =>
    input(:value="foo" @input="foo = $event.target.value")
    p {{ foo }}

    //- 2. FETCH ON DATA INIT AND REASSIGN ON STATE
    //- input(v-model="bar" @input="set_data")
    //- can be simplified to =>
    input(:value="bar" @input="barHandler")
    p {{ bar }}

    //- 3. USING A COMPUTED GETTER/SETTER =>
    //- input(v-model="computedFoobar")
    input(:value="computedFoobar" @input="computedFoobar = $event.target.value")
    p {{ computedFoobar }}

    //- 4. USING GETTER/SETTER ON DATA PROP =>
    input(:value="moo.token" @input="moo.token = $event.target.value")
    p {{ moo.token }}

    //- button(@click="mockHandler") {{ isAuthenticated ? 'log out' : 'log in'}}
    button(@click="() => { isAuthenticated ? mockLogout() : mockLogin() }") {{ isAuthenticated ? 'log out' : 'log in'}}
    p isToken: {{ token }}
    p {{ isAuthenticated }}
    //- p isAuthenticated: {{ isAuthenticated }}
</template>

<script>
export default {
  name: "Home",

  props: {
    auth: Object
  },

  data() {
    return {
      // tokenExpiry: localStorage.getItem('expires_at')
      foo: localStorage.getItem('fooLocalStorage') || 'here we are...',
      bar: localStorage.getItem('barLocalStorage') || 'here we go again...',
      foobar: localStorage.getItem('foobarLocalStorage') || 'here we come',
      token: localStorage.getItem('MOCK') || null,
      moo: {
        get token() {
          return localStorage.getItem('moo') || 'boom';
        },
        set token(value) {
          localStorage.setItem('moo', value);
        }
      }
    }
  },

  methods: {
    clickHandler() {
      this.auth.login();
    },

    async mockLogin() {
      console.log('get token');

      // const mockService = new Promise( (resolve) => setTimeout(() => resolve('1234ABC'), 2000) );
      // mockService.then( (token) => console.log('your token sir ', token) );

      const token = await new Promise( (resolve) => setTimeout(() => resolve('1234ABC'), 2000) );
      console.log('your token sir ', token);
      this.token = token;
      // localStorage.setItem('MOCK', token);
    },

    mockLogout() {
      console.log('mockLogout')
      this.token = null;
      // localStorage.removeItem('MOCK');
    },

    get_data : function(){
      return localStorage.getItem( 'barLocalStorage' );
    },

    set_data : function(){
      localStorage.setItem( 'barLocalStorage', this.bar );
      this.bar = this.get_data();
    },

    barHandler(event) {
      this.bar = event.target.value;
      localStorage.setItem( 'barLocalStorage', event.target.value);
    },

    fooHandler() {
      // this.foo = localStorage.getItem('storedData'); // not actuallly strictly necessary
    },
  },

  // todo put this answer on stack overflow
  computed: {
    computedFoobar: {
      get() {
        return this.foobar;
      },

      set(value) {
        this.foobar = value;
        localStorage.setItem('foobarLocalStorage', value);
      },
    },

    // isAuthenticated: {
    //   get() {
    //     console.log('get isAuthenticated says hear me now');
    //     return !!this.token;
    //   },

    //   set(value) {
    //     console.log('set isAuthenticated says hear me now');
    //     this.token = value;
    //     value ? localStorage.setItem('MOCK', value) : localStorage.removeItem('MOCK');
    //   },
    // },

    isAuthenticated() {
      console.log('isAuthenticated says hear me now');
      this.token ? localStorage.setItem('MOCK', this.token) : localStorage.removeItem('MOCK');
      return !!this.token;
    },

    // isAuthenticated: {
    //   get() {
    //     return !!this.token;
    //   },

    //   set(value) {
    //     this.token = value;
    //     localStorage.setItem('MOCK', value);
    //   }
    // }

    /*isAuthenticated: {
      get() {
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
      },

      set(value) {
        localStorage.setItem('expires_at', value);
      }
    }*/
  },

  watch: {
    // tokenExpiry(value) {
    //   localStorage.setItem('expires_at', value);
    // }

    foo() {
      localStorage.setItem('fooLocalStorage', this.foo);
    }
  }
};
</script>

<style scoped lang="scss"></style>
