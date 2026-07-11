import React, { useState } from "react";
import "./SubscribeButton.css";

const SubscribeButton = () => {
  const [subscribed, setsubscribed] = useState(false);

  const clicked = () => {
    setsubscribed(!subscribed);
  };

  const col = subscribed ? "white" : "black";
  const textcol = subscribed ? "black" : "white";

  return (
    <button
      className="subscribeButton"
      onClick={clicked}
      style={{ backgroundColor: col, color: textcol }}
    >
      Subscribe
    </button>
  );
};

export default SubscribeButton;
