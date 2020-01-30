import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { editUser } from "./services/userService";
import auth from "./services/authService";

class EditProfile extends Form {
  state = {
    data: { name: "", email: "" },
    errors: {},
    loading: false
  };

  schema = {
    name: Joi.string()
      .required()
      .min(5),
    email: Joi.string()
      .required()
      .email()
  };

  componentDidMount() {
    this.populateUser();
  }

  populateUser() {
    const user = auth.getCurrentUser();
    const { name, email } = user;
    this.setState({ data: { name, email }, isLoading: false });
  }

  doSubmit = async () => {
    const { name, email } = this.state.data;

    try {
      await editUser(name, email);
      auth.logout();
      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name")}
          {this.renderInput("email")}
          {this.renderButton("Edit")}
        </form>
      </div>
    );
  }
}

export default EditProfile;
