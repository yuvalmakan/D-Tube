import BaseIcon from "../SideBar/SideBarIcons/BaseIcon";
import React, { useState } from "react";

interface prop {
  videoID: string;
}

async function LikeButton({ videoID }: prop) {
  const [liked, setLiked] = useState(false);

  async function clicked() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8000/toggle-like/${videoID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        alert("Didn't work");
      } else {
        alert("Worked");
      }
    } catch {
      alert("Server error");
    }
    setLiked(!liked);
  }

  const col = liked ? "blue" : "white";

  return (
    <BaseIcon
      className="likeButton"
      iconName="thumbsUp"
      size={40}
      color={col}
      onclick={clicked}
    ></BaseIcon>
  );
}

export default LikeButton;
