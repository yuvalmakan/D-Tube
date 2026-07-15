import BaseIcon from "../SideBar/SideBarIcons/BaseIcon";
import React, { useEffect, useState } from "react";

interface prop {
  videoID: string;
}

function getStoredToken() {
  return window.localStorage.getItem("dtube_token");
}

function LikeButton({ videoID }: prop) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function getLike() {
      try {
        const token = getStoredToken();
        if (!token) return;

        const res = await fetch(`http://localhost:8000/liked/${videoID}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) return;

        const data = await res.json();

        if (!cancelled) {
          setLiked(Boolean(data?.liked));
        }
      } catch (error) {
        console.error("Failed to fetch like state", error);
      }
    }

    getLike();

    return () => {
      cancelled = true;
    };
  }, [videoID]);

  async function clicked() {
    try {
      const token = getStoredToken();
      if (!token) {
        alert("Please log in first");
        return;
      }

      const response = await fetch(
        `http://localhost:8000/togglelike/${videoID}`,
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
        const data = await response.json();
        setLiked(Boolean(data?.liked));
      }
    } catch {
      alert("Server error");
    }
  }

  const col = liked ? "#2563eb" : "#111827";
  const stroke = liked ? "#2563eb" : "#111827";

  return (
    <BaseIcon
      className="likeButton"
      iconName="thumbsUp"
      size={40}
      color={col}
      stroke={stroke}
      onclick={clicked}
    ></BaseIcon>
  );
}

export default LikeButton;
