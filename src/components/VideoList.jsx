import React from "react";
import { Link } from "react-router-dom";

const VideoList = ({ videos }) => {
  return videos ? (
    <div className="home-videos">
      {videos.map(video => (
        <div className="videoBlock" key={video._id}>
          <Link to={`/video/${video._id}`}>
            <video
              src={video.fileUrl}
              controls={false}
              className="videoBlock__thumbnail"
            ></video>
            <h4 className="videoBlock__title">{video.title}</h4>
          </Link>
        </div>
      ))}
    </div>
  ) : null;
};

export default VideoList;
