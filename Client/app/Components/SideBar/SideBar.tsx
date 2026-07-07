import React from "react";
import SideBarIcon from "./SideBarIcons/SideBarIcons";
import "./SideBar.css";
import image from "../../../public/assets/github.png";

function SideBar() {
  return (
    <div id="sideBar" style={{ gridArea: "sideBar" }}>
      <SideBarIcon iconName="home" type="main icon">
        Home
      </SideBarIcon>
      <SideBarIcon iconName="trending" type="main icon">
        Trending
      </SideBarIcon>
      <SideBarIcon iconName="subscribed" type="no link">
        Subscribtions⬇️
      </SideBarIcon>
      <SideBarIcon
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
