"use client";

import React, { useState } from "react";
import "./Comments.css";

const CommentInput = () => {
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setValue("");
  };

  return (
    <form className="commentInputForm" onSubmit={handleSubmit}>
      <textarea
        className="commentInput"
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
