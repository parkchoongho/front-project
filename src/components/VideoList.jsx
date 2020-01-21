import React, { Component } from "react";

const VideoList = props => {
  const { videos } = props;

  return videos.map(video => (
    <video
      src={"http://localhost:4000/" + video.fileUrl}
      key={video._id}
      controls={true}
    ></video>
  ));
};

export default VideoList;
