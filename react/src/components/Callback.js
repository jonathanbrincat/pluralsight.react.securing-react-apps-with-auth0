import React, { Component } from 'react';

export default class Callback extends Component {
    componentDidMount() {
        // Handle authentication if expected values are present in the URL. Let's look for these expected values using a regex.
        if(/access_token|id_token|error/.test(this.props.location.hash)) {
            this.props.auth.handleAuthentication();
        }else {
            throw new Error("Invalid callback URL.");
        }
    }

    render() {
        return <h1>Loading...</h1>;
    }
}
