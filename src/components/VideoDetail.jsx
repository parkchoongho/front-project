import React, { Component } from "react";
import { getVideo } from "./services/videoService";
import auth from "./services/authService";
import { Link } from "react-router-dom";

class VideoDetail extends Component {
  state = { video: {}, isLoading: true };

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
          result: { video }
        }
      } = await getVideo(videoId);

      this.setState({ video, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { isLoading } = this.state;
    const {
      fileUrl,
      title,
      description,
      creator,
      comments,
      views,
      _id: id
    } = this.state.video;
    const loggedUser = auth.getCurrentUser();

    return (
      <React.Fragment>
        {isLoading ? (
          "Loading..."
        ) : (
          <div className="video-detail__container">
            <div className="videoPlayer" id="jsVideoPlayer">
              <video src={fileUrl} controls={true}></video>
            </div>
            <div className="video__info">
              <h5 className="video__title">{title}</h5>
              <p className="video__description">{description}</p>
              {views === 1 && <span className="video__views">1 view</span>}
              {views !== 1 && (
                <span className="video__views">{views} views</span>
              )}
              <div className="video__author">
                Uploaded By
                <Link to={`/users/${creator["_id"]}`}> {creator.name}</Link>
              </div>
              {loggedUser && loggedUser.id === creator["_id"] && (
                <Link to={`/video/${id}/edit`}>Edit Video</Link>
              )}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default VideoDetail;
