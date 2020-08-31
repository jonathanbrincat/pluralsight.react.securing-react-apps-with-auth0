import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ component: Component, scopes, ...rest }) => {
    return (
        <AuthContext.Consumer>
            { (auth) => (
                <Route { ...rest } render={
                    (props) => {
                        // 1.Redirect to login if not logged in
                        if(!auth.isAuthenticated()) return auth.login();

                        // 2.Prohibit and display feedback if user lacks required permissions(scopes)
                        if(scopes.length > 0 && !auth.userHasScopes(scopes)) {
                            return (
                                <h1>{ `Unauthorised - You need the following scope(s) to view this page: ${scopes.join(',')}` }</h1>
                            )
                        }

                        return (
                            <Component auth={ auth } { ...props } />
                        )
                    }
                } />
            )}
        </AuthContext.Consumer>
    )
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    scopes: PropTypes.array,
};

PrivateRoute.defaultProps = {
    scopes: [],
};

export default PrivateRoute;
