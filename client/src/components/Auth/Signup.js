import React from "react";
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries/index";

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    passwordConfirm: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(data => {
      console.log(data);
    });
  };

  render() {
    const { username, password, email, passwordConfirm } = this.state;
    return (
      <div className="App">
        <h2 className="App">Signup</h2>
        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {() => {
            {
              signupUser, { data, loading, error };
            }
            return (
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, signupUser)}
              >
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  onChange={this.handleChange}
                  value={username}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  onChange={this.handleChange}
                  value={email}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={this.handleChange}
                  value={password}
                />
                <input
                  type="password"
                  name="passwordConfirm"
                  placeholder="confirm password"
                  onChange={this.handleChange}
                  value={passwordConfirm}
                />
                <button type="submit" className="button-primary">
                  Submit
                </button>
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default Signup;
