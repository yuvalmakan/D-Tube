"use client";
import React, { use } from "react";
import "../watch.css";
import LikeButton from "../../Components/UserEngagementButtons/LikeButton";
import SubscribeButton from "../../Components/UserEngagementButtons/SubsicribeButton";

export const page = ({ params }: { params: Promise<{ videoID: string }> }) => {
  const resolvedParam = use(params);
  const id = resolvedParam.videoID;

  return (
    <div className="videoWrapper">
      <video width="800" height="500" controls className="theVideo">
        <source src={`http://localhost:8000/play/${id}`} type="video/mp4" />
      </video>
      <LikeButton videoID={id}></LikeButton>
      <SubscribeButton></SubscribeButton>
    </div>
  );
};

export default page;
