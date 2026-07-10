import React from "react";
import SideBarIcon from "./SideBarIcons/SideBarIcons";
import "./SideBar.css";
import image from "../../../public/assets/github.png";

function SideBar() {
  return (
    <div id="sideBar" style={{ gridArea: "sideBar" }}>
      <SideBarIcon href="/" iconName="home" type="main icon">
        Home
      </SideBarIcon>
      <SideBarIcon href="/trending" iconName="trending" type="main icon">
        Trending
      </SideBarIcon>
      <SideBarIcon href="/" iconName="subscribed" type="no link">
        Subscribtions⬇️
      </SideBarIcon>
      <SideBarIcon
        href="/"
        iconName="null"
        type="Subscribed"
        imgSrc={image.src}
        alt="git-hub"
      >
        Git Hub
      </SideBarIcon>
    </div>
  );
}

export default SideBar;
