"use client";
import React, { use } from "react";
import "../watch.css";
import LikeButton from "../../Components/UserEngagementButtons/LikeButton";
import SubscribeButton from "../../Components/UserEngagementButtons/SubsicribeButton";
import CommentPane from "../../Components/CommentsPane/CommentPane";

export const page = ({ params }: { params: Promise<{ videoID: string }> }) => {
  const resolvedParam = use(params);
  const id = resolvedParam.videoID;

  return (
    <div className="watchPage">
      <div className="videoPanel">
        <div className="videoWrapper">
          <video width="800" height="500" controls className="theVideo">
            <source src={`http://localhost:8000/play/${id}`} type="video/mp4" />
          </video>
          <div className="engagementButtons">
            <LikeButton videoID={id}></LikeButton>
            <SubscribeButton videoID={id}></SubscribeButton>
          </div>
        </div>
      </div>

      <CommentPane videoID={id} />
    </div>
  );
};

export default page;
