import React from "react";
import { Link } from "react-router-dom";

const VideoList = ({ videos }) => {
  return videos.map(video => (
    <Link to={`/video/${video._id}`} key={video._id}>
      <video src={video.fileUrl} controls={true}></video>
    </Link>
  ));
};

export default VideoList;
