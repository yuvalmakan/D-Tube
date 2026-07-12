"use client";

import React from "react";
import "./CommentPane.css";
import CommentInput from "./Comments/CommentInput";
import Comments from "./Comments/Comments";

const sampleComments = [
  {
    id: 1,
    author: "Maya",
    time: "2 min ago",
    text: "This video looks amazing. The editing is so smooth!",
  },
  {
    id: 2,
    author: "Daniel",
    time: "10 min ago",
    text: "I loved the intro and the pacing. Great work!",
  },
  {
    id: 3,
    author: "Nina",
    time: "25 min ago",
    text: "Can’t wait to see more uploads like this.",
  },
];

const CommentPane = () => {
  return (
    <aside className="commentPane">
      <div className="commentPaneHeader">
        <h3>Comments</h3>
        <span>{sampleComments.length}</span>
      </div>

      <CommentInput />
      <Comments comments={sampleComments} />
    </aside>
  );
};

export default CommentPane;
