import Auth0 from 'auth0-js';

export default class Auth {
    constructor(router) {
        this.history = router;
        this.userProfile = null;
        this.requestedScopes = "openid profile email read:courses";

        this.auth0 = new Auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN,
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
            audience: process.env.REACT_APP_AUTH0_AUDIENCE, // Auth0 api identifier - the token sent by Auth0 will be associated with this audience
            responseType: "token id_token", // token = access token to access services/API id_token is our JET identification token
            scope: this.requestedScopes,
        });
    }

    login = () => {
        this.auth0.authorize(); // redirect browser to Auth0 login page/widget
    };

    logout = () => new Promise( (resolve) => {
        this.removeSession();

        this.userProfile = null;

        // this.history.push('/').catch(() => {});
        this.auth0.logout({
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            returnTo: "http://localhost:3000",
        });

        resolve();
    });

    // Auth0 callback => handler
    handleAuthentication = () => new Promise((resolve, reject) => {
        this.auth0.parseHash((error, authResult) => {
            console.log("parseHash :react: ", authResult);

            if(authResult && authResult.accessToken && authResult.idToken) {
                // if we have an authenticated user let's set a session for them and prime the application for access to resources/services
                this.setSession(authResult);

                this.history.push('/');

                resolve(authResult);
            }else if(error) {
                this.history.push('/');

                alert(`Error: ${error.error}. Check the console for further details.`);
                console.log(error);

                reject(error);
            }
        });
    });

    setSession = (authResult) => {
        // Set the time the access token will expire
        const expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime() //convert to milliseconds and add to current unix epoch time
        );

        // If there is a value on the 'scope' param from the authResult, use it to set scopes in the session for the user.
        // Otherwise use the scopes as requested. If no scopes were requested, set it to nothing.
        const scopes = authResult.scope || this.requestedScopes | "";

        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        // DEVNOTE: for convenience we store these too to avoid the overhead of parsing the JWT every time we want to read the data
        localStorage.setItem('expires_at', expiresAt);
        localStorage.setItem('scopes', JSON.stringify(scopes));
    };

    removeSession = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('scopes');
    };

    isAuthenticated() {
        return (
            new Date().getTime() < JSON.parse(localStorage.getItem('expires_at'))
        );
    }

    getAccessToken() {
        const accessToken = localStorage.getItem('access_token');

        if(!accessToken) {
            throw new Error("No access token found.");
        }

        return accessToken;
    }

    getProfile(callback) {
        if(this.userProfile) return callback(this.userProfile);

        this.auth0.client.userInfo(this.getAccessToken(), (error, profile) => {
            if(profile) this.userProfile = profile;
            callback(profile, error);
        });
    }

    userHasScopes(scopes) {
        const grantedScopes = (
            JSON.parse(localStorage.getItem("scopes")) || ""
        ).split(" "); // split on whitespace as space delimited list

        return scopes.every((scope) => grantedScopes.includes(scope));
    }
}
