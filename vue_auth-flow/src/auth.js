/* eslint: globals localStorage */

function pretendRequest(email, password, callback) {
  setTimeout(() => {
    if (email === 'joe@example.com' && password === 'password1') {
      callback({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      callback({ authenticated: false })
    }
  }, 0)
}

// It's a little messy; there are 3 mechanics at play.
    // the callback
        // only really being used to enforce validation on login; it relies on closure to function so not really something i can translate
    // the onChange public method
        // empty name function  in code which is public and can be reassigned to create a custom function that will be invoked through the chain
    // vue router
        // used to enforce access by manually intervening(on select routes) and calling isAutthenicated() to check the status; this is kind of a cheat and completely disregards leveraging off reactivity.

export default {
    login(email, password, callback) {
        callback = arguments[arguments.length - 1];

        // this block would never really get hit
        if(localStorage.token) {
            if(callback) callback(true);
            this.onChange(true);
            return;
        }

        // EQUIVALENT to this.auth0.authorize();
        // callback EQUIVALENT to handleAuthentication()
        pretendRequest(email, password, (response) => {
            if(response.authenticated) {
                // EQUIVALENT to setSession();
                localStorage.token = response.token;
                // localStorage.setItem('token', response.token);

                if(callback) callback(true);
                this.onChange(true);
            }else {
                if(callback) callback(false);
                this.onChange(false);
            }
        });
    },

    logout(callback) {
        delete localStorage.token;
        // localStorage.removeItem('token');

        if(callback) callback()
        this.onChange(false)
    },

    isAuthenticated () {
        return !!localStorage.token
    },

    // DEVNOTE: not used
    /*getToken() {
        return localStorage.token
    },*/

    onChange() {}
}
