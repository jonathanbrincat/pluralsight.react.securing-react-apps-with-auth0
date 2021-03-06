import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
    render() {
        const { isAuthenticated, userHasScopes, login, logout } = this.props.auth;

        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/public-api">Public API</Link>
                    </li>
                    {isAuthenticated() && (
                        <li>
                            <Link to="/private-api">Private API</Link>
                        </li>
                    )}
                    {isAuthenticated() && userHasScopes(['read:courses']) && (
                        <li>
                            <Link to="/courses">Courses(Scoped Private API)</Link>
                        </li>
                    )}
                    <li>
                        <button onClick={ isAuthenticated() ? logout : login }>
                            { isAuthenticated() ? "Log Out" : "Log In" }
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }
}
