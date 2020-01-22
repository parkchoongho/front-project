import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { uploadVideo } from "./services/videoService";

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
    return (
      <div>
        <h1>Upload</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("description", "Description")}
          {this.renderVideoInput("videoFile", "VideoFile")}
          {this.renderButton("Upload")}
        </form>
      </div>
    );
  }
}

export default UploadForm;
