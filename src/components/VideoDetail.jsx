import React, { Component } from "react";
import { getVideo } from "./services/videoService";

class VideoDetail extends Component {
  state = { video: "" };

  componentDidMount() {
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

      this.setState({ video });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { comments, fileUrl, title, description } = this.state.video;
    return (
      <React.Fragment>
        <div className="videoPlayer" id="jsVideoPlayer">
          <video src={fileUrl} controls={true}></video>
          <div className="video__info">
            <h5 className="video__title">{title}</h5>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VideoDetail;
