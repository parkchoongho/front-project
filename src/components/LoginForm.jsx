import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import Form from "./common/form";
import auth from "./services/authService";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .min(8)
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);
      window.location = "/";
    } catch (error) {}
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email")}
          {this.renderInput("password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
