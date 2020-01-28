import React from "react";
import Joi from "joi-browser";
import { editVideo, getVideo } from "./services/videoService";
import Form from "./common/form";

class EditVideo extends Form {
  state = {
    data: {
      title: "",
      description: ""
    },
    errors: {},
    isLoading: true
  };

  schema = {
    title: Joi.string().required(),
    description: Joi.string()
      .required()
      .min(8)
  };

  async componentDidMount() {
    try {
      this.populateVideo();
    } catch (error) {
      console.log(error);
    }
  }

  async populateVideo() {
    try {
      const videoId = this.props.match.params.id;
      const {
        data: {
          result: {
            video: { title, description }
          }
        }
      } = await getVideo(videoId);

      this.setState({ data: { title, description }, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  doSubmit = async () => {
    try {
      const {
        data: { title, description }
      } = this.state;

      const videoId = this.props.match.params.id;
      await editVideo(title, description, videoId);
      window.location = `/video/${videoId}`;
    } catch (error) {}
  };

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title")}
          {this.renderInput("description")}
          {this.renderButton("Edit Video")}
        </form>
      </div>
    );
  }
}

export default EditVideo;
