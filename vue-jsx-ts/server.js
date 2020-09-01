const express = require("express");
require("dotenv").config();

const jwt = require("express-jwt"); // Validate JWT and set requent.user
const jwtRsa = require("jwks-rsa"); // Retrieve RSA key from a JSON web key set(JWKS) endpoint(the one that Auth0 exposes under our domain/tenant)
const checkScope = require("express-jwt-authz"); // Validates JWT scopes

const DOMAIN = "api.catalyz.co.uk";
const PORT = process.env.PORT || 3000;

/* const {
  VUE_APP_AUTH0_DOMAIN,
  VUE_APP_AUTH0_AUDIENCE,
  VUE_APP_API_URL,
} = process.env; */

// Express (endpoint) middleware
const jwtCheck = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
  secret: jwtRsa.expressJwtSecret({
    cache: true, // cache the signing key
    rateLimit: true,
    jwksRequestsPerMinute: 5, // prevent attackers from requesting more than 5 per minute
    // jwksUri: `https://${VUE_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
    jwksUri: `https://pluralsight-reactjsauth0-dev.eu.auth0.com/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  // audience: VUE_APP_AUTH0_AUDIENCE,
  audience: "https://api.catalyz.co.uk",
  // issuer: `https://${VUE_APP_AUTH0_DOMAIN}/`,
  issuer: "https://pluralsight-reactjsauth0-dev.eu.auth0.com/",

  // This must match the algorithm selected in the Auth0 dashboard under your app's advanced settings under the OAuth tab
  algorithms: ["RS256"],
});

// Our own custom Express (endpoint) middleware - express middleware MUST return a function that accepts 3 arguments; request, response, next. next() is used to pass control on to the next item in the middleware chain or conclude it
function checkRole(role) {
  return function(request, response, next) {
    // const assignedRoles = request.user[`${VUE_APP_API_URL}/roles`]; //auth0 rule shared with react implementation
    const assignedRoles = request.user[`https://api.catalyz.co.uk/roles`]; //auth0 rule shared with react implementation
    if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
      return next(); // DEVNOTE: calling next allows the next process in the chain to continue
    } else {
      return response.status(401).send("Insufficient role"); // Throw unauthorised
    }
  };
}
//

const server = express();
// server.use(jwtCheck); //DEVNOTE: would implement cross-wide need for authorisation token on all request from this server; circumventing the 'jwtCheck' function callback

server.get("/", function(request, response) {
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/plain");
  response.end("api.catalyz.co.uk\nWelcome\n");
});

server.get("/public", function(request, response) {
  response.json({
    message: "Hello from a public API!",
  });
});

// Express supports declaring multiple arguments here to validate request; anything that fails here in the middle, then the request will also fail
server.get("/private", jwtCheck, function(request, response) {
  response.json({
    message: "Hello from a private(restricted) API!",
  });
});

// MOCK scoped service
//authorisation=>scopes
server.get("/course", jwtCheck, checkScope(["read:courses"]), function(
  request,
  response
) {
  response.json({
    // MOCK DATA
    courses: [
      { id: 1, title: "Building Apps with React and Redux" },
      { id: 2, title: "Creating Reusable React Components" },
    ],
  });
});

//authorisation=>roles
server.get("/admin", jwtCheck, checkRole("admin"), function(request, response) {
  response.json({
    message: "Hello from a private(restricted) admin API!",
  });
});

server.listen(3333);
// console.log("API server listening on " + VUE_APP_API_URL);
console.log(`API server listening on http://${DOMAIN}:${PORT}`);
