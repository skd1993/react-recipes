import React from "react";
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries/index";
import Error from "../Error";

const initialState = {
  username: "",
  password: "",
  email: "",
  passwordConfirm: ""
};

class Signup extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(({data}) => {
      console.log(data);
      localStorage.setItem("token", data.signupUser.token);
      this.clearState();
    });
  };

  validateForm = () => {
    const { username, password, email, passwordConfirm } = this.state;
    const isInvalid = !username || !email || password !== passwordConfirm;
    return isInvalid;
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
          {(signupUser, { data, loading, error }) => {
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
                <button
                  type="submit"
                  className="button-primary"
                  disabled={loading || this.validateForm()}
                  // style={this.validateForm() && {backgroundColor: "grey", cursor: "not-allowed"}}
                >
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default Signup;
