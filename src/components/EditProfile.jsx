import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import Form from "./common/form";
import { editUser } from "./services/userService";
import auth from "./services/authService";

class EditProfile extends Form {
  state = {
    data: { name: "", email: "" },
    errors: {},
    loading: true
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
    if (!user) return;
    const { name, email } = user;
    this.setState({ data: { name, email }, isLoading: false });
  }

  doSubmit = async () => {
    const { name, email } = this.state.data;

    try {
      const {
        data: {
          result: { token }
        }
      } = await editUser(name, email);
      auth.logout();
      auth.loginWithJwt(token);
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
              {this.renderInput("name")}
              {this.renderInput("email")}
              {this.renderButton("Edit")}
            </form>
          </div>
        )}
      </>
    );
  }
}

export default EditProfile;
