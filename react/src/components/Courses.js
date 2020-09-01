import React, { Component } from "react";

export default class Private extends Component {
  state = {
    courses: [],
    message: "",
  };

  componentDidMount() {
    fetch("/course", {
      headers: {
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`,
      },
    }) // DEVNOTE: relative path even though domain is http://localhost:3001 (which would trigger a CORS violation anyway); create-react-app has support for "proxy" property in package.json which will proxy any calls from "http://localhost:3000" over to "http://localhost:3001". This allows us to maintain short flat relative urls but also conveniently avoids the cross origin resource sharing issues sporned from self-contained development environments.
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        return this.setState({
          courses: response.courses,
        });
      })
      .catch((error) => {
        return this.setState({
          message: error.message,
        });
      });

    fetch("/admin", {
      headers: {
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`,
      },
    }) // DEVNOTE: relative path even though domain is http://localhost:3001 (which would trigger a CORS violation anyway); create-react-app has support for "proxy" property in package.json which will proxy any calls from "http://localhost:3000" over to "http://localhost:3001". This allows us to maintain short flat relative urls but also conveniently avoids the cross origin resource sharing issues sporned from self-contained development environments.
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        return console.log(response);
      })
      .catch((error) => {
        return this.setState({
          message: error.message,
        });
      });
  }

  render() {
    const { courses } = this.state;
    return (
      <div>
        <h1>Courses</h1>
        <ul>
          {courses &&
            courses.map((course) => <li key={course.id}>{course.title}</li>)}
        </ul>
      </div>
    );
  }
}
