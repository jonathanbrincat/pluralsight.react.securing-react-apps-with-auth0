import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  const { isAuthenticated, login } = props.auth;

  return (
    <div>
      <h1>Home</h1>

      {isAuthenticated() ? (
        <Link to="/profile">View Profile</Link>
      ) : (
        <button onClick={login}>Log In</button>
      )}

      <p>auth.isAuthenticated = {isAuthenticated().toString()}</p>
    </div>
  );
};

export default Home;
