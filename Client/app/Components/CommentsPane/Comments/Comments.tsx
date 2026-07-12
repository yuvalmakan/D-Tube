import React from "react";
import "./Comments.css";

type CommentItem = {
  id: number;
  author: string;
  time: string;
  text: string;
};

type CommentsProps = {
  comments: CommentItem[];
};

const Comments = ({ comments }: CommentsProps) => {
  return (
    <div className="commentsList">
      {comments.map((comment) => (
        <article className="commentCard" key={comment.id}>
          <div className="commentAvatar">
            {comment.author.charAt(0).toUpperCase()}
          </div>
          <div className="commentBody">
            <div className="commentMeta">
              <strong>{comment.author}</strong>
              <span>{comment.time}</span>
            </div>
            <p>{comment.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Comments;
