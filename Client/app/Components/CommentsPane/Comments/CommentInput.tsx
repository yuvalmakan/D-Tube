"use client";

import React, { useState } from "react";
import "./Comments.css";

interface CommentInputProps {
  videoID: string;
}

function getStoredToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem("dtube_token");
}

const CommentInput = ({ videoID }: CommentInputProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentText = value.trim();
    if (!commentText) return;

    const token = getStoredToken();
    if (!token) {
      alert("Please log in first");
      return;
    }

    const res = await fetch(`http://localhost:8000/comment/${videoID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment: commentText }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      setValue("");
      alert("Comment added successfully");
    } else {
      alert(data?.message || "Failed to add comment");
    }
  };

  return (
    <form className="commentInputForm" onSubmit={handleSubmit}>
      <textarea
        className="commentInput"
        name="comment"
        placeholder="Write a comment..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button className="commentSubmitBtn" type="submit">
        Comment
      </button>
    </form>
  );
};

export default CommentInput;
