import React, { Component } from 'react';

export default class Profile extends Component {
    //DEVNOTE: class field syntax as oppose to declaring/initialising within a constructor()
    state = {
        profile: null,
        error: "",
    }

    componentDidMount() {
        this.loadUserProfile();
    }

    loadUserProfile() {
        this.props.auth.getProfile((profile, error) => {
            this.setState({profile, error});
        });
    }

    render() {
        const { profile } = this.state;
        
        if(!profile) return null;

        return (
            <>
                <h1>Profile</h1>
                <p>{ profile.nickname }</p>
                <img src={ profile.pic } alt="User profile avatar" style={ {maxWidth: 50, maxHeight: 50} } />
                {/* DEVNOTE: different providers may have standards for the fields they collect and the property names data is assigned to */}
                <pre>{ JSON.stringify(profile, null, 4) }</pre>
            </>
        );
    }
}
