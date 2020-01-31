import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

import Form from "./common/form";
import auth from "./services/authService";
import { changePassword } from "./services/userService";

class EditPassword extends Form {
  state = {
    data: {
      curPassword: "",
      veriPassword: "",
      newPassword: ""
    },
    errors: {},
    loading: true
  };

  schema = {
    curPassword: Joi.string()
      .required()
      .min(8),
    veriPassword: Joi.string()
      .required()
      .min(8),
    newPassword: Joi.string()
      .required()
      .min(8)
  };

  componentDidMount() {
    this.setState({ loading: false });
  }

  doSubmit = async () => {
    const { curPassword, veriPassword, newPassword } = this.state.data;
    console.log(curPassword, veriPassword);
    if (curPassword !== veriPassword) {
      window.location = "/profile/password";
    }

    try {
      const {
        data: { result }
      } = await changePassword(curPassword, newPassword);
      console.log(result);
      window.location = "/profile";
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { loading } = this.state;
    if (!auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <>
        {loading ? (
          "Loading..."
        ) : (
          <div className="form-container">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("curPassword", "password")}
              {this.renderInput("veriPassword", "password")}
              {this.renderInput("newPassword", "password")}
              {this.renderButton("Change Password")}
            </form>
          </div>
        )}
      </>
    );
  }
}

export default EditPassword;
