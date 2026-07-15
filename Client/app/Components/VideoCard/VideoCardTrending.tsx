"use client";
import VideoBlock from "./VideoBlock/VideoBlock";
import thumbnail from "../../../public/assets/thumbnail.png";
import image from "../../../public/assets/github.png";
import "./VideoCard.css";
import React, { useState, useEffect } from "react";

function VideoCardTrending() {
  const [videos, setVideos] = useState<any[]>([]);

  const vidArr = async () => {
    try {
      const response = await fetch("http://localhost:8000/videos");
      console.log(response);

      if (!response.ok) {
        alert("There was an error");
      } else {
        const data = await response.json();
        console.log(data);
        data.sort((a: any, b: any) => b.views - a.views);
        alert("Success");
        setVideos(data);
      }
    } catch (error) {
      console.log("The error is:", error);
      alert("Failed to connect to the server");
    }
  };

  useEffect(() => {
    vidArr();
  }, []);

  return (
    <div className="videoCard" style={{ gridArea: "videoCard" }}>
      {videos.map((vid) => (
        <VideoBlock
          key={vid._id}
          thumbnail={`http://localhost:8000${vid.thumbnailUrl}`}
          creatorPic={image.src}
          vref="/watch"
        >
          {vid.title}
        </VideoBlock>
      ))}
    </div>
  );
}

export default VideoCardTrending;
