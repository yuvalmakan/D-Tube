import React from "react";

const Video = () => {
  return (
    <video width={800} height={500} controls autoPlay>
      <source src="/video" type="video/mp4" />
    </video>
  );
};

export default Video;
