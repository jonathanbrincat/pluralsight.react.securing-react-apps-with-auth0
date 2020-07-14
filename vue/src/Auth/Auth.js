import Auth0 from "auth0-js";

export default class Auth {
  constructor(router) {
    this.history = router;

    this.auth0 = new Auth0.WebAuth({
      domain: process.env.VUE_APP_AUTH0_DOMAIN,
      clientID: process.env.VUE_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.VUE_APP_AUTH0_CALLBACK_URL,
      responseType: "token id_token", // token = access token to access services/API id_token is our JET identification token
      scope: "openid profile email",
    });
  }

  login = () => {
    this.auth0.authorize(); // redirect browser to Auth0 login page/widget
  };

  // DEVNOTE: reactivity won't work in Vue with Localstorage
  // oddly the home page link conditional does work this way
/*  handleAuthentication = () => {
    this.auth0.parseHash( (error, authResult) => {
      console.log("parseHash :vue: ", authResult);

      if(authResult && authResult.accessToken && authResult.idToken) {
        // if we have an authenticated user let's set a session for them and prime the application for access to resources/services
        this.setSession(authResult);

        this.history.push("/");
      } else if(error) {
        this.history.push("/");

        alert(`Error: ${error.error}. Check the console for further details.`);
        console.log(error);
      }
    });
  };*/

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {

      this.auth0.parseHash( (error, authResult) => {
        console.log("parseHash :vue: ", authResult);

        if(authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);

          this.history.push("/");

          resolve(authResult);
        } else if(error) {
          this.history.push("/");

          alert(`Error: ${error.error}. Check the console for further details.`);
          console.log(error);

          reject(error);
        }
      });
    });
  };

  setSession = authResult => {
    console.log(authResult);
    // set the time that the access token will expire
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
  };

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  logout = () => {
    console.log('logout')
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    
    this.history.push("/").catch( () => {});
  };
}
