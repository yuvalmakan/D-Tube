import React from "react";
import VideoCard from "./VideoCard/VideoCard";
import SideBar from "./SideBar/SideBar";
import NavBar from "./NavBar/NavBar";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="homePage">
      <NavBar></NavBar>
      <SideBar></SideBar>
      <VideoCard></VideoCard>
    </div>
  );
}

export default HomePage;
