import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './components/Home';
import Nav from './components/Nav';
import Profile from './components/Profile';
import Public from './components/Public';
import Private from './components/Private';
import Courses from './components/Courses';
import Callback from './components/Callback';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './context/AuthContext';

import Auth from './Auth/Auth';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: new Auth(this.props.history) // history object passed as argument by react-router and attached as prop
        };
    }

    render() {
        const { auth } = this.state;

        return (
            <AuthContext.Provider value={ auth }> { /*declare here the value that this context will expose to it's children(via it's context consumer)*/ }
                <Nav auth={ auth } />

                <div className="body">
                    <Route
                        path="/"
                        exact
                        render={(props) => <Home auth={ auth } { ...props } />}
                    />
                    <PrivateRoute
                        path="/profile"
                        component={ Profile }
                    />
                    <Route path="/public-api" component={ Public } />
                    <PrivateRoute
                        path="/private-api"
                        component={ Private }
                    />
                    <PrivateRoute
                        path="/courses"
                        component={ Courses }
                        scopes={ ["read:courses"] }
                    />
                    <Route
                        path="/callback"
                        render={ (props) => <Callback auth={ auth } { ...props } /> }
                    />
                </div>
            </AuthContext.Provider>
        );
    }
}
