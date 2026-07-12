import React, { useEffect, useState } from "react";
import "./SubscribeButton.css";

interface prop {
  videoID: string;
}

function getStoredToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    window.localStorage.getItem("dtube_token") ||
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("dtube_token") ||
    window.sessionStorage.getItem("token") ||
    null
  );
}

const SubscribeButton = ({ videoID }: prop) => {
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function getSubscriptionState() {
      try {
        const token = getStoredToken();
        if (!token) return;

        const res = await fetch(`http://localhost:8000/subscribed/${videoID}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) return;

        const data = await res.json();

        if (!cancelled) {
          setSubscribed(Boolean(data?.subscribed));
        }
      } catch (error) {
        console.error("Failed to fetch subscription state", error);
      }
    }

    getSubscriptionState();

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
        `http://localhost:8000/togglesub/${videoID}`,
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
        setSubscribed(Boolean(data?.subscribed));
      }
    } catch {
      alert("Server error");
    }
  }

  const col = subscribed ? "white" : "black";
  const textcol = subscribed ? "black" : "white";

  return (
    <button
      className="subscribeButton"
      onClick={clicked}
      style={{ backgroundColor: col, color: textcol }}
    >
      {subscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
};

export default SubscribeButton;
