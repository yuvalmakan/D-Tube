"use client";

import React from "react";
import "./CommentPane.css";
import CommentInput from "./Comments/CommentInput";
import Comments from "./Comments/Comments";

const CommentPane = ({ videoID }: { videoID: string }) => {
  async function fetchComments() {
    try {
      const res = await fetch(`http://localhost:8000/comments/${videoID}`);
      if (!res.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await res.json();
      return data.comments;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  }

  type Comment = { text?: string; [key: string]: any };

  const [comments, setComments] = React.useState<Comment[]>([]);

  React.useEffect(() => {
    fetchComments().then(setComments);
  }, [videoID]);

  return (
    <aside className="commentPane">
      <div className="commentPaneHeader">
        <h3>Comments</h3>
        <span>{comments.length}</span>
      </div>

      <CommentInput videoID={videoID} />
      <Comments text={comments[0]?.text ?? ""} />
    </aside>
  );
};

export default CommentPane;
