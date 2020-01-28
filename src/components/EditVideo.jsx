import React from "react";
import Joi from "joi-browser";
import { editVideo, getVideo, deletetVideo } from "./services/videoService";
import Form from "./common/form";
import auth from "./services/authService";
import { Redirect } from "react-router-dom";

class EditVideo extends Form {
  state = {
    data: {
      title: "",
      description: ""
    },
    errors: {},
    authorId: "",
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
            video: {
              title,
              description,
              creator: { _id: authorId }
            }
          }
        }
      } = await getVideo(videoId);

      this.setState({
        authorId,
        data: { title, description },
        isLoading: false
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleDelete = async () => {
    const videoId = this.props.match.params.id;

    await deletetVideo(videoId);
    window.location = "/";
  };

  doSubmit = async () => {
    try {
      const {
        data: { title, description }
      } = this.state;

      const videoId = this.props.match.params.id;
      await editVideo(title, description, videoId);
      window.location = `/video/${videoId}`;
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { isLoading, authorId } = this.state;

    const user = auth.getCurrentUser();

    if (!user || (authorId && user.id !== authorId)) return <Redirect to="/" />;
    return (
      <React.Fragment>
        {isLoading ? (
          "Loading..."
        ) : (
          <div className="form-container">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("title")}
              {this.renderInput("description")}
              {this.renderButton("Edit Video")}
            </form>
            <button onClick={this.handleDelete}>Delete Video</button>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default EditVideo;
