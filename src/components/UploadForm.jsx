import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { uploadVideo } from "./services/videoService";
import auth from "./services/authService";
import { Redirect } from "react-router-dom";

class UploadForm extends Form {
  state = {
    data: { title: "", description: "", videoFile: "" },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    description: Joi.string()
      .required()
      .min(8)
      .label("Description"),
    videoFile: Joi
  };

  doSubmit = async () => {
    try {
      const {
        data: { title, description, videoFile }
      } = this.state;

      await uploadVideo(title, videoFile, description);
      window.location = "/";
    } catch (error) {}
  };

  render() {
    if (!auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title")}
          {this.renderInput("description")}
          {this.renderVideoInput("videoFile")}
          {this.renderButton("Upload")}
        </form>
      </div>
    );
  }
}

export default UploadForm;
