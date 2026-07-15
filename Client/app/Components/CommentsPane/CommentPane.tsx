"use client";

import React from "react";
import "./CommentPane.css";
import CommentInput from "./Comments/CommentInput";
import Comments from "./Comments/Comments";

const CommentPane = ({ videoID }: { videoID: string }) => {
  async function fetchComments() {
    try {
      const res = await fetch(`http://localhost:8000/getComments/${videoID}`);
      if (!res.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await res.json();
      console.log("Raw backend data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  }

  type Comment = { text?: string; [key: string]: any };

  let [comments, setComments] = React.useState<Comment[]>([]);

  React.useEffect(() => {
    fetchComments().then(setComments);
  }, [videoID]);

  console.log("Fetched comments:", comments);

  comments = comments.filter((comment) => {
    comment.videoID == videoID;
  });

  return (
    <aside className="commentPane">
      <div className="commentPaneHeader">
        <h3>Comments</h3>
        <span>{comments.length}</span>
      </div>

      <CommentInput videoID={videoID} />
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <Comments key={index} text={comment.text ?? ""} />
        ))
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}
    </aside>
  );
};

export default CommentPane;
