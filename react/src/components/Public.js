import React, { Component } from 'react';

export default class Public extends Component {
    state = {
        message: "",
    };

    componentDidMount() {
        fetch("/public") // DEVNOTE: relative path even though domain is http://localhost:3001 (which would trigger a CORS violation anyway); create-react-app has support for "proxy" property in package.json which will proxy any calls from "http://localhost:3000" over to "http://localhost:3001". This allows us to maintain short flat relative urls but also conveniently avoids the cross origin resource sharing issues sporned from self-contained development environments.
            .then((response) => {
                if(response.ok) return response.json();
                throw new Error("Network response was not ok.");
            })
            .then((response) => {
                return this.setState({
                    message: response.message,
                });
            })
            .catch((error) => {
                return this.setState({
                    message: error.message,
                });
            });
    }

    render() {
        return <p>{ this.state.message }</p>;
    }
}
