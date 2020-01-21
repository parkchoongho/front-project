import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "./services/userService";
import auth from "./services/authService";

class JoinForm extends Form {
  state = {
    data: { name: "", email: "", password: "" },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .min(5)
      .label("Name"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(8)
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const {
        data: { result: token }
      } = await register(this.state.data);
      auth.loginWithJwt(token);
      window.location = "/";
    } catch (error) {}
  };

  render() {
    return (
      <div>
        <h1>Join</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Join")}
        </form>
      </div>
    );
  }
}

export default JoinForm;
