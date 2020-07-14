import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Home from './Home';
import Nav from './Nav';
import Profile from './Profile';
import Public from './Public';
import Private from './Private';
import Courses from './Courses';
import Callback from './Callback';

import Auth from './Auth/Auth';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.auth = new Auth(this.props.history); // history object passed as argument by react-router and attached as prop
    }

    render() {
        const { isAuthenticated, userHasScopes, login } = this.auth;

        return (
            <>
                <Nav auth={ this.auth } />
                <div className="body">
                    <Route
                        path="/"
                        exact
                        render={(props) => <Home auth={ this.auth } { ...props } />}
                    />
                    <Route
                        path="/profile"
                        render={(props) =>
                            isAuthenticated() ? (
                                <Profile auth={ this.auth } { ...props } />
                                ) : (
                                <Redirect to="/" />
                            )
                        }
                    />
                    <Route path="/public-api" component={ Public } />
                    <Route
                        path="/private-api"
                        render={(props) =>
                            isAuthenticated() ? (
                                <Private auth={ this.auth } { ...props } />
                                ) : (
                                login()
                            )
                        }
                    />
                    <Route
                        path="/courses"
                        render={(props) =>
                            isAuthenticated() && userHasScopes(["read:courses"]) ? (
                                <Courses auth={ this.auth } { ...props } />
                                ) : (
                                login()
                            )
                        }
                    />
                    <Route
                        path="/callback"
                        render={ (props) => <Callback auth={ this.auth } { ...props } /> }
                    />
                </div>
            </>
        );
    }
}
