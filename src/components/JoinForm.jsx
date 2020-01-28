import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
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
      .min(5),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(8)
  };

  doSubmit = async () => {
    try {
      const {
        data: { result: token }
      } = await register(this.state.data);
      auth.loginWithJwt(token);
      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name")}
          {this.renderInput("email")}
          {this.renderInput("password", "password")}
          {this.renderButton("Join")}
        </form>
      </div>
    );
  }
}

export default JoinForm;
