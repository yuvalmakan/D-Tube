import React from "react";
import "./Comments.css";

type CommentsProps = {
  text: string;
};

const Comments = ({ text }: CommentsProps) => {
  return (
    <article className="commentCard">
      <div className="commentBody">
        <p>{text}</p>
      </div>
    </article>
  );
};

export default Comments;
