<template lang="pug">
  div
    h1 Home
    RouterLink(to="/profile" v-if="auth.isAuthenticated()") View Profile
    button(@click="auth.login" v-else) Log In

    h2 auth.isAuthenticated = {{ auth.isAuthenticated() }}
    //- h3 tokenExpiry {{ tokenExpiry }}
    h3 proxy tokenExpiry {{ $localStorage.tokenExpiry  }}

    //- 1. REACTIVITY
    h4 1.Reactivity
    input(:value="foo" @input="fooHandler")
    p {{ foo }}

    button(@click="() => { !!fooToken ? fooLogout() : fooLogin() }") {{ !!fooToken ? 'log out' : 'log in'}}
    p Token: {{ fooToken }}

    hr

    //- 2. USING A WATCHER
    h4 2.Watcher
    //- input(v-model="bar")
    //- EQUIVALENT TO =>
    input(:value="bar" @input="bar = $event.target.value")
    p {{ bar }}

    button(@click="() => { !!barToken ? barLogout() : barLogin() }") {{ !!barToken ? 'log out' : 'log in'}}
    p Token: {{ barToken }}

    hr

    //- 3. USING A COMPUTED GETTER/SETTER =>
    h4 3.Computed getter/setter
    //- input(v-model="computedFoobar")
    input(:value="computedFoobar" @input="computedFoobar = $event.target.value")
    p {{ computedFoobar }}

    h5 Computed
    button(@click="() => { !!foobarToken ? foobarLogout() : foobarLogin() }") {{ !!foobarToken ? 'log out' : 'log in'}}
    p State: {{ foobarState }}
    p Token: {{ foobarToken }}

    h5 Computed(simplified/homologated)
    button(@click="() => { isAuthenticated ? mockLogout() : mockLogin() }") {{ isAuthenticated ? 'log out' : 'log in'}}
    p Token: {{ token }}
    p isAuthenticated: {{ isAuthenticated }}

    hr

    //- 4. USING GETTER/SETTER ON STATE =>
    h4 4.Getter/setter on State
    input(:value="moo.value" @input="moo.value = $event.target.value")
    p {{ moo.value }}

    button(@click="() => { !!mooState.token ? mooLogout() : mooLogin() }") {{ !!mooState.token ? 'log out' : 'log in'}}
    p mooToken: {{ mooState.token }}
    p isAuthenticated: {{ mooState.isAuthenticated }}
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
      foo: localStorage.getItem('fooLocalStorage') || 'foo...',
      bar: localStorage.getItem('barLocalStorage') || 'bar...',
      foobar: localStorage.getItem('foobarLocalStorage') || 'foobar...',
      moo: {
        get value() {
          return localStorage.getItem('mooLocalStorage') || 'getter/setter';
        },
        set value(value) {
          localStorage.setItem('mooLocalStorage', value);
        }
      },
      
      token: localStorage.getItem('MOCK') || null,
      fooToken: localStorage.getItem('FOO') || null,
      barToken: localStorage.getItem('BAR') || null,
      foobarState: localStorage.getItem('FOOBAR') || null,
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
    clickHandler() {
      this.auth.login();
    },

    fooHandler(event) {
      this.foo = event.target.value;
      localStorage.setItem( 'fooLocalStorage', event.target.value);
    },

    async fooLogin() {
      console.log('-- login foo --');

      const token = await new Promise( (resolve) => setTimeout(() => resolve('FOO1234'), 2000) );
      console.log('your fooToken sir => ', token);
      this.fooToken = token;
      localStorage.setItem('FOO', token);
    },

    fooLogout() {
      console.log('-- logout foo --')
      this.fooToken = null;
      localStorage.removeItem('FOO');
    },

    async barLogin() {
      console.log('-- login bar --');

      const token = await new Promise( (resolve) => setTimeout(() => resolve('BAR1234'), 2000) );
      console.log('your barToken sir => ', token);
      this.barToken = token;
    },

    barLogout() {
      console.log('-- logout bar --')
      this.barToken = null;
    },

    async foobarLogin() {
      console.log('-- login foobar --');

      const token = await new Promise( (resolve) => setTimeout(() => resolve('FOOBAR1234'), 2000) );
      console.log('your token sir => ', token);
      this.foobarToken = token;
    },

    foobarLogout() {
      console.log('-- logout foobar --')
      this.foobarToken = null;
    },

    async mockLogin() {
      console.log('-- login --');

      const token = await new Promise( (resolve) => setTimeout(() => resolve('1234ABC'), 2000) );
      console.log('your token sir => ', token);
      this.token = token;
    },

    mockLogout() {
      console.log('-- logout --')
      this.token = null;
    },

    async mooLogin() {
      console.log('-- login moo --');

      const token = await new Promise( (resolve) => setTimeout(() => resolve('MOO1234'), 2000) );
      console.log('your token sir => ', token);
      this.mooState.token = token;
    },

    mooLogout() {
      console.log('-- logout moo --')
      this.mooState.token = null;
    }
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

    foobarToken: {
      get() {
        return this.foobarState;
      },

      set(value) {
        value ? localStorage.setItem('FOOBAR', value) : localStorage.removeItem('FOOBAR');
        this.foobarState = value;
      }
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
      this.token ? localStorage.setItem('MOCK', this.token) : localStorage.removeItem('MOCK');
      return !!this.token;
    },
  },

  watch: {
    // tokenExpiry(newValue) {
    //   localStorage.setItem('expires_at', newValue);
    // }

    bar(newValue) {
      localStorage.setItem('barLocalStorage', newValue);
    },

    barToken(newValue) {
      newValue ? localStorage.setItem('BAR', newValue) : localStorage.removeItem('BAR');
    }
  }
};
</script>

<style scoped lang="scss"></style>
